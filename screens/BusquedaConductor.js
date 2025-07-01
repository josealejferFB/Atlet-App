import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { COLORS, FUENTE } from "../components/Theme";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function BusquedaConductor({ navigation }) {
  const [buscando, setBuscando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBuscando(false);
    }, 5000); // 5 segundos de búsqueda simulada
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Ionicons name="car-sport" size={60} color={COLORS.amarillo} style={{ marginBottom: 24 }} />
      <Text style={styles.title}>Buscando conductor...</Text>
      <Text style={styles.subtitle}>Estamos buscando un conductor para tu viaje</Text>
      {buscando ? (
        <ActivityIndicator size="large" color={COLORS.amarillo} style={{ marginVertical: 32 }} />
      ) : (
        <View style={styles.foundContainer}>
          <Ionicons name="checkmark-circle" size={48} color={COLORS.amarillo} style={{ marginBottom: 8 }} />
          <Text style={styles.foundText}>¡Conductor encontrado!</Text>
        </View>
      )}

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.replace("Home")}
        >
          <Text style={styles.cancelBtnText}>Cancelar Viaje</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.acceptBtn,
            buscando && { backgroundColor: COLORS.azulClaro, opacity: 0.6 },
          ]}
          onPress={() => {
            if (!buscando) {
              // Aquí podrías navegar a la pantalla de viaje en curso
              navigation.replace("ViajeAsignado");
            }
          }}
          disabled={buscando}
        >
          <Text style={styles.acceptBtnText}>Aceptar ATLET</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.azulOscuro,
    alignItems: "center",
    justifyContent: "center",
    width: width,
    paddingHorizontal: 18,
    ...FUENTE,
  },
  title: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.blanco,
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 24,
    textAlign: "center",
  },
  foundContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  foundText: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 4,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    width: "100%",
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: COLORS.azulClaro,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    marginRight: 8,
  },
  cancelBtnText: {
    color: COLORS.blanco,
    fontWeight: "bold",
    fontSize: 16,
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: COLORS.amarillo,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    marginLeft: 8,
  },
  acceptBtnText: {
    color: COLORS.azulOscuro,
    fontWeight: "bold",
    fontSize: 16,
  },
});