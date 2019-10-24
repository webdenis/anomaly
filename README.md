# Anomaly
![Anomaly Cover](https://raw.githubusercontent.com/webdenis/anomaly/master/img/cover.png)

Anomaly is a web-app for visual object generation and interaction.

Used stack: HTML, CSS3, Javascript - JQuery (+UI) - js-cookie

Demo version 0.8: https://webdenis.github.io/anomaly/

## Functionality
Objects:
- are created at a set adjustable interval **(INTERVAL)**
- are colored using selected color mode, currently four options **(COLOR MODE)**
- are rotated, speed and degree adjustable **(ROTATION)**
- appear at (follow) cursor position or locked position **(POSITION)**
- animated using adjustable Animation speed **(ANIMATION SPEED)**
- are destroyed after set adjustable auto-destruct timer. **(DESTRUCT TIMER)**

**WARNING: Long auto-destruct timer WILL negatively affect the performance!** 

Default mouse interactions; moving mouse in:
- X and Y affects **position**. This can be toggled by **LMB**.
- X axis: affects **interval**. This can be toggled by **RMB**.
- Y axis: affects **rotation**. This can be toggled by **MMB**.

These can also be toggled via menu options: **Follow cursor**, **Interval Mouse Y** and **Rotation MouseX**.

Menu: 
- can be toggled by HOME PAGE button.
- Navigate the menu with **UP** and **DOWN** arrowkeys or by left clicking the options. The current active option will be selected.
- Once option is selected, change values with **LEFT** or **RIGHT** arrow keys or by **Mouse Wheel scroll**.
- Full stop: Stops the object generation, can be toggled via END PAGE button.
- Stop on low FPS: Turns Full stop ON if FPS is detected to be lower than **minFps**, *default = 10*.
- Full list of options: Show menu, Stop, Stop on low FPS, Colors, Follow cursor, Interval Mouse Y, Interval, Rotation Mouse X, Rotation, Animation speed, Auto-destruct, Random rotation / interval / location / color, Randomize every N, Presets.

Randomization:
- Objects can be randomized by interval, color mode, rotation and position.
- Randomization function is called after every **randomEvery**, *default =  1* objects created. 

Presets:
- Presets are stored in cookies. Default (demo) presets are loaded if **loadDemoPresets** is set to **true**. Variable **demoPresetJSON** needs to be populated with JSON formatted array of preset objects.
```
ar demoPresetJSON = '[
		{"menu":true,"fullStop":false,"currentColorMode":3,"lockCursor":true,"interval":0.2,"intervalMouseMode":false,"rotationMouseMode":false,"rotationValue":65,"animationTimer":7.5,"destructTimer":3000,"currentMouseX":50,"currentMouseY":50,"randomRotation":true,"randomInterval":false,"randomLocation":false,"randomColors":false,"randomEvery":1},
		{"menu":true,"fullStop":false,"currentColorMode":3,"lockCursor":true,"interval":0.05,"intervalMouseMode":false,"rotationMouseMode":false,"rotationValue":10,"animationTimer":5.5,"destructTimer":4000,"currentMouseX":15,"currentMouseY":46,"randomRotation":false,"randomInterval":false,"randomLocation":false,"randomColors":false,"randomEvery":1},
		{"menu":true,"fullStop":false,"currentColorMode":3,"lockCursor":true,"interval":6.05,"intervalMouseMode":false,"rotationMouseMode":false,"rotationValue":71,"animationTimer":5.5,"destructTimer":4000,"currentMouseX":97,"currentMouseY":29,"randomRotation":true,"randomInterval":false,"randomLocation":true,"randomColors":true,"randomEvery":200}
		     ]';
```
- Current group of options can be saved using **Add new preset**.
- Selected preset can be removed using **Remove selected preset**.

---

Contact me on Telegram: [@denisoroc](https://t.me/denisoroc)

Web app has only been tested on latest versions of Firefox