import React from 'react'
import { Pressable } from 'react-native'

const FloatingButton = ({ color, icon, style, onPress }) => {
  return (
    <Pressable onPress={onPress} style={[{ backgroundColor: color, padding: 15, borderRadius: 100, position: 'absolute', zIndex: 5 }, style]}>
      {icon}
    </Pressable>
  )
}

export default FloatingButton