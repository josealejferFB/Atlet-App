import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./screens/SplashScreen"; // Importa la SplashScreen
import Login from "./screens/Login";
import Home from "./screens/Home";
import Detalles from "./screens/Detalles";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import RegisterCar from "./screens/RegisterCar";
import HistorialViajes from "./screens/HistorialViajes";
import SeleccionDestino from "./screens/SeleccionDestino";
import Pagos from "./screens/Pagos";
import Configuracion from "./screens/Configuracion";
import ConfirmacionViaje from "./screens/ConfirmacionViaje";
import BusquedaConductor from "./screens/BusquedaConductor";
import ViajeAsignado from "./screens/ViajeAsignado";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash" // Splash ahora es la pantalla inicial
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detalles"
          component={Detalles}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterCar"
          component={RegisterCar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HistorialViajes"
          component={HistorialViajes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SeleccionDestino"
          component={SeleccionDestino}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pagos"
          component={Pagos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Configuracion"
          component={Configuracion}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmacionViaje"
          component={ConfirmacionViaje}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BusquedaConductor"
          component={BusquedaConductor}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViajeAsignado"
          component={ViajeAsignado}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
