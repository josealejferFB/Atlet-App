import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { COLORS, FUENTE } from "../components/Theme";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function RegisterCar({ navigation }) {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");
  const [placa, setPlaca] = useState("");
  const [color, setColor] = useState("");
  const [foto, setFoto] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const handleFinish = () => {
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      {/* Fondos decorativos */}
      <View style={styles.bgCircleYellow} />
      <View style={styles.bgCircleBlue} />

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {foto ? (
          <Image source={{ uri: foto }} style={styles.carImage} />
        ) : (
          <FontAwesome5 name="car" size={70} color={COLORS.amarillo} />
        )}
        {/* Icono de + siempre visible en la esquina inferior derecha */}
        <View style={styles.addIcon}>
          <MaterialIcons name="add-circle" size={32} color={COLORS.amarillo} />
        </View>
      </TouchableOpacity>
      <Text style={styles.title}>Registro de Vehículo</Text>
      <TextInput
        style={styles.input}
        placeholder="Marca"
        placeholderTextColor="#03132d99"
        value={marca}
        onChangeText={setMarca}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo"
        placeholderTextColor="#03132d99"
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput
        style={styles.input}
        placeholder="Año"
        placeholderTextColor="#03132d99"
        value={anio}
        onChangeText={setAnio}
        keyboardType="numeric"
        maxLength={4}
      />
      <TextInput
        style={styles.input}
        placeholder="Placa"
        placeholderTextColor="#03132d99"
        value={placa}
        onChangeText={setPlaca}
        autoCapitalize="characters"
        maxLength={10}
      />
      <TextInput
        style={styles.input}
        placeholder="Color"
        placeholderTextColor="#03132d99"
        value={color}
        onChangeText={setColor}
      />
      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}>Terminar registro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.azulOscuro,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 24,
    ...FUENTE,
  },
  bgCircleYellow: {
    position: "absolute",
    top: -120,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: COLORS.blanco,
    borderWidth: 5,
    backgroundColor: COLORS.amarillo,
    opacity: 0.25,
    zIndex: 0,
  },
  bgCircleBlue: {
    position: "absolute",
    bottom: -120,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: COLORS.blanco,
    borderWidth: 5,
    backgroundColor: COLORS.azulClaro,
    opacity: 0.25,
    zIndex: 0,
  },
  imagePicker: {
    marginTop: 40,
    marginBottom: 18,
    width: 110,
    height: 110,
    borderRadius: 16,
    backgroundColor: COLORS.blanco,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: COLORS.amarillo,
    position: "relative",
  },
  carImage: {
    width: 110,
    height: 110,
    resizeMode: "cover",
  },
  addIcon: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: COLORS.blanco,
    borderRadius: 16,
  },
  title: {
    color: COLORS.amarillo,
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: 18,
    letterSpacing: 1,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: COLORS.blancoSuave,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: COLORS.blancoSuave,
    fontSize: 16,
    color: COLORS.azulOscuro,
  },
  button: {
    backgroundColor: COLORS.amarillo,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
    marginTop: 18,
    shadowColor: COLORS.blanco,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
    alignSelf: "center",
  },
  buttonText: {
    color: COLORS.azulOscuro,
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
    textAlign: "center",
  },
});