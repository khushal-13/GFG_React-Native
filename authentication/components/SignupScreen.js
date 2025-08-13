import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import { register, login } from "../appwrite/authService";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !name) {
      alert("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await register(email, password, name);
      await login(email, password); // Auto login after signup
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
            Create Account
          </Text>
          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            mode="outlined"
          />
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
            onPress={handleSignup}
            loading={loading}
            style={styles.button}
          >
            Sign Up
          </Button>
          <Button
            onPress={() => navigation.navigate("Login")}
            style={styles.link}
          >
            Already have an account? Log In
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
