import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { useUser } from "./UserContext";

const FitnessLevelOption = ({ level, onSelect, isSelected }) => (
  <TouchableOpacity
    onPress={() => onSelect(level)}
    style={[styles.fitnessLevelOption, isSelected && styles.fitnessLevelSelected]}
  >
    <Text style={styles.fitnessLevelText}>{level}</Text>
  </TouchableOpacity>
);

const SignupScreen = ({ navigation }) => {
  const { signup } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("");

  const fitnessLevels = ["Beginner", "Intermediate", "Advanced"];

  const handleSignup = async () => {
    // userDetails object containing additional information
    const userDetails = {
      age: age,
      weight: weight,
      height: height,
      fitnessLevel: fitnessLevel
    };
  
    try {
      const success = await signup(username, password, userDetails);
      if (success) {
        Alert.alert("Signup Successful", "Your account has been created. Please log in.", [
          { text: "OK", onPress: () => navigation.replace("Login") }
        ]);
      } else {
        Alert.alert("Signup Failed", "This username is already taken. Please choose another one.");
      }
    } catch (error) {
      Alert.alert("Signup Error", "An error occurred during the signup process.");
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      {/* Username and Password Inputs */}
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} style={styles.input} />

      {/* Age, Weight, Height Inputs */}
      <TextInput placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Height (cm)" value={height} onChangeText={setHeight} keyboardType="numeric" style={styles.input} />

      {/* Fitness Level Selection */}
      <Text style={styles.fitnessLevelTitle}>Fitness Level</Text>
      <View style={styles.fitnessLevelsContainer}>
        {fitnessLevels.map((level) => (
          <FitnessLevelOption
            key={level}
            level={level}
            onSelect={setFitnessLevel}
            isSelected={fitnessLevel === level}
          />
        ))}
      </View>

      {/* Signup and Back Buttons */}
      <TouchableOpacity onPress={handleSignup} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkButton}>
        <Text style={styles.linkButtonText}>Back to Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    width: "80%",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4e9caf",
    padding: 15,
    borderRadius: 5,
    width: "80%",
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
  fitnessLevelTitle: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  fitnessLevelsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 20,
    backgroundColor: 'white',
  },
  fitnessLevelOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#4e9caf",
    borderRadius: 5,
  },
  fitnessLevelSelected: {
    backgroundColor: "#4e9caf",
  },
  fitnessLevelText: {
    color: "#333",
    textAlign: "center",
  },
});

export default SignupScreen;
