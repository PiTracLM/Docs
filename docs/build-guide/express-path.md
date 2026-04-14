---
title: Express Path
description: Streamlined PiTrac setup for experienced users: install Raspberry Pi OS, build PiTrac software, configure cameras, calibrate, and hit your first shot.
---

# Express Path Setup

**For experienced users.** Streamlined setup to get your PiTrac tracking shots quickly. If you're new to Raspberry Pi or want detailed explanations, use the [Build Your PiTrac](index.md) guide instead.

## What You'll Need

Before starting, make sure you have:

- PiTrac hardware assembled (cameras mounted, PCB installed, enclosure complete)
- Raspberry Pi 5 with at least 8GB RAM
- Two cameras connected via CSI ribbons (Pi Global Shutter or InnoMaker IMX296)
- 64GB+ MicroSD card
- Network connection (Ethernet cable highly recommended for faster setup)
- Computer to access the Pi remotely

!!! tip "Don't have hardware yet?"
    Check out the full [Build Your PiTrac](index.md) guide.

---

## Step 1: Set Up Raspberry Pi

You'll install Raspberry Pi OS and configure basic system settings.

!!! warning "OS Version Requirements"
    PiTrac requires **Raspberry Pi OS 64-bit** based on Debian 13 (Trixie).

    **Do NOT use:**

    - Older Raspberry Pi OS versions (based on Debian 12 or earlier)
    - 32-bit versions -- will not work

### Install the OS

1. Download [Raspberry Pi Imager](https://www.raspberrypi.com/software/) on your computer
2. Insert your MicroSD card
3. In Imager:
    - **Device**: Raspberry Pi 5
    - **OS**: Select either:
        - **"Raspberry Pi OS (64-bit)"** -- Desktop version (easier for first-timers)
        - **"Raspberry Pi OS (64-bit) Lite"** -- Command-line only (headless operation)
        - Both based on Debian 13 (Trixie)
    - **Storage**: Select your MicroSD card (triple-check this!)

4. Click "Next" then "Edit Settings" to configure:
    - **Hostname**: `pitrac` (or whatever you prefer)
    - **Username**: Your choice (you'll use this to log in)
    - **Password**: Something secure you'll remember
    - **WiFi**: Your network credentials
    - **Enable SSH**: Check this box, use password authentication

5. Click "Save" then "Yes" then "Yes" to write the image

### First Boot

1. Insert the MicroSD into your Pi (never insert/remove while powered on)
2. Connect ethernet cable if available
3. Connect power supply

The Pi will take a few minutes to boot, expand the filesystem, and connect to your network. Be patient.

### Log In Remotely

Find your Pi's IP address (check your router's DHCP list or try `pitrac.local`) and SSH in:

```bash
ssh username@pitrac.local
# Or use the IP directly: ssh username@192.168.1.123
```

On Windows, use PuTTY or Windows Terminal.

### Update Everything

Once logged in, update the system:

```bash
sudo apt -y update
sudo apt -y upgrade
sudo reboot now
```

The Pi will reboot when done.

!!! note "Full details"
    See [Raspberry Pi Setup](../software/pi-setup/index.md) for complete instructions.

---

## Step 2: Install PiTrac Software

Now we'll install the actual PiTrac software -- the launch monitor binary, web dashboard, and all dependencies.

### Quick Install

SSH back into your Pi after the reboot, then:

```bash
# Clone the repository
git clone https://github.com/PiTracLM/PiTrac.git
cd PiTrac/packaging

# Run the developer install (builds from source)
sudo ./build.sh dev
```

This installs:

- Launch monitor binary (`pitrac_lm`) to `/usr/lib/pitrac/pitrac_lm`
- Web server (Python FastAPI dashboard) to `/usr/lib/pitrac/web-server`
- System services and configuration to `/etc/pitrac/`

The script handles all dependencies automatically -- OpenCV 4.13.0, camera libraries, and everything else.

### Verify Installation

Check that everything's working:

```bash
# Check if the web service is running
systemctl status pitrac-web
```

If the web service isn't running, start it:

```bash
sudo systemctl start pitrac-web
```

!!! note "Troubleshooting"
    If the install fails, check [Installation Guide](../software/installation/index.md) for detailed steps and common issues.

---

## Step 3: Configure Cameras

PiTrac needs to know what cameras you have before anything will work.

### Verify Camera Detection

Make sure your Pi can see both cameras:

```bash
rpicam-hello --list-cameras
```

You should see 2 cameras listed. If not, check CSI cable connections and ensure `camera_auto_detect=1` is in your boot config (`/boot/firmware/config.txt`), then reboot.

### Access Web Interface

Open a browser and navigate to:

```
http://pitrac.local:8080
```

Or use your Pi's IP: `http://192.168.1.123:8080`

!!! tip "Can't connect?"
    - Check if web service is running: `systemctl status pitrac-web`
    - Start it if needed: `sudo systemctl start pitrac-web`
    - Make sure you're using `http://` not `https://`

### Set Camera Types

1. Click the menu (3 dots in top right) then **Configuration**
2. In the left sidebar, click **Cameras**
3. Find **Camera 1 Type** and **Camera 2 Type**
4. Click **Auto Detect** -- PiTrac will identify your cameras
5. If Auto Detect doesn't work, manually select from dropdown:
    - **InnoMaker CAM-MIPI327RAW** (recommended)
    - **Pi Global Shutter Camera** (also common)
6. Set **Lens Choice** to **6mm M12** (standard, unless you're using different lenses)
7. Click **Save Changes** at top right

!!! warning "Restart required"
    Stop and restart PiTrac for camera changes to take effect:

    - Click **Stop** in the header bar
    - Wait for it to fully stop (LM indicator turns red)
    - Click **Start**

!!! note "More details"
    See [Camera Documentation](../hardware/cameras/index.md) for complete camera setup instructions.

---

## Step 4: Correct Lens Distortion

Before calibrating focal length and angles, correct lens distortion. This removes barrel/pincushion warping so every downstream measurement is accurate.

### What You'll Need

- A **printed ChArUco board** from the web UI's **Print Calibration Pattern** button
- A stiff flat backing (foam board, MDF, hardboard) to glue the print to
- Camera 2's IR-pass filter **not installed** (or temporarily removed)

!!! warning "Camera 2 IR-pass filter must be off"
    The ChArUco board is a visible-light pattern. Camera 2's IR-pass filter blocks visible light, so the detector cannot find the board with the filter in place. Either run this step before you install the filter, or unclip `IRFilter_Mount_1inchround` for the duration of the calibration and re-install it afterward. Camera 1 has no IR filter and is not affected.

!!! danger "Print at 100% and keep the board perfectly flat"
    - In the print dialog, set **Scale** to **100%** (or **Actual Size**). Disable "Fit to Page"
    - After printing, measure one black square with a ruler -- it must be **23 mm**
    - Mount the print on a rigid backing with spray adhesive or a glue stick spread across the entire sheet, smoothing out air bubbles. A flexing or curled board will ruin the calibration

### Run the Distortion Calibration

1. Open the **Calibration** page and select the **Lens Distortion** tab
2. Click **Print Calibration Pattern** and print at 100% scale
3. Mount the printed sheet on a stiff flat backing
4. Click **Calibrate Camera 1**
5. Slowly move the board so it appears in every cell of the on-screen 3x3 coverage grid, with a mix of flat-on and tilted poses
6. The system captures 40 good frames automatically and displays an **RMS error** on completion (under 0.6 px is classified Good; above 1.2 px is auto-rejected)
7. Click **Show Undistort Preview** -- straight edges in the scene should stay straight near the frame corners
8. Repeat for **Camera 2**

This is a **one-time-per-lens** step. It persists across reboots and software updates.

!!! note "Full details"
    See [Distortion Correction](../hardware/cameras/distortion-correction.md) for complete instructions, coverage tips, and troubleshooting.

---

## Step 5: Calibrate Cameras

Calibration tells PiTrac the focal length and angles of your cameras. Without this, ball speed and launch angle will be completely wrong.

### What You'll Need

- Ball on tee in your hitting position
- Good lighting (strobes working)
- PiTrac stopped (calibration wizard starts it automatically)

### Run the Calibration Wizard

1. From the web dashboard, click menu then **Calibration**
2. Select **Camera 1** (always start here, it's faster)
3. Click **Next**

### Verify Ball Placement

For Camera 1:

- Click **Check Ball Location** -- should show green checkmark with coordinates
- Click **Capture Still Image** -- verify ball is visible and in focus

??? note "Ball detection failing?"
    - Increase camera gain in Configuration then Cameras then kCamera1Gain (try 8--10)
    - Check lighting
    - Verify ball is actually on the tee
    - Make sure camera is aimed at ball

Once successful, click **Next**.

### Run Calibration

Pick **Auto Calibration** (recommended), then:

- Click **Start Auto Calibration**
- Don't move the ball or cameras
- Don't close the browser
- Watch the progress bar

**Camera 1:** Takes about 30 seconds

**Camera 2:** Takes 90--120 seconds (yes, really -- single-Pi mode requires a background process)

### Check Results

You'll see:

- **Status:** Success or Failed
- **Focal Length:** Should be 800--1200 for 6mm lens
- **Camera Angles:** Should be -20 degrees to +20 degrees

If numbers look way off, try calibrating again. If it keeps failing, check the troubleshooting section below.

Once successful, click **Return to Dashboard**.

### Repeat for Camera 2

Go through the same process for Camera 2. Remember it takes longer (~2 minutes), be patient.

!!! note "Full details"
    See [Auto-Calibration Guide](../hardware/cameras/auto-calibration.md) for complete calibration instructions.

---

## Step 6: Test It Out

Let's verify everything's working.

### Start PiTrac

From the dashboard, click the **Start** button in the header (if not already running).

Watch the status indicators in the header:

- **LM** indicator should turn green (launch monitor is running)
- The status strip on the dashboard should cycle through: Initializing, Waiting for Ball, then Ready to Hit

### Hit a Shot

1. Tee up a ball
2. Take a swing
3. Check the dashboard for shot data

**Expected results:**

| Club | Ball Speed | Launch Angle |
|------|-----------|-------------|
| Driver | 80--120 mph | 8--15 degrees |
| 7-iron | 60--90 mph | 12--20 degrees |

### If Shots Aren't Detecting

**Check lighting:**

- Are strobes firing? (You'll hear them click)
- Adjust camera gain if needed (Configuration then Cameras)

**Check ball detection:**

- Menu then Testing Tools
- Use Testing Tools > Camera 1/2 Still Image to capture a test image from each camera
- Ball should be clearly visible with good contrast

**Check logs:**

- Menu then Logs
- Select "PiTrac Camera 1" from the service dropdown and look for errors

---

## Common Issues

??? note "Cameras Not Detected"
    - Verify CSI cable connections (fully seated, ribbon not twisted)
    - Check boot config: `camera_auto_detect=1`
    - Reboot after connecting cameras
    - Test with the camera list command for your Pi model (see Step 3 above)

??? note "Calibration Fails"
    - **Ball not detected:** Increase gain, improve lighting, check focus
    - **Timeout:** Camera 2 really does take 2+ minutes, wait longer
    - **Wrong results:** Ball moved during calibration? Try again

??? note "Images Too Dark / Too Bright"
    - **Too dark:** Increase camera gain (Configuration then Cameras then kCamera1Gain), check strobe power and connections
    - **Too bright:** Decrease camera gain, reduce strobe intensity if adjustable

??? note "Web Interface Won't Load"
    - Check if service is running: `systemctl status pitrac-web`
    - Start it: `sudo systemctl start pitrac-web`
    - Verify you're using `http://` not `https://`
    - Try IP address instead of hostname

---

## Next Steps

Once you're getting good shot data:

### Configure Your Simulator

Connect PiTrac to E6 Connect, GSPro, or TruGolf:

- **[Simulator Integration Guide](../software/simulator-integration.md)**

### Fine-Tune Settings

Adjust ball detection, gains, and search areas:

- **[Using PiTrac Guide](../software/using-pitrac.md)**

### Troubleshoot Issues

Deep dive into debugging tools and logs:

- **[Troubleshooting Guide](../reference/troubleshooting.md)**

---

## Need Help?

- **Discord:** [Join the PiTrac community](https://discord.gg/j9YWCMFVHN) -- fastest way to get help
- **GitHub Issues:** [Report bugs](https://github.com/PiTracLM/PiTrac/issues)
- **Documentation:** Browse the nav menu for detailed guides on every topic

Most issues are lighting-related or calibration problems. Don't be afraid to recalibrate if something seems off -- it only takes 3 minutes.

Now go hit some balls!
