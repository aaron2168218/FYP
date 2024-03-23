import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useUser } from "./UserContext"; // Adjust the path as necessary

// This import statement remains unchanged as async/await are JavaScript keywords
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, clearStorage } = useUser();

  const handleLogin = async () => {
    const success = await login(username, password);
    if (success) {
      navigation.replace("MainApp");
    } else {
      Alert.alert("Login Failed", "Invalid username or password");
    }
  };

  const handleClearStorage = async () => {
    try {
      await AsyncStorage.clear(); // Using AsyncStorage directly for clear operation
      Alert.alert("AsyncStorage Cleared", "All data has been cleared successfully.");
    } catch (error) {
      Alert.alert("Error", "An error occurred while clearing AsyncStorage.");
      console.error("Clearing AsyncStorage failed", error);
    }
  };

  return (
    <View style={styles.container}>
              <Image source={require('./assets/Logo1.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Signup")}
        style={styles.linkButton}
      >
        <Text style={styles.linkButtonText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClearStorage} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear AsyncStorage</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E0F7FA",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4e9caf",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  linkButton: {
    marginTop: 10,
  },
  linkButtonText: {
    color: "#4e9caf",
    fontSize: 16,
  },
});

export default LoginScreen;
