import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import BottomBar from "../components/BottomBar";
import { COLORS, FUENTE } from "../components/Theme";

const { width } = Dimensions.get("window");

// Simulación de datos de usuario
const user = {
  nombre: "José",
  correo: "jose@email.com",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
      </View>
      <Text style={styles.nombre}>{user.nombre}</Text>
      <Text style={styles.correo}>{user.correo}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Información personal</Text>
        <Text style={styles.infoLabel}>Nombre:</Text>
        <Text style={styles.infoValue}>{user.nombre}</Text>
        <Text style={styles.infoLabel}>Correo:</Text>
        <Text style={styles.infoValue}>{user.correo}</Text>
      </View>
      <Text style={styles.title}>Perfil</Text>
      <BottomBar navigation={navigation} active="Profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.azulOscuro,
    alignItems: "center",
    paddingTop: 60,
    width: width, // Añade esto
    ...FUENTE,
  },
  avatarContainer: {
    backgroundColor: COLORS.blanco,
    borderRadius: 80,
    padding: 8,
    marginBottom: 18,
    shadowColor: COLORS.amarillo,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  nombre: {
    fontSize: 28,
    color: COLORS.amarillo,
    fontWeight: "bold",
    marginBottom: 4,
    letterSpacing: 1,
  },
  correo: {
    fontSize: 16,
    color: COLORS.blanco,
    opacity: 0.8,
    marginBottom: 24,
  },
  infoBox: {
    backgroundColor: COLORS.azulClaro,
    borderRadius: 18,
    padding: 24,
    width: "85%",
    marginTop: 20,
    shadowColor: COLORS.azulOscuro,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  infoTitle: {
    color: COLORS.azulOscuro,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 12,
    alignSelf: "center",
  },
  infoLabel: {
    color: COLORS.azulOscuro,
    fontWeight: "bold",
    marginTop: 8,
  },
  infoValue: {
    color: COLORS.azulOscuro,
    marginBottom: 4,
    marginLeft: 8,
  },
  title: {
    color: COLORS.amarillo,
    fontSize: 24,
    fontWeight: "bold",
    margin: 24,
  },
});