# Anomaly
![Anomaly Cover](https://raw.githubusercontent.com/webdenis/anomaly/master/img/cover.png)

Anomaly is a web-app for visual object generation and interaction.

Used stack: HTML, CSS3, Javascript - JQuery (+UI) - js-cookie

# **WARNING: PHOTOSENSITIVITY / EPILEPSY SEIZURES**

Demo version 0.9: https://webdenis.github.io/anomaly/

## Functionality
Objects:
- are created at a set adjustable interval **(INTERVAL)**
- are colored using selected color mode, currently four options **(COLOR MODE)**
- are transformed, function and speed adjustable, functions - rotate, skew X, skew Y, skew XY **(TRANSFORM)**
- appear at (follow) cursor or locked position **(POSITION)**
- animated using adjustable Animation speed **(ANIMATION SPEED)**
- are destroyed after set adjustable auto-destruct timer. **(DESTRUCT TIMER)**

**WARNING: Long auto-destruct timer WILL negatively affect the performance!** 

Default mouse interactions; moving mouse in:
- X and Y affects **position**. This can be toggled by **LMB**.
- X axis: affects **interval**. This can be toggled by **RMB**.
- Y axis: affects **transform**. This can be toggled by **MMB**.

These can also be toggled via menu options: **Follow cursor**, **Interval on Mouse Y** and **Transform on Mouse X**.

Menu: 
- can be toggled by **HOME PAGE** button.
- Navigate the menu with **UP** and **DOWN** arrowkeys or by left clicking the options. The current active setting will be selected.
- Once a setting is selected, change its values with **LEFT** or **RIGHT** arrow keys or by **Mouse Wheel scroll**.
- Stop: Stops the object generation, can be toggled by **END PAGE** button.
- Stop on low FPS: Stops the object generation if FPS is detected to be lower than **minFps**, *default = 10*.

Randomization:
- Objects can be randomized by most options: interval, color mode, transform mode and settings, position
- Randomization function is called after every **randomEvery**, *default =  1* objects created. 

Presets:
- Presets are stored in cookies. Default (demo) presets are loaded if **loadDemoPresets** is set to **true**. Variable **demoPresetJSON** needs to be populated with JSON formatted array of preset objects.
```
var demoPresetJSON = '[
		{"menu":true,"fullStop":false,"currentColorMode":3,"lockCursor":true,"interval":273.8,"intervalMouseMode":false,"transformMouseMode":false,"transformMode":1,"transformValue":5,"animationTimer":7.5,"destructTimer":2300,"currentMouseX":50,"currentMouseY":48,"randomTransform":false,"randomTransformVars":false,"randomInterval":true,"randomLocation":false,"randomColors":true,"randomAnimSpeed":false,"randomDestructTimer":false,"randomEvery":10},
		{"menu":true,"fullStop":false,"currentColorMode":3,"lockCursor":false,"interval":4.802000000000001,"intervalMouseMode":false,"transformMouseMode":false,"transformMode":1,"transformValue":10,"animationTimer":4,"destructTimer":2500,"currentMouseX":92,"currentMouseY":95,"randomTransform":false,"randomTransformVars":false,"randomInterval":false,"randomLocation":false,"randomColors":false,"randomAnimSpeed":false,"randomDestructTimer":false,"randomEvery":1}
			 ]			 
```
- Current group of settings can be saved as a new preset by clicking **Save current**.
- Selected preset can be removed using **Remove**.

---

Contact me on Telegram: [@denisoroc](https://t.me/denisoroc)

This app has only been tested on latest versions of Firefox