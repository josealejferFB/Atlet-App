import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, FlatList } from "react-native";
import BottomBar from "../components/BottomBar";
import { COLORS, FUENTE } from "../components/Theme";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const metodosIniciales = [
  { id: "1", tipo: "Tarjeta de crédito", detalle: "**** 1234" },
  { id: "2", tipo: "PayPal", detalle: "usuario@email.com" },
];

export default function Pagos({ navigation }) {
  const [metodos, setMetodos] = useState(metodosIniciales);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [mostrarFormularioTarjeta, setMostrarFormularioTarjeta] = useState(false);
  const [mostrarFormularioPaypal, setMostrarFormularioPaypal] = useState(false);

  const [numero, setNumero] = useState("");
  const [fecha, setFecha] = useState("");
  const [cvv, setCvv] = useState("");
  const [titular, setTitular] = useState("");
  const [paypalCorreo, setPaypalCorreo] = useState("");

  const handleAgregarTarjeta = () => {
    if (numero && fecha && cvv && titular) {
      setMetodos([
        ...metodos,
        {
          id: (metodos.length + 1).toString(),
          tipo: "Tarjeta de crédito",
          detalle: "**** " + numero.slice(-4),
        },
      ]);
      setNumero("");
      setFecha("");
      setCvv("");
      setTitular("");
      setMostrarFormularioTarjeta(false);
      setMostrarOpciones(false);
    }
  };

  const handleAgregarPaypal = () => {
    if (paypalCorreo) {
      setMetodos([
        ...metodos,
        {
          id: (metodos.length + 1).toString(),
          tipo: "PayPal",
          detalle: paypalCorreo,
        },
      ]);
      setPaypalCorreo("");
      setMostrarFormularioPaypal(false);
      setMostrarOpciones(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={metodos}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            <FontAwesome5 name="credit-card" size={60} color={COLORS.amarillo} style={{ marginBottom: 24, alignSelf: "center" }} />
            <Text style={styles.title}>Pagos</Text>
            <Text style={styles.subtitle}>
              Aquí podrás gestionar tus métodos de pago y ver tu historial de transacciones.
            </Text>
            <Text style={styles.sectionTitle}>Tus métodos de pago</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.metodoItem}>
            <FontAwesome5
              name={item.tipo === "PayPal" ? "paypal" : "credit-card"}
              size={22}
              color={COLORS.amarillo}
              style={{ marginRight: 12 }}
            />
            <Text style={styles.metodoText}>{item.tipo} {item.detalle}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: COLORS.blanco, opacity: 0.7, textAlign: "center" }}>
            No tienes métodos de pago aún.
          </Text>
        }
        ListFooterComponent={
          <View>

            {!mostrarOpciones && !mostrarFormularioTarjeta && !mostrarFormularioPaypal && (
              <TouchableOpacity style={styles.addBtn} onPress={() => setMostrarOpciones(true)}>
                <Ionicons name="add-circle-outline" size={24} color={COLORS.amarillo} />
                <Text style={styles.addBtnText}>Añadir Nuevo Método de Pago</Text>
              </TouchableOpacity>
            )}


            {mostrarOpciones && !mostrarFormularioTarjeta && !mostrarFormularioPaypal && (
              <View style={styles.opcionesBox}>
                <TouchableOpacity
                  style={styles.opcionMetodoBtn}
                  onPress={() => {
                    setMostrarFormularioTarjeta(true);
                    setMostrarOpciones(false);
                  }}
                >
                  <FontAwesome5 name="credit-card" size={20} color={COLORS.amarillo} style={{ marginRight: 10 }} />
                  <Text style={styles.opcionMetodoText}>Tarjeta de crédito</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.opcionMetodoBtn}
                  onPress={() => {
                    setMostrarFormularioPaypal(true);
                    setMostrarOpciones(false);
                  }}
                >
                  <FontAwesome5 name="paypal" size={20} color={COLORS.amarillo} style={{ marginRight: 10 }} />
                  <Text style={styles.opcionMetodoText}>PayPal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setMostrarOpciones(false)}
                >
                  <Text style={styles.cancelBtnText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            )}


            {mostrarFormularioTarjeta && (
              <View style={styles.formulario}>
                <Text style={styles.formTitle}>Añadir Tarjeta</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Número de tarjeta"
                  placeholderTextColor="#ccc"
                  keyboardType="number-pad"
                  maxLength={16}
                  value={numero}
                  onChangeText={setNumero}
                />
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <TextInput
                    style={[styles.input, { flex: 1, marginRight: 8 }]}
                    placeholder="MM/AA"
                    placeholderTextColor="#ccc"
                    maxLength={5}
                    value={fecha}
                    onChangeText={setFecha}
                  />
                  <TextInput
                    style={[styles.input, { flex: 1, marginLeft: 8 }]}
                    placeholder="CVV"
                    placeholderTextColor="#ccc"
                    maxLength={4}
                    secureTextEntry
                    value={cvv}
                    onChangeText={setCvv}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre del titular"
                  placeholderTextColor="#ccc"
                  value={titular}
                  onChangeText={setTitular}
                />
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => setMostrarFormularioTarjeta(false)}>
                    <Text style={styles.cancelBtnText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.saveBtn} onPress={handleAgregarTarjeta}>
                    <Text style={styles.saveBtnText}>Guardar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}


            {mostrarFormularioPaypal && (
              <View style={styles.formulario}>
                <Text style={styles.formTitle}>Añadir PayPal</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Correo de PayPal"
                  placeholderTextColor="#ccc"
                  keyboardType="email-address"
                  value={paypalCorreo}
                  onChangeText={setPaypalCorreo}
                />
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => setMostrarFormularioPaypal(false)}>
                    <Text style={styles.cancelBtnText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.saveBtn} onPress={handleAgregarPaypal}>
                    <Text style={styles.saveBtnText}>Guardar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <View style={{ height: 120 }} /> 
          </View>
        }
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
      <BottomBar navigation={navigation} active="Pagos" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.azulOscuro,
    width: width,
    alignItems: "center",
    justifyContent: "center",
    ...FUENTE,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 120,
    paddingTop: 24,
    width: "100%",
  },
  title: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: 10,
    letterSpacing: 1,
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.blanco,
    fontSize: 16,
    opacity: 0.8,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 18,
  },
  sectionTitle: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 8,
    alignSelf: "flex-start",
    marginLeft: 18,
  },
  metodoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.azulOscuro,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.azulClaro,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 0,
    width: width * 0.94,
    alignSelf: "center",
    elevation: 2,
    shadowColor: COLORS.azulOscuro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  metodoText: {
    color: COLORS.blanco,
    fontSize: 17,
    fontWeight: "bold",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.azulOscuro,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: COLORS.azulClaro,
    paddingVertical: 16,
    paddingHorizontal: 28,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 24,
    width: width * 0.94,
    justifyContent: "center",
    elevation: 3,
    shadowColor: COLORS.azulClaro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  addBtnText: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 10,
  },
  opcionesBox: {
    width: width * 0.94,
    backgroundColor: COLORS.azulOscuro,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: COLORS.azulClaro,
    padding: 18,
    marginBottom: 24,
    alignItems: "center",
    alignSelf: "center",
    elevation: 2,
    shadowColor: COLORS.azulOscuro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  opcionMetodoBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.azulOscuro,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.azulClaro,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: 14,
    width: "100%",
    justifyContent: "center",
    elevation: 2,
    shadowColor: COLORS.azulClaro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
  },
  opcionMetodoText: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 16,
  },
  formulario: {
    backgroundColor: COLORS.azulOscuro,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: COLORS.azulClaro,
    padding: 20,
    width: width * 0.94,
    marginBottom: 24,
    marginTop: 10,
    alignSelf: "center",
    elevation: 2,
    shadowColor: COLORS.azulOscuro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  formTitle: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 14,
    alignSelf: "center",
  },
  input: {
    backgroundColor: COLORS.blancoSuave,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: COLORS.azulOscuro,
    fontWeight: "bold",
    borderWidth: 2,
    borderColor: COLORS.blancoSuave,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: COLORS.azulOscuro,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.azulClaro,
    paddingVertical: 12,
    alignItems: "center",
    marginRight: 8,
    elevation: 1,
  },
  cancelBtnText: {
    color: COLORS.azulClaro,
    fontWeight: "bold",
    fontSize: 16,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: COLORS.amarillo,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginLeft: 8,
    elevation: 1,
  },
  saveBtnText: {
    color: COLORS.azulOscuro,
    fontWeight: "bold",
    fontSize: 16,
  },
});