import { StyleSheet, Text, View, StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";
import { TaskProvider } from "./context/task";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import AddTaskScreen from "./screens/AddTaskScreen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTaskScreen"
        component={AddTaskScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <TaskProvider>
          <PaperProvider>
            <RootStack />
          </PaperProvider>
        </TaskProvider>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: StatusBar.currentHeight,
  },
});
