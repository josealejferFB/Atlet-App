import React from "react";
import { View, ScrollView, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Linking } from "react-native";
import BottomBar from "../components/BottomBar";
import { COLORS, FUENTE } from "../components/Theme";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const user = {
  nombre: "José",
  correo: "jose@email.com",
  telefono: "+58 424-1234567",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

export default function Profile({ navigation }) {
  const handleEditarPerfil = () => {
    alert("Función de edición de perfil no implementada en demo.");
  };

  const handleCambiarContrasena = () => {
    alert("Función de cambio de contraseña no implementada en demo.");
  };

  const handleCerrarSesion = () => {
    alert("Sesión cerrada.");
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingBottom: 120, paddingTop: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        </View>
        <Text style={styles.nombre}>{user.nombre}</Text>

        {/* Información personal mejorada */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Información personal</Text>
          <View style={styles.infoRow}>
            <Ionicons name="person-circle-outline" size={24} color={COLORS.amarillo} style={styles.infoIcon} />
            <View style={styles.infoTextBox}>
              <Text style={styles.infoLabel}>Nombre</Text>
              <Text style={styles.infoValue}>{user.nombre}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={22} color={COLORS.amarillo} style={styles.infoIcon} />
            <View style={styles.infoTextBox}>
              <Text style={styles.infoLabel}>Correo electrónico</Text>
              <Text style={styles.infoValue}>{user.correo}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={22} color={COLORS.amarillo} style={styles.infoIcon} />
            <View style={styles.infoTextBox}>
              <Text style={styles.infoLabel}>Teléfono</Text>
              <Text style={styles.infoValue}>{user.telefono}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleEditarPerfil}>
          <Ionicons name="create-outline" size={20} color={COLORS.azulOscuro} />
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCambiarContrasena}>
          <Ionicons name="key-outline" size={20} color={COLORS.azulOscuro} />
          <Text style={styles.buttonText}>Cambiar Contraseña</Text>
        </TouchableOpacity>

        <View style={styles.linksBox}>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.tuapp.com/privacidad")}>
            <Text style={styles.linkText}>Política de Privacidad</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.tuapp.com/terminos")}>
            <Text style={styles.linkText}>Términos y Condiciones</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleCerrarSesion}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
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
    width: width,
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
  infoBox: {
    backgroundColor: COLORS.azulOscuro,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: COLORS.azulClaro,
    paddingVertical: 24,
    paddingHorizontal: 18,
    width: width * 0.94, // Igual que historial de viajes
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 8,
    shadowColor: COLORS.azulOscuro,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  infoTitle: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 18,
    alignSelf: "center",
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    backgroundColor: COLORS.blanco,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    shadowColor: COLORS.azulOscuro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  infoIcon: {
    marginRight: 14,
  },
  infoTextBox: {
    flex: 1,
  },
  infoLabel: {
    color: COLORS.azulOscuro,
    fontWeight: "bold",
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 2,
  },
  infoValue: {
    color: COLORS.azulOscuro,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.amarillo,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 28,
    marginTop: 18,
    marginBottom: 0,
    alignSelf: "center",
    width: width * 0.94, // Igual que historial de viajes
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.azulOscuro,
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  linksBox: {
    marginTop: 24,
    marginBottom: 8,
    alignItems: "center",
    width: width * 0.94, // Igual que historial de viajes
    alignSelf: "center",
  },
  linkText: {
    color: COLORS.amarillo,
    textDecorationLine: "underline",
    fontSize: 15,
    marginVertical: 2,
  },
  logoutBtn: {
    backgroundColor: COLORS.azulOscuro,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 28,
    marginTop: 18,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: COLORS.azulClaro,
    width: width * 0.94, // Igual que historial de viajes
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: COLORS.azulClaro,
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    color: COLORS.amarillo,
    fontSize: 24,
    fontWeight: "bold",
    margin: 24,
  },
});