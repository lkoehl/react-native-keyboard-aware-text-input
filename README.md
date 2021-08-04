# react-native-keyboard-aware-text-input

A simple component for a keyboard aware **mutliline** TextInput. The TextInput will shrink to fit entirly on the screen at all times. Animations are done with `react-native-reanimated` to give a buttery smooth feeling.

<img src="demo.gif" width="250">

## Demo

A demo is availabe as [snack](https://snack.expo.dev/@lkoehl/f9383d). Go take a bite.

## Installation

Using yarn:

```bash
yarn add react-native-keyboard-aware-text-input
```

Using npm:

```bash
npm install react-native-keyboard-aware-text-input
```

## Props

| name           | description                                                                                        | default         |
| -------------- | -------------------------------------------------------------------------------------------------- | --------------- |
| containerStyle | Style the container however you like. Make it look beautiful.                                      | `{flexGrow: 1}` |
| inputStyle     | Style your TextInput however you like it. Make it look beautiful.                                  | `{}`            |
| offset         | Offset for the keyboard avoidance. Use a negative offset to account for views under the TextInput. | `0`             |

## License

MIT
