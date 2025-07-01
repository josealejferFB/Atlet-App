import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { COLORS, FUENTE } from "../components/Theme";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ConfirmacionViaje({ route, navigation }) {
  // Recibe origen y destino desde la navegación
  const { origen, destino } = route.params || {
    origen: "No definido",
    destino: "No definido",
  };

  // Simulación de datos
  const precioEstimado = "$120";
  const tiempoEstimado = "8 min";
  const metodoPago = "Tarjeta **** 1234";

  // Importación dinámica solo en móvil
  let MapView = null, Polyline = null, Marker = null;
  if (Platform.OS !== "web") {
    MapView = require("react-native-maps").default;
    Polyline = require("react-native-maps").Polyline;
    Marker = require("react-native-maps").Marker;
  }

  // Coordenadas simuladas para demo
  const origenCoord = { latitude: -34.6037, longitude: -58.3816 };
  const destinoCoord = { latitude: -34.6090, longitude: -58.3845 };
  const ruta = [
    origenCoord,
    { latitude: -34.6060, longitude: -58.3830 },
    destinoCoord,
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmación de Viaje</Text>

      {/* Origen y Destino */}
      <View style={styles.infoRow}>
        <MaterialIcons name="my-location" size={22} color={COLORS.amarillo} />
        <Text style={styles.infoText}>{origen}</Text>
      </View>
      <View style={styles.infoRow}>
        <MaterialIcons name="place" size={22} color={COLORS.amarillo} />
        <Text style={styles.infoText}>{destino}</Text>
      </View>

      {/* Mapa con ruta */}
      <View style={styles.mapContainer}>
        {Platform.OS === "web" ? (
          <View
            style={{
              flex: 1,
              backgroundColor: "#eee",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#888" }}>
              El mapa solo está disponible en la app móvil
            </Text>
          </View>
        ) : (
          MapView && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: (origenCoord.latitude + destinoCoord.latitude) / 2,
                longitude: (origenCoord.longitude + destinoCoord.longitude) / 2,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker coordinate={origenCoord} title="Origen" pinColor={COLORS.amarillo} />
              <Marker coordinate={destinoCoord} title="Destino" pinColor={COLORS.azulClaro} />
              <Polyline coordinates={ruta} strokeColor={COLORS.amarillo} strokeWidth={4} />
            </MapView>
          )
        )}
      </View>

      {/* Precio y TEA */}
      <View style={styles.row}>
        <FontAwesome5 name="money-bill-wave" size={20} color={COLORS.amarillo} />
        <Text style={styles.label}>Precio estimado:</Text>
        <Text style={styles.value}>{precioEstimado}</Text>
      </View>
      <View style={styles.row}>
        <Ionicons name="time" size={20} color={COLORS.amarillo} />
        <Text style={styles.label}>TEA:</Text>
        <Text style={styles.value}>{tiempoEstimado}</Text>
      </View>

      {/* Método de pago */}
      <TouchableOpacity style={styles.paymentRow}>
        <FontAwesome5 name="credit-card" size={20} color={COLORS.amarillo} />
        <Text style={styles.label}>Método de Pago:</Text>
        <Text style={styles.value}>{metodoPago}</Text>
        <Ionicons name="chevron-forward" size={20} color={COLORS.azulClaro} style={{ marginLeft: 8 }} />
      </TouchableOpacity>

      {/* Botones */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelBtnText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => navigation.replace("BusquedaConductor")}
        >
          <Text style={styles.confirmBtnText}>Solicitar ATLET</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.azulOscuro,
    paddingTop: 40,
    paddingHorizontal: 18,
    width: width,
    ...FUENTE,
    justifyContent: "center", // Centra verticalmente
  },
  title: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 12,
    letterSpacing: 0.5,
    alignSelf: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    marginLeft: 2,
  },
  infoText: {
    color: COLORS.blanco,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "bold",
  },
  mapContainer: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 18,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    marginLeft: 2,
  },
  label: {
    color: COLORS.blanco,
    fontSize: 15,
    marginLeft: 8,
    fontWeight: "bold",
    opacity: 0.8,
  },
  value: {
    color: COLORS.amarillo,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "bold",
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.azulOscuro, // Fondo azul oscuro
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.azulClaro,      // Borde azul claro
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 18,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: COLORS.azulOscuro, // Fondo azul oscuro
    borderRadius: 18,
    borderWidth: 2,
    borderColor: COLORS.azulClaro,      // Borde azul claro
    paddingVertical: 14,
    alignItems: "center",
    marginRight: 8,
  },
  cancelBtnText: {
    color: COLORS.azulClaro, // Texto azul claro para contraste
    fontWeight: "bold",
    fontSize: 16,
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: COLORS.amarillo,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    marginLeft: 8,
  },
  confirmBtnText: {
    color: COLORS.azulOscuro,
    fontWeight: "bold",
    fontSize: 16,
  },
});