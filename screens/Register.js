import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Logo from "../assets/logo.svg";
import { COLORS, FUENTE } from "../components/Theme";

export default function Register({ navigation }) {
  const [buttonAnim] = useState(new Animated.Value(1));
  const [inputFocus, setInputFocus] = useState({ user: false, email: false, pass: false });

  const handlePressIn = () => {
    Animated.spring(buttonAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.bgCircleYellow} />
      <View style={styles.bgCircleBlue} />

      <View style={styles.logoContainer}>
        <Logo width={110} height={110} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Regístrate para continuar</Text>
        <TextInput
          style={[
            styles.input,
            inputFocus.user && {
              borderColor: COLORS.amarillo,
              backgroundColor: COLORS.blanco,
            },
          ]}
          placeholder="Usuario"
          placeholderTextColor="#03132d99"
          onFocus={() => setInputFocus((f) => ({ ...f, user: true }))}
          onBlur={() => setInputFocus((f) => ({ ...f, user: false }))}
        />
        <TextInput
          style={[
            styles.input,
            inputFocus.email && {
              borderColor: COLORS.amarillo,
              backgroundColor: COLORS.blanco,
            },
          ]}
          placeholder="Correo electrónico"
          placeholderTextColor="#03132d99"
          keyboardType="email-address"
          onFocus={() => setInputFocus((f) => ({ ...f, email: true }))}
          onBlur={() => setInputFocus((f) => ({ ...f, email: false }))}
        />
        <TextInput
          style={[
            styles.input,
            inputFocus.pass && {
              borderColor: COLORS.amarillo,
              backgroundColor: COLORS.blanco,
            },
          ]}
          placeholder="Contraseña"
          placeholderTextColor="#03132d99"
          secureTextEntry
          onFocus={() => setInputFocus((f) => ({ ...f, pass: true }))}
          onBlur={() => setInputFocus((f) => ({ ...f, pass: false }))}
        />

        <Animated.View style={{ transform: [{ scale: buttonAnim }] }}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 18 }}>
          <Text style={{ color: COLORS.amarillo, fontWeight: "bold" }}>
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.azulOscuro,
    alignItems: "center",
    justifyContent: "flex-start",
    ...FUENTE,
  },
  bgCircleYellow: {
    position: "absolute",
    top: -120,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: COLORS.blanco,
    borderWidth: 5,
    backgroundColor: COLORS.amarillo,
    opacity: 0.25,
    zIndex: 0,
  },
  bgCircleBlue: {
    position: "absolute",
    bottom: -120,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: COLORS.blanco,
    borderWidth: 5,
    backgroundColor: COLORS.azulClaro,
    opacity: 0.25,
    zIndex: 0,
  },
  logoContainer: {
    marginTop: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blanco,
    borderRadius: 70,
    width: 120,
    height: 120,
    alignSelf: "center",
    shadowColor: COLORS.amarillo,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 2,
  },
  formContainer: {
    marginTop: 40,
    width: "85%",
    backgroundColor: COLORS.azulOscuro + "CC",
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.amarillo,
    marginBottom: 6,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.blanco,
    marginBottom: 22,
    opacity: 0.8,
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: COLORS.blancoSuave,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.blancoSuave,
    fontSize: 16,
    color: COLORS.azulOscuro,
  },
  button: {
    backgroundColor: COLORS.amarillo,
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 14,
    marginTop: 10,
    shadowColor: COLORS.blanco,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: COLORS.azulOscuro,
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
});