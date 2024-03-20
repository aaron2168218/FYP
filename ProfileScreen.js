import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "./UserContext";

const ProfileScreen = () => {
  const { user, logout, updateUserDetails } = useUser();
  const navigation = useNavigation();

  const [isEditing, setIsEditing] = useState(false);
  const [age, setAge] = useState(user?.age?.toString() || "");
  const [weight, setWeight] = useState(user?.weight?.toString() || "");
  const [height, setHeight] = useState(user?.height?.toString() || "");
  const [fitnessLevel, setFitnessLevel] = useState(user?.fitnessLevel || "");

  const fitnessLevels = ["Beginner", "Intermediate", "Advanced"];

  const handleSaveDetails = () => {
    const userDetails = {
      age: age ? parseInt(age, 10) : user?.age,
      weight: weight ? parseInt(weight, 10) : user?.weight,
      height: height ? parseInt(height, 10) : user?.height,
      fitnessLevel,
    };
    updateUserDetails(userDetails).then(() => {
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully.");
    }).catch((error) => {
      console.error("Update Error", error);
      Alert.alert("Error", "There was a problem updating your profile.");
    });
  };

  const handleLogout = () => {
    logout();
    navigation.replace("Login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: user?.avatarUrl || "https://via.placeholder.com/150" }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{user?.username || "John Doe"}</Text>

        {isEditing ? (
          <>
            <TextInput
              value={age}
              onChangeText={setAge}
              placeholder="Age"
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              value={weight}
              onChangeText={setWeight}
              placeholder="Weight (kg)"
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              value={height}
              onChangeText={setHeight}
              placeholder="Height (cm)"
              keyboardType="numeric"
              style={styles.input}
            />
            <View style={styles.fitnessLevelsContainer}>
              {fitnessLevels.map((level) => (
                <TouchableOpacity
                  key={level}
                  onPress={() => setFitnessLevel(level)}
                  style={[
                    styles.fitnessLevelButton,
                    fitnessLevel === level && styles.fitnessLevelButtonSelected,
                  ]}
                >
                  <Text style={styles.fitnessLevelButtonText}>{level}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={handleSaveDetails} style={styles.saveButton}>
              <Text style={styles.buttonText}>Save Details</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Age: {user?.age || "N/A"}</Text>
            <Text style={styles.infoText}>Weight: {user?.weight ? `${user.weight} kg` : "N/A"}</Text>
            <Text style={styles.infoText}>Height: {user?.height ? `${user.height} cm` : "N/A"}</Text>
            <Text style={styles.infoText}>Fitness Level: {user?.fitnessLevel || "N/A"}</Text>
            <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        )}

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
  input: {
    borderWidth: 1,
    borderColor: "gray",
    width: "80%",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#4e9caf",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  logoutButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  fitnessLevelsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  fitnessLevelButton: {
    backgroundColor: "#e7e7e7",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  fitnessLevelButtonSelected: {
    backgroundColor: "#4e9caf",
  },
  fitnessLevelButtonText: {
    color: "#333",
  },
  fitnessLevelButtonTextSelected: {
    color: "#fff",
  },
  editButton: {
    marginBottom: 20,
    backgroundColor: "#4e9caf", // Change background color
    paddingVertical: 12, // Increase vertical padding
    paddingHorizontal: 40, // Increase horizontal padding
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
});

export default ProfileScreen;
