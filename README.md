# Anomaly
Anomaly is a web-app for visual object generation and interaction.

Used stack: HTML, CSS3, Javascript - JQuery (+UI) - js-cookie

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
- X axis: affects **interval**.
- Y axis: affects **rotation**.
These can be disabled via menu options **Rotation MouseX** and **Interval Mouse Y**.

Randomization:
- Objects can be randomized by interval, color mode, rotation and position.
- Randomization function is called after every **randomEvery** objects created. By default, **randomEvery = 1**.

Presets:
- Presets are stored in cookies. Default (demo) presets are loaded if **loadDemoPresets** is set to **true**. Variable **demoPresetJSON** needs to be populated with JSON formatted array of preset objects.
```
	var demoPresetJSON = '[{"menu":true,"fullStop":false,"currentColorMode":3,"lockCursor":true,"interval":0.2,"intervalMouseMode":false,"rotationMouseMode":false,"rotationValue":65,"animationTimer":7.5,"destructTimer":3000,"currentMouseX":50,"currentMouseY":50,"randomRotation":true,"randomInterval":false,"randomLocation":false,"randomColors":false,"randomEvery":1}]';
```
- Current group of settings can be saved using **Add new preset**.
- Selected preset can be removed using **Remove selected preset**.

Menu: 
- Menu can be hidden via **menu** variable, shown and hidden using arrow key, shown via HOME (page) button.
- Arrow keys: navigate the menu with **UP** and **DOWN**. Change boolean variables with **LEFT** and **RIGHT** arrow keys.
- Full stop: Stops the object generation.
- Follow cursor: Objects are generated at mouse position.

---

Contact me on Telegram: [@denisoroc](https://t.me/denisoroc)
