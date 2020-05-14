# adapt-hide

An extension to hide articles/blocks/components on device sizes

## Installation

* Add the following to the article/block/component:
```json

"_hide": {
  "_isEnabled": true,
  "_isDynamic": true,
  "_onMediaQuery": "(min-width: 768px)",
  "_comment": "tablet / desktop size"
}

"_hide": {
  "_isEnabled": true,
  "_isDynamic": true,
  "_onMediaQuery": "(max-width: 767px)",
  "_comment": "mobile size"
}

"_hide": {
  "_isEnabled": true,
  "_isDynamic": true,
  "_onClasses": ".os-android, .os-ios"
}


"_hide": {
  "_isEnabled": true,
  "_isDynamic": true,
  "_proxyId": "c-100"
}

```
* Copy the extension folder into the src > extensions directory and run an appropriate Grunt task.

### References
* [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)

### Classes
```
.iphone
.ipad
.ipod
.os-ios
.os-android
.os-windows
.ie
.edge
.firefox
.chrome
.size-small
.size-medium
.size-large
.orientation-landscape
.orientation-portrait
```

### Notes

* Makes components ``_isAvailable: false``
* Adds ``display-none`` class to component div
* Refreshes PLP. ``_showPageCompletion: false`` should be set in *course.json* for the **_pageLevelProgress** object. Failure to set this can result in the PLP showing as incomplete for returning sessions,  even though all visible components are marked as completed.
* Completes ``_proxyId`` model
* `_isDynamic` = Update on resize

### Effect
* Stops article/block/component counting towards completion
* Removes component from PLP
* Hides component visually

### Known Issues
* IE8 videos will not work. They will stop the page from loading as the video needs to be onscreen to be in "ready" state.
* onMediaQuery isn't supported in <=IE9
* The Force Load extension should be disabled for PLP to update correctly.

