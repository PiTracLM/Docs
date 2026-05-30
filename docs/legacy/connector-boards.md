---
title: Legacy Connector Boards
description: Details on the deprecated V1 and V2 PiTrac Connector Boards and the original IRLED board, preserved for builders with older hardware.
---

# Legacy Connector Boards

The Connector Board is the central hub of your PiTrac. It handles connections between the Raspberry Pi computers and the strobe light while also providing regulated power for the IR LED array.

!!! note "Building new?"
    New builds should use the current V3 Connector Board. See [PCB Assembly](../hardware/pcb-assembly.md) for ordering and assembly instructions. The boards below are deprecated and documented here for builders who already have them.

## V2 - Dual Pi5 Connector Board (Deprecated)

The V2 board is a complete redesign focused on simplification and cost reduction.

**What it does:**

- Connects two Pi units safely with shared power (no opto-couplers needed)
- Provides adjustable boost converter output (~15V to ~42V range)
- Stores energy in large caps for strobe pulses
- Adjustable LED current draw (supports various IR LED configurations)
- Hardware-enforced 10% duty cycle for thermal protection (dual 555 timers)
- Replaces several power supplies with a single +5V input

**What changed from V1:**

The original board was designed to connect two Raspberry Pi units with separate AC/DC supplies and opto-coupler isolation. This protected them from power switching issues that can kill a Pi. The V1 board works, but needed better integration to reduce system cost.

V2 moves to a single AC/DC supply, eliminating the need for opto-couplers by safely sharing power between Pi units. The integrated boost converter and LED driver circuit replace several external power supplies. All told, you go from multiple power supplies (including the LED driver) to a single +5V supply.

!!! warning "Strobe shut-off issue on early V2 boards"
    The initial version of the V2 board had an issue where the strobe light would not turn off completely or quickly enough after each pulse. If you have a V2 board, see [V2 Board Modification](v2-board-modification.md) for the fix.

## V1 - Original Connector Board (Deprecated)

If you have a V1 board, it works fine. Just follow V1-specific instructions. If you're building new, use the V3 board.

## IRLED Board

The original LED array is becoming expensive and challenging to source. The IRLED board provides a custom replacement using LEDs available in distribution.

### IRLED (Deprecated)

Only works with the more expensive LED PN SST-10-IRD-B90H-S810 ([DigiKey](https://www.digikey.com/en/products/detail/luminus-devices-inc/SST-10-IRD-B90H-S810/13557593)). Uses 10 LEDs in a 5S2P configuration to provide substantial illumination.

The current IRLED2 board fixes a footprint mistake from a last-minute LED change. See [PCB Assembly](../hardware/pcb-assembly.md) for the current board.

## Configuring PiTrac

You'll need to tell PiTrac which version of the Connection Board you are using. This is done in the Configuration screen in the UI. Before you run the PiTrac system for the first time, set the board type appropriately.
