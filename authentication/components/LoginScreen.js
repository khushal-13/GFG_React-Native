import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import { login } from "../appwrite/auth.js";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      navigation.replace("Home");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Welcome Back
          </Text>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            mode="outlined"
            secureTextEntry
          />
          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            style={styles.button}
          >
            Log In
          </Button>
          <Button
            onPress={() => navigation.navigate("Signup")}
            style={styles.link}
          >
            Don’t have an account? Sign Up
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  card: { padding: 10, borderRadius: 10 },
  title: { textAlign: "center", marginBottom: 20 },
  input: { marginBottom: 15 },
  button: { marginTop: 10 },
  link: { marginTop: 10 },
});
