---
title: Troubleshooting
description: Fix common PiTrac installation issues including build failures, web service errors, camera detection problems, shot detection, and performance tuning.
---

# Installation Troubleshooting

Solutions to common issues encountered during and after PiTrac installation.

---

## Build Issues

??? note "Build Fails with Missing Artifacts"

    **Symptom**: Build script reports missing pre-built artifacts

    **Solution**:
    ```bash
    cd ~/PiTrac/packaging
    git lfs pull
    sudo ./build.sh dev
    ```

    **Why it happens**: Pre-built dependencies (OpenCV, lgpio, etc.) are stored using Git LFS. If Git LFS wasn't installed when you cloned, these files won't be downloaded.

    **Prevention**:
    ```bash
    # Install Git LFS before cloning
    sudo apt install git-lfs
    git lfs install
    ```

??? note "Build Errors with Dependencies"

    **Symptom**: Compilation fails with missing headers or libraries

    **Solution**:
    ```bash
    # Ensure all system dependencies are installed
    cd ~/PiTrac/packaging
    sudo apt update

    # Then force a clean rebuild
    sudo ./build.sh dev force
    ```

    **Common missing dependencies**:

    - `build-essential` -- C++ compiler
    - `meson`, `ninja-build` -- Build tools
    - `pkg-config` -- Library detection
    - `libboost-dev`, `libboost-all-dev` -- Boost libraries

??? note "Insufficient Disk Space"

    **Symptom**: Build fails with "No space left on device"

    **Check disk space**:
    ```bash
    df -h
    ```

    **Solution** (need at least 5GB free, 10GB recommended):
    ```bash
    # Free up space
    sudo apt clean
    sudo apt autoremove

    # Remove old logs
    rm ~/.pitrac/logs/*.log.old

    # Move images to external storage
    mv ~/LM_Shares/Images/ /mnt/external/
    ```

??? note "Build Hangs or Takes Too Long"

    **Symptom**: Build appears stuck or takes more than 30 minutes

    **Possible causes**:

    1. Building OpenCV from source instead of using pre-built (60+ minutes)
    2. Low memory causing swapping
    3. Network issues downloading packages

    **Solution**:
    ```bash
    # Verify pre-built artifacts exist
    ls -lh packaging/deps-artifacts/

    # Check memory usage
    free -h

    # If low memory, increase swap
    sudo dphys-swapfile swapoff
    sudo nano /etc/dphys-swapfile
    # Set CONF_SWAPSIZE=2048
    sudo dphys-swapfile setup
    sudo dphys-swapfile swapon
    ```

??? note "Stale Build Directory"

    **Symptom**: Linker errors or library not found errors after switching between dependency installation methods

    **Why it happens**: If the build directory was created with dependencies installed to `/opt/` (tarball extraction), switching to DEB packages (which install to `/usr/`) leaves stale cached paths in the build system.

    **Solution**:
    ```bash
    cd ~/PiTrac/packaging
    sudo ./build.sh dev force
    ```

    The `force` flag deletes the build directory and reconfigures from scratch. The build script also auto-detects this condition and cleans automatically in most cases.

---

## Service Issues

??? note "Web Server Won't Start"

    **Symptom**: Web service fails to start or shows inactive

    **Diagnosis**:
    ```bash
    systemctl status pitrac-web
    journalctl -u pitrac-web -n 50
    ```

    **Common causes and solutions**:

    **1. Python dependencies not installed**
    ```bash
    cd /usr/lib/pitrac/web-server
    sudo pip3 install -r requirements.txt --break-system-packages
    sudo systemctl restart pitrac-web
    ```

    **2. Port 8080 already in use**
    ```bash
    # Check what's using port 8080
    sudo ss -tlnp | grep 8080

    # Kill the process or change PiTrac port
    # (Edit /usr/lib/pitrac/web-server/main.py to change port)
    ```

    **3. File permissions**
    ```bash
    # The service uses DynamicUser=yes, so file permission issues
    # are usually related to the web server directory
    ls -la /usr/lib/pitrac/web-server/
    sudo systemctl restart pitrac-web
    ```

??? note "PiTrac Process Won't Start"

    **Symptom**: Click "Start" in web interface but process stays stopped

    **Check logs**:
    ```bash
    tail -f ~/.pitrac/logs/pitrac.log
    ```

    **Common causes**:

    **1. Cameras not detected**

    ```bash
    rpicam-hello --list-cameras
    ```

    Should show 2 cameras.

    **2. Configuration file errors**
    ```bash
    # Check configuration exists
    ls -l ~/.pitrac/config/

    # Regenerate configuration through web interface
    # Or manually:
    rm ~/.pitrac/config/generated_golf_sim_config.json
    # Restart web server to regenerate
    sudo systemctl restart pitrac-web
    ```

    **3. Binary permissions**
    ```bash
    # Ensure binary is executable
    sudo chmod +x /usr/lib/pitrac/pitrac_lm

    # Test manually
    /usr/lib/pitrac/pitrac_lm --logging_level=debug
    ```

    **4. Stale PID files**
    ```bash
    # Remove old PID files
    rm -f ~/.pitrac/run/*.pid
    rm -f ~/.pitrac/run/*.lock
    ```

---

## Camera Issues

??? note "Camera Not Detected"

    **Symptom**: `rpicam-hello --list-cameras` shows no cameras or error

    **Check boot configuration**:

    ```bash
    cat /boot/firmware/config.txt | grep camera
    ```

    **Should have**: `camera_auto_detect=1`

    **If missing, add it**:

    ```bash
    sudo nano /boot/firmware/config.txt
    # Add: camera_auto_detect=1
    sudo reboot now
    ```

    **Verify ribbon cable connection**:

    - Power off Pi
    - Check cable is fully inserted in both camera and Pi
    - Check cable orientation (blue side up for most cameras)
    - Check for damage to cable or connectors

    **Check libcamera environment**:
    ```bash
    echo $LIBCAMERA_RPI_CONFIG_FILE
    ```

    Should point to: `/usr/share/libcamera/pipeline/rpi/pisp/rpi_apps.yaml`

??? note "Only One Camera Detected"

    **Symptom**: `rpicam-hello --list-cameras` shows 1 camera instead of 2

    **Check both ribbon cables**:

    - Verify both cameras are connected
    - Check both CSI ports on the Pi
    - Ensure both cables are secure

    **Identify which camera is missing**:

    ```bash
    rpicam-hello --list-cameras
    # Shows camera IDs and ports

    # Try each camera individually
    rpicam-hello --camera 0
    rpicam-hello --camera 1
    ```

    **Hardware checks**:

    - Swap ribbon cables between cameras
    - Test suspected bad camera on known-good port
    - Try different ribbon cable

??? note "Camera Images Too Dark/Bright"

    **Symptom**: Captured images are unusable due to exposure

    **Solution**: Adjust camera settings in web interface

    - Navigate to Configuration > Camera Settings
    - Adjust "Gain" or "Exposure Time"
    - For darker images: Increase gain (try 8--12)
    - For brighter images: Decrease gain (try 2--4)
    - Test with "Hardware Test" > "Capture Still Image"

    **Lighting considerations**:

    - IR strobes may need adjustment
    - Avoid direct sunlight or bright windows
    - Consistent indoor lighting works best

---

## Web Interface Issues

??? note "Cannot Access Web Interface"

    **Symptom**: Browser can't connect to `http://raspberrypi.local:8080`

    **1. Verify web server is running**:
    ```bash
    systemctl status pitrac-web
    # Should show "active (running)"
    ```

    **2. Check firewall isn't blocking port 8080**:
    ```bash
    sudo ufw status
    # If active, allow port 8080:
    sudo ufw allow 8080
    ```

    **3. Confirm correct IP address**:
    ```bash
    hostname -I
    # Note the IP (e.g., 192.168.1.100)

    # Try accessing with IP instead of hostname
    # http://192.168.1.100:8080
    ```

    **4. Test locally on the Pi**:
    ```bash
    curl http://localhost:8080
    # Should return HTML
    ```

    **5. Check Pi is on same network**:
    ```bash
    # From your computer, ping the Pi
    ping raspberrypi.local

    # Or use IP address
    ping 192.168.1.100
    ```

??? note "Web Interface Loads But Shows Errors"

    **Symptom**: Page loads but displays connection errors or missing data

    **Check WebSocket connection**:

    - Open browser developer console (F12)
    - Look for WebSocket errors
    - Verify WebSocket status indicator in UI

    **Clear browser cache**:

    Hard refresh: ++ctrl+shift+r++ (or ++cmd+shift+r++ on Mac)

    **Check web server logs**:
    ```bash
    journalctl -u pitrac-web -n 100
    # Look for Python errors or stack traces
    ```

??? note "Configuration Changes Don't Take Effect"

    **Symptom**: Changes in web interface don't affect PiTrac behavior

    **Solution**:

    1. Some settings require PiTrac restart
    2. Look for "Restart Required" indicator in UI
    3. Stop and restart PiTrac process through web interface

    **If still not working**:
    ```bash
    # Check configuration was saved
    cat ~/.pitrac/config/user_settings.json

    # Verify generated config was updated
    cat ~/.pitrac/config/generated_golf_sim_config.json

    # Restart web server
    sudo systemctl restart pitrac-web
    ```

---

## Shot Detection Issues

??? note "No Shot Data Appearing"

    **Symptom**: Hit shots but no data appears in web interface

    **Checklist**:

    - [ ] PiTrac process is running (check status indicator)
    - [ ] Both cameras show "Connected"
    - [ ] Ball is visible in camera views
    - [ ] IR strobes are firing (should see brief flashes)
    - [ ] Ball is on tee in expected location

    **Test ball detection**:

    1. Navigate to Testing Tools
    2. Run "Ball Detection Test"
    3. Review results and adjust sensitivity if needed

    **Check logs for clues**:
    ```bash
    tail -f ~/.pitrac/logs/pitrac.log
    # Look for:
    # - Camera errors
    # - Ball detection failures
    # - Processing errors
    ```

??? note "Inaccurate Shot Data"

    **Symptom**: Shot data seems wrong (speed too high/low, angles off)

    **Calibration needed**:

    1. Run Calibration Wizard in web interface
    2. Verify camera positions haven't moved
    3. Check calibration data: `cat ~/.pitrac/config/calibration_data.json`

    **Environmental factors**:

    - Lighting changes (time of day, room lights)
    - Camera position shifted
    - Ball type changed (different size/reflectivity)
    - Net or objects in camera view

    **Detection method**:

    - Try different detection method (HoughCircles vs YOLO)
    - Adjust detection sensitivity in Configuration

---

## System Performance Issues

??? note "High CPU Usage"

    **Check what's using CPU**:
    ```bash
    top
    # Look for pitrac_lm, python3, or other processes
    ```

    **Common causes**:

    - Multiple PiTrac instances running
    - Detection method too intensive
    - Logging level set too high (debug)

    **Solutions**:
    ```bash
    # Kill extra processes
    pkill -f pitrac_lm

    # Reduce logging verbosity in Configuration (via web dashboard)
    # Switch to lighter detection method (HoughCircles)
    ```

??? note "High Memory Usage"

    **Check memory**:
    ```bash
    free -h
    ```

    **If low on memory**:
    ```bash
    # Increase swap space
    sudo dphys-swapfile swapoff
    sudo nano /etc/dphys-swapfile
    # Set CONF_SWAPSIZE=2048
    sudo dphys-swapfile setup
    sudo dphys-swapfile swapon
    ```

    **Consider**:

    - Upgrade to Pi 5 with 8GB RAM
    - Reduce image resolution in Configuration
    - Use lighter detection method

??? note "System Feels Slow"

    **Check temperature**:
    ```bash
    vcgencmd measure_temp
    # Should be < 80 degrees C
    ```

    **If overheating**:

    - Ensure proper ventilation
    - Add heatsinks or fan
    - Reduce processing load

    **Check disk I/O**:
    ```bash
    iostat -x 2
    # High %util means disk bottleneck
    ```

    **Consider**:

    - Upgrade to NVMe SSD (Pi 5)
    - Use faster SD card (A2 class)
    - Reduce image saving frequency

---

## Getting Additional Help

If you're still experiencing issues:

**1. Check logs**:

```bash
# PiTrac process logs
tail -f ~/.pitrac/logs/pitrac.log

# Web server logs
journalctl -u pitrac-web -f

# System logs
dmesg | tail -n 50
```

**2. Check web server status**:

```bash
systemctl status pitrac-web
```

**3. Gather system information**:

```bash
# OS version
cat /etc/os-release

# Architecture (should be aarch64)
uname -m

# Disk space
df -h

# Memory
free -h

# Camera detection (Pi 5)
rpicam-hello --list-cameras
```

**4. Get help from the community**:

- **[Discord Community](https://discord.gg/j9YWCMFVHN)** -- Active community support
- **[GitHub Issues](https://github.com/PiTracLM/PiTrac/issues)** -- Report bugs or request features
- **[General Troubleshooting](../../reference/troubleshooting.md)** -- Broader system issues

**When asking for help, include**:

- What you were trying to do
- What happened instead
- Error messages from logs
- System information (Pi model, OS version, architecture)
- Steps you've already tried

---

## Return To

- **[Installation Overview](index.md)**
- **[First Use Guide](first-use.md)**
- **[Managing PiTrac](managing.md)**
