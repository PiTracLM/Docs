---
title: Distortion Correction
description: Lens distortion calibration for PiTrac cameras using a printed ChArUco board. Live coverage feedback, undistort preview, and one-time-per-lens workflow.
---

# Distortion Correction

Distortion correction removes lens warping (barrel or pincushion) from camera images before the rest of PiTrac's pipeline runs. Straight edges near the frame boundary stay straight, and ball positions measured near the edges stay accurate. You only need to do this once per lens -- the calibration persists across reboots, updates, and config resets.

This is separate from [Auto-Calibration](auto-calibration.md), which determines focal length and camera angles. Run distortion correction **first**, then auto-calibration.

## What Distortion Correction Does

**Calculates**:

- **Camera matrix** -- Intrinsic lens parameters (focal length in pixels, principal point)
- **Distortion coefficients** -- The radial and tangential warp model for your specific lens

**Writes to configuration**:

- Updates `~/.pitrac/config/calibration_data.json` with the camera matrix and distortion coefficients for each camera
- Values are applied at capture time so every downstream step (ball detection, auto-calibration, shot analysis) sees undistorted images

---

## Physical Setup

!!! danger "Camera 2 must not have its IR-pass filter installed"
    The ChArUco board is printed with normal black ink on white paper -- a **visible-light** pattern. Camera 2's IR-pass filter blocks visible light and passes only infrared, so with the filter in place the board will appear as a nearly black frame and the detector cannot find any corners.

    Before distortion-calibrating Camera 2, do **one** of the following:

    - **Calibrate before installing the filter** (recommended). The natural workflow is: assemble cameras and lenses, mount them in the enclosure, run distortion calibration on both cameras, then install the IR-pass filter on Camera 2. See [Camera Stack Module Assembly](../v3-enclosure/assembly.md#camera-stack-module-assembly) -- the filter install step is the last step of that section specifically so it can be deferred.
    - **Temporarily remove the filter** if it is already installed. Unclip `IRFilter_Mount_1inchround`, set the filter somewhere safe, run the calibration, then re-install the filter. Do not bump the lens focus ring during removal/reinstall.

    Camera 1 has no IR-pass filter and is not affected.

!!! danger "Camera 2 must be taken out of sync-sink mode for calibration"
    In normal operation, Camera 2 is configured as a hardware sync sink -- it only captures when Camera 1 triggers it via the XVS sync line. The web UI's distortion calibration runs Camera 2 standalone, so if `sync-sink` is enabled the camera will appear frozen (waiting forever for a trigger that never comes) and no frames will reach the ChArUco detector.

    Before calibrating Camera 2:

    1. **Edit `/boot/firmware/config.txt`** and comment out the sync-sink line:
       ```
       # dtoverlay=imx296,sync-sink
       ```
       (Add a `#` at the start of the line. Leave the file otherwise untouched.)
    2. **Reboot the Pi** -- `dtoverlay` changes only take effect at boot.
    3. **Remove the IR-pass filter** (see the warning above) if it is installed.
    4. **Run the distortion calibration** as described below.
    5. **Uncomment the line** in `/boot/firmware/config.txt` to restore `dtoverlay=imx296,sync-sink`.
    6. **Reboot again** so Camera 2 returns to sync-sink mode for normal shot capture.

    Skipping the reboots will leave the camera in the wrong mode -- the dtoverlay is read once at boot and cannot be toggled at runtime. Camera 1 does not use a sync-sink overlay and does not need this step.

You need a **printed ChArUco calibration board**. PiTrac generates the exact board it expects directly from the web UI -- do not use a board downloaded from elsewhere, as the square count and dimensions must match what the detector looks for.

### 1. Print the Board

1. Open the web dashboard (e.g., `http://raspberrypi.local:8080`).
2. Click menu (3 dots) > **Calibration**.
3. Open the **Lens Distortion** tab.
4. Click **Print Calibration Pattern**. The browser will open a print-ready page with the board.
5. Print it on a single sheet of letter or A4 paper.

!!! danger "Print at 100% -- do NOT use 'Fit to Page' or 'Scale to Fit'"
    Distortion calibration depends on the physical size of each square being exactly what the detector expects. If your printer scales the board by even a few percent, the camera matrix will be wrong and every subsequent step will be skewed.

    In the print dialog, set **Scale** to **100%** (or **Actual Size** / **Custom: 100**). Uncheck any "Fit to printable area" option. After printing, measure one of the black squares with a ruler -- it should be **23 mm** on each side. If it is not, reprint with scaling disabled.

### 2. Mount the Board

A ChArUco board only works if it is perfectly flat. Any curl, bubble, or bend in the paper introduces false "distortion" that the calibration will try to correct for, and the result will be worse than not calibrating at all.

!!! warning "The board must be rigid and perfectly flat"
    - **Glue or tape the printed sheet to a stiff backing.** Foam board, MDF, hardboard, acrylic, or thick cardboard all work. A clipboard works in a pinch.
    - **Use spray adhesive or a glue stick** applied evenly across the entire sheet -- not just the corners -- so the paper cannot lift in the middle.
    - **Smooth out every air bubble** from the center outward. Bubbles are invisible distortion.
    - **Do not laminate** unless the laminate is matte. Glossy surfaces reflect ambient light and can wash out the pattern.
    - **Do not roll or fold the mounted board.** Store it flat.

    If the board flexes when you hold it by one corner, it is not stiff enough. Add a second backing layer.

---

## Running Distortion Calibration (Web UI)

### Step 1: Open the Lens Distortion Tab

1. Navigate to the PiTrac dashboard and click menu (3 dots) > **Calibration**.
2. Select the **Lens Distortion** tab (it is the first tab).
3. Choose which camera to calibrate:
    - **Calibrate Camera 1** -- The teed-ball camera
    - **Calibrate Camera 2** -- The flight camera

Calibrate one camera at a time. Each camera has its own matrix and coefficients.

### Step 2: Start the Capture Loop

Click **Calibrate Camera [N]**. The UI switches to calibration mode and shows:

- **Live camera feed** with detected ChArUco corners overlaid when the board is visible
- **3x3 coverage grid** representing the nine regions of the frame. Each cell fills in as samples accumulate in that region, and counts as covered once it has at least 3 samples.
- **Progress bar** -- tracks captured image count toward the target (40 images)
- **Requirements checklist** -- image count, area coverage, and tilted-angle variety
- **Hint line** -- suggests what to do next (for example, "Move board to the top-left area")

The system captures frames continuously. A frame is only kept if it meets all of these quality gates:

- Sharpness above the blur threshold (so the corners are crisp, not motion-blurred)
- At least one corner is far enough from every edge of the frame
- The pose is sufficiently different from previously kept frames (no near-duplicates)

Frames that fail any gate are silently rejected and do not count toward progress. This is normal -- most frames during hand-held capture are rejected.

### Step 3: Move the Board Through Poses

Hold the board in front of the camera and slowly move it through a variety of positions and angles. The calibration needs:

- **40 good images** (the target image count)
- **Full 3x3 spatial coverage** -- each of the 9 cells must have at least 3 samples before the cell counts as covered
- **A mix of tilted poses** -- at least 40% of captured frames with the board rotated away from the camera plane

**Recommended sweep**:

1. Start with the board **flat-on to the camera**, centered.
2. Translate the board through each of the nine grid regions: center, each edge, each corner.
3. Add **tilt**. Angle the board left, right, up, down, and diagonally. Do each tilt in several different frame regions.
4. Vary the **distance** to the camera.

!!! tip
    - Hold the board with both hands on opposite edges so your fingers do not cover markers.
    - Keep the whole board in frame. A partially-visible board is usable but less informative.

The checklist and hint line tell you what is still missing -- if the top-left cell of the coverage grid stays dark, move the board up and to the left.

### Step 4: Automatic Completion

When all three criteria are satisfied (40+ good images, full coverage, enough tilted poses), the system automatically runs the OpenCV solver and displays:

- **RMS reprojection error** -- Average pixel error of the fitted model. Lower is better. The system classifies the result and enforces a hard reject threshold:
    - **Below 0.4 px** -- Excellent
    - **0.4 to 0.6 px** -- Good
    - **0.6 to 0.9 px** -- Acceptable
    - **0.9 px and above** -- Poor (a warning is logged above 0.7 px; the result still saves)
    - **Above 1.2 px** -- **Automatically rejected.** The calibration will not be saved and you will need to redo it. Common causes: flexing board, wrong print scale, motion blur, poor lighting.
- **Show Undistort Preview** button -- Opens a live preview to verify the result.

!!! warning "During calibration, do NOT:"
    - Bend or flex the board
    - Cover the markers with fingers or glare
    - Switch to a different ChArUco pattern mid-run

To stop early, use the stop control shown on the calibration page.

### Step 5: Verify with the Undistort Preview

Click **Show Undistort Preview**. You will see the live camera feed with toggle modes:

- **Raw** -- The unmodified camera image
- **Undistorted** -- The image after the calibration is applied
- **Side-by-side** -- Both at once for easy comparison

Compare the two views: any straight edges visible in the camera's field of view (the ChArUco board itself, the edge of the hitting area, a ruler held up in front of the camera) should appear straight in the **Undistorted** view and may appear curved near the frame corners in the **Raw** view. How much difference you see depends on how much distortion the lens has; a good 6 mm M12 lens will show a subtle but visible correction near the corners.

If the undistorted image looks *more* warped than the raw image, the calibration is bad. Re-run it -- most often the cause is a board that flexed during capture or was printed at the wrong scale.

---

## When to Recalibrate

**Required**:

- [ ] First time setup of each camera
- [ ] After changing a lens (swapping 6mm for 3.6mm, or replacing a damaged lens)

**Not required**:

- After moving the camera (distortion is a property of the *lens*, not the camera's position -- re-run Auto-Calibration instead)
- After software updates
- After config resets -- the calibration data is preserved
- Periodically "just to be safe" -- it does not drift

---

## Troubleshooting

??? note "No corners detected / board not recognized"

    - **Printed too small or too large.** Measure a square with a ruler -- should be 23 mm. Reprint at 100% scale.
    - **Glossy paper or glossy laminate.** Strong specular reflections hide the black squares. Use matte paper and matte finish.
    - **Focus.** The board may be outside the camera's depth of field at the distance you are holding it. Adjust distance or focus as needed.
    - **Wrong board.** Only use the pattern printed from the **Print Calibration Pattern** button in the UI. Boards downloaded elsewhere have different dimensions and will not be detected.

??? note "Progress stalls -- 3x3 grid will not fill"

    The hint line tells you which region is missing. Common causes:

    - **Top / bottom cells missing**: Your camera is aimed such that those frame regions are above the ceiling or below the floor at comfortable board-holding distance. Step back from the camera so more of the board's working volume is in frame, or tilt the board to project it into those regions.
    - **Corner cells missing**: Tilt the board rather than translating it -- oblique poses naturally reach into the corners.
    - **All cells fill except one**: Slow down in that specific region. Even one accepted frame per cell is enough.

??? note "RMS error is high (rejected above 1.2 px, or classified Poor at 0.9+)"

    - **Flexing board.** The most common cause. Re-mount on a stiffer backing.
    - **Printer scaling.** Measure a square -- must be 23 mm.
    - **Motion blur.** Slow down. If frames are still getting through but the fit is bad, the blur threshold may not be catching subtler blur. Capture in better light.
    - **Not enough tilt.** If every captured frame is near flat-on, the solver cannot separate focal length from distance. Redo with more oblique poses.

??? note "Calibration succeeds but undistort preview looks worse than raw"

    Almost always a bad fit from one of: flexing board, wrong print scale, or too many near-duplicate poses. Re-run on a stiffer, correctly-scaled board with more pose variety. The calibration data will be overwritten on success.

??? note "Capture completes but the result is not saved"

    - Check `~/.pitrac/config/calibration_data.json` -- the camera matrix and distortion coefficients for this camera should be populated.
    - Check the logs (Logs page, or see the [Files and Logs reference](../../reference/files-and-logs.md)) for errors during the save step.

---

## Configuration Files

Distortion calibration writes to `~/.pitrac/config/calibration_data.json`. Each camera gets its own camera matrix and distortion coefficients, alongside the focal length and angles written by Auto-Calibration. You never need to edit these manually.

---

## Next Steps

1. **Distortion calibration** -- This page. Do Camera 1, then Camera 2.
2. **[Auto-Calibration](auto-calibration.md)** -- Determines focal length and camera angles. Requires distortion calibration to be done first for best results.
3. **Verify ball tracking** -- Hit test shots and confirm speeds and angles are in expected ranges.

Good distortion calibration is invisible when it works -- the rest of PiTrac just becomes more accurate, especially near the frame edges where most of the interesting ball physics happens.
