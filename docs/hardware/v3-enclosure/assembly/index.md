---
title: V3 Enclosure Assembly
description: Overview of the PiTrac V3 enclosure build sequence, shared concepts, and links to each assembly phase.
---

# V3 Enclosure Assembly

The V3 enclosure build is organized into five phases. Each phase has its own page so you can resume mid-build and reference back without scrolling through the whole guide.

## Video Walkthrough

The full assembly is covered in this video:

<div class="video-wrapper" markdown>
  <iframe src="https://www.youtube.com/embed/bVOIPczu9Nk" title="PiTrac V3 Enclosure Assembly" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

---

## Before You Begin

Source all components and print all parts before you start. Each phase's page lists the specific parts and tools it needs.

- [Parts List](../../parts-list.md) covers everything to purchase: electronics, hardware, screws, and acrylic panels.
- [3D Printing](../3d-printing.md) has the STL downloads and slicer settings for all printed parts.
- [PCB Assembly](../../pcb-assembly.md) covers soldering the V3 Connector Board and IRLED2, or ordering them pre-assembled.

---

## General Notes

The design is modular. Each "stack module" is a self-contained slice of the enclosure with electronics inside. The stacks bolt to each other to form the finished tower.

Each stack provides eight potential connection points: four inner holes used to fasten adjacent stacks together with short M5 screws, and four outer through-holes that allow all stacks to be clamped together at once using threaded rods.

In most cases, using only one of these two fastening methods is sufficient. Threaded rods allow for easier assembly and disassembly. Short screws may be preferable for an initial prototype setup.

For future changes to the overall stack height, the threaded rods may need to be shortened or replaced. If you choose to assemble the stacks using only short M5 screws, see the M5x35 mm option described in the [PSU Stack Module](stack-modules.md#psu-stack-module) section.

---

## Build Sequence

<div class="grid cards" markdown>

- **[1. Eyeball Sub-Assemblies](eyeballs.md)**

    Camera, LED (5x2 IR or legacy COB), and Eyeball assemblies. Bench work that feeds into the stack modules.

- **[2. Stack Modules](stack-modules.md)**

    PSU module, two camera modules, and one LED module.

- **[3. Electronics](electronics.md)**

    Pi 5 and V3 Connector Board mounted on their carriers.

- **[4. Final Assembly](installation.md)**

    Stack the modules, wire everything, install the cover and feet.

</div>

---

## Drawing Conventions

Each section embeds a 3D orthographic render of the assembled part. Click any drawing to view it full-screen. Where a section has multiple views (line drawing, 3D render, or alternate variants), use the tabs to switch between them.
