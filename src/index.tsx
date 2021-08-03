import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native'
import Animated, {
  useSharedValue,
  Easing,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated'

const AnimatedInput = Animated.createAnimatedComponent(TextInput)

export type KeyboardAwareTextInputProps = {
  containerStyle?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
  offset?: number
} & typeof defaultProps &
  TextInputProps

const defaultProps = {
  containerStyle: {},
  inputStyle: {},
  offset: 0,
}

const KeyboardAwareTextInput = (props: KeyboardAwareTextInputProps) => {
  const [containerHeight, setContainerHeight] = useState(0)
  const [keyboardVisible, setKeyboardVisible] = useState(false)

  const inputHeight = useSharedValue(0)

  const _keyboardWillShow = (e: any) => {
    if (keyboardVisible) {
      return
    }
    let offset =
      e.startCoordinates.screenY - e.endCoordinates.screenY + props.offset
    inputHeight.value = withTiming(containerHeight - offset, {
      duration: 250,
      easing: Easing.inOut(Easing.cubic),
    })
    setKeyboardVisible(true)
  }

  const stateChanger = () => {
    setKeyboardVisible(false)
  }

  const workletState = () => {
    'worklet'
    runOnJS(stateChanger)
  }
  const _keyboardWillHide = () => {
    if (keyboardVisible) {
      return
    }
    inputHeight.value = withTiming(
      containerHeight,
      {
        duration: 250,
        easing: Easing.inOut(Easing.cubic),
      },
      (finished) => {
        if (finished) {
          workletState()
        }
      }
    )
  }

  useEffect(() => {
    if (keyboardVisible) {
      return
    }
    inputHeight.value = withTiming(containerHeight, {
      duration: 0,
      easing: Easing.out(Easing.quad),
    })
  }, [containerHeight])

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', _keyboardWillShow)
    Keyboard.addListener('keyboardWillHide', _keyboardWillHide)

    return () => {
      Keyboard.removeListener('keyboardWillShow', _keyboardWillShow)
      Keyboard.removeListener('keyboardWillHide', _keyboardWillHide)
    }
  }, [containerHeight])

  const onLayout = (e: LayoutChangeEvent) => {
    if (!keyboardVisible) {
      let height = e.nativeEvent.layout.height
      setContainerHeight(height)
    }
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: inputHeight.value,
    }
  })

  return (
    <View style={[styles.container, props.containerStyle]} onLayout={onLayout}>
      <AnimatedInput style={[animatedStyle, props.inputStyle]} {...props} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flexGrow: 1 },
})

KeyboardAwareTextInput.defaultProps = defaultProps

export default KeyboardAwareTextInput
