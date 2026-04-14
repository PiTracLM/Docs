---
title: Enclosure Version 3 Assembly
description: Step-by-step assembly instructions for the PiTrac V3 enclosure, covering camera eyeballs, IR LED board, PSU stack, Pi5 electronics, and cover installation.
---

# Enclosure Version 3 / Assembly

---

## Before You Begin

Before starting assembly, make sure you have sourced all components and printed all parts:

- **[Parts List](../../hardware/parts-list.md)** -- everything you need to purchase (electronics, hardware, screws, acrylic panels)
- **[3D Printing](3d-printing.md)** -- STL downloads and slicer settings for all printed parts

Each assembly step below lists the specific parts needed for that step.

### Video Walkthrough

Prefer video? The full assembly is covered here:

<div class="video-wrapper" markdown>
  <iframe src="https://www.youtube.com/embed/bVOIPczu9Nk" title="PiTrac V3 Enclosure Assembly" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

---

## General Notes

The design is modular and intended to make it easy to swap between different stack configurations that may be introduced in future versions of the PiTrac Launch Monitor.

Each stack provides eight potential connection points: four inner holes used to fasten adjacent stacks together with short M5 screws, and four outer through-holes that allow all stacks to be clamped together at once using threaded rods.

In most cases, using only one of these two fastening methods is sufficient. Threaded rods allow for easier assembly and disassembly, while short screws may be preferable for an initial prototype setup.

For future changes to the overall stack height, the threaded rods may need to be shortened or replaced. If you choose to assemble the stacks using only short M5 screws, please note the M5x35 mm option described in the PSU Stack Module Assembly section.

---

## Camera Assembly

[View Drawing](../../assets/technicaldrawings/Assy_Camera_Eyeball.svg){ .md-button } [View 3D](../../assets/technicaldrawings/Assy_Camera_Eyeball-3D.svg){ .md-button .md-button--primary }

Tools:

- Cross-head screwdriver
- 2.5 mm Allen key
- Sandpaper (optional)

| Part | Qty | Notes |
|------|-----|-------|
| [IMX296-MPI_Eyeball_6mm_camfered.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/IMX296-MPI_Eyeball_6mm_camfered.stl){ .stl-download } | 1 | Remove support material |
| ISO 4762 M3x6 mm screw | 2 | 6-15 mm; cylindrical head |
| M2x10 mm self-tapping screw | 4 | 6-12 mm |
| Camera | 1 | |

1. Remove all support material.
2. Smooth spherical surfaces if needed.
3. Chamfer/prime the two horizontal holes for **M3x6 mm** using a cross-head screwdriver.
4. Install both **M3x6 mm** screws with the Allen key; ensure straight alignment.
5. Slightly loosen the aperture and focus screws on the **camera**; align them with the slot. The ribbon cable connector must align with the opening.
7. Attach the camera to the **eyeball** using four **M2x10 mm self-tapping screws**.

!!! note
    Choose the appropriate eyeball for your camera and lens.

---

## LED Assembly (5x2 IR LED board)

[View Drawing](../../assets/technicaldrawings/Assy_PiTracIRLED.svg){ .md-button } [View 3D](../../assets/technicaldrawings/Assy_PiTracIRLED-3D.svg){ .md-button .md-button--primary }

Tools:

- Cross-head screwdriver

| Part | Qty | Notes |
|------|-----|-------|
| [5x2IRLED_Eyeball.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/5x2IRLED_Eyeball.stl){ .stl-download } | 1 | - |
| 5x2 IR LED board | 1 | - |
| M3x10 mm self-tapping screw | 2 | 8-12 mm |

1. Remove all support material.
2. Smooth spherical surfaces if needed.
3. Insert the already wired **5x2 IR LED board** in the **5x2IRLED_Eyeball**. Match electric polarity.
4. Install the four **M3x10 mm self-tapping screw**. Do not overtighten.
5. Clip the cables in place and ensure correct polarity. Make sure that the cables are as far apart as possible.

---

## LED Assembly (Legacy COB)

Tools:

- Cross-head screwdriver

| Part | Qty | Notes |
|------|-----|-------|
| [LED_Eyeball.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Legacy/LED_Eyeball.stl){ .stl-download } | 1 | - |
| [LED_Clamp.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Legacy/LED_Clamp.stl){ .stl-download } | 1 | - |
| 100 W COB IR LED with wires | 1 | - |
| 60 deg LED Lens - 44 mm + Reflector | 1 | - |
| M3x10 mm self-tapping screw | 4 | 8-12 mm |

1. Remove all support material.
2. Smooth spherical surfaces if needed.
3. Insert the **reflector** in the **LED_Eyeball**.
4. Insert the **COB LED** in the **reflector**.
5. Position the **LED_Clamp** on the **COB LED**. Ensure that the centering pins of the **LED_CLAMP** are engaged with the **COB LED** holes. Ensure that the LED cables are not squished.
6. Install the four **M3x10 mm self-tapping screw**. Do not overtighten. The clamp is designed with clearance, so that the LED is always preloaded.

---

## Eyeball Assembly

[Tee-Cam 3D](../../assets/technicaldrawings/Assy_Tee_Cam-3D.svg){ .md-button .md-button--primary } [LED Screen 3D](../../assets/technicaldrawings/Assy_Screen_PiTracIRLED-3D.svg){ .md-button .md-button--primary } [Flight-Cam Drawing](../../assets/technicaldrawings/Assy_Flight_Cam.svg){ .md-button } [Flight-Cam 3D](../../assets/technicaldrawings/Assy_Flight_Cam-3D.svg){ .md-button .md-button--primary }

Tools:

- 3 mm Allen key for ISO 7380-2 or 4 mm for ISO 4762
- Sandpaper (optional)
- Superglue (optional)

| Part | Qty | Notes |
|------|-----|-------|
| Camera Assembly or LED Assembly | 1 | - |
| [EyeScreen.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/EyeScreen.stl){ .stl-download } | 1 | - |
| [EyeScreen_Clamp.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/EyeScreen_Clamp.stl){ .stl-download } | 1 | - |
| ISO 4032 M5 nut | 4 | - |
| ISO 7380-2 M5x20 mm screw | 4 | 20-25 mm; ISO 4762 optional |

1. Remove support material.
2. Smooth spherical surfaces if needed.
3. Insert **M5 nuts** into the **EyeScreen_Clamp** pockets (optional: secure with superglue).
4. Insert the **Camera Assembly** or **LED Assembly** into the **EyeScreen**.
5. Ensure correct orientation: notches must face upwards (toward the ribbon cable).
6. Install the **M5 screws** and tighten only lightly.

!!! note
    ISO 7380-2 button-head screws look nicer and provide more surface contact; ISO 4762 offers better tool access.

---

## PSU Stack Module Assembly

[View Drawing](../../assets/technicaldrawings/Assy_Stack_Module_PSU.svg){ .md-button } [View 3D](../../assets/technicaldrawings/Assy_Stack_Module_PSU-3D.svg){ .md-button .md-button--primary }

Tools:

- Cross-head screwdriver
- 3 mm Allen key for ISO 7380-2 or 4 mm for ISO 4762

| Part | Qty | Notes |
|------|-----|-------|
| [Stack_Module_PSU_vent.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Stack_Module_PSU_vent.stl){ .stl-download } | 1 | - |
| [Ambient_LED_Screen.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Ambient_LED_Screen.stl){ .stl-download } | 1 | - |
| [LinePower_Cover.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/LinePower_Cover.stl){ .stl-download } | 1 | - |
| [Ambient_LED_Visor.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Ambient_LED_Visor.stl){ .stl-download } | 1 | - |
| [Spacer.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Spacer.stl){ .stl-download } | 4 | - |
| Meanwell LRS-75-5 | 1 | - |
| AC Power Inlet C14 with Fuse | 1 | - |
| USB COB LED Strip Lights 6.56 ft | 1 | roughly 60 cm required; 8mm width |
| Wires | 3 | - |
| M3x6 mm screw | 2 | 5-6 mm |
| M3x5 mm self-tapping screw | 4 | 5-6 mm |
| M3x10 mm self-tapping screw | 4 | 5-16 mm |
| ISO 4762 M5x35 mm screw | 4 | -optional- alternative to the M5 through rod design |
| ISO 10511 M5 lock nut | 4 | -optional- alternative to the M5 through rod design; lock preferred, ISO 4032 will work as well |

1. Remove support material.
2. Mount the **Meanwell PSU** in the **Stack_Module_PSU_vent** with two **M3x6 mm screws** from the bottom side (in the center of the PSU).
3. Add two **M3x5 mm self-tapping screws** from the top side (in the corners of the PSU). 6 mm screws will also work, but will cause a slight bump in the bottom side surface.
4. Install the three **wires** on the screw terminals of the PSU. It is advised to use the standard color code for PE, L, N (US: G, N, H).
5. Install the **AC Power Inlet** in the **Stack_Module_PSU_vent** and plug in the wires on the right terminals. Fix the **AC Power Inlet** with two **M3x10 mm self-tapping screw**.
6. Get familiar with the right orientation of the **Ambient_LED_Screen** in the **Stack_Module_PSU_vent**.
7. Wrap the **USB COB LED Strip** on the **Ambient_LED_Screen**. Start in the lower left corner with roughly 2 cm after the USB cable. Stick the COB on the surface going horizontally rightwards. Wrap it arround the corner. Go diagonally upwars so you meet the first wrap on the left side. trim the Strip roughly 2 cm after the last front face wrap. The result should be four horizontal strips in the front and three diagonal ones in the back.
8. Install the wrapped **Ambient_LED_Screen** in the **Stack_Module_PSU_vent**. First thread the USB cable trough the left gap between housing and PSU. Stick the Screen in the slot and secure it with two **M3x10 mm self-tapping screws**.
9. Double check correct wiring and install the **LinePower_Cover** with two **M3x5 mm self-tapping screw**.
10. Slide on or clip on the **Ambient_LED_Visor**.
11. Place **spacers** in the four outermost holes on top.

!!! note
    This stack module is specifically designed for the Meanwell LRS-75-5. It is not recommended to use a different PSU.

!!! note
    Four ISO 4762 M5x35 mm screws can be used in the Stack_Module_PSU if you do not want to opt for the trough rod variant. Insert four ISO 10511 M5 lock nuts in the base and install the four ISO 4762 M5x35 mm screws from the top.

---

## Camera Stack Module Assembly

[Tee-Cam 3D](../../assets/technicaldrawings/Assy_Stack_Module_Tee_Cam-3D.svg){ .md-button .md-button--primary } [Flight-Cam Drawing](../../assets/technicaldrawings/Assy_Stack_Module_Flight_Cam.svg){ .md-button } [Flight-Cam 3D](../../assets/technicaldrawings/Assy_Stack_Module_Flight_Cam-3D.svg){ .md-button .md-button--primary }

Tools:

- 3 mm Allen key for ISO 7380-2 or 4 mm for ISO 4762

| Part | Qty | Notes |
|------|-----|-------|
| Camera Screen Assembly | 1 | - |
| [Stack_Module.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Stack_Module.stl){ .stl-download } | 1 | - |
| [Spacer.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Spacer.stl){ .stl-download } | 4 | - |
| [IRFilter_Mount_1inchround.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/IRFilter_Mount_1inchround.stl){ .stl-download } | 1 | alternative square design from V2 Enclosure, only for flight cam |
| ISO 7380-2 M5x10 mm screw | 2 | 10-15 mm; ISO 4762 optional |
| IR-Pass Filter | 1 | 1" round or 1" square, only for flight cam |

1. Remove support material.
2. Pre-tap the lower **EyeScreen** holes with a screw.
3. Mount the **Camera Screen Assembly** to the **Stack_Module**. Recommended front-plane distance: 30 mm (same left/right).
4. Place **spacers** in the four outermost holes on top.
5. Only for the flight camera: Place **IR-Pass Filter** onto the lens and clip **IRFilter_Mount_1inchround** on the lens. (Process may vary)

!!! warning "Run distortion calibration before installing the filter"
    The [distortion calibration](../cameras/distortion-correction.md) step uses a printed ChArUco board illuminated by visible light. The IR-pass filter blocks visible light and will prevent the detector from finding the pattern.

    Either defer installing this filter until after you have completed distortion calibration on Camera 2, or plan to temporarily remove it later when you calibrate.

---

## LED Stack Module Assembly

[View 3D](../../assets/technicaldrawings/Assy_Stack_Module_LED-3D.svg){ .md-button .md-button--primary }

Tools:

- 3 mm Allen key for ISO 7380-2 or 4 mm for ISO 4762

| Part | Qty | Notes |
|------|-----|-------|
| LED Screen Assembly | 1 | - |
| [Stack_Module.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Stack_Module.stl){ .stl-download } | 1 | - |
| [Spacer.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Spacer.stl){ .stl-download } | 4 | - |
| ISO 7380-2 M5x10 mm screw | 2 | 10-15 mm; ISO 4762 optional |

1. Remove support material.
2. Pre-tap the lower **EyeScreen** holes with a screw.
3. Mount the **LED Screen Assembly** to the **Stack_Module**. Recommended front-plane distance: 30 mm (same left/right).
4. Place **spacers** in the four outermost holes on top.

---

## Electronics

[Pi5 Drawing](../../assets/technicaldrawings/Assy_RaspberryPi5_carrier.svg){ .md-button } [Pi5 3D](../../assets/technicaldrawings/Assy_RaspberryPi5_carrier-3D.svg){ .md-button .md-button--primary } [Connector Board Drawing](../../assets/technicaldrawings/Assy_V3Connector_Board.svg){ .md-button } [Connector Board 3D](../../assets/technicaldrawings/Assy_V3Connector_Board-3D.svg){ .md-button .md-button--primary }

Tools:

- Cross-head screwdriver

| Part | Qty | Notes |
|------|-----|-------|
| [Pi5_Carrier_vertical_3mm.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Pi5_Carrier_vertical_3mm.stl){ .stl-download } | 1 | choose height and hole version according to your setup (NVMe, HDMI access...) |
| [ConnectorBoardv3_Carrier.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/ConnectorBoardv3_Carrier.stl){ .stl-download } | 1 | - |
| Pi5 | 1 | - |
| ConnectorBoardv3 | 1 | - |
| M3x10 mm self-tapping screw | 4 | - |
| M2x10 mm self-tapping screw | 4 | alternative: M2.5 screws + risers, for through hole variant |

1. Mount the **ConnectorBoardv3** on its carrier with four **M3x10 mm self-tapping screws**.
2. Mount the **Pi5** on its carrier with four **M2x10 mm self-tapping screws**. Ensure right orientation: The SD card should align with the opening.

!!! note
    There are alternative **Pi5** mounts available. This version is meant for wireless Pi access only. If you need to access the pi with USB, Ethernet or HDMI regularly, it is recommended to print and use `\Enclosure Version 3\Part\Print\Variants\Pi5_Bagpack`, `_top` and `_bottom`. This will require additional cuts to the **Acrylic backplate**.

    If you only need Ethernet access, there are **Back_Interface_Plate** versions available. This will require additional cuts to the **Acrylic backplate**.

!!! note
    This assembly state is a good point to fire up the PiTrac for the first time as all parts are easily accessible.

---

## Cover Assembly

[View Drawing](../../assets/technicaldrawings/Assy_Stack_Module_Cover_forInserts.svg){ .md-button } [View 3D](../../assets/technicaldrawings/Assy_Stack_Module_Cover_forInserts-3D.svg){ .md-button .md-button--primary }

Tools:

- Cross-head screwdriver

| Part | Qty | Notes |
|------|-----|-------|
| [Stack_Module_Cover_forInserts.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Stack_Module_Cover_forInserts.stl){ .stl-download } | 1 | - |
| [Stack_Module_Cover_insert.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Stack_Module_Cover_insert.stl){ .stl-download } | 1 | - |
| [Stack_Module_Cover_LogoTee.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Stack_Module_Cover_LogoTee.stl){ .stl-download } | 1 | - |
| [Stack_Module_Cover_LogoBall.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Stack_Module_Cover_LogoBall.stl){ .stl-download } | 1 | - |
| M3x5 mm self-tapping screw | 4 | - |
| M3x10 mm self-tapping screw | 5 | - |

1. Place and twist the **Stack_Module_Cover_insert** into the **Stack_Module_Cover_forInserts**. Ensure correct orientation
2. Push the **Stack_Module_Cover_LogoTee** in the **Stack_Module_Cover_forInserts**. Secure with a **M3x10 mm self-tapping screw** from below.
3. Push the **Stack_Module_Cover_LogoBall** in the **Stack_Module_Cover_insert**. Secure with four **M3x10 mm self-tapping screw** from below.
4. Ensure the logo sits flush and is not rotated. Clamp down the **Stack_Module_Cover_insert** slightly with four **M3x5 mm self-tapping screw** from below.

!!! note
    There are alternative **Stack_Module_Cover** available, providing a less complex and material intensive print.

---

## Stack Module to Stack Module Assembly

[View Drawing](../../assets/technicaldrawings/Assy_PiTrac.svg){ .md-button } [View 3D](../../assets/technicaldrawings/Assy_PiTrac-3D.svg){ .md-button .md-button--primary }

Tools:

- 3 mm or 4 mm Allen key (ball-end preferred)

| Part | Qty | Notes |
|------|-----|-------|
| Camera Stack Module Assembly | 2 | - |
| LED Stack Module Assembly | 1 | - |
| PSU Stack Module Assembly | 1 | - |
| ISO 7380-2 M5x15 mm screw | 8 | 10-15 mm; ISO 4762 optional |
| ISO 7380-2 M5x10 mm screw | 4 | 10 mm; ISO 4762 optional |

**2nd on 1st stack**

1. Pre-tap the upper **Stack_Module** holes.
2. Mount the **Camera Stack Module Assembly** with 4x M5x10 mm screws.

!!! warning
    Use 10 mm screws only to ensure clearance above the **PSU**.

**3rd on 2nd stack**

1. Pre-tap the upper **Stack_Module** holes.
2. Mount the **LED Stack Module Assembly** with 4x M5x15 mm screws.

**4th on 3rd stack**

1. Pre-tap the upper **Stack_Module** holes.
2. Mount the **Camera Stack Module Assembly** with 4x M5x15 mm screws.

---

## Electronics Installation

Tools:

- (none)

| Part | Qty | Notes |
|------|-----|-------|
| Pi5 Assembly | 1 | choose height and hole version according to your setup (NVMe, HDMI access...) |
| ConnectorBoardv3 Assembly | 1 | - |
| [Carrier_Clamps.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Carrier_Clamps.stl){ .stl-download } | 4 | - |

1. Slide the **ConnectorBoardv3 assembly** in the inner most slot and attach the Powersupply wires. Input terminals should face downwards toward the powersupply.
2. Plug in the USB cable from the LED strip and the USB C cable for the raspberry pi.
3. Connect the LED wires to the connector board terminals. Clip the cables in the **ConnectorBoardv3_Carrier** to ensure maximal distance between + and - wires.
4. Install the dupont-connector wires for the connector board.
5. Pinch the carrier clamps with two fingers and place them below and above the **ConnectorBoardv3 assembly** to fix its position. Ideally the board sits between the first and second stack.
6. Slide in the **Pi5 assembly** in the inner most slot. Optional: can be positioned in the small pocket behind the inner most slot for a static / non movable position.
7. Connect the USB-C powersupply, both camera ribbon cables, and the dupont-connector wires from the connector board and flight cam to the Pi5.
8. Pinch the carrier clamps with two fingers and place them below and above the **Pi5 assembly** to fix its position. Ideally the board sits in the upper most stack.
9. Visually inspect the wiring. All cables in the right terminals? Nothing pinched or squeezed? Sufficient spacing between the LED cables?

!!! note
    There are alternative **Pi5** mounts available. This version is meant for wireless Pi access only. If you need to access the pi with wires regularly, it is recommended to print and use `\Enclosure Version 3\Part\Print\Variants\Pi5_Bagpack`, `_top` and `_bottom`. This will require additional cuts to the **Acrylic backplate**.

!!! note
    This assembly state is a good point to fire up the PiTrac for the first time as all parts are easily accessible.

---

## Cover Installation

Tools:

- 3 mm Allen key for ISO 7380-2 or 4 mm for ISO 4762
- Saw for trimming the M5 rods
- File for deburring

| Part | Qty | Notes |
|------|-----|-------|
| Stack_Module_Cover_forInserts assembly | 1 | - |
| M5 x 12 mm sleeve nut | 4 | - |
| ISO 4032 M5 nut | 4 | alternative to sleeve nuts |
| ISO 10511 M5 lock nut | 4 | lock preferred, ISO 4032 will work as well |
| M5x306 mm rod | 4 | trim to 306 mm, or longer (318 mm) for normal nuts |
| [Spacer.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Spacer.stl){ .stl-download } | 4 | - |
| M5 washer | 4 | alternative to sleeve nuts |
| ISO 7380-2 M5x15 mm screw | 4 | 10-15 mm; ISO 4762 optional |
| Acrylic Shankshield | 1 | - |
| Acrylic Backplate | 1 | - |

**Stack_Module_Cover on 4th stack**

1. Pre-tap the upper **Stack_Module** holes.
2. Insert four spacers into the **Camera Stack Module Assembly** (for alignment).
3. Mount the **Stack_Module_Cover** with **4x M5x15 mm screws**.
4. Slide in the **Acrylic Shankshield** and **Acrylic Backplate**.
5. Cut **rods** to 306 mm and deburr. (318 mm optional)
6. Thread **ISO 10511 M5 lock nuts** onto the **rods** and insert them from below into the **PSU Stack Module** (nuts must seat in the hex pockets).
7. Ensure the rods stand out ~ 2mm at the bottom of the **PSU Stack Module**.
8. Install **sleeve nuts** on the top end at the **Stack_Module_Cover**.
    - or: Install washers and nuts on the top end at the **Stack_Module_Cover**.

!!! note
    Sleeve nuts on the cover are more aesthetic -- this requires shorter rods.

!!! note
    Alternative to the M5 rods, just four ISO 4762 M5x35 mm screws can be used in the Stack_Module_PSU. (more for a prototype setup where regular disassembly is expected)

---

## Feet

Tools:

- Superglue

| Part | Qty | Notes |
|------|-----|-------|
| [Foot.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Foot.stl){ .stl-download } | 4 | - |
| ISO 4032 M5 nut | 4 | - |

1. Glue the nuts into the **feet**.
2. Wait for the glue to be fully cured.
3. Thread the **feet** onto the M5 rods of the full assembly. Turn them all the way up and adjust as needed.
