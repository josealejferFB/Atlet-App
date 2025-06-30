import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { COLORS, FUENTE } from "../components/Theme";
import { MaterialIcons } from "@expo/vector-icons";

// Simulación de datos de usuario
const user = {
  nombre: "José",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

// Simulación de historial de viajes con avatar de conductor
const historial = [
  {
    id: "1",
    destino: "Aeropuerto Internacional",
    fecha: "28/06/2025",
    costo: "$250",
    conductor: "Carlos Pérez",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: "2",
    destino: "Centro Comercial",
    fecha: "25/06/2025",
    costo: "$80",
    conductor: "Ana Gómez",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: "3",
    destino: "Universidad",
    fecha: "20/06/2025",
    costo: "$120",
    conductor: "Luis Torres",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
  },
];

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header creativo */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.bienvenido}>Bienvenido,</Text>
            <Text style={styles.nombre}>{user.nombre}</Text>
          </TouchableOpacity>
          <Text style={styles.pregunta}>¿Hacia dónde quieres ir?</Text>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.replace("Login")}
        >
          <MaterialIcons name="logout" size={26} color={COLORS.azulOscuro} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        {/* Botón de solicitar viaje */}
        <TouchableOpacity style={styles.rideButton}>
          <View style={styles.rideButtonContent}>
            <MaterialIcons name="directions-car" size={90} color={COLORS.azulOscuro} />
            <Text style={styles.rideButtonText}>Solicitar{"\n"}Viaje</Text>
          </View>
        </TouchableOpacity>

        {/* Historial de viajes */}
        <View style={styles.historialContainer}>
          <Text style={styles.historialTitulo}>Historial de viajes</Text>
          <FlatList
            data={historial}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.historialItem}>
                <View style={styles.historialIcon}>
                  <Image
                    source={{ uri: item.avatar }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                    }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.historialDestino}>{item.destino}</Text>
                  <Text style={styles.historialFecha}>{item.fecha}</Text>
                  <Text style={styles.historialConductor}>Conductor: {item.conductor}</Text>
                </View>
                <Text style={styles.historialCosto}>{item.costo}</Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={{ color: COLORS.blanco, opacity: 0.7, textAlign: "center", marginTop: 12 }}>
                No tienes viajes aún.
              </Text>
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.azulOscuro,
    ...FUENTE,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.amarillo,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
    shadowColor: COLORS.azulOscuro,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
    position: "relative",
  },
  avatarContainer: {
    backgroundColor: COLORS.blanco,
    borderRadius: 40,
    padding: 4,
    marginRight: 18,
    shadowColor: COLORS.azulOscuro,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  textContainer: {
    flex: 1,
  },
  bienvenido: {
    fontSize: 18,
    color: COLORS.azulOscuro,
    opacity: 0.8,
    fontWeight: "600",
  },
  nombre: {
    fontSize: 26,
    color: COLORS.azulOscuro,
    fontWeight: "bold",
    marginBottom: 2,
    letterSpacing: 1,
  },
  pregunta: {
    fontSize: 16,
    color: COLORS.azulOscuro,
    opacity: 0.7,
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: COLORS.blanco,
    borderRadius: 30,
    padding: 8,
    marginLeft: 10,
    shadowColor: COLORS.azulOscuro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 30,
    paddingHorizontal: 18,
  },
  rideButton: {
    backgroundColor: COLORS.azulClaro,
    width: 160,
    height: 160,
    borderRadius: 32,
    shadowColor: COLORS.amarillo,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 30,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  rideButtonContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  rideButtonText: {
    color: COLORS.azulOscuro,
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 0.5,
    marginTop: 12,
    textAlign: "center",
  },
  historialContainer: {
    width: "92%", // Menos ancho para dar aire a los lados
    borderRadius: 18,
    padding: 0, // Sin padding para que los items ocupen todo el ancho
    marginTop: 10,
    alignSelf: "center",
    shadowColor: "transparent", // Sin sombra
    borderWidth: 0, // Sin borde
  },
  historialTitulo: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 16,
    letterSpacing: 0.5,
    alignSelf: "center",
    textShadowColor: COLORS.azulOscuro,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  historialItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.azulOscuro,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    shadowColor: COLORS.azulOscuro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: COLORS.azulClaro, // Borde azul claro para contraste sutil
  },
  historialIcon: {
    backgroundColor: "transparent", // Sin relleno azul claro
    borderRadius: 32,
    padding: 0,
    marginRight: 18,
    borderWidth: 2,
    borderColor: COLORS.blanco,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  historialDestino: {
    color: COLORS.blanco,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  historialFecha: {
    color: COLORS.blanco,
    opacity: 0.7,
    fontSize: 13,
    marginTop: 1,
  },
  historialCosto: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 12,
    textShadowColor: COLORS.azulOscuro,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  historialConductor: {
    color: COLORS.azulClaro,
    fontSize: 13,
    marginTop: 2,
    fontWeight: "bold",
  },
});