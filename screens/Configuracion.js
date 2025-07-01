import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import BottomBar from "../components/BottomBar";
import { COLORS, FUENTE } from "../components/Theme";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Configuracion({ navigation }) {
  return (
    <View style={styles.container}>
      <Ionicons name="settings" size={60} color={COLORS.amarillo} style={{ marginBottom: 24 }} />
      <Text style={styles.title}>Configuración</Text>
      <Text style={styles.subtitle}>Personaliza tu experiencia, cambia tus datos y ajusta tus preferencias de la app aquí.</Text>
      <BottomBar navigation={navigation} active="Configuracion" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.azulOscuro,
    alignItems: "center",
    justifyContent: "center",
    width: width,
    ...FUENTE,
  },
  title: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: 10,
    letterSpacing: 1,
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.blanco,
    fontSize: 16,
    opacity: 0.8,
    textAlign: "center",
    marginHorizontal: 20,
  },
});