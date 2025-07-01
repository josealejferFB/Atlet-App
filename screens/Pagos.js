import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import BottomBar from "../components/BottomBar";
import { COLORS, FUENTE } from "../components/Theme";
import { FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Pagos({ navigation }) {
  return (
    <View style={styles.container}>
      <FontAwesome5 name="credit-card" size={60} color={COLORS.amarillo} style={{ marginBottom: 24 }} />
      <Text style={styles.title}>Pagos</Text>
      <Text style={styles.subtitle}>Aquí podrás gestionar tus métodos de pago y ver tu historial de transacciones.</Text>
      <BottomBar navigation={navigation} active="Pagos" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.azulOscuro,
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