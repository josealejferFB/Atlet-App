import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../assets/logo.svg';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const navigation = useNavigation();

  const logoScale = useRef(new Animated.Value(0)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const logoBounce = useRef(new Animated.Value(0)).current;
  const bgCircle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1.2,
        friction: 2,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(logoRotate, {
        toValue: 1,
        duration: 1800, // Menos vueltas y más rápido
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(logoBounce, {
          toValue: -30,
          duration: 500,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(logoBounce, {
          toValue: 0,
          duration: 500,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(bgCircle, {
        toValue: 1,
        duration: 1800,
        delay: 1200,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }),
    ]).start();

    const timeout = setTimeout(() => {
      navigation.replace('Home');
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  const rotate = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Solo una vuelta
  });

  const circleSize = bgCircle.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.max(width, height) * 2],
  });

  const bgColor = bgCircle.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffc825', '#03132d'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Círculo animado que cubre la pantalla */}
      <Animated.View
        style={[
          styles.circle,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: Math.max(width, height),
            backgroundColor: '#03132d',
            opacity: bgCircle,
          },
        ]}
      />
      {/* Logo animado */}
      <Animated.View
        style={{
          zIndex: 2,
          transform: [
            { scale: logoScale },
            { rotate },
            { translateY: logoBounce },
          ],
          shadowColor: '#ffc825',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 30,
          elevation: 20,
        }}
      >
        <Logo width={170} height={170} />
        {/* Efecto de destello */}
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 170,
            height: 170,
            borderRadius: 85,
            backgroundColor: '#fff',
            opacity: logoScale.interpolate({
              inputRange: [0, 1, 1.2],
              outputRange: [0, 0.15, 0],
            }),
            zIndex: 3,
          }}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -Math.max(width, height),
    marginTop: -Math.max(width, height),
    zIndex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255, 200, 37, 0.5)',
  },
});