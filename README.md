# adapt-hide

An extension to hide components on device sizes

## Installation

* Add the following to `components.json`:
```json
"_hideOn": "small medium large"
```
* Copy the extension folder into the src > extensions directory and run an appropriate Grunt task.

###Notes

Makes components ``_isAvailable: false`` added ``display-none`` class to component div.