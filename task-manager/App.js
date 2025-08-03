import { StyleSheet, Text, View, StatusBar } from "react-native";
import AppManager from "./manager/AppManager";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <PaperProvider>
        <AppManager />
      </PaperProvider>
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
