---
title: Testing Framework
description: PiTrac testing at every level from the web UI hardware and calibration tools to Python pytest suites for the web server and C++ Meson build validation.
---

# Testing Framework

PiTrac provides testing at multiple levels: an integrated web UI testing suite for end-to-end validation, Python pytest tests for the web server, and C++ test suites for image processing verification.

## Web UI Testing Interface

### Access Testing Tools

1. Ensure the web server is running (`sudo systemctl start pitrac-web`)
2. Navigate to `http://your-pi-ip:8080`
3. Click on the **Testing** section in the navigation menu

### Available Testing Categories

#### Hardware Tests

- **Strobe Pulse Test** -- Test IR strobe functionality with configurable duration
- **Camera Still Capture** -- Capture test images from Camera 1 or Camera 2
- **Ball Location Tests** -- Verify ball detection for each camera

#### Calibration Tests

- **Ball Position Verification** -- Check ball placement accuracy
- **Camera Alignment Tests** -- Verify camera positioning and angles

#### System Tests

- **Test Image Processing** -- Run detection on sample images
- **Automated Test Suite** -- Comprehensive system validation
- **Quick Test** -- Fast image processing test without cameras

#### Connectivity Tests

- **GSPro Connection Test** -- Verify simulator connectivity

### Test Execution Features

- **Real-time Output** -- View test results as they execute
- **Background Execution** -- Tests run without blocking the UI
- **Timeout Management** -- Configurable test timeouts
- **Result Storage** -- Test results saved with timestamps
- **Log Integration** -- View detailed logs for each test

## Python Web Server Tests

The web server (`Software/web-server/`) includes a comprehensive pytest test suite.

### Test Files

| Test File | Coverage |
|-----------|----------|
| `test_smoke.py` | Basic server startup and health |
| `test_api_endpoints.py` | General API endpoint testing |
| `test_api_endpoints_pitrac.py` | PiTrac-specific API endpoints |
| `test_config_api.py` | Configuration API |
| `test_config_manager.py` | Configuration manager logic |
| `test_calibration_api.py` | Calibration API endpoints |
| `test_calibration_manager.py` | Calibration manager logic |
| `test_strobe_calibration_api.py` | Strobe calibration API |
| `test_strobe_calibration_manager.py` | Strobe calibration logic |
| `test_camera_detector.py` | Camera detection |
| `test_logs_api.py` | Log viewing API |
| `test_pitrac_manager.py` | Process management |
| `test_shot_simulation.py` | Shot simulation |
| `test_testing_tools_api.py` | Testing tools API |
| `test_testing_tools_manager.py` | Testing tools logic |
| `test_websocket.py` | WebSocket functionality |
| `conftest.py` | Shared pytest fixtures |
| `utils/` | Test utility functions |

### Running Python Tests

```bash
cd Software/web-server

# Install dependencies (if not already installed)
pip install -r requirements.txt

# Run all tests
python -m pytest tests/

# Run with verbose output
python -m pytest tests/ -v

# Run a specific test file
python -m pytest tests/test_config_api.py

# Run with coverage
python -m pytest tests/ --cov=. --cov-report=term
```

## C++ Test Infrastructure

### Test Suites

Located at `Software/LMSourceCode/Testing/`:

| Directory | Description |
|-----------|-------------|
| `TestSuite_2025_02_07/` | Image processing test suite with known-good images |
| `Left-Handed-Shots/` | Test data for left-handed golfer scenarios |

These test suites contain sample images and expected results used by the automated testing system. They are installed to `/usr/share/pitrac/test-suites/` during build.

### Build System Testing

The core C++ codebase uses Meson/Ninja for builds. The build can be validated with:

```bash
cd Software/LMSourceCode/ImageProcessing

# Configure
meson setup build --buildtype=release

# Build
ninja -C build pitrac_lm

# Verify binary
file build/pitrac_lm
```

### Boost Test Framework

PiTrac's C++ code uses Boost for its core libraries (threading, logging, filesystem). The Boost Test Framework is available for unit testing of C++ components.

## Test Image Library

PiTrac includes sample test images installed at `/usr/share/pitrac/test-images/` for testing without hardware:

- Ball detection samples
- Spin calculation samples
- Various lighting conditions

These images are used by both the web UI testing tools and the automated test suite.

## Development Testing Workflow

1. **Make code changes** in the relevant source directory
2. **Rebuild**: `sudo ./build.sh dev` (in `packaging/`)
3. **Run Python tests**: `python -m pytest Software/web-server/tests/`
4. **Access web UI**: `http://your-pi-ip:8080`
5. **Navigate to Testing section** and run relevant tests
6. **View results and logs** in real-time

## Test Result Interpretation

The web UI provides clear pass/fail indicators:

| Indicator | Meaning |
|-----------|---------|
| Green checkmark | Test passed |
| Red X | Test failed |
| Yellow warning | Test completed with warnings |
| Spinner | Test in progress |

Detailed results and logs are available by clicking on each test result.

## Troubleshooting Tests

### Test Failures in Web UI

1. Check the **Logs** section for detailed error messages
2. Verify hardware connections (cameras, GPIO)
3. Confirm PiTrac process is not already running

### Camera Test Issues

- Verify camera is connected properly
- Check `/boot/firmware/config.txt` (Pi 5) for `camera_auto_detect=1`
- Use `rpicam-hello --list-cameras` to verify detection

### Python Test Failures

```bash
# Run with verbose output for debugging
python -m pytest tests/ -v --tb=long

# Run a specific failing test
python -m pytest tests/test_config_api.py::test_get_config -v
```
