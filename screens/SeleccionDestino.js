import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  Dimensions,
} from "react-native";
import { COLORS, FUENTE } from "../components/Theme";
import { Feather, MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

const direccionesGuardadas = [
  { nombre: "Casa", direccion: "Calle Falsa 123" },
  { nombre: "Trabajo", direccion: "Av. Principal 456" },
];

const destinosSugeridos = [
  "Villa Olímpica",
  "Plaza Bolivar",
  "UNERG",
  "Traki",
  "Casa",
  "Trabajo",
];

const { width } = Dimensions.get("window");

export default function SeleccionDestino({ navigation }) {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [resultadosOrigen, setResultadosOrigen] = useState(destinosSugeridos);
  const [resultadosDestino, setResultadosDestino] = useState(destinosSugeridos);
  const [usarUbicacion, setUsarUbicacion] = useState(false);
  const [direccionNueva, setDireccionNueva] = useState("");
  const [mostrarAgregar, setMostrarAgregar] = useState(false);

  // Importación dinámica solo en móvil
  let MapView = null;
  if (Platform.OS !== "web") {
    MapView = require("react-native-maps").default;
  }

  const handleBuscarOrigen = (text) => {
    setOrigen(text);
    setMostrarAgregar(false);
    if (text.trim() === "") {
      setResultadosOrigen(destinosSugeridos);
    } else {
      setResultadosOrigen(
        destinosSugeridos.filter((d) =>
          d.toLowerCase().includes(text.toLowerCase())
        )
      );
      // Si no existe en sugeridos ni guardados, mostrar opción de agregar
      const existe = destinosSugeridos.concat(direccionesGuardadas.map(d => d.nombre)).some(d =>
        d.toLowerCase() === text.toLowerCase()
      );
      setMostrarAgregar(!existe && text.length > 2);
      setDireccionNueva(text);
    }
  };

  const handleBuscarDestino = (text) => {
    setDestino(text);
    if (text.trim() === "") {
      setResultadosDestino(destinosSugeridos);
    } else {
      setResultadosDestino(
        destinosSugeridos.filter((d) =>
          d.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  const handleSeleccionarOrigen = (valor) => {
    setOrigen(valor);
    setMostrarAgregar(false);
  };

  const handleSeleccionarDestino = (valor) => {
    setDestino(valor);
  };

  const handleUsarUbicacion = () => {
    setOrigen("Mi ubicación actual");
    setUsarUbicacion(true);
    setMostrarAgregar(false);
  };

  const handleAgregarDireccion = () => {
    // Aquí podrías guardar la dirección nueva en el backend o localStorage
    // Por ahora solo la seleccionamos como origen
    setOrigen(direccionNueva);
    setMostrarAgregar(false);
  };

  const handleConfirmar = () => {
    // Aquí podrías guardar el origen y destino y navegar a la siguiente pantalla
    navigation.replace("ConfirmacionViaje", { origen, destino });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Definir Origen y Destino</Text>

      {/* Campo de búsqueda de Origen */}
      <View style={styles.inputContainer}>
        <Feather name="search" size={20} color={COLORS.azulOscuro} />
        <TextInput
          style={styles.input}
          placeholder="Origen"
          placeholderTextColor="#03132d99"
          value={origen}
          onChangeText={handleBuscarOrigen}
        />
        <TouchableOpacity onPress={handleUsarUbicacion} style={{ marginLeft: 8 }}>
          <Ionicons name="locate" size={22} color={COLORS.amarillo} />
        </TouchableOpacity>
      </View>

      {/* Lista de Direcciones Guardadas para ORIGEN */}
      <View style={styles.guardedContainer}>
        <Text style={styles.guardedTitle}>Direcciones Guardadas</Text>
        <FlatList
          data={direccionesGuardadas}
          horizontal
          keyExtractor={(item) => item.nombre}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.guardedItem}
              onPress={() => handleSeleccionarOrigen(item.nombre)}
            >
              <FontAwesome5
                name={item.nombre === "Casa" ? "home" : "briefcase"}
                size={18}
                color={COLORS.amarillo}
              />
              <Text style={styles.guardedText}>{item.nombre}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingVertical: 6 }}
        />
      </View>

      {/* Sugerencias de Origen */}
      {origen.length > 0 && (
        <FlatList
          data={resultadosOrigen}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestion}
              onPress={() => handleSeleccionarOrigen(item)}
            >
              <MaterialIcons name="place" size={22} color={COLORS.amarillo} />
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No se encontraron coincidencias.</Text>
          }
          style={{ maxHeight: 80 }}
        />
      )}

      {/* Botón para agregar dirección nueva */}
      {mostrarAgregar && (
        <TouchableOpacity style={styles.addGuardedBtn} onPress={handleAgregarDireccion}>
          <Ionicons name="add-circle" size={20} color={COLORS.amarillo} />
          <Text style={styles.addGuardedText}>Añadir "{direccionNueva}" a Direcciones Guardadas</Text>
        </TouchableOpacity>
      )}

      {/* Campo de búsqueda de Destino */}
      <View style={styles.inputContainer}>
        <Feather name="search" size={20} color={COLORS.azulOscuro} />
        <TextInput
          style={styles.input}
          placeholder="Destino"
          placeholderTextColor="#03132d99"
          value={destino}
          onChangeText={handleBuscarDestino}
        />
      </View>

      {/* Lista de Direcciones Guardadas para DESTINO */}
      <View style={styles.guardedContainer}>
        <Text style={styles.guardedTitle}>Direcciones Guardadas</Text>
        <FlatList
          data={direccionesGuardadas}
          horizontal
          keyExtractor={(item) => item.nombre + "_destino"}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.guardedItem}
              onPress={() => handleSeleccionarDestino(item.nombre)}
            >
              <FontAwesome5
                name={item.nombre === "Casa" ? "home" : "briefcase"}
                size={18}
                color={COLORS.amarillo}
              />
              <Text style={styles.guardedText}>{item.nombre}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingVertical: 6 }}
        />
      </View>

      {/* Sugerencias de Destino */}
      {destino.length > 0 && (
        <FlatList
          data={resultadosDestino}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestion}
              onPress={() => handleSeleccionarDestino(item)}
            >
              <MaterialIcons name="place" size={22} color={COLORS.amarillo} />
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No se encontraron coincidencias.</Text>
          }
          style={{ maxHeight: 80 }}
        />
      )}

      {/* Mapa */}
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
                latitude: -34.6037,
                longitude: -58.3816,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          )
        )}
      </View>

      {/* Botón Confirmar */}
      <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmar}>
        <Text style={styles.confirmBtnText}>Confirmar Origen y Destino</Text>
      </TouchableOpacity>
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
  },
  title: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 12,
    letterSpacing: 0.5,
    alignSelf: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.blancoSuave, // Cambiado a blanco suave
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 8,
    marginTop: 4,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: COLORS.azulOscuro,
    marginLeft: 10,
    fontWeight: "bold",
  },
  guardedContainer: {
    marginBottom: 8,
    marginTop: 2,
  },
  guardedTitle: {
    color: COLORS.blanco,
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 4,
    marginLeft: 2,
  },
  guardedItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.azulOscuro, // Fondo azul oscuro
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.azulClaro,      // Borde azul claro
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
  },
  guardedText: {
    color: COLORS.blanco,
    fontSize: 15,
    marginLeft: 8,
    fontWeight: "bold",
  },
  addGuardedBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.azulOscuro, // Fondo azul oscuro
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.azulClaro,      // Borde azul claro
    padding: 10,
    marginBottom: 8,
    marginTop: 2,
    alignSelf: "flex-start",
  },
  addGuardedText: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 15,
  },
  suggestion: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.azulClaro,
    borderRadius: 12,
    padding: 12,
    marginBottom: 6,
    marginTop: 2,
  },
  suggestionText: {
    color: COLORS.blanco,
    fontSize: 16,
    marginLeft: 12,
    fontWeight: "bold",
  },
  emptyText: {
    color: COLORS.blanco,
    opacity: 0.7,
    textAlign: "center",
    marginTop: 10,
  },
  mapContainer: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 18,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  confirmBtn: {
    backgroundColor: COLORS.amarillo,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 18,
  },
  confirmBtnText: {
    color: COLORS.azulOscuro,
    fontWeight: "bold",
    fontSize: 17,
  },
});