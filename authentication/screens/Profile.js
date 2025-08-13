import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Appbar } from "react-native-paper";
import { logout, getCurrentUser } from "../appwrite/authService"; // adjust path

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">
        {user ? `Welcome, ${user.name} 🎉` : "Loading..."}
      </Text>
      {user && (
        <Text variant="bodyMedium" style={{ marginTop: 5 }}>
          {user.email}
        </Text>
      )}

      <Button mode="contained" style={{ marginTop: 20 }} onPress={handleLogout}>
        Logout
      </Button>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
