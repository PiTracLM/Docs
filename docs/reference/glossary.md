---
title: Glossary
description: Technical terms and definitions used throughout PiTrac documentation including golf launch monitor terminology, camera concepts, and software components.
---

# Glossary

Technical terms used throughout the PiTrac documentation.

## A

ActiveMQ
:   Legacy message broker previously used for inter-process communication between PiTrac components. Replaced by HTTP POST in current versions.

Auto-calibration
:   PiTrac feature that automatically determines focal length and camera angles empirically using a physical calibration rig with golf balls at known positions. Available as a 4-step wizard through the web UI.

## B

Ball Speed
:   One of the three primary measurements provided by PiTrac -- the velocity of the golf ball as measured by the launch monitor system.

## C

Camera Calibration
:   Process of determining camera angles, focal lengths, and distortion correction matrices needed for PiTrac to accurately locate balls in 3D space.

Calibration Rig
:   Physical device that positions golf balls at known, fixed distances and angles from PiTrac cameras for the auto-calibration process.

Connector Board
:   Custom PCB that provides strobe-light switching, camera trigger connections, and power distribution for PiTrac. The current version uses a single +5V input with an integrated boost converter for LED voltage and hardware-enforced duty cycle limiting.

## D

De-distortion
:   Process of correcting fish-eye-like lens distortions using matrices calculated during camera calibration. Particularly evident around image edges.

Distortion Matrix
:   Mathematical matrices used by PiTrac to correct lens distortions in camera images during calibration and operation.

## E

E6/TruGolf
:   Golf simulator software that PiTrac can interface with. Uses port 2483 for communication.

Extrinsic Calibration
:   Camera calibration process that determines camera position and orientation in 3D space relative to the scene.

## F

Flight Camera
:   Camera 2 in the PiTrac system -- points straight ahead to capture the ball in flight after being hit.

Focal Length
:   Camera parameter that determines the field of view and magnification. Calculated during camera calibration process.

## G

Global Shutter Camera
:   Type of camera sensor that captures the entire image simultaneously, avoiding rolling shutter artifacts. Required for PiTrac's high-speed ball tracking.

GSPro
:   Golf simulator software that PiTrac can interface with for golf course simulation. Uses port 921 for communication.

## H

Hough Transform
:   OpenCV algorithm used by PiTrac for circle detection in strobed ball images. Can be sensitive and may require tuning for reliable operation. YOLO-based detection is available as an alternative.

HSA (Horizontal Side Angle)
:   One of the launch angle measurements provided by PiTrac, indicating the ball's horizontal trajectory direction.

## I

Intrinsic Calibration
:   Camera calibration process that determines internal camera parameters like focal length and lens distortion characteristics.

## L

Launch Angle
:   Ball trajectory angle measurements provided by PiTrac, including both vertical and horizontal components.

libcamera
:   Open-source camera stack and framework used by PiTrac for camera control on Raspberry Pi systems. Commands use `rpicam-*` on Pi 5 and `libcamera-*` on Pi 4.

## M

MsgPack
:   Platform-independent message serialization standard used by PiTrac for encoding data payloads in its interfaces.

## O

OpenCV
:   Computer vision library used by PiTrac for image processing, including circle detection via Hough transforms and YOLO neural network inference.

## S

Spin Rate
:   Measurement of golf ball rotation in three axes provided by PiTrac's analysis system.

Strobe Light
:   Infrared LED lighting system that provides short, high-intensity pulses to illuminate the golf ball for high-speed imaging.

Strobed Image
:   Photograph taken during strobe light pulse showing multiple ball positions for motion analysis.

## T

Tee Camera
:   Camera 1 in the PiTrac system -- angled to watch for the initial ball hit and teed-up ball position.

## V

VSA (Vertical Side Angle)
:   One of the launch angle measurements provided by PiTrac, indicating the ball's vertical trajectory angle.

## Y

YOLO
:   Neural network-based ball detection method available as an alternative to the traditional Hough Transform approach. Generally faster and more robust, especially in challenging lighting conditions. Configurable via Configuration > Ball Detection > Detection Method.
