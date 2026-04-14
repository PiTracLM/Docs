---
title: Dependencies Management
description: PiTrac library dependencies including OpenCV 4.13, Boost, NCNN, lgpio, libcamera, and the Meson build system.
---

# Dependencies Management

PiTrac relies on several external libraries, some requiring builds from source for compatibility with Raspberry Pi hardware and OS versions.

## Core Dependencies

PiTrac's dependencies as defined in `Software/LMSourceCode/ImageProcessing/meson.build`:

| Dependency | Required Version | Source | Notes |
|------------|-----------------|--------|-------|
| OpenCV | >= 4.9.0 | Built from source (4.13.0) | Debian provides 4.6.0 |
| Boost | >= 1.74.0 | System package | Timer, log, thread, filesystem, regex modules |
| NCNN | Any | Built from source | Neural network inference (YOLO) |
| lgpio | Any | Built/system | Pi 5 GPIO compatibility |
| libcamera | System | System package | Kernel-dependent camera interface |
| yaml-cpp | Any | System package | Configuration parsing |
| fmt | Any | System package | String formatting |
| OpenSSL | Any | System package | Security/encryption |

!!! warning "ActiveMQ-CPP Removed"
    ActiveMQ-CPP is no longer a dependency. It has been removed from both `meson.build` and the build pipeline. Shot results are now sent from `pitrac_lm` to the web server via HTTP POST.

## Artifact Versions

The build system checks for these specific artifact versions in `packaging/build.sh`:

| Artifact | Version | Format |
|----------|---------|--------|
| OpenCV | 4.13.0 | `libopencv4.13_4.13.0-1_arm64.deb` or `opencv-4.13.0-arm64.tar.gz` |
| lgpio | 0.2.2 | `liblgpio1_0.2.2-1_arm64.deb` or `lgpio-0.2.2-arm64.tar.gz` |

## Build-from-Source Dependencies

### OpenCV 4.13.0

Built with the following features for PiTrac:

- DNN support for YOLO models
- TBB for parallelism
- V4L/libcamera support
- Selected modules: core, imgproc, imgcodecs, calib3d, features2d, highgui, videoio, photo, dnn, objdetect

### lgpio 0.2.2

GPIO library built from the joan2937/lg repository. Required for Pi 5 GPIO support.

!!! info "lgpio System vs Custom Packages"
    The build system prefers system lgpio packages when available (e.g., from Raspberry Pi OS repos). Custom packages from `deps-artifacts/` are only used as fallback. This avoids version conflicts between custom packages (0.2.2-1) and system packages (0.2.2-1~rpt1).

### NCNN

Neural network inference framework used for YOLO-based ball detection. Listed as a required dependency in `meson.build` with the `HAS_NCNN` compile definition.

## System Dependencies

Key system packages required for building (installed by `build.sh dev`):

### Build Tools

- `build-essential`, `meson`, `ninja-build`, `pkg-config`, `git`

### Core Libraries

- `libboost-dev`, `libboost-all-dev`
- `libcamera-dev`, `libcamera-tools`
- `libyaml-cpp-dev`, `libfmt-dev`, `libssl-dev`
- `liblgpio-dev`

### Media Libraries

- `libgtk-3-dev`, `libtbb-dev`
- `libgstreamer1.0-dev`, `libgstreamer-plugins-base1.0-dev`
- `libopenexr-dev`
- `libavcodec-dev`, `libavformat-dev`, `libavutil-dev`, `libswscale-dev`, `libavdevice-dev`
- `libexif-dev`, `libjpeg-dev`, `libtiff-dev`, `libpng-dev`

### Display/GUI Libraries

- `libdrm-dev`, `libx11-dev`, `libxext-dev`, `libepoxy-dev`
- `qtbase5-dev`, `qt5-qmake`

### Python Runtime

- `python3`, `python3-pip`, `python3-yaml`, `python3-opencv`, `python3-numpy`

### Python Web Server Dependencies

From `Software/web-server/requirements.txt`:

| Package | Version |
|---------|---------|
| fastapi | 0.120.4 |
| uvicorn[standard] | 0.38.0 |
| python-multipart | 0.0.20 |
| jinja2 | 3.1.6 |
| pillow | 11.3.0 |
| pyyaml | 6.0.3 |
| aiofiles | 25.1.0 |
| websockets | 15.0.1 |
| spidev | >= 3.6 |
| gpiozero | >= 2.0 |

## Build System

### Primary: Meson/Ninja

PiTrac uses Meson as its primary build system:

```bash
cd Software/LMSourceCode/ImageProcessing
meson setup build --buildtype=release
ninja -C build pitrac_lm
```

Key compiler flags set in `meson.build`:

- C++20 standard
- LTO enabled (`b_lto=true`)
- ARM64 optimizations (`-mcpu=cortex-a76`, `-ftree-vectorize`, `-ffast-math`)
- NCNN inference backend enabled (`-DHAS_NCNN`)
- Boost dynamic logging (`-DBOOST_LOG_DYN_LINK`)

### Package Building

```bash
cd packaging
./build.sh build               # Build PiTrac binary
./build-apt-package.sh         # Create .deb package
```

## Platform Differences

### Architecture Support

| Architecture | Support Level |
|-------------|---------------|
| ARM64 (aarch64) | Primary target |
| x86_64 | Development (cross-compilation) |

## Dependency Resolution

### PKG-Config

After installation, libraries should be discoverable:

```bash
export PKG_CONFIG_PATH="/usr/lib/aarch64-linux-gnu/pkgconfig:/usr/lib/pkgconfig:/usr/share/pkgconfig"
pkg-config --modversion opencv4    # Should show 4.13.0
```

### Library Loading

Runtime library path setup:

```bash
export LD_LIBRARY_PATH="/usr/lib/aarch64-linux-gnu:/usr/lib/pitrac"
ldd /usr/lib/pitrac/pitrac_lm    # Verify library linking
```

## Troubleshooting

### OpenCV Not Found

```bash
# Check installation
pkg-config --modversion opencv4

# Verify DEB package
dpkg -l | grep libopencv

# Check if using tarball installation
ls /opt/opencv/ 2>/dev/null
```

### Missing Dependencies

```bash
# Meson will report what's missing
meson setup build    # Shows dependency errors

# Debug library loading
LD_DEBUG=libs ./pitrac_lm 2>&1 | head -20
```

### Build Failures

```bash
# Clean rebuild
rm -rf build
meson setup build --buildtype=release

# Or use the build script
sudo ./build.sh dev force
```

### lgpio Conflicts

If you see conflicts between custom and system lgpio packages:

```bash
# Remove custom package
sudo dpkg --remove --force-depends liblgpio1

# Install system package
sudo apt install liblgpio-dev
```

The `build.sh dev` script handles this automatically.

## Summary

| Library | Version | Source |
|---------|---------|--------|
| OpenCV | 4.13.0 | Built from source / DEB |
| Boost | >= 1.74.0 | System package |
| NCNN | Latest | Built from source |
| lgpio | 0.2.2 | System or built |
| libcamera | System | System package |
| yaml-cpp | System | System package |
| fmt | System | System package |
| OpenSSL | System | System package |
