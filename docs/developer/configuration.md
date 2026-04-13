---
title: Configuration Management
description: PiTrac's three-tier configuration system with web UI categories, REST API endpoints, C++ ConfigurationManager singleton, and environment variable overrides.
---

# Configuration Management

PiTrac uses a three-tier configuration system managed primarily through the web UI. This page covers both the user-facing configuration interface and the developer-facing internals.

## Web UI Configuration Interface

### Accessing Configuration

1. Ensure the web server is running (via `pitrac web start` or systemd)
2. Navigate to `http://your-pi-ip:8080`
3. Click on the **Configuration** section

### Configuration Categories

Settings are organized into logical categories:

| Category | Examples |
|----------|---------|
| **System** | Pi mode, golfer orientation, practice ball mode |
| **Cameras** | Camera types, lens configurations, gain settings |
| **Ball Detection** | Detection methods (HoughCircles, YOLO, YOLO+SAHI) |
| **AI Detection** | NCNN model selection with auto-discovery |
| **Simulators** | E6, GSPro, TruGolf connectivity settings |
| **Storage** | Image logging, diagnostic levels |
| **Logging** | Log levels, debug options |
| **Strobing** | IR strobe timing and intensity |
| **Spin Analysis** | Spin calculation parameters |
| **Calibration** | Camera calibration data |
| **Club Data** | Club selection and specifications |
| **Display** | UI and output preferences |

### User Interface Features

- **Search Functionality** -- Real-time search across all settings
- **Basic/Advanced Views** -- Simplified interface for basic users
- **Live Validation** -- Real-time validation with error messages
- **Change Tracking** -- Shows modified settings count
- **Save/Reset Options** -- Batch save or reset to defaults
- **Import/Export** -- Backup and restore configurations
- **Diff View** -- Compare current settings with defaults
- **Restart Notifications** -- Warns when changes require restart

## Three-Tier Configuration System

Settings are resolved in priority order (highest to lowest):

1. **User Overrides** -- Changed through web UI, stored in `~/.pitrac/config/`
2. **Calibration Data** -- Persistent camera calibration parameters
3. **System Defaults** -- Built-in defaults from the application

## Configuration Files (Backend)

While configuration is managed through the web UI, understanding the file structure helps with debugging:

| Location | Purpose |
|----------|---------|
| `~/.pitrac/config/` | User overrides (YAML, managed by web UI) |
| `/etc/pitrac/golf_sim_config.json` | System-level JSON configuration |
| `Software/web-server/configurations.json` | Web server configuration definitions |

!!! info
    The file `configurations.json` exists at `Software/web-server/configurations.json` and defines the configuration schema used by the web UI.

## Web UI Configuration API

The web server provides REST APIs for configuration management:

```
GET  /api/config              # Get all configuration
GET  /api/config/cameras      # Get specific category
PUT  /api/config              # Update settings
GET  /api/config/defaults     # Get defaults
POST /api/config/reset        # Reset to defaults
POST /api/config/import       # Import configuration
GET  /api/config/export       # Export configuration
```

Example update request:

```json
{
  "cameras.camera1_gain": 2.5,
  "system.putting_mode": true
}
```

## Development: ConfigurationManager (C++)

For developers working on the core C++ code:

```cpp
#include "configuration_manager.h"

// Get singleton instance
ConfigurationManager& config = ConfigurationManager::GetInstance();

// Load configuration (auto-loads YAML overrides)
config.LoadConfigFile("golf_sim_config.json");

// Get values with defaults
float gain = config.GetFloat("gs_config.cameras.kCamera1Gain", 2.0f);
bool putting = config.GetBool("gs_config.modes.kStartInPuttingMode", false);

// Values automatically include web UI overrides
```

## Environment Variables

Environment variables can override configuration when needed for development or debugging:

```bash
# Override camera types
export PITRAC_SLOT1_CAMERA_TYPE=4
export PITRAC_SLOT2_CAMERA_TYPE=4
```

## Configuration Workflow

1. **Access web UI** -- Navigate to Configuration section
2. **Search or browse** -- Find settings to modify
3. **Make changes** -- Edit values with live validation
4. **Review changes** -- See highlighted modifications
5. **Save changes** -- Click Save to apply
6. **Restart if needed** -- Web UI indicates if restart required

## Troubleshooting

### Changes Not Taking Effect

1. Check if restart is required (web UI will indicate)
2. Verify changes were saved (not just entered)
3. Check for validation errors in web UI
4. Review logs for configuration loading errors

### Configuration Reset

If configuration becomes corrupted:

1. Use web UI "Reset to Defaults" button
2. Or manually remove overrides: `rm -rf ~/.pitrac/config/*`
3. Restart web server: `pitrac web restart`

### Viewing Active Configuration

The web UI shows:

- Current values with source indicator
- Modified values (highlighted)
- Default values (in diff view)
