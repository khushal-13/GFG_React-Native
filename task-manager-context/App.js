import { StyleSheet, Text, View, StatusBar } from "react-native";
import AppManager from "./manager/AppManager";
import { PaperProvider } from "react-native-paper";
import { TaskProvider } from "./context/task";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <TaskProvider>
        <PaperProvider>
          <AppManager />
        </PaperProvider>
      </TaskProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: StatusBar.currentHeight,
  },
});
