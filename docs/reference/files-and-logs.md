---
title: Files and Logs Reference
description: Canonical reference for where PiTrac stores logs, configuration, shot images, binaries, and runtime state. Useful for troubleshooting, backups, and system administration.
---

# Files and Logs Reference

Where PiTrac puts things. Use this when you are troubleshooting, collecting logs to share, backing up your setup, or cleaning up after an install.

## Logs

| What | Where | How to view |
|------|-------|-------------|
| PiTrac process log (the `pitrac_lm` binary) | `~/.pitrac/logs/pitrac.log` | `tail -f ~/.pitrac/logs/pitrac.log`, or the web UI **Logs** page (select **PiTrac Camera 1**) |
| Web server log | systemd journal for the `pitrac-web` unit | `journalctl -u pitrac-web -f`, or the web UI **Logs** page (select **PiTrac Web Server**) |
| Kernel / hardware log | kernel ring buffer | `dmesg` |
| Build output from the **System Update** page | kept in memory during the update (not on disk) | Visible on the Update page while the build is running |

The web UI **Logs** page streams the PiTrac process log and the web server journal live. If you just need to copy errors to a bug report, that is usually the easiest place to grab them.

## Configuration (per-user)

These files live under `~/.pitrac/` and are specific to the user that runs PiTrac.

| File | Purpose |
|------|---------|
| `~/.pitrac/config/user_settings.json` | Sparse user overrides. Written by the web UI **Configuration** page. |
| `~/.pitrac/config/calibration_data.json` | Camera matrix, distortion coefficients, focal length, and camera angles. Written by the web UI **Calibration** page. |
| `~/.pitrac/config/generated_golf_sim_config.json` | Merged runtime configuration (defaults + user overrides + calibration results). This is the file the `pitrac_lm` binary actually reads. Regenerated automatically; do not edit by hand. |

To back up your entire PiTrac setup, copy `~/.pitrac/config/` and `~/LM_Shares/`.

## Runtime state (per-user)

| Location | Purpose |
|----------|---------|
| `~/.pitrac/state/` | Transient runtime state written by the launch monitor |
| `~/.pitrac/run/` | PID files for process management |
| `~/.pitrac/logs/` | Log output (see the Logs section above) |

## Captured images

| Location | Purpose |
|----------|---------|
| `~/LM_Shares/Images/` | Raw shot captures and diagnostic images from the pipeline |
| `~/LM_Shares/Images/distortion_calibration/` | Frames captured during [Distortion Correction](../hardware/cameras/distortion-correction.md) |
| `~/LM_Shares/WebShare/` | Images exposed to the web dashboard |
| `~/LM_Shares/TestImages/` | Output from **Testing Tools > Camera N Still Image** |

## Installed locations (system-wide)

These are created by `sudo ./build.sh dev`:

| Path | Purpose |
|------|---------|
| `/usr/lib/pitrac/pitrac_lm` | The launch monitor binary |
| `/usr/lib/pitrac/` | Shared libraries (also `LD_LIBRARY_PATH` and `PITRAC_ROOT` at runtime) |
| `/usr/bin/pitrac` | Command-line wrapper (Bashly-generated) |
| `/usr/share/pitrac/` | Read-only shared assets (templates, test images, test suites, calibration assets, webapp) |
| `/etc/pitrac/models/` | AI models for ball detection and spin prediction |
| `/etc/pitrac/environment` | Build context (repo path, build script, build user, last build time) used by the **System Update** page |
| `/etc/pitrac/update-status.json` | Transient status file the update manager writes across service restarts |
| `/etc/systemd/system/pitrac-web.service` | systemd unit for the web server |
| `/etc/sudoers.d/pitrac-update` | Passwordless sudo rule that lets the **System Update** page run `build.sh dev` |

## libcamera tuning

`build.sh dev` copies IMX296 sensor tunings and sets an extended camera timeout in the libcamera config for your platform:

| Pi model | File |
|----------|------|
| Pi 5 (PiSP ISP) | `/usr/share/libcamera/pipeline/rpi/pisp/rpi_apps.yaml` |
| Older Pis (VC4 ISP) | `/usr/share/libcamera/pipeline/rpi/vc4/rpi_apps.yaml` |

The script also writes `LIBCAMERA_RPI_CONFIG_FILE` into `/etc/environment` so the binary picks up the right tuning file.

## Boot configuration

`build.sh dev` edits `/boot/firmware/config.txt` (or `/boot/config.txt` on older systems) to enable SPI and the IMX296 camera overlay. A timestamped backup is written to `config.txt.pitrac.backup.<timestamp>` before any changes. To revert, restore from that backup and reboot.

## Quick commands

```bash
# Tail the PiTrac process log
tail -f ~/.pitrac/logs/pitrac.log

# Tail the web server log
journalctl -u pitrac-web -f

# Check web server status
systemctl status pitrac-web

# See recent kernel messages (e.g., USB/camera enumeration)
dmesg | tail -n 50

# Confirm both cameras are detected
rpicam-hello --list-cameras
```

## Collecting logs for a bug report

When filing an issue, please include:

```bash
# Last 200 lines of the PiTrac process log
tail -n 200 ~/.pitrac/logs/pitrac.log

# Last 200 lines of the web server log
journalctl -u pitrac-web -n 200 --no-pager

# Your current configuration overrides (sparse)
cat ~/.pitrac/config/user_settings.json

# Your calibration data
cat ~/.pitrac/config/calibration_data.json

# OS and architecture
cat /etc/os-release
uname -m
```

Do not paste `generated_golf_sim_config.json` -- it is large and regenerated from the other files.
