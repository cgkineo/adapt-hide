# adapt-hide

An extension to hide articles/blocks/components on device sizes

## Installation

* Add the following to the article/block/component:
```json
"_hideOn": "small medium large"
```
* Copy the extension folder into the src > extensions directory and run an appropriate Grunt task.

### Notes

* Makes components ``_isAvailable: false`` 
* Adds ``display-none`` class to component div 
* Refreshes PLP. ``_showPageCompletion: false`` should be set in *course.json* for the **_pageLevelProgress** object. Failure to set this can result in the PLP showing as incomplete for returning sessions,  even though all visible components are marked as completed.

### Effect
* Stops article/block/component counting towards completion
* Removes component from PLP
* Hides component visually

### Known Issues
* IE8 videos will not work. They will stop the page from loading as the video needs to be onscreen to be in "ready" state.
* The Force Load extension should be disabled for PLP to update correctly.
