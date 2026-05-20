---
title: First Use
description: Open the PiTrac dashboard on port 8080, configure cameras, run strobe and camera calibration, start the launch monitor, and hit your first tracked shot.
---

# First Use Guide

After installing PiTrac, you are ready to access the web interface and begin setup.

**Time required:** ~15 minutes (longer if strobe calibration is needed)

**Difficulty:** Beginner

---

## Step 1: Access the Web Dashboard

The PiTrac web interface is a FastAPI application served on port 8080.

### Start the Web Server

If not already running:

```bash
sudo systemctl start pitrac-web
```

### Open the Dashboard

Open a web browser and navigate to:

```
http://[YOUR_PI_IP_ADDRESS]:8080
```

To find your Pi's IP address:

```bash
hostname -I
```

Or use the hostname:

```
http://pitrac.local:8080
```

!!! note
    The web server listens on port 8080 on all interfaces (`0.0.0.0:8080`). Always use `http://`, not `https://`.

---

## Step 2: Understand the Interface

When the dashboard loads, you will see a header bar and the main dashboard page.

### Header

The header is present on every page and contains:

**Status indicators** (left side):

- **WS** -- WebSocket connection status (green = connected, red = disconnected)
- **LM** -- PiTrac launch monitor process status (green = running, red = stopped)

**PiTrac logo** (center) -- click to return to the dashboard.

**PiTrac controls** (visible on desktop):

- **Start** -- start the launch monitor process
- **Stop** -- stop the launch monitor process (only shown when running)
- **Restart** -- restart the launch monitor process (only shown when running)

**Dropdown menu** (3-dot icon, top right):

On mobile, the PiTrac Start/Stop/Restart controls appear inside this menu. On all devices, the menu contains navigation links and the theme selector:

- Dashboard
- Calibration
- Configuration
- Logs
- Testing Tools
- Theme selector (Light / Dark / System)

### Navigation Pages

The web interface has five pages:

| Page | URL | Purpose |
|------|-----|---------|
| Dashboard | `/` | Shot data display and system status |
| Calibration | `/calibration` | Camera and strobe calibration wizard |
| Configuration | `/config` | Settings editor |
| Testing Tools | `/testing` | Hardware tests and pipeline testing |
| Logs | `/logs` | Real-time log viewer |

---

## Step 3: Configure Camera Hardware

Before anything else works, PiTrac needs to know what cameras you have.

1. Open **Configuration** from the dropdown menu
2. In the category sidebar, select **Cameras**
3. Set **Camera 1 Type** and **Camera 2 Type**
    - Use the **Auto Detect** feature if available, or manually select from the dropdown
4. Set **Lens Choice** for each camera
5. Click **Save Changes**

!!! tip
    The Configuration page has a search bar at the top -- type "camera" to quickly find camera-related settings.

---

## Step 4: Strobe Calibration (V3 Connector Board Only)

!!! danger "Critical for V3 boards"
    If you have a V3 Connector Board, you **must** run strobe calibration before PiTrac will start. The system checks strobe safety before allowing the launch monitor to run, and will block start/restart if the V3 DAC has not been calibrated.

    V1 and V2 boards use fixed resistors for current limiting and do not require strobe calibration.

**How the safety gate works:**

The web server checks the board version (`gs_config.strobing.kConnectionBoardVersion`) and the saved DAC setting (`gs_config.strobing.kDAC_setting`). If the board is V3 and no DAC calibration exists, any attempt to start PiTrac, run calibration, or run testing tools that trigger the strobe will be blocked. A modal dialog will appear directing you to the Calibration page.

**To run strobe calibration:**

1. First, set your board version in **Configuration > Strobing > Connection Board Version** to `3`
2. Navigate to the **Calibration** page
3. Scroll down to the **Strobe Calibration** section
4. Select your **LED Type**:
    - **V3 LED Board (10A)** -- targets 10A LED current
    - **Legacy 100W LED (9A)** -- targets 9A LED current
5. Click **Calibrate**
6. Watch the progress bar -- the process sweeps DAC values to find the correct current setting
7. On success, you will see the calibrated DAC value, LED current, and LDO voltage

The calibrated DAC value is saved to the configuration and automatically applied on each web server startup.

---

## Step 5: Lens Distortion Correction

Before camera calibration, correct your cameras' lens distortion. Every downstream measurement (focal length, camera angles, ball position, shot tracking) is more accurate when the input images have been undistorted first.

You will need a **printed ChArUco board**, mounted on a rigid, perfectly flat backing.

!!! warning "Remove Camera 2's IR-pass filter first"
    If the IR-pass filter is already installed on Camera 2 (the flight camera), temporarily remove it before running distortion calibration. The filter blocks visible light and the ChArUco pattern will not be detectable. Re-install the filter after both cameras are calibrated. Camera 1 is not affected.

!!! danger "Print at 100% and mount on a rigid flat surface"
    - Print the board **at 100% scale** -- disable "Fit to Page" and verify a square measures 23 mm with a ruler
    - Glue or tape the printed sheet to foam board, MDF, or hardboard so it cannot flex
    - A board that bends or curls even slightly will produce a worse calibration than no calibration at all

**Quick steps:**

1. Navigate to the **Calibration** page and open the **Lens Distortion** tab
2. Click **Print Calibration Pattern** and print the board at 100% scale
3. Mount the printed sheet on a stiff flat backing
4. Click **Calibrate Camera 1** and slowly move the board through the 3x3 coverage grid with a mix of flat and tilted poses until the system completes automatically
5. Verify with the **Undistort Preview** -- straight edges in the scene should stay straight after undistortion
6. Repeat for **Camera 2**

Total time: a few minutes per camera. This is a one-time-per-lens step.

!!! note "Full details"
    See [Distortion Correction](../../hardware/cameras/distortion-correction.md) for complete instructions, coverage tips, and troubleshooting.

---

## Step 6: Camera Calibration

Camera calibration teaches PiTrac where your cameras are positioned and their lens characteristics. Without calibration, ball speed and angle calculations will be incorrect.

1. Navigate to the **Calibration** page
2. Follow the **4-step wizard**:

**Step 1 -- Setup:** Select which camera to calibrate (Camera 1, Camera 2, or Both). Camera 1 is the "Tee Camera" and Camera 2 is the "Flight Camera."

**Step 2 -- Verify:** Click **Check Ball Location** for each selected camera to confirm the ball is detected. Click **Calibrate Camera** to capture a preview image. Both must succeed before proceeding.

**Step 3 -- Calibrate:** Choose **Automatic Calibration** (recommended) or **Manual Calibration**. Watch the progress bars and process log. Do not move the ball or cameras during calibration.

**Step 4 -- Complete:** Review results showing status, completion method, focal length, and camera angles for each camera.

!!! tip
    Calibrate Camera 1 first -- it is faster (~30 seconds vs ~2 minutes for Camera 2).

---

## Step 7: Start PiTrac

With calibration complete, you can start the launch monitor.

1. Click the **Start** button in the header (or from the dropdown menu on mobile)
2. The **LM** status indicator should turn green
3. The dashboard status strip will cycle through system states:
    - **System Initializing** -- PiTrac is starting up
    - **Waiting for Ball** -- place a ball on the tee
    - **Ball Detected** -- ball found, waiting for stabilization
    - **Ready to Hit!** -- ball is stable, take your shot

---

## Step 8: Hit Your First Shot

1. **Place a ball** on the tee in view of the cameras
2. **Wait** for the status strip to show "Ready to Hit!"
3. **Hit the shot**
4. The dashboard will display:

    - **Ball Speed** (mph) -- the hero metric in the large card
    - **Launch Angle** (degrees)
    - **Side Angle** (degrees)
    - **Back Spin** (rpm)
    - **Side Spin** (rpm)
    - **Shot image** in the right panel (click to open full-size)

5. Click **Reset** on the status strip to clear the shot data and prepare for the next shot

---

## First-Time Checklist

Before hitting your first shot, verify:

- [ ] Web dashboard accessible at `http://[PI_IP]:8080`
- [ ] Camera types configured in Configuration
- [ ] Strobe calibration complete (V3 boards only)
- [ ] Camera calibration complete for at least Camera 1
- [ ] PiTrac started (LM indicator green in header)
- [ ] Status strip shows "Waiting for Ball" or "Ready to Hit!"
- [ ] Ball placed on tee and visible to cameras

---

## Next Steps

**Now that PiTrac is running:**

1. **Configure your simulator** -- [Simulator Integration](../simulator-integration.md) for E6, GSPro, or TruGolf setup
2. **Run test shots** -- verify speed and angle readings look reasonable
3. **Fine-tune settings** -- adjust camera gain, ball detection parameters in Configuration
4. **Learn the full interface** -- [Using PiTrac](../using-pitrac/index.md) for detailed page-by-page documentation
5. **Manage your installation** -- [Managing PiTrac](managing.md) for service management, updates, and file locations

**If you encounter issues:**

- **[Troubleshooting Guide](troubleshooting.md)** -- Common problems and solutions
- Check **Logs** page for error messages
- Use **Testing Tools** to diagnose hardware problems

**Return to:**

- **[Installation Overview](index.md)**

---

## Quick Troubleshooting

??? note "Web Interface Not Loading?"

    ```bash
    # Check service status
    systemctl status pitrac-web

    # Restart if needed
    sudo systemctl restart pitrac-web
    ```

    Make sure you are using `http://` (not `https://`) and port 8080.

??? note "PiTrac Won't Start (Strobe Safety Error)?"

    If you see a "Strobe Calibration Required" modal, you have a V3 board that needs DAC calibration. Go to **Calibration** and run strobe calibration first.

    If you do not have a V3 board, check that your board version is set correctly in **Configuration > Strobing > Connection Board Version**.

??? note "Cameras Not Detected?"

    ```bash
    rpicam-hello --list-cameras
    ```

    If no cameras are listed, check CSI cable connections and boot config.

??? note "No Shot Data Appearing?"

    - Verify the status strip is showing "Ready to Hit!" before swinging
    - Check that calibration has been completed
    - Open **Logs** to look for errors
    - Use **Testing Tools > Camera 1 Still Image** to verify the camera can see the ball
