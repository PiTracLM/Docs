---
title: Enclosure Version 3 Printing
description: STL downloads and slicer settings for every PiTrac V3 enclosure part, including preferred prints, variants, legacy parts, and part maturity level reference.
hide:
  - navigation
---

# Enclosure Version 3 / Printing

---

!!! tip "STL Files"
    Click any part name to download the STL file directly. Click the :material-cube-outline: icon to preview the part in 3D.

## Slicer Settings

Apply these settings to all parts unless the table specifies otherwise:

| Setting | Value |
|---------|-------|
| Infill | 25 % |
| Wall Line Count | 3 |
| Top/Bottom Line Count | 7 |

The per-part tables below only list settings that vary between parts: build plate orientation, adhesion, support type, and layer height.

!!! warning "Material Safety"

    It is advised to use UL94 V-0 compliant filament. PETG preferred for toughness/impact resistance. PLA will work as a cheaper alternative.

    UL94 V-0 Options: Prusament PETG V0, Sunlu ABS FR, Form Futura ABSpro - Flame Retardant, Fiberlogy PETG-V0, Spectrum Filaments FlameGuard PLA.

---

## How the tables below are organized

The V3 enclosure parts are split into three groups:

- **Parts List**: the default V3 build. Print every row.
- **Variants**: substitutes for specific Parts List rows. Print a Variant *instead of* the Parts List row it replaces, based on your build (camera focal length, Pi 5 mounting style, PSU option, etc.). Variants are not extras to add on top of the Parts List.
- **Legacy Parts List**: parts from earlier V3 revisions. Skip unless the [Assembly Guide](assembly/index.md) sends you here. The COB LED build path uses `LED_Eyeball.stl` + `LED_Clamp.stl` from this list.

See the [V3 Enclosure overview](index.md) for the full folder layout, FreeCAD source files, and the safety disclaimer.

---

## Parts List

Print every row. All R1 (Release Stable) parts. See *Part Maturity Levels* at the bottom of this page for what the maturity codes mean.

| Part | Maturity | Qty | Build Plate Face | Adhesion | Support | Layer height | Mass |
|------|----------|-----|------------------|----------|---------|--------------|------|
| [EyeScreen.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/EyeScreen.stl){ .stl-download } | R1 | 3 | inner plane face | none | none | 0.2 | 33 g |
| [5x2IRLED_Eyeball.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/5x2IRLED_Eyeball.stl){ .stl-download } | R1 | 1 | bottom ring face | none | tree - everywhere | 0.2 | ? |
| [Stack_Module_PSU_vent.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Stack_Module_PSU_vent.stl){ .stl-download } | R1 | 1 | bottom face | brim | tree - everywhere | 0.3 | ? |
| [Pi5_Carrier_vertical_3mm.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Pi5_Carrier_vertical_3mm.stl){ .stl-download } | R1 | 1 | flat face | none | none | 0.2 | ? |
| [IMX296-MPI_Eyeball_6mm_camfered.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/IMX296-MPI_Eyeball_6mm_camfered.stl){ .stl-download } | R1 | 2 | back ring face | none | tree - touching buildplate | 0.2 | 62 g |
| [Carrier_Clamps.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Carrier_Clamps.stl){ .stl-download } | R1 | 4 | plane face | none | none | 0.2 | 2.5 g |
| [ConnectorBoardv3_Carrier.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/ConnectorBoardv3_Carrier.stl){ .stl-download } | R1 | 1 | plane face | none | none | 0.2 | ? |
| [Foot.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Foot.stl){ .stl-download } | R1 | 4 | bottom face | none | none | 0.2 | 1 g |
| [LinePower_Cover.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/LinePower_Cover.stl){ .stl-download } | R1 | 1 | top face | none | normal - touching buildplate | 0.2 | 10 g |
| [Stack_Module.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Stack_Module.stl){ .stl-download } | R1 | 3 | bottom face | brim | none | 0.3 | 185 g |
| [EyeScreen_Clamp.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/EyeScreen_Clamp.stl){ .stl-download } | R1 | 3 | inner plane face | none | none | 0.2 | 30 g |
| [Ambient_LED_Screen.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Ambient_LED_Screen.stl){ .stl-download } | R1 | 1 | top face | brim | none | 0.2 | ? |
| [Spacer.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Spacer.stl){ .stl-download } | R1 | 16 | bottom face | none | none | 0.2 | 0.2 g |
| [Stack_Module_Cover_forInserts.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Stack_Module_Cover_forInserts.stl){ .stl-download } | R1 | 1 | bottom face | brim | tree - everywhere | 0.3 | ? |
| [Stack_Module_Cover_insert.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Stack_Module_Cover_insert.stl){ .stl-download } | R1 | 1 | bottom face | none | tree - everywhere | 0.2 | ? |
| [Stack_Module_Cover_LogoTee.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Stack_Module_Cover_LogoTee.stl){ .stl-download } | R1 | 1 | flat face | none | none | 0.2 | ? |
| [Stack_Module_Cover_LogoBall.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Stack_Module_Cover_LogoBall.stl){ .stl-download } | R1 | 1 | flat face | none | none | 0.2 | ? |
| [Ambient_LED_Visor.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Ambient_LED_Visor.stl){ .stl-download } | R1 | 1 | flat face | none | none | 0.3 | 27 g |

## Variants

Print one **instead of** a Parts List row when your build calls for it. Pick at most one per variant family. They substitute for main parts rather than add to them.

| Family | Replaces / role |
|--------|-----------------|
| Camera eyeball (`IMX296-MPI_Eyeball_*`) | Replaces `IMX296-MPI_Eyeball_6mm_camfered.stl`. Pick the focal length that matches your lens (2.8 mm or 6 mm, camfered or plain). |
| Pi 5 carrier (`Pi5_Carrier_*`) | Replaces `Pi5_Carrier_vertical_3mm.stl`. Pick height and hole pattern (e.g. `_3mmTroughHole` for NVMe-under-Pi). |
| PSU stack | `Stack_Module_PSU.stl` is the non-ventilated alternative to `Stack_Module_PSU_vent.stl`. |
| Stack cover | `Stack_Module_Cover.stl` / `Stack_Module_Cover_light.stl` replace `Stack_Module_Cover_forInserts.stl` (different finish or insert styles). |
| Pan-tilt mounts (`pan-tilt_*`) | Adjustable camera + LED mount system. Replaces the fixed eyeball + screen path if you want pan/tilt adjustability. |
| Pi 5 "Bagpack" (`Pi5_Bagpack*`) | Inverted Pi 5 mounting for external USB / HDMI access. Replaces the vertical Pi 5 carrier. |
| Back interface plate | `Back_Interface_Plate.stl` / `_Type_D_Bulkhead.stl`. Optional back panels for builds that need one. |
| IR filter mount | Flight cam only. Round filter uses `IRFilter_Mount_1inchround.stl`. Square filter uses the V2-era `Pi Cam Filter Holder.stl`. For non-6mm lenses or non-standard filter thicknesses, use the parameterized `Pi Cam Filter Holder - M12 Lens.stl` with the FreeCAD source. Print one matching your filter shape. |

| Part | Maturity | Qty | Build Plate Face | Adhesion | Support | Layer height | Mass |
|------|----------|-----|------------------|----------|---------|--------------|------|
| [IRFilter_Mount_1inchround.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/IRFilter_Mount_1inchround.stl){ .stl-download } | F2 | 1 | frontal face | none | none | 0.2 | 3 g |
| [Pi Cam Filter Holder.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%202/Pi-Camera-Light-Filter-Holder/Pi%20Cam%20Filter%20Holder.stl){ .stl-download } | F2 | 1 | flat face | none | none | 0.2 | ? |
| [Pi Cam Filter Holder - M12 Lens.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%202/Pi-Camera-Light-Filter-Holder%20-%20M12/Pi%20Cam%20Filter%20Holder%20-%20M12%20Lens.stl){ .stl-download } | F2 | 1 | flat face | none | none | 0.2 | ? |
| [Pi5_Carrier_3mmTroughHole.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/Pi5_Carrier_3mmTroughHole.stl){ .stl-download } | A1 | 1 | plane face | none | none | 0.2 | 13 g |
| [Pi5_Carrier_9mm.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/Pi5_Carrier_9mm.stl){ .stl-download } | P1 | 1 | plane face | none | none | 0.2 | 14 g |
| [pan-tilt_base.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/pan-tilt_base.stl){ .stl-download } | P1 | 3 | layed flat, hexagon facing up | none | normal | 0.2 | ? |
| [pan-tilt_Innomaker-mount-2p8mm.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/pan-tilt_Innomaker-mount-2p8mm.stl){ .stl-download } | P1 | 2 | large plane facing down | none | normal | 0.2 | ? |
| [pan-tilt_Innomaker-mount-6mm.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/pan-tilt_Innomaker-mount-6mm.stl){ .stl-download } | P1 | 2 | large plane facing down | none | normal | 0.2 | ? |
| [pan-tilt_LED-mount.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/pan-tilt_LED-mount.stl){ .stl-download } | P1 | 1 | large plane facing down | none | normal | 0.2 | ? |
| [IMX296-MPI_Eyeball_2p8mm.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/IMX296-MPI_Eyeball_2p8mm.stl){ .stl-download } | D1 | 2 | back ring face | none | normal - touching buildplate | 0.2 | ? |
| [Pi5_Bagpack.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/Pi5_Bagpack.stl){ .stl-download } | A1 | 1 | standing | none | normal - everywhere | 0.2 | 40 g |
| [Pi5_Bagpack_bottom.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/Pi5_Bagpack_bottom.stl){ .stl-download } | A1 | 1 | flat side down | none | normal - everywhere | 0.2 | 12 g |
| [Pi5_Bagpack_top.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/Pi5_Bagpack_top.stl){ .stl-download } | A1 | 1 | flat side down | none | normal - everywhere | 0.2 | 13 g |
| [Stack_Module_Cover_light.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/Stack_Module_Cover_light.stl){ .stl-download } | D1 | 1 | bottom face | brim | tree - everywhere | 0.3 | 120 g |
| [Pi5_Carrier_vertical_0p2mmTroughHole.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/Pi5_Carrier_vertical_0p2mmTroughHole.stl){ .stl-download } | A1 | 1 | flat face | none | none | 0.2 | ? |
| [Back_Interface_Plate.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/Back_Interface_Plate.stl){ .stl-download } | A1 | 1 | flat face | none | normal - everywhere | 0.2 | ? |
| [Stack_Module_PSU.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/Stack_Module_PSU.stl){ .stl-download } | F2 | 1 | bottom face | brim | tree - everywhere | 0.3 | 150 g |
| [IMX296-MPI_Eyeball_6mm.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/IMX296-MPI_Eyeball_6mm.stl){ .stl-download } | F2 | 2 | back ring face | none | tree - touching buildplate | 0.2 | 65 g |
| [IMX296-MPI_Eyeball_2p8mm_camfered.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/IMX296-MPI_Eyeball_2p8mm_camfered.stl){ .stl-download } | D1 | 2 | back ring face | none | normal - touching buildplate | 0.2 | ? |
| [Stack_Module_Cover.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/Stack_Module_Cover.stl){ .stl-download } | F2 | 1 | bottom face | brim | tree - everywhere | 0.3 | 200 g |
| [Pi5_Carrier_3mm.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/Pi5_Carrier_3mm.stl){ .stl-download } | F2 | 1 | plane face | none | none | 0.2 | 13 g |
| [Back_Interface_Plate_Type_D_Bulkhead.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Variants/Back_Interface_Plate_Type_D_Bulkhead.stl){ .stl-download } | P1 | 1 | flat, wider face | none | none | 0.2 | 12 g |

!!! note "Print exception"
    `Back_Interface_Plate_Type_D_Bulkhead.stl` uses **15 % infill** instead of the default 25 %.

## Legacy Parts List

Older V3 revisions, kept for builds that still use earlier hardware. The *LED Assembly (Legacy COB)* section of the [Assembly Guide](assembly/index.md) is the main reason to print from here. It pairs `LED_Eyeball.stl` with `LED_Clamp.stl` for the COB LED build path instead of the newer 5x2 IR LED board.

| Part | Maturity | Qty | Build Plate Face | Adhesion | Support | Layer height | Mass |
|------|----------|-----|------------------|----------|---------|--------------|------|
| [ConnectorBoardv0p2_Carrier.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Legacy/ConnectorBoardv0p2_Carrier.stl){ .stl-download } | D1 | 1 | plane face | none | none | 0.2 | ? |
| [PiCam_Eyeball_6mm.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Legacy/PiCam_Eyeball_6mm.stl){ .stl-download } | D1 | 1 | back ring face | none | normal - touching buildplate | 0.2 | ? |
| [PiCam_Eyeball_2p8mm.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Legacy/Picam_Eyeball_2p8mm.stl){ .stl-download } | D1 | 1 | back ring face | none | normal - touching buildplate | 0.2 | ? |
| [LED_Eyeball.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Legacy/LED_Eyeball.stl){ .stl-download } | F2 | 1 | frontal ring face | none | none | 0.2 | 32 g |
| [LED_Clamp.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Legacy/LED_Clamp.stl){ .stl-download } | F2 | 1 | back face | none | normal - touching buildplate | 0.2 | 8 g |
| [ConnectorBoardv2-mod_Carrier.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Legacy/ConnectorBoardv2-Mod_Carrier.stl){ .stl-download } | F2 | 1 | plane face | none | none | 0.2 | ? |
| [ConnectorBoardv2.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Legacy/ConnectorBoardv2_Carrier.stl){ .stl-download } | P1 | 1 | plane face | none | none | 0.2 | ? |
| [PiCam_Eyeball_6mm_camfered.stl](https://github.com/PiTracLM/PiTrac/raw/main/3D%20Printed%20Parts/Enclosure%20Version%203/Part/Print/Legacy/Picam_Eyeball_6mm_camfered.stl){ .stl-download } | D1 | 1 | back ring face | none | normal - touching buildplate | 0.2 | ? |

---

## Notes

- **Build Plate Face:** The surface that should be placed on the print bed. In doubt refer to `...\PiTrac\3D Printed Parts\Enclosure Version 3\Assets\Part pictures`
- **Adhesion:** e.g., *None*, *Skirt*, *Brim*, *Raft*. Only use if necessary, avoid if possible. Heavily depends on filament choice and printer.
- **Support:** e.g., *None*, *Tree*, *Normal*, *Touching Buildplate*, *Everywhere*. Tree-style seemingly is easier to remove.
- **Qty:** Number of required copies.
- **Stack_Module:** The stack module can be sectioned into three pieces if print duration per part is an issue. One horizontal cut 3mm above bottom, and one vertical cut in the center plane.

## Part Maturity Levels

Maturity classification for all 3D printed parts:

| Level | Name                | Description |
|-------|---------------------|------------|
| D0    | Concept             | Initial idea or early design draft. Not finalized. |
| D1    | Designed            | CAD model completed but not yet physically printed. |
| P1    | Print Verified      | Successfully printed. Geometry confirmed. |
| A1    | Assembly Verified   | Installed in assembly. Mechanical fit confirmed. |
| F1    | Function Tested     | Tested under intended operating conditions. |
| F2    | Field Validated     | Proven in real-world / extended use. |
| R1    | Release Stable      | Considered stable, fully documented, and community proven. |
