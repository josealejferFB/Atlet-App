import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import { COLORS, FUENTE } from "../components/Theme";
import { MaterialIcons, FontAwesome5, Ionicons, Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomBar from "../components/BottomBar";

const user = {
  nombre: "José",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

// Simulación de conductores activos/en viaje
const conductores = [
  {
    id: "1",
    nombre: "Carlos",
    lat: 19.4326,
    lng: -99.1332,
    estado: "activo",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: "2",
    nombre: "Ana",
    lat: 19.436,
    lng: -99.14,
    estado: "en viaje",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

export default function Home({ navigation }) {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [viajeEnCurso, setViajeEnCurso] = useState(null);
  const insets = useSafeAreaInsets();

  // Importación dinámica solo en móvil
  let MapView = null;
  let Marker = null;
  if (Platform.OS !== "web") {
    MapView = require("react-native-maps").default;
    Marker = require("react-native-maps").Marker;
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* Mapa */}
      <View style={styles.mapContainer}>
        {Platform.OS === "web" ? (
          <View style={[styles.map, { alignItems: "center", justifyContent: "center" }]}>
            <Text style={{ color: "#888", fontWeight: "bold" }}>
              El mapa solo está disponible en la app móvil
            </Text>
          </View>
        ) : (
          MapView && Marker && region && (
            <MapView
              style={styles.map}
              region={region}
              showsUserLocation
              loadingEnabled
            >
              {conductores.map((c) => (
                <Marker
                  key={c.id}
                  coordinate={{ latitude: c.lat, longitude: c.lng }}
                  title={c.nombre}
                  description={c.estado === "activo" ? "Disponible" : "En viaje"}
                  pinColor={c.estado === "activo" ? COLORS.amarillo : COLORS.azulClaro}
                >
                  <Image
                    source={{ uri: c.avatar }}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      borderWidth: 2,
                      borderColor: COLORS.blanco,
                    }}
                  />
                </Marker>
              ))}
            </MapView>
          )
        )}
        {/* Barra de búsqueda de destino */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate("SeleccionDestino")}
        >
          <Feather name="search" size={22} color={COLORS.azulOscuro} />
          <Text style={styles.searchText}>¿A dónde vamos?</Text>
        </TouchableOpacity>
        {/* Tarjeta de viaje en curso */}
        {viajeEnCurso && (
          <View style={styles.viajeCard}>
            <Image source={{ uri: viajeEnCurso.avatar }} style={styles.viajeAvatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.viajeEstado}>{viajeEnCurso.estado}</Text>
              <Text style={styles.viajeDestino}>{viajeEnCurso.destino}</Text>
              <Text style={styles.viajeConductor}>Conductor: {viajeEnCurso.conductor}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="close-circle" size={28} color={COLORS.amarillo} />
            </TouchableOpacity>
          </View>
        )}
        {/* Botón flotante de solicitar viaje */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("SeleccionDestino")}
        >
          <MaterialIcons name="directions-car" size={32} color={COLORS.azulOscuro} />
          <Text style={styles.fabText}>Solicitar Viaje</Text>
        </TouchableOpacity>
      </View>
      <BottomBar navigation={navigation} active="Home" />
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.azulOscuro,
    ...FUENTE,
    position: "relative",
  },
  mapContainer: {
    width: "100%",
    height: 750, // Tamaño grande del mapa
    position: "relative",
    justifyContent: "center", // Centra verticalmente el contenido
    alignItems: "center",     // Centra horizontalmente el contenido
    zIndex: 1,
  },
  map: {
    width: "95%", // Opcional: para que el mapa no llegue a los bordes
    height: "100%",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  searchBar: {
    position: "absolute",
    top: 48,
    left: 24,
    right: 24,
    backgroundColor: COLORS.blanco,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: COLORS.azulOscuro,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
  },
  searchText: {
    color: COLORS.azulOscuro,
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "bold",
    opacity: 0.8,
  },
  fab: {
    position: "absolute",
    bottom: 32 + 70, // Encima de la barra de navegación
    alignSelf: "center",
    backgroundColor: COLORS.amarillo,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 28,
    shadowColor: COLORS.azulOscuro,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 10,
  },
  fabText: {
    color: COLORS.azulOscuro,
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 10,
  },
  bottomBar: {
    width: "100%",
    height: 70,
    backgroundColor: COLORS.azulOscuro,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: COLORS.azulOscuro,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 10,
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
  viajeCard: {
    position: "absolute",
    top: 110,
    left: 24,
    right: 24,
    backgroundColor: COLORS.blanco,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    shadowColor: COLORS.azulOscuro,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 20,
  },
  viajeAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
    borderWidth: 2,
    borderColor: COLORS.amarillo,
  },
  viajeEstado: {
    color: COLORS.azulOscuro,
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 2,
  },
  viajeDestino: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
  },
  viajeConductor: {
    color: COLORS.azulClaro,
    fontSize: 13,
    fontWeight: "bold",
  },
});