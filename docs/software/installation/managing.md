---
title: Managing PiTrac
description: Complete guide to managing PiTrac including the web dashboard, service management, file locations, updating software, and development workflows.
---

# Managing PiTrac

Everything you need to know about managing, updating, and maintaining your PiTrac installation.

---

## Web Server Management

The web server is the single entry point for all PiTrac interaction. It is managed as a systemd service:

```bash
# Start the web server
sudo systemctl start pitrac-web

# Stop the web server
sudo systemctl stop pitrac-web

# Restart the web server
sudo systemctl restart pitrac-web

# Check status
systemctl status pitrac-web

# Enable auto-start on boot
sudo systemctl enable pitrac-web

# View web server logs
journalctl -u pitrac-web -f
```

Access the dashboard at `http://your-pi-ip:8080`.

## Launch Monitor Control

!!! warning "Important"
    The PiTrac launch monitor process is NOT a systemd service. It is controlled entirely through the web interface.

**From the web dashboard**:

- Click the **Start** / **Stop** / **Restart** buttons in the header bar (or dropdown menu on mobile)
- Monitor the **LM** status indicator in the header (green = running, red = stopped)

## System Status

Check system status through the web dashboard:

- **Status indicators** in the header show WebSocket connection (**WS**) and launch monitor process (**LM**) status
- The **LM** indicator is green when PiTrac is running, red when stopped

To check the web service itself from the command line:

```bash
systemctl status pitrac-web
```

## Camera Management

Camera configuration and testing are done through the web dashboard:

- **Configuration > Cameras** -- Set camera types, gain, exposure, and lens parameters
- **Auto Detect** button -- Identifies connected cameras automatically
- **Testing Tools > Camera 1 Still Image / Camera 2 Still Image** -- Test camera capture
- **Testing Tools > Camera 1 Ball Location / Camera 2 Ball Location** -- Verify ball detection

To verify cameras are detected at the OS level:

=== "Pi 5"

    ```bash
    rpicam-hello --list-cameras
    ```

=== "Pi 4"

    ```bash
    libcamera-hello --list-cameras
    ```

## Calibration

Run calibration through the web dashboard:

- Click the **3-dot menu** then **Calibration**
- Follow the 4-step calibration wizard
- Supports both auto and manual calibration modes

## Log Viewing

View logs through the web dashboard:

- Click the **3-dot menu** then **Logging**
- View logs for PiTrac Camera 1 and PiTrac Web Server
- Pause/resume streaming, clear display, download logs for offline analysis

To view web server logs from the command line:

```bash
journalctl -u pitrac-web -f
```

---

## File Locations

Understanding where PiTrac stores its files helps with troubleshooting and maintenance.

### Binaries

**Installed executables**:

| Path | Description |
|---|---|
| `/usr/lib/pitrac/pitrac_lm` | Launch monitor binary (C++ application) |
| `/usr/lib/pitrac/web-server/` | Python web application (FastAPI) |

**Camera tools**:

| Path | Description |
|---|---|
| `/usr/lib/pitrac/ImageProcessing/CameraTools/` | Camera utilities and calibration scripts |

### Configuration

**System-wide**:

| Path | Description |
|---|---|
| `/etc/pitrac/` | System configuration directory |
| `/etc/pitrac/models/` | NCNN AI models for ball detection |

**User configuration** (these are YOUR settings):

| Path | Description |
|---|---|
| `~/.pitrac/config/user_settings.json` | Your configuration overrides |
| `~/.pitrac/config/calibration_data.json` | Camera calibration results |
| `~/.pitrac/config/generated_golf_sim_config.json` | Runtime configuration (auto-generated) |

!!! note "Configuration Best Practice"
    Always use the web interface to change settings. The web server manages the three-tier configuration system and generates the runtime config automatically.

### User Data

**Runtime data**:

| Path | Description |
|---|---|
| `~/.pitrac/state/` | Runtime state files |
| `~/.pitrac/logs/` | Application logs (pitrac.log, web-server.log) |
| `~/.pitrac/run/` | PID files for process management |

**Captured data**:

| Path | Description |
|---|---|
| `~/LM_Shares/Images/` | Captured images from shots |
| `~/LM_Shares/WebShare/` | Web-accessible data |

### Test Resources

**Pre-installed test files**:

| Path | Description |
|---|---|
| `/usr/share/pitrac/test-images/` | Sample images (teed-ball.png, strobed.png) |
| `/usr/share/pitrac/test-suites/` | Automated test suites |
| `/usr/share/pitrac/calibration/` | Calibration tools (checkerboard, scripts) |

### Web Server Configuration

| Path | Description |
|---|---|
| `/usr/lib/pitrac/web-server/configurations.json` | Configuration metadata (283 settings with defaults, validation, descriptions) |

This file defines all available settings, their types, defaults, and validation rules. The web interface uses this to dynamically generate the configuration UI.

---

## Development Workflow

### Updating PiTrac

To get the latest changes from GitHub:

```bash
cd ~/PiTrac
git pull
cd packaging
sudo ./build.sh dev
```

**What happens**:

- Downloads latest code from GitHub
- Detects if dependencies changed (rarely)
- Rebuilds only changed files (incremental)
- Updates web server if changed
- Restarts services if they were running

**Time**: 30 seconds -- 2 minutes for incremental builds

### Incremental Builds

After making code changes locally:

```bash
cd ~/PiTrac/packaging
sudo ./build.sh dev
```

This performs an **incremental build**:

- Only rebuilds changed files
- Copies updated web server files
- Restarts services automatically
- Preserves configuration and calibration

**When to use**:

- After pulling updates
- After modifying C++ source
- After changing Python web server
- Testing local changes

### Clean Rebuild

To force a complete rebuild from scratch:

```bash
cd ~/PiTrac/packaging
sudo ./build.sh dev force
```

**What it does**:

- Deletes all build artifacts
- Rebuilds entire C++ binary
- Reinstalls all components
- Takes 2--5 minutes

**When to use**:

- Build errors that persist
- Dependency changes
- Switching between branches with significant changes
- Want to ensure clean state

### Build Artifacts

The `build.sh` script uses pre-built dependencies either from the PiTrac APT repository or from `packaging/deps-artifacts/`:

| Library | Version | Notes |
|---|---|---|
| OpenCV | 4.13.0 | Saves ~60 minutes vs building from source |
| lgpio | 0.2.2 | System packages preferred when available |
| msgpack-cxx | 7.0.0 | Message serialization |

**If artifacts are missing**:

```bash
cd ~/PiTrac
git lfs pull
```

These artifacts are stored using Git LFS (Large File Storage) and are checked into the repository.

---

## Build Mode Reference

| Mode | Command | Description |
|---|---|---|
| Developer install | `sudo ./build.sh dev` | Build and install on Pi (recommended) |
| Force clean rebuild | `sudo ./build.sh dev force` | Delete build artifacts and rebuild |
| Build dependencies | `sudo ./build.sh deps` | Build dependency artifacts (Docker) |
| Build PiTrac only | `sudo ./build.sh build` | Build PiTrac binary (Docker) |
| Build everything | `sudo ./build.sh all` | Build deps then PiTrac (Docker) |
| Interactive shell | `sudo ./build.sh shell` | Shell with artifacts (Docker) |
| Clean artifacts | `sudo ./build.sh clean` | Remove all artifacts and images |

---

## Backup and Restore

### Backup Your Configuration

Save your calibration and settings:

```bash
# Create backup directory
mkdir -p ~/pitrac-backup

# Backup configuration
cp -r ~/.pitrac/config/ ~/pitrac-backup/

# Backup captured images (optional, can be large)
cp -r ~/LM_Shares/Images/ ~/pitrac-backup/
```

### Restore Configuration

```bash
# Restore configuration
cp -r ~/pitrac-backup/config/* ~/.pitrac/config/

# Restart web server to pick up changes
sudo systemctl restart pitrac-web
```

---

## Disk Space Management

PiTrac can generate many images over time:

### Check Disk Usage

```bash
# Check overall disk space
df -h

# Check PiTrac data sizes
du -sh ~/.pitrac/
du -sh ~/LM_Shares/Images/
du -sh ~/.pitrac/logs/
```

### Clean Up Old Data

```bash
# Remove old images (be careful!)
rm ~/LM_Shares/Images/old-shot-*.png

# Clear old logs
rm ~/.pitrac/logs/*.log.old

# Clear PiTrac process logs
echo "" > ~/.pitrac/logs/pitrac.log
```

!!! warning "Important"
    Only delete files you're sure you don't need. Configuration files and calibration data should be backed up before removal.

---

## Service Management

### Systemd Service

PiTrac uses one systemd service:

**pitrac-web.service** -- Web dashboard (system service)

```bash
sudo systemctl start pitrac-web
sudo systemctl stop pitrac-web
sudo systemctl restart pitrac-web
sudo systemctl status pitrac-web
sudo systemctl enable pitrac-web   # Start on boot
sudo systemctl disable pitrac-web  # Don't start on boot
```

!!! note
    The PiTrac launch monitor process is NOT a service. It is controlled entirely through the web interface Start/Stop buttons.

---

## Uninstalling PiTrac

If you need to completely remove PiTrac:

### Stop Services

```bash
# Stop web server
sudo systemctl stop pitrac-web
sudo systemctl disable pitrac-web
```

### Remove Binaries and Libraries

```bash
# Remove installed files
sudo rm -rf /usr/lib/pitrac/
sudo rm -rf /etc/pitrac/
sudo rm -rf /usr/share/pitrac/
```

### Remove User Data

!!! warning
    This deletes all your configuration, calibration, and captured images!

```bash
rm -rf ~/.pitrac/
rm -rf ~/LM_Shares/
```

### Remove System Packages (Optional)

```bash
# Remove PiTrac-specific dependencies (optional)
sudo apt remove libapr1 libaprutil1
```

!!! note
    Most dependencies (OpenCV, Boost, libcamera) are also used by other software. Only remove if you're sure nothing else needs them.

---

## Next Steps

**For common issues:**

- **[Troubleshooting Guide](troubleshooting.md)** -- Solutions to common problems

**To improve your setup:**

- **[Cameras](../../hardware/cameras/index.md)** -- Advanced calibration techniques
- **[Simulator Integration](../simulator-integration.md)** -- Connect to E6, GSPro, TruGolf

**Return to:**

- **[Installation Overview](index.md)**
- **[First Use Guide](first-use.md)**

---

## Quick Reference

| Task | How |
|------|-----|
| Start web server | `sudo systemctl start pitrac-web` |
| Stop web server | `sudo systemctl stop pitrac-web` |
| Restart web server | `sudo systemctl restart pitrac-web` |
| Check web server status | `systemctl status pitrac-web` |
| Enable auto-start on boot | `sudo systemctl enable pitrac-web` |
| View web server logs | `journalctl -u pitrac-web -f` |
| Start PiTrac LM | Web dashboard > Start button in header |
| Stop PiTrac LM | Web dashboard > Stop button in header |
| Test cameras | Web dashboard > Testing Tools > Camera 1/2 Still Image |
| Run calibration | Web dashboard > 3-dot menu > Calibration |
| View logs | Web dashboard > 3-dot menu > Logs |
| Configure settings | Web dashboard > 3-dot menu > Configuration |
| Update PiTrac | `cd ~/PiTrac && git pull && cd packaging && sudo ./build.sh dev` |
| Clean rebuild | `sudo ./build.sh dev force` |
| Check disk space | `df -h` |
| Backup config | `cp -r ~/.pitrac/config/ ~/pitrac-backup/` |
