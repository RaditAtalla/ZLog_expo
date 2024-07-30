import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = ({style}) => {
  return (
    <Image source={require('../assets/images/logo.png')} style={[styles.logo, style]} />
  );
};

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    // height: 100,
  },
})

export default Logo;
