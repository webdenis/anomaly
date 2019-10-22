# Anomaly
Anomaly is a web-app for visual object generation and interaction.

Used stack: HTML, CSS3, Javascript & JQuery (+UI)

Demo: https://webdenis.github.io/anomaly/

## Functionality
Objects:
- are created at a set interval (adjustable), or random **(INTERVAL)**
- can be colored using 1 of the modes, or randomly **(COLOR MODE)**
- are rotated, adjustable or random **(ROTATION)**
- appear at (follow) cursor position, appear at locked or random position **(POSITION)**
- animation uses Animation speed, adjustable **(ANIMATION SPEED)**
- are destroyed after set auto-destruct time. **(DESTRUCT TIMER)**

**WARNING: Long auto-destruct timer WILL negatively affect the performance!** 

Default mouse interaction, moving mouse in:
- X axis: affects **interval**. This can be disabled by ticking the checkbox next to the interval slider.
- Y axis: affects **rotation**. This can be disabled by ticking the checkbox next to the rotation slider.

Randomization:
- Objects can be randomized by interval, color mode, rotation and position.
- Randomization function is called after every **randomEvery** objects created. By default, **randomEvery = 1**.

Menu: 
- Menu can be hidden via **menu** variable, shown and hidden using arrow key, shown via HOME (page) button.
- Arrow keys: navigate the menu with **UP** and **DOWN**. Change boolean variables with **LEFT** and **RIGHT** arrow keys.
- Full stop: Stops the object generation.
- Locking: Current object generation position, rotation and interval can be locked via menu.

---

Contact me on Telegram: [@denisoroc](https://t.me/denisoroc)
