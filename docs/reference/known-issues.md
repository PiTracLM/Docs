---
title: Known Issues
description: Current PiTrac limitations and open issues across shot detection, strobe processing, the 3D-printed enclosure, cameras, performance, and build quality.
---

# Known Issues

Current limitations and open issues in PiTrac. Items that have been resolved are removed from this list.

---

## Shot Detection

- Very low, worm-burner shots are often not analyzed correctly because the system loses the ball in the hitting mat background visual noise.
- Highly-angled shots that end up with the ball very close to or relatively far from the LM are often not processed correctly, as the ball is not well-focused.

## Strobe Image Processing

- The strobe-ball image processing is still complex and could use simplification and better documentation to make it easier to understand and maintain.

## Enclosure

- Easier-to-join enclosure halves needed -- it's hard to get to the bolts to tighten the halves together.
- The supports for the lower-power-side floor's overlap joint are difficult to remove. Printing at a different angle may help.
- The seams on the 3D printed enclosure are unsightly. More lap joints or alternative printing strategies could improve aesthetics.
- Access to the Pi(s) is difficult even with the ports.
- The inter-floor screws currently overhang into the layer interiors, which might present a safety issue. A small bump on the side of the inner wall could solve this.
- Removing the supports on the power-side floor lap joint is painful. A better design or printing approach is needed.
- Mounting the Pi(s) to a slide-in tray on rails would improve accessibility (would require longer camera ribbons).

## Cameras

- The field of focus is too narrow. A better lens might help.
- Having a high frame-rate / low shutter-time variant would be a great option for builders who don't mind paying more. This could eliminate the need for a second camera and Pi, and would also make switching between right and left-hand golfers easier. As global shutter cameras come down in price, this may be the direction the entire project takes.

## Performance

- The time between when the ball is hit and when picture-taking/strobe-pulsing starts is too long. The ball has already moved halfway across the field of view. A faster FPS camera would help.

## Documentation

- Code-level documentation (e.g. Doxygen) is not yet in place.
- UML-like class structure definitions are not yet available.

## Build Quality

- Compile warnings remain when building in Visual Studio (mostly long/int conversion type warnings).

---

## Reporting New Issues

Found something not listed here? Report it on:

- **[GitHub Issues](https://github.com/PiTracLM/PiTrac/issues)** -- For bugs and feature requests
- **[Discord Community](https://discord.gg/j9YWCMFVHN)** -- For discussion and help
