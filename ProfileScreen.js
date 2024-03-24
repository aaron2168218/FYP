import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "./UserContext";
import * as ImagePicker from 'expo-image-picker';



const ProfileScreen = () => {
  const { user, logout, updateUserDetails } = useUser();
  const navigation = useNavigation();

  const [isEditing, setIsEditing] = useState(false);
  const [age, setAge] = useState(user?.age?.toString() || "");
  const [weight, setWeight] = useState(user?.weight?.toString() || "");
  const [height, setHeight] = useState(user?.height?.toString() || "");
  const [fitnessLevel, setFitnessLevel] = useState(user?.fitnessLevel || "");
  const [avatarSource, setAvatarSource] = useState(user?.avatarUrl || "https://via.placeholder.com/150");
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

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log("Image picker result: ", result); // Log the entire result to check the structure
    
    if (!result.cancelled) {
      // Ensure that we are accessing the 'assets' array and getting the first element
      const uri = result.assets && result.assets.length > 0 ? result.assets[0].uri : null;
      console.log("Selected image URI: ", uri); 
  
      if (uri) {
        setAvatarSource(uri); // Use the URI from the 'assets' array
        updateUserDetails({ ...user, avatarUrl: uri }).catch(console.error);
      }
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
      <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
      <Image
  source={{ uri: `${avatarSource}?${new Date().getTime()}` }} // Force refresh
  style={styles.avatar}
/>

  <Text style={styles.changePhotoText}></Text>
</TouchableOpacity>
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
    alignItems: "center",
    backgroundColor: "#E0F7FA",
  },
  profileContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff", 
    borderRadius: 10, 
    width: '90%', 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginBottom: 20,
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
    marginBottom: 20, 
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc", 
    width: "100%", 
    padding: 12,
    marginBottom: 15,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#4e9caf",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
    width: "100%", 
    alignItems: "center",
    marginTop: 10, 
  },
  logoutButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: "100%", 
    alignItems: "center",
    marginTop: 10, 
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  infoContainer: {
    marginBottom: 20,
    width: "100%", 
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10, 
  },
  fitnessLevelsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20, 
    width: "100%",
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
  editButton: {
    backgroundColor: "#4e9caf",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: "100%", 
    alignItems: "center",
    marginTop: 10,
  },
});

export default ProfileScreen;
