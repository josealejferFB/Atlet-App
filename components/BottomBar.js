import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { COLORS, FUENTE } from "../components/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BottomBar({ navigation, active }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bottomBar, { paddingBottom: insets.bottom }]}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home")}>
        <MaterialIcons name="home" size={28} color={active === "Home" ? COLORS.amarillo : COLORS.blanco} />
        <Text style={[styles.navText, active === "Home" && { color: COLORS.amarillo }]}>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("HistorialViajes")}>
        <MaterialIcons name="history" size={26} color={active === "HistorialViajes" ? COLORS.amarillo : COLORS.blanco} />
        <Text style={[styles.navText, active === "HistorialViajes" && { color: COLORS.amarillo }]}>Mis Viajes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Profile")}>
        <MaterialIcons name="person" size={28} color={active === "Profile" ? COLORS.amarillo : COLORS.blanco} />
        <Text style={[styles.navText, active === "Profile" && { color: COLORS.amarillo }]}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Pagos")}>
        <FontAwesome5 name="credit-card" size={24} color={active === "Pagos" ? COLORS.amarillo : COLORS.blanco} />
        <Text style={[styles.navText, active === "Pagos" && { color: COLORS.amarillo }]}>Pagos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Configuracion")}>
        <Ionicons name="settings" size={26} color={active === "Configuracion" ? COLORS.amarillo : COLORS.blanco} />
        <Text style={[styles.navText, active === "Configuracion" && { color: COLORS.amarillo }]}>Config.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    width: "100%",
    backgroundColor: COLORS.azulOscuro,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: COLORS.azulOscuro,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    paddingTop: 8,
    zIndex: 100,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navText: {
    color: COLORS.blanco,
    fontSize: 12,
    marginTop: 2,
    fontWeight: "bold",
    opacity: 0.8,
  },
});