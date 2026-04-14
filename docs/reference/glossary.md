---
title: Glossary
description: Technical terms and definitions used throughout PiTrac documentation including golf launch monitor terminology, camera concepts, and software components.
---

# Glossary

Technical terms used throughout the PiTrac documentation.

## A

ActiveMQ
:   Legacy message broker previously used for inter-process communication between PiTrac components. Replaced by HTTP POST in current versions.

ADC (Analog-to-Digital Converter)
:   Circuit that measures an analog voltage and outputs a digital value. Used on the PiTrac connector board to read strobe-LED current during calibration.

APT (Advanced Package Tool)
:   Command-line package manager on Debian and Raspberry Pi OS (`apt install ...`). PiTrac's build script installs ~80 system dependencies through APT.

ASGI (Asynchronous Server Gateway Interface)
:   Python interface standard between async web servers and applications. PiTrac's FastAPI dashboard runs on top of an ASGI server (uvicorn).

Auto-calibration
:   PiTrac feature that automatically determines focal length and camera angles empirically using a physical calibration rig with golf balls at known positions. Available as a 4-step wizard through the web UI.

## B

Ball Speed
:   One of the three primary measurements provided by PiTrac -- the velocity of the golf ball as measured by the launch monitor system.

BOM (Bill of Materials)
:   Complete list of every part required to build a PCB or assembly. PiTrac's [Parts List](../hardware/parts-list.md) serves as the project BOM.

Boost
:   Large collection of peer-reviewed C++ libraries. PiTrac uses Boost for timers, logging, threading, filesystem access, and regex.

## C

Camera Calibration
:   Process of determining camera angles, focal lengths, and distortion correction matrices needed for PiTrac to accurately locate balls in 3D space.

Calibration Rig
:   Physical device that positions golf balls at known, fixed distances and angles from PiTrac cameras for the auto-calibration process.

ChArUco Board
:   Printed calibration pattern that combines a checkerboard with ArUco fiducial markers. PiTrac uses it for [distortion correction](../hardware/cameras/distortion-correction.md) -- the embedded markers let the detector locate the board even when part of it is occluded or clipped by the frame.

Connector Board
:   Custom PCB that provides strobe-light switching, camera trigger connections, and power distribution for PiTrac. The current version uses a single +5V input with an integrated boost converter for LED voltage and hardware-enforced duty cycle limiting.

CSI (Camera Serial Interface)
:   Ribbon-cable interface between a Raspberry Pi and its cameras, built on the MIPI specification. The Pi 5 uses a different connector pitch than older Pi models, so older camera cables need an adapter (FPC).

## D

DAC (Digital-to-Analog Converter)
:   Circuit that converts a digital value into an analog voltage. PiTrac's connector board uses a DAC to set strobe-LED current.

DEB Package
:   Debian binary package format (`.deb`). PiTrac distributes pre-built OpenCV and lgpio as DEB packages so installers don't have to compile them.

De-distortion
:   Process of correcting fish-eye-like lens distortions using matrices calculated during camera calibration. Particularly evident around image edges.

Distortion Matrix
:   Mathematical matrices used by PiTrac to correct lens distortions in camera images during calibration and operation.

Duty Cycle
:   Fraction of time a pulsed signal is "on" relative to its total period. PiTrac's strobe LEDs are hardware-limited to a safe maximum duty cycle to prevent overheating.

## E

E6/TruGolf
:   Golf simulator software that PiTrac can interface with. Uses port 2483 for communication.

Extrinsic Calibration
:   Camera calibration process that determines camera position and orientation in 3D space relative to the scene.

## F

FastAPI
:   Modern asynchronous Python web framework. Powers the PiTrac dashboard and control API.

Flight Camera
:   Camera 2 in the PiTrac system -- points straight ahead to capture the ball in flight after being hit.

Focal Length
:   Camera parameter that determines the field of view and magnification. Calculated during camera calibration process.

## G

Gerber Files
:   Standard PCB fabrication format consumed by board houses (JLCPCB, OSH Park, and similar). The PiTrac connector board Gerbers are available in the GitHub repository.

Global Shutter Camera
:   Type of camera sensor that captures the entire image simultaneously, avoiding rolling shutter artifacts. Required for PiTrac's high-speed ball tracking.

GPIO (General-Purpose Input/Output)
:   Raspberry Pi pins that can be set high/low or read as digital input. PiTrac drives strobe triggers and talks to the connector-board ADC/DAC over GPIO (via SPI).

GSPro
:   Golf simulator software that PiTrac can interface with for golf course simulation. Uses port 921 for communication.

## H

Hough Transform
:   OpenCV algorithm used by PiTrac for circle detection in strobed ball images. Can be sensitive and may require tuning for reliable operation. YOLO-based detection is available as an alternative.

HSA (Horizontal Side Angle)
:   One of the launch angle measurements provided by PiTrac, indicating the ball's horizontal trajectory direction.

## I

IMX296
:   Sony 1.6MP global-shutter CMOS sensor and the standard PiTrac camera sensor. Used in both the Innomaker B0310 module and the Raspberry Pi Global Shutter Camera.

Intrinsic Calibration
:   Camera calibration process that determines internal camera parameters like focal length and lens distortion characteristics.

IR LED
:   Infrared light-emitting diode. PiTrac's strobes are high-power IR LEDs that illuminate the ball without being visible to the human eye.

IR-Pass Filter
:   Optical longpass filter that blocks visible light and transmits infrared (typically >= 700nm). Mounted over the flight camera so only strobe light reaches the sensor, cutting ambient visible-light interference.

## J

journalctl
:   Systemd's log viewer. Use `journalctl -u pitrac-web` to see web server logs. (The launch monitor itself is not a systemd service -- it runs on demand from the web UI and logs to `~/.pitrac/logs/pitrac.log`.)

JSON
:   JavaScript Object Notation -- lightweight text data format. Used by PiTrac's REST API and generated configuration files such as `generated_golf_sim_config.json`.

## L

Launch Angle
:   Ball trajectory angle measurements provided by PiTrac, including both vertical and horizontal components.

Launch Monitor
:   Device category that measures ball-flight parameters (speed, launch angle, spin) for golf simulation and practice. PiTrac is an open-source, DIY launch monitor.

LDO (Low-Dropout Regulator)
:   Linear voltage regulator that works even when its input voltage is only slightly higher than its output. Used on PiTrac's connector board to supply clean voltage to sensitive components.

lgpio
:   Modern GPIO library that works with the Raspberry Pi 5's RP1 chip. PiTrac links against lgpio for GPIO access; older libraries (pigpio, wiringPi) don't support the Pi 5.

libcamera
:   Open-source camera stack and framework used by PiTrac for camera control on Raspberry Pi systems. Commands use `rpicam-*` on Pi 5.

## M

M12 Lens
:   Miniature threaded lens mount (12mm diameter, 0.5mm pitch) -- the small, inexpensive lens format used by most Pi security cameras. PiTrac typically uses 3.6mm or 6mm M12 lenses.

Meson
:   C++ build system used to compile PiTrac's `pitrac_lm` binary (with Ninja as the backend).

MIPI
:   Mobile Industry Processor Interface. The specification family behind CSI camera and DSI display connectors on the Raspberry Pi and most phones.

MOSFET
:   Metal-Oxide-Semiconductor Field-Effect Transistor. Fast-switching transistor used on the PiTrac connector board to drive the strobe LEDs.

Motion Blur
:   Image smearing caused by sensor exposure during object motion. Rolling-shutter cameras also add geometric distortion of moving objects. PiTrac uses global-shutter cameras and short strobes to eliminate both effects.

## N

NCNN
:   Lightweight neural-network inference framework from Tencent. PiTrac uses NCNN to run YOLO ball-detection models directly on the Pi.

Ninja
:   Small, fast build tool. Meson uses Ninja as its default backend to actually compile PiTrac.

NVMe (Non-Volatile Memory Express)
:   High-speed SSD storage protocol. Booting the Pi 5 from an NVMe drive (via an NVMe HAT) is substantially faster than booting from an SD card. See [Advanced Configuration](../software/pi-setup/advanced.md).

## O

OpenCV
:   Computer vision library used by PiTrac for image processing, including circle detection via Hough transforms and YOLO neural network inference.

Opto-coupler
:   Component that passes a signal optically rather than electrically, providing galvanic isolation between circuits. Used in the legacy V1 PiTrac connector board; current boards use different isolation.

## P

PCB (Printed Circuit Board)
:   Fiberglass board with etched copper traces that holds electronic components. PiTrac has one custom PCB -- the [connector board](../hardware/pcb-assembly.md) -- which drives the strobes and routes power.

PID File
:   Small file holding the process ID of a running service (for example `/run/pitrac.pid`). PiTrac's services write PID files so management commands can tell whether the launch monitor is already running.

## R

REST API
:   HTTP-based API style where URLs name resources and verbs (`GET`, `POST`, `PUT`, `DELETE`) act on them. The PiTrac web server exposes a REST API for configuration, shot data, and system status.

Rolling Shutter
:   Camera-sensor readout mode where rows of pixels are exposed sequentially rather than simultaneously. Causes moving objects to appear sheared or warped and is unusable for high-speed ball tracking. Compare with **Global Shutter Camera**.

rpicam-apps
:   Raspberry Pi camera command-line tools (`rpicam-hello`, `rpicam-still`, `rpicam-vid`) that replaced the older `libcamera-*` utilities on Pi 5.

## S

SBC (Single Board Computer)
:   Complete computer on a single board (CPU, RAM, I/O). The Raspberry Pi 5 is the SBC at the heart of a PiTrac build.

SMD (Surface Mount Device)
:   Electronic components soldered to pads on the PCB surface rather than inserted through drilled holes. Smaller and harder to hand-solder than through-hole. PiTrac's current connector board mixes SMD and through-hole parts to stay hand-solderable.

SPI (Serial Peripheral Interface)
:   Synchronous serial protocol that runs over a small set of GPIO pins. PiTrac uses SPI to talk to the strobe DAC on the connector board. Must be enabled in `/boot/firmware/config.txt`.

Spin Rate
:   Measurement of golf ball rotation in three axes provided by PiTrac's analysis system.

Stereo Imaging
:   Using two cameras with known geometry to recover 3D position from pixel disparity. PiTrac uses stereo imaging between Camera 1 (teed ball) and Camera 2 (flight) to derive 3D launch data.

Strobe Light
:   Infrared LED lighting system that provides short, high-intensity pulses to illuminate the golf ball for high-speed imaging.

Strobed Image
:   Photograph taken during strobe light pulse showing multiple ball positions for motion analysis.

systemd
:   Linux service and unit manager. PiTrac's launch-monitor and web-server processes run as systemd services (`pitrac`, `pitrac-web`) so they start on boot and can be managed with `systemctl`.

## T

3D Trajectory
:   The ball's flight path expressed as x/y/z position over time. PiTrac computes a 3D trajectory from the strobed ball images and derives speed, launch angle, and spin from it.

Tee Camera
:   Camera 1 in the PiTrac system -- angled to watch for the initial ball hit and teed-up ball position.

Through-Hole
:   Components whose leads pass through drilled holes in the PCB and are soldered on the opposite side. Easier to hand-solder than SMD.

## U

uvicorn
:   Fast ASGI server. Runs PiTrac's FastAPI web dashboard.

## V

VSA (Vertical Side Angle)
:   One of the launch angle measurements provided by PiTrac, indicating the ball's vertical trajectory angle.

## W

WebSocket
:   Bidirectional persistent connection over a single HTTP upgrade. PiTrac's web dashboard uses WebSockets to stream live logs and shot updates from the Pi to the browser without polling.

## Y

YAML
:   Indentation-based human-readable configuration format. PiTrac uses YAML for libcamera pipeline configuration (for example `rpi_apps.yaml`).

YOLO
:   Neural network-based ball detection method available as an alternative to the traditional Hough Transform approach. Generally faster and more robust, especially in challenging lighting conditions. Configurable via Configuration > Ball Detection > Detection Method.
