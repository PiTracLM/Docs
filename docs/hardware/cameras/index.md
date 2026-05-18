---
title: Cameras
description: Camera selection, lens options, and dual-camera setup for PiTrac golf launch monitor, covering Sony IMX296 global shutter sensors and configuration.
---

# Camera System

PiTrac uses two Raspberry Pi cameras to track golf balls in 3D. One camera watches the teed ball, the other tracks the ball in flight. Both cameras capture high-speed images synchronized with IR strobes to freeze the ball mid-motion.

## Supported Cameras

### Recommended (Current Generation)

Both recommended cameras use the Sony IMX296 sensor (5.077mm x 3.789mm sensor size, 1456 x 1088 resolution, native 232 fps, global shutter) and work identically once configured. The only difference is color vs monochrome.

**InnoMaker CAM-MIPI327RAW (IMX296 Mono)**, PiTrac type 5

- Monochrome version of the IMX296 sensor
- Slightly better light sensitivity than the color variant
- Requires the `imx296_trigger` tool for synchronization
- Good for low-light setups

**Raspberry Pi Global Shutter Camera (IMX296 Color)**, PiTrac type 4

- Official Raspberry Pi product, widely available
- Sony IMX296 sensor with global shutter (no rolling shutter artifacts)
- Perfect for high-speed ball tracking

!!! tip "Which one should I buy?"
    Either works well. The InnoMaker mono camera has a slight edge in low light. The Pi Global Shutter camera is easier to source. If unsure, get the Pi Global Shutter camera.

### Deprecated (Still Work, Not Recommended)

These older cameras work but are not ideal for ball tracking due to rolling shutter:

| Camera | Sensor | PiTrac Type | Issue |
|--------|--------|:-----------:|-------|
| Pi Camera v1.3 | OV5647 | 1 | Rolling shutter, motion blur |
| Pi Camera v2 | IMX219 | 2 | Rolling shutter, motion blur |
| Pi HQ Camera | IMX477 | 3 | Rolling shutter, expensive, overkill |

If you already have these, they will work. But if buying new, get the Global Shutter camera.

### Not Supported

- **Pi Camera v3** (IMX708). Newer sensor but lacks the high FPS mode needed for ball tracking.

## Lens Options

PiTrac supports standard M12 mount lenses:

**6mm M12 Lens** (Default)

- 60 degree field of view
- Best all-around choice
- Good balance of coverage and detail

**3.6mm M12 Lens** (Wide Angle)

- 90 degree field of view
- Useful for confined spaces
- May need adjusted calibration

**8mm or 12mm M12 Lenses**

- Narrower field of view
- Experimental support
- Check configuration options before buying

!!! note
    The 6mm lens is what most enclosures are designed for. Use it unless you have a specific reason not to.

## Dual Camera Setup

### Camera 1 (Tee Camera)

- Watches the ball at address
- Usually mounted horizontally or slightly angled
- Captures ball at impact and initial flight
- Calibration takes ~30 seconds

### Camera 2 (Flight Camera)

- Positioned at an offset from Camera 1
- Tracks ball during flight
- Provides depth/distance data
- Calibration takes 90-120 seconds (it is a two-process workflow in single-Pi mode)

You can run with just Camera 1 for basic ball speed and launch angle, but you need both cameras for full 3D tracking and spin detection.

## Physical Installation

Cameras mount in the enclosure via:

- CSI ribbon cables to Pi (CAM0 and CAM1 ports)
- 3D printed mounts (see [V3 Enclosure Assembly](../v3-enclosure/assembly/index.md) for STL files)
- Precise positioning is critical. Calibration corrects for small variations, but get as close as you can to the reference design.

!!! warning
    Make sure:

    - Cameras have a clear view of the ball position
    - No obstructions in camera view
    - Cables are not too tight or pulling on connectors
    - Lenses are focused (manual focus ring on M12 lenses)

## Camera Detection

PiTrac auto-detects cameras if your Pi is configured correctly.

Required in `/boot/firmware/config.txt`:

```ini
camera_auto_detect=1
```

Test detection:

```bash
rpicam-hello --list-cameras
```

You should see 2 cameras listed. If not, check connections and boot config.

!!! tip
    The web interface has an **Auto Detect** button that identifies your cameras and sets the correct types automatically. Use it.

### Camera Management via Web Dashboard

All camera management is done through the web dashboard at `http://your-pi-ip:8080`:

- **Configuration > Cameras**: Set camera types, gain, exposure, and lens parameters
- **Auto Detect** button: Identifies connected cameras automatically
- **Testing Tools > Capture Still Image**: Test camera capture and verify images
- **Testing Tools > Ball Detection Test**: Verify ball detection is working

## Configuration

Camera settings are managed in the web interface under **Configuration > Cameras**:

**Critical Settings**:

- **Camera 1 Type / Camera 2 Type**: Must match your actual hardware (use Auto Detect)
- **Lens Choice**: 6mm or 3.6mm
- **Camera Gain**: Controls brightness (higher = brighter but noisier)

**Advanced Settings**:

- Exposure times
- Contrast
- Search center coordinates (where to look for ball)
- Calibration matrices (set by calibration wizard, do not touch manually)

Most settings have good defaults. The main things you will adjust are camera types (once) and gain (as needed for your lighting).

## Calibration

Cameras must be calibrated before PiTrac can accurately measure ball flight. Calibration is done in two stages:

- **[Distortion Correction](distortion-correction.md)**: Removes lens warping using a printed ChArUco board. One-time per lens.
- **[Auto-Calibration](auto-calibration.md)**: Determines focal length and camera angles using a physical rig. Re-run if cameras are moved.

Run distortion correction first, then auto-calibration. Together they take about 5-10 minutes per camera on first setup.

## Troubleshooting

??? note "Cameras not detected?"
    - Check `camera_auto_detect=1` in boot config
    - Verify CSI cable connections
    - Reboot after connecting cameras
    - Try `rpicam-hello --list-cameras` to see what the Pi sees

??? note "Images too dark?"
    - Increase camera gain in Configuration
    - Check strobe power
    - Verify strobes are firing (you will hear them click)

??? note "Images too bright/washed out?"
    - Decrease camera gain
    - Reduce strobe intensity if adjustable

??? note "Ball detection fails?"
    - Check focus (twist M12 lens slightly)
    - Adjust search center coordinates
    - Try different gain settings
    - Make sure ball is actually in frame (use **Testing Tools > Capture Still Image**)

??? note "One camera works, other doesn't?"
    - Verify both camera types are set correctly
    - Camera 2 needs Camera 1 to be working first in single-Pi mode
    - Check if you actually need Camera 2 (some setups work fine with just Camera 1)

## Hardware Considerations

**Lighting**:

- IR strobes are essential for freezing ball motion
- Higher strobe power = better image quality = lower gain needed
- Good lighting >> high camera gain for image quality

**Cables**:

- Use the shortest CSI cables that work for your enclosure
- Longer cables can cause signal degradation

## Next Steps

1. **Install cameras** in enclosure
2. **Test detection** with `rpicam-hello` or the Auto Detect button
3. **Set camera types** in Configuration
4. **Run calibration** wizard ([Auto-Calibration](auto-calibration.md))
5. **Test ball detection** in Testing Tools
6. **Start hitting balls**

!!! warning
    The calibration wizard is the most important step. Do not skip it. Without calibration, speed and angle measurements will be completely wrong.
