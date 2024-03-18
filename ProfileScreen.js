import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "./UserContext";

const ProfileScreen = () => {
  const { user, logout } = useUser();
  const navigation = useNavigation();

  // Fetch user data when the component mounts
  useEffect(() => {
    // Add any necessary logic to fetch user data
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigation.navigate("Login");
  };

  // Dummy user data (replace with actual user data)
  const userInfo = user || {
    username: "John Doe",
    email: "johndoe@example.com",
    avatarUrl: "https://example.com/avatar.jpg",
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: userInfo.avatarUrl }} style={styles.avatar} />
        <Text style={styles.username}>{userInfo.username}</Text>
        <Text style={styles.email}>{userInfo.email}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  profileContainer: {
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#4e9caf",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#ff6b6b",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ProfileScreen;
