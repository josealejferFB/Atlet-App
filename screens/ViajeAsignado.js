import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
} from "react-native";
import { COLORS, FUENTE } from "../components/Theme";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Datos simulados de conductor y vehículo
const conductor = {
  nombre: "Carlos Pérez",
  calificacion: 4.8,
  foto: "https://randomuser.me/api/portraits/men/45.jpg",
  telefono: "+58 424-1234567",
  vehiculo: {
    marca: "Toyota",
    modelo: "Corolla",
    color: "Blanco",
    placa: "AB123CD",
  },
  tiempoLlegada: "3 min",
};

export default function ViajeAsignado({ navigation }) {
  // Importación dinámica solo en móvil
  let MapView = null, Polyline = null, Marker = null;
  if (Platform.OS !== "web") {
    MapView = require("react-native-maps").default;
    Polyline = require("react-native-maps").Polyline;
    Marker = require("react-native-maps").Marker;
  }

  // Coordenadas simuladas
  const origenUsuario = { latitude: -34.6037, longitude: -58.3816 };
  const conductorCoord = { latitude: -34.6015, longitude: -58.3800 };
  const ruta = [
    conductorCoord,
    { latitude: -34.6025, longitude: -58.3808 },
    origenUsuario,
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conductor en Camino</Text>

      {/* Mini-mapa */}
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
                latitude: (origenUsuario.latitude + conductorCoord.latitude) / 2,
                longitude: (origenUsuario.longitude + conductorCoord.longitude) / 2,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
              }}
            >
              <Marker coordinate={conductorCoord} title="Conductor" pinColor={COLORS.amarillo}>
                <Image
                  source={{ uri: conductor.foto }}
                  style={{ width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: COLORS.blanco }}
                />
              </Marker>
              <Marker coordinate={origenUsuario} title="Tú" pinColor={COLORS.azulClaro}>
                <Ionicons name="person" size={28} color={COLORS.azulClaro} />
              </Marker>
              <Polyline coordinates={ruta} strokeColor={COLORS.amarillo} strokeWidth={4} />
            </MapView>
          )
        )}
      </View>

      {/* Datos del conductor */}
      <View style={styles.driverRow}>
        <Image source={{ uri: conductor.foto }} style={styles.driverPhoto} />
        <View style={{ flex: 1, marginLeft: 14 }}>
          <Text style={styles.driverName}>{conductor.nombre}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}>
            <FontAwesome5 name="star" size={15} color={COLORS.amarillo} />
            <Text style={styles.driverRating}>{conductor.calificacion.toFixed(1)}</Text>
          </View>
        </View>
      </View>

      {/* Detalles del vehículo */}
      <View style={styles.vehicleRow}>
        <MaterialIcons name="directions-car" size={22} color={COLORS.amarillo} />
        <Text style={styles.vehicleText}>
          {conductor.vehiculo.marca} {conductor.vehiculo.modelo} - {conductor.vehiculo.color} - Placa: {conductor.vehiculo.placa}
        </Text>
      </View>

      {/* Tiempo estimado */}
      <View style={styles.arrivalRow}>
        <Ionicons name="time" size={20} color={COLORS.amarillo} />
        <Text style={styles.arrivalText}>Llega en {conductor.tiempoLlegada}</Text>
      </View>

      {/* Botones */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.contactBtn}
          onPress={() => {
            // Aquí podrías abrir llamada o chat
            alert("Función de contacto no implementada en demo.");
          }}
        >
          <Ionicons name="call" size={20} color={COLORS.amarillo} />
          <Text style={styles.contactBtnText}>Contactar Conductor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.replace("Home")}
        >
          <Text style={styles.cancelBtnText}>Cancelar Viaje</Text>
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
    justifyContent: "center",      // Centra verticalmente
    alignItems: "center",          // Centra horizontalmente
  },
  title: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 12,
    letterSpacing: 0.5,
    alignSelf: "center",
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
  driverRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginLeft: 2,
  },
  driverPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.amarillo,
  },
  driverName: {
    color: COLORS.blanco,
    fontWeight: "bold",
    fontSize: 18,
  },
  driverRating: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 6,
  },
  vehicleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginLeft: 2,
  },
  vehicleText: {
    color: COLORS.blanco,
    fontSize: 15,
    marginLeft: 8,
    fontWeight: "bold",
    opacity: 0.9,
  },
  arrivalRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    marginLeft: 2,
  },
  arrivalText: {
    color: COLORS.amarillo,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "bold",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    width: "100%",
  },
  contactBtn: {
    flex: 1,
    backgroundColor: COLORS.azulOscuro, // Fondo azul oscuro
    borderRadius: 18,
    borderWidth: 2,
    borderColor: COLORS.azulClaro,      // Borde azul claro
    paddingVertical: 14,
    alignItems: "center",
    marginRight: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  contactBtnText: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 8,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: COLORS.amarillo,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    marginLeft: 8,
  },
  cancelBtnText: {
    color: COLORS.azulOscuro,
    fontWeight: "bold",
    fontSize: 15,
  },
});