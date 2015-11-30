# adapt-hide

An extension to hide components on device sizes

## Installation

* Add the following to `components.json`:
```json
"_hideOn": "small medium large"
```
* Copy the extension folder into the src > extensions directory and run an appropriate Grunt task.

###Notes

* Makes components ``_isAvailable: false`` 
* Adds ``display-none`` class to component div 
* Refreshes PLP.

###Effect
* Stops component counting towards completion
* Removes component from PLP
* Hides component visually

###Known Issues
* IE8 videos will not work. They will stop the page from loading as the video needs to be onscreen to be in "ready" state.
