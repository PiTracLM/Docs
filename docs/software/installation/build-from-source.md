---
title: Build from Source
description: Build PiTrac from source on Raspberry Pi using build.sh dev, which installs dependencies, compiles the C++ binary, and sets up the FastAPI web server.
---

# Build PiTrac from Source

Building from source is the current recommended installation method. It is ideal for development or if you want the latest features.

**Time required:** 10--20 minutes on a Pi 5 (first installation, network-dependent)

**Difficulty:** Intermediate (script-automated, but requires command line comfort)

---

## Prerequisites

Before starting, ensure you have:

- **Raspberry Pi 5 with 8GB RAM**
- **Raspberry Pi OS 64-bit** installed (Trixie / Debian 13)
    - See [Pi Setup Guide](../pi-setup/index.md) if not installed
- **Active internet connection** for downloading packages
- **Sudo privileges** on your Pi
- **At least 5GB free disk space** (10GB recommended)

!!! warning "Important"
    You must complete [Raspberry Pi Setup](../pi-setup/index.md) before proceeding. The Pi must have OS installed, be updated, and have network access.

---

## Overview

The build process automatically:

- Installs all required system dependencies (~80+ packages)
- Installs pre-built libraries (OpenCV, lgpio)
- Compiles the PiTrac C++ binary
- Installs the Python web server and all dependencies
- Sets up libcamera for the two Pi cameras
- Creates user directories and configuration files

---

## Step 1: Clone the Repository

Clone the PiTrac repository using HTTPS:

```bash
git clone https://github.com/PiTracLM/PiTrac.git
cd PiTrac
```

!!! note "SSH alternative"
    We use HTTPS instead of SSH to avoid requiring SSH key setup. Contributors can switch to SSH after cloning: `git remote set-url origin git@github.com:PiTracLM/PiTrac.git`

---

## Step 2: Run the Developer Build

Navigate to the packaging directory and run the developer installation:

```bash
cd packaging
sudo ./build.sh dev
```

!!! warning "Important"
    You must use `sudo` as the script installs system packages and configures services.

!!! info "First install modifies your boot config -- reboot when it finishes"
    On the first run, the script edits `/boot/firmware/config.txt` to enable SPI and the camera overlays PiTrac needs. A timestamped backup is saved alongside it (`config.txt.pitrac.backup.<timestamp>`) if you ever need to revert.

    **Reboot after the script finishes** so the boot config changes take effect. Cameras will not be detected until you do.

---

## What Happens During Installation

The `build.sh dev` script performs these steps automatically:

### 1. Platform Validation

- Verifies you're running on a Raspberry Pi
- Checks for sudo privileges
- Regenerates the Bashly CLI tool

### 2. System Configuration

- Fixes known Pi OS issues (initramfs configuration bug on recent images)
- Repairs any broken package states
- Prepares the system for installation

### 3. Dependency Installation

**System packages installed** (~80+ packages):

- Build tools: `build-essential`, `meson`, `ninja-build`, `pkg-config`
- Boost libraries: `libboost-dev`, `libboost-all-dev`
- Camera libraries: `libcamera-dev`, `libcamera-tools`, `rpicam-apps`
- Video processing: FFmpeg libraries (`libavcodec-dev`, `libavformat-dev`, etc.), image libraries (JPEG, PNG, TIFF, OpenEXR)
- Display/GUI: `libgtk-3-dev`, `qtbase5-dev`, `libdrm-dev`, `libepoxy-dev`
- Core libraries: `libfmt-dev`, `libssl-dev`, `libyaml-cpp-dev`
- Python: `python3`, `python3-pip`, `python3-yaml`, `python3-opencv`, `python3-numpy`
- Configuration tools: `yq` (YAML query tool)

**Pre-built dependencies installed**:

These are installed either from the PiTrac APT repository or from local packages in `packaging/deps-artifacts/`:

| Library | Version | Purpose |
|---|---|---|
| OpenCV | 4.13.0 | Computer vision (Debian only has 4.6.0) |
| lgpio | 0.2.2 | GPIO library for Pi 5 |

!!! note "Why pre-built?"
    Building OpenCV from source takes 45--60 minutes. Pre-built packages are provided so you don't have to wait. The build script tries the PiTrac APT repository first, then falls back to local packages.

### 4. Build PiTrac Binary

The script compiles the C++ launch monitor binary:

- Sets up proper build environment with library paths
- Applies Boost C++20 compatibility fix
- Detects stale builds and cleans if necessary
- Runs Meson build system with Ninja
- Compiles only changed files (incremental build)

**Build times**:

- **Total first install**: 10--20 minutes (all dependencies + services + build)
- **PiTrac binary build**: 2--5 minutes
- **Incremental rebuild**: 30 seconds -- 2 minutes
- **Clean rebuild** (with `force` flag): 2--5 minutes

### 5. Installation

**Binaries and tools**:

- `/usr/lib/pitrac/pitrac_lm` -- Main launch monitor binary
- `/usr/lib/pitrac/ImageProcessing/CameraTools/` -- Camera utilities and scripts

**Configuration**:

- `/etc/pitrac/models/` -- NCNN AI models for ball detection
- `/usr/lib/pitrac/web-server/configurations.json` -- Configuration metadata (283 settings)

**Test resources**:

- `/usr/share/pitrac/test-images/` -- Sample test images (teed-ball.png, strobed.png)
- `/usr/share/pitrac/test-suites/` -- Automated test suites

**User directories**:

- `~/.pitrac/config/` -- User configuration and calibration data
    - `user_settings.json` -- Your configuration overrides
    - `calibration_data.json` -- Camera calibration results (focal lengths, angles)
    - `generated_golf_sim_config.json` -- Merged runtime configuration
- `~/.pitrac/state/` -- Runtime state
- `~/.pitrac/logs/` -- Application logs
- `~/.pitrac/run/` -- PID files for process management
- `~/LM_Shares/Images/` -- Captured images from shots
- `~/LM_Shares/WebShare/` -- Web-accessible data

### 6. Camera Configuration

The script configures libcamera for the two Pi cameras:

- Copies IMX296 NOIR sensor files
- Creates `rpi_apps.yaml` with an extended camera timeout
- Sets `LIBCAMERA_RPI_CONFIG_FILE` environment variable
- Configures camera detection in boot config

### 7. Python Web Server Installation

The FastAPI-based web dashboard is installed:

- Copies web server code to `/usr/lib/pitrac/web-server/`
- Installs Python dependencies from `requirements.txt`:
    - `fastapi` -- Modern web framework
    - `uvicorn` -- ASGI server
    - `python-multipart` -- Form data handling
    - `jinja2` -- HTML templating
    - `pillow` -- Image processing
    - `pyyaml` -- YAML configuration
    - `aiofiles` -- Async file operations
    - `websockets` -- Real-time communication
    - `spidev` -- SPI interface
    - `gpiozero` -- GPIO control
- Configures `pitrac-web.service` as a systemd service
- Restarts the service if it was already running

### 8. Service Configuration

The script sets up the systemd service:

- **pitrac-web.service** -- Web dashboard (system service using `DynamicUser=yes`)

!!! note
    There is no `pitrac.service`. The launch monitor process is controlled through the web interface Start/Stop buttons.

### 9. Cleanup and Verification

- Cleans up any stale PiTrac processes and PID files
- Resets GPIO resources
- Reloads systemd daemon
- Updates shared library cache (`ldconfig`)
- Displays installation summary with access URL

---

## Installation Output

During installation, you will see progress like this:

```
[INFO] PiTrac Development Build - Direct Pi Installation
[INFO] Regenerating pitrac CLI tool...
[OK]   Regenerated pitrac CLI tool
[INFO] Checking build dependencies...
[INFO] Installing missing dependencies...
[INFO] Installing pre-built dependencies...
[OK]   Dependencies installed from APT repository
[INFO] Building PiTrac...
[INFO] Configuring build with Meson...
[INFO] Building with Ninja...
[OK]   Build successful!
[INFO] Installing PiTrac binary...
[INFO] Installing CLI tool...
[INFO] Installing/Updating PiTrac web server...
[OK]   Web server updated
[OK]   Development build complete!

PiTrac has been installed to system locations:
  Binary: /usr/lib/pitrac/pitrac_lm
  CLI: /usr/bin/pitrac (regenerated)
  Libraries: /usr/lib/pitrac/
  Configs: /etc/pitrac/
  Web Server: /usr/lib/pitrac/web-server (updated)

Web server status:
  Web service is running
  Access dashboard at: http://192.168.1.100:8080
  Use the Start/Stop buttons in the dashboard to control PiTrac
```

---

## Step 3: Verify Installation

After installation completes, verify everything is working:

### Check Service Status

```bash
# Check the web service status
systemctl status pitrac-web
```

**Expected output**: `pitrac-web.service` -- **active (running)** or **inactive** (can start manually)

### Test Camera Detection

```bash
rpicam-hello --list-cameras
```

Should list 2 cameras if both are connected.

### Access the Web Dashboard

Open a browser and navigate to:

```
http://[YOUR_PI_IP]:8080
```

To find your Pi's IP address:

```bash
hostname -I
```

The web dashboard URL is also shown at the end of the installation output.

---

## Next Steps

**Installation complete!**

**Continue to:**

- **[First Use Guide](first-use.md)** -- Access web dashboard and start PiTrac

**Or:**

- **[Troubleshooting](troubleshooting.md)** -- If you encountered errors

**Return to:**

- **[Installation Overview](index.md)**

---

## Build Modes Reference

The `build.sh` script supports multiple modes:

| Mode | Command | Description |
|---|---|---|
| Developer install | `sudo ./build.sh dev` | Build and install on Pi (recommended) |
| Force clean rebuild | `sudo ./build.sh dev force` | Delete build artifacts and rebuild from scratch |
| Build dependencies | `sudo ./build.sh deps` | Build dependency artifacts (Docker-based, for maintainers) |
| Build PiTrac only | `sudo ./build.sh build` | Build PiTrac binary only (Docker-based) |
| Build everything | `sudo ./build.sh all` | Build deps then PiTrac (Docker-based) |
| Interactive shell | `sudo ./build.sh shell` | Open interactive shell with artifacts (Docker-based) |
| Clean artifacts | `sudo ./build.sh clean` | Remove all build artifacts and Docker images |

!!! note
    The `deps`, `build`, `all`, and `shell` modes use Docker for cross-compilation and are primarily used by maintainers. Most users should use `dev` mode, which builds directly on the Pi.

For more details, see [Managing PiTrac](managing.md).
