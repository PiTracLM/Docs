---
title: Roadmap
description: PiTrac roadmap explaining the current Compute Board and Version 2 enclosure crossroads, single-Pi operation, build recommendations, and upcoming features.
---

# Roadmap

Where's the PiTrac project headed? What version should I build right now? Should I wait for some new feature or development before buying parts or pulling out the soldering iron?

All good questions. This document will try to answer them. That said, much of the roadmap is unknown because the project is evolving with every contribution that folks make.

Please submit new ideas in the [#feature-wishlist-discussion](https://discord.com/channels/1324384654731509770/1325494997285343357) area of the [PiTrac Discord Server](https://discord.gg/vGuyAAxXJH).

---

## 1. Where We Are Now

Currently, PiTrac is at a few crossroads.

### Hardware Crossroad

We're working to move from a system built by cobbling together a bunch of off-the-shelf (OTS) parts to a more streamlined, custom system. Primarily, this system will be enabled by developing a PiTrac "Compute Board." That printed circuit board will contain all the power-adapters, network connections, strobe-light switching and other electronics that PiTrac needs. The board will probably cost US $80 or more (populated except for Pi's), but should reduce the overall cost through a higher degree of integration that removes the need for separate power adapters, an OTS LED driver, etc.

The Compute Board system will have a single power connection instead of what currently is usually a bulky power strip with a half-dozen AC power adapters plugged into it. The Compute Board will have plug-in sockets to hold and connect one or two Raspberry Pi 5 compute modules. The main challenge right now is that the Compute Board is pretty complex, will require a manufacturing partner, and will likely still be several months out before it's done.

At the same time, some folks will always enjoy putting things together themselves with parts they can configure, re-use and re-purpose. This is still the only option that is currently available. The only "custom" hardware for this option is a small "Connect Board" that folks can have manufactured (or purchased from other builders) for a few dollars. We'd like to always continue to support both options.

### Enclosure Crossroad

The newest enclosure ("Version 2") is much more streamlined than the original:

![Version 2 Enclosure](https://github.com/user-attachments/assets/24271598-5d8e-49e1-bd36-f2859efe7523)

We expect most folks will migrate to Version 2 regardless of whether they ultimately wait to use the future Compute Board and Pi compute modules or if they build the system from individual Pi 5 single board computers (SBCs), an LED driver, and the Connector Board.

The Version 2 enclosure will someday house the self-contained Compute Board with a single power supply. But the Version 2 enclosure can also support builds using OTS parts instead of the Compute Board.

This second option typically houses the large LED driver in the base of the system, with several AC power adapters kept externally. To go that way, you'll need an enclosure "tower" variant that is fitted for the separate Pi 5 SBCs. See [the Tower-Connector-Board-Variant](https://github.com/pitraclm/pitrac/tree/main/3D%20Printed%20Parts/Enclosure%20Version%202/Tower-Connector-Board-Variant).

![Tower Variant](https://github.com/user-attachments/assets/d040da0a-5363-475d-8114-5715e5935a62)

!!! note
    For some LED drivers, the basebox dimensions may have to be enlarged to fit those drivers, as they are larger than the Meanwell 24V power supply that the Version 2 enclosure was originally designed to hold.

### Single-Pi Operation

With some help from the Raspberry Pi folks, the system now runs on just a single Raspberry Pi 5 SBC connected to both PiTrac cameras. We expect almost everyone to go with this option to save money and reduce complexity -- even for folks who have already built (or are building) their PiTracs with two Pi's. However, the possibility of a PiTrac with stereoscopic vision is likely to still require two Pi 5's. Don't give your currently-extra Pi away!

---

## 2. What Should I Build Now?

### If you want to get building right now

Likely best to build a Version 2 enclosure using the original Connector Board with a single Pi 5 SBC and with an external LED driver and power adapters.

- It might not be as compact/pretty, but the result should continue to be supported for a long time to come
- The LED driver will be unnecessary someday when the Compute Board is available, but that won't happen for months, and the cost of the Compute Board and a Pi 5 compute module will be greater than the cost of the LED driver

### If you're happy to wait

The future Compute Board with the Version 2 enclosure will be pretty and pretty awesome. The cost should be minimized here, too. Though wouldn't it be fun to start building a PiTrac now?

### If you're looking to experiment

Same as option one. And consider just taking the existing 3D parts you most need and coming up with your own enclosure!

---

## 3. Where We Are Going

The following are new features, ideas, and potential areas of focus for PiTrac's continuing development.

### Enclosures and Physical Configuration

1. Overhead-mounted PiTrac
2. 3 or 4-camera enclosures to allow higher accuracy (at a higher price point)
3. A power-brick type outboard module that will cleanly house all the hardware that doesn't fit on the Version 2 (Connector Board) enclosure

### Hardware

1. Improve ability to drive the LED strobes with smaller circuitry better suited to the very short duty cycles in use

### Software

1. Improve the ball-circle identification process to be more accurate with respect to ball radius and in ignoring false positives
2. Implement stereoscopic camera processing
3. Improve the lens de-distortion process and make it easier to do

### Optics

1. Test and standardize on the Innomaker camera instead of the Pi version. Innomaker is much easier to modify to be externally triggered. As of July 2025 this mostly works, but there is a problem that does not allow two cameras attached to the same Pi 5 with one externally-triggered and one internally-triggered.
2. Design to use 3.6mm M12 lens to capture a wider range of movement

### Documentation

1. Catch up! Too many ideas and changes are not documented.
2. Support code-level documentation by using Doxygen tags throughout the code base
3. Organize documents into sub-folders

### Supply Chain

1. Develop better, cheaper sources for all parts used by PiTrac, and better support non-US builders

### Simulators

1. Support and integrate with any open-source golf simulators such as JaySim
2. Improve the number of commercial sims that PiTrac can integrate with
3. Improve the level of integration with other sims such as club selection

### Testing

1. Work is being done to move the architecture to a more modern footing, including automated testing that will run whenever anything is checked in
