---
title: Developer Guide
description: Complete PiTrac development guide for contributors including build system, packaging, CLI interface, testing framework, and architecture documentation.
---

# Developer Guide

Welcome to the PiTrac development documentation. This guide covers developing, building, packaging, and maintaining PiTrac.

<div class="grid cards" markdown>

-   :material-view-dashboard:{ .lg .middle } __System Overview__

    ---

    Architecture, core components, data flow, and design principles.

    [:octicons-arrow-right-24: Overview](overview.md)

-   :material-cog:{ .lg .middle } __Configuration__

    ---

    Three-tier configuration system, web UI settings, and the C++ ConfigurationManager.

    [:octicons-arrow-right-24: Configuration](configuration.md)

-   :material-server:{ .lg .middle } __Service Architecture__

    ---

    The pitrac-web systemd service, pitrac_lm process lifecycle, and how the web server manages everything.

    [:octicons-arrow-right-24: Services](services.md)

-   :material-test-tube:{ .lg .middle } __Testing__

    ---

    Web UI testing suite, Python pytest tests, and C++ test infrastructure.

    [:octicons-arrow-right-24: Testing](testing.md)

-   :material-bookshelf:{ .lg .middle } __Dependencies__

    ---

    Library versions, build-from-source dependencies, and platform differences.

    [:octicons-arrow-right-24: Dependencies](dependencies.md)

</div>

## Quick Start for Developers

### Prerequisites

- Raspberry Pi 5 with 8GB RAM (for native development)
- Ubuntu/Debian Linux (for cross-compilation)
- Docker installed (for containerized builds)
- Git
- Basic familiarity with C++, Bash, and Linux systems

### Getting Started

**1. Clone the repository:**

```bash
git clone --recursive https://github.com/pitraclm/pitrac.git
cd PiTrac
```

**2. Build and install on the Pi:**

```bash
cd packaging
sudo ./build.sh dev    # Build and install locally
```

**3. Make changes and test:**

```bash
# Edit source files in Software/LMSourceCode/ImageProcessing/
sudo ./build.sh dev         # Incremental rebuild
```

## Development Workflow

### 1. Fork and Setup

```bash
# Fork the repository on GitHub, then:
git clone --recursive https://github.com/YOUR_USERNAME/PiTrac.git
cd PiTrac
git remote add upstream https://github.com/pitraclm/pitrac.git
```

### 2. Develop

```bash
git fetch upstream
git checkout main
git merge upstream/main
git checkout -b feature/your-feature-name
```

### 3. Test

Access the web UI at `http://your-pi-ip:8080` and use the Testing section, or run Python tests directly:

```bash
cd Software/web-server
python -m pytest tests/
```

### 4. Submit

```bash
git push origin feature/your-feature-name
```

Create a pull request from your fork to upstream `main`.

## Project Structure

```
PiTrac/
├── Software/
│   ├── LMSourceCode/ImageProcessing/   # Core C++ code (pitrac_lm)
│   └── web-server/                     # Python FastAPI web server
├── packaging/
│   ├── build.sh                        # Main build script
│   ├── build-apt-package.sh            # APT package creator
│   ├── bashly.yml                      # CLI specification
│   ├── generate.sh                     # CLI generator
│   ├── src/                            # CLI command implementations
│   ├── scripts/                        # Build helper scripts
│   └── templates/                      # Config and service templates
├── docs/                               # Source documentation
└── Hardware/                           # 3D models and PCB designs
```

## Getting Help

- **GitHub Issues**: <https://github.com/pitraclm/pitrac/issues>
- **Discord Community**: <https://discord.gg/j9YWCMFVHN>
