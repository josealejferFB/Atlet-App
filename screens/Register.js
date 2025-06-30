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
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Logo from "../assets/logo.svg";
import { COLORS, FUENTE } from "../components/Theme";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons"; // Asegúrate de tener este import para el panda

export default function Register({ navigation }) {
  const [buttonAnim] = useState(new Animated.Value(1));
  const [inputFocus, setInputFocus] = useState({
    nombre: false,
    telefono: false,
    email: false,
    pass: false,
  });
  const [tipoCuenta, setTipoCuenta] = useState(null); // "cliente" o "conductor"
  const [licenciaUri, setLicenciaUri] = useState(null);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setLicenciaUri(result.assets[0].uri);
    }
  };

  const handleRegister = () => {
    if (tipoCuenta === "conductor") {
      navigation.replace("RegisterCar");
    } else {
      navigation.replace("Home");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.bgCircleYellow} />
      <View style={styles.bgCircleBlue} />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Logo width={110} height={110} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>Regístrate para continuar</Text>

          <TextInput
            style={[
              styles.input,
              inputFocus.nombre && {
                borderColor: COLORS.amarillo,
                backgroundColor: COLORS.blanco,
              },
            ]}
            placeholder="Nombre completo"
            placeholderTextColor="#03132d99"
            onFocus={() => setInputFocus((f) => ({ ...f, nombre: true }))}
            onBlur={() => setInputFocus((f) => ({ ...f, nombre: false }))}
          />
          <TextInput
            style={[
              styles.input,
              inputFocus.telefono && {
                borderColor: COLORS.amarillo,
                backgroundColor: COLORS.blanco,
              },
            ]}
            placeholder="Teléfono"
            placeholderTextColor="#03132d99"
            keyboardType="phone-pad"
            onFocus={() => setInputFocus((f) => ({ ...f, telefono: true }))}
            onBlur={() => setInputFocus((f) => ({ ...f, telefono: false }))}
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

          {/* Tipo de cuenta */}
          <Text style={styles.tipoCuentaLabel}>Tipo de cuenta</Text>
          <View style={styles.tipoCuentaContainer}>
            <TouchableOpacity
              style={[
                styles.tipoCuentaBtn,
                tipoCuenta === "cliente" && styles.tipoCuentaBtnActive,
              ]}
              onPress={() => setTipoCuenta("cliente")}
            >
              <MaterialIcons
                name="person"
                size={36}
                color={
                  tipoCuenta === "cliente"
                    ? COLORS.azulOscuro
                    : COLORS.amarillo
                }
              />
              <Text
                style={[
                  styles.tipoCuentaBtnText,
                  tipoCuenta === "cliente" && { color: COLORS.blanco },
                ]}
              >
                Cliente
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tipoCuentaBtn,
                tipoCuenta === "conductor" && styles.tipoCuentaBtnActive,
              ]}
              onPress={() => setTipoCuenta("conductor")}
            >
              <FontAwesome5
                name="car"
                size={32}
                color={
                  tipoCuenta === "conductor"
                    ? COLORS.azulOscuro
                    : COLORS.amarillo
                }
              />
              <Text
                style={[
                  styles.tipoCuentaBtnText,
                  tipoCuenta === "conductor" && { color: COLORS.blanco },
                ]}
              >
                Conductor
              </Text>
            </TouchableOpacity>
          </View>

          {/* Input licencia solo si es conductor */}
          {tipoCuenta === "conductor" && (
            <TouchableOpacity style={styles.licenciaBtn} onPress={pickImage}>
              <Text style={styles.licenciaBtnText}>
                {licenciaUri
                  ? "Licencia seleccionada"
                  : "Subir foto de licencia de conducir"}
              </Text>
              {licenciaUri && (
                <Image
                  source={{ uri: licenciaUri }}
                  style={styles.licenciaPreview}
                />
              )}
            </TouchableOpacity>
          )}

          <Animated.View style={{ transform: [{ scale: buttonAnim }] }}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleRegister}
            >
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginTop: 18 }}
          >
            <Text style={{ color: COLORS.amarillo, fontWeight: "bold" }}>
              ¿Ya tienes cuenta? Inicia sesión
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>ATLET</Text>
          <FontAwesome name="paw" size={38} color={COLORS.amarillo} style={{ marginTop: 6 }} />
        </View>
      </ScrollView>
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
    marginTop: 0,
    width: "90%", // Reducido el ancho para mejor visualización
    backgroundColor: COLORS.azulOscuro + "CC",
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 2,
    marginBottom: 20,
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
  tipoCuentaLabel: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  tipoCuentaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 18,
  },
  tipoCuentaBtn: {
    flex: 1,
    backgroundColor: COLORS.azulOscuro,
    borderRadius: 16,
    paddingVertical: 18,
    marginHorizontal: 6,
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.amarillo,
  },
  tipoCuentaBtnText: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
  },
  tipoCuentaBtnActive: {
    backgroundColor: COLORS.amarillo,
    borderColor: COLORS.azulOscuro,
  },
  licenciaBtn: {
    backgroundColor: COLORS.blanco,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.amarillo,
  },
  licenciaBtnText: {
    color: COLORS.azulOscuro,
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 6,
  },
  licenciaPreview: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginTop: 6,
    borderWidth: 1,
    borderColor: COLORS.azulClaro,
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
  footer: {
    width: "100%",
    alignItems: "center",
    marginTop: 0, // Antes 30, ahora más cerca del contenedor principal
    marginBottom: 18,
  },
  footerText: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 22,
    letterSpacing: 8,
    opacity: 0.9,
    marginBottom: 10, // Añade espacio entre "ATLET" y el icono paw
  },
});