import React from "react";
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from "react-native";
import BottomBar from "../components/BottomBar";
import { COLORS, FUENTE } from "../components/Theme";

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

const { width } = Dimensions.get("window");

export default function HistorialViajes({ navigation }) {
  return (
    <View style={styles.container}>
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
        contentContainerStyle={{ paddingBottom: 30 }}
      />
      <BottomBar navigation={navigation} active="HistorialViajes" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.azulOscuro,
    paddingTop: 40,
    paddingHorizontal: 0, // Quita el padding horizontal
    width: width,         // Asegura el mismo ancho que las otras screens
    ...FUENTE,
  },
  historialTitulo: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 22,
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
    borderColor: COLORS.azulClaro,
  },
  historialIcon: {
    backgroundColor: "transparent",
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