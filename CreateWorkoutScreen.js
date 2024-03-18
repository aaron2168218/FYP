import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

// Placeholder image import, replace with your actual images
const workoutPlaceholderImage = require('./assets/Logo.png');

const workoutData = [
  { id: '1', name: 'Workout 1', description: 'Description for Workout 1', image: workoutPlaceholderImage },
  { id: '2', name: 'Workout 2', description: 'Description for Workout 2', image: workoutPlaceholderImage },
  { id: '3', name: 'Workout 3', description: 'Description for Workout 3', image: workoutPlaceholderImage },
  { id: '4', name: 'Workout 4', description: 'Description for Workout 4', image: workoutPlaceholderImage },
  { id: '5', name: 'Workout 5', description: 'Description for Workout 5', image: workoutPlaceholderImage },
  { id: '6', name: 'Workout 6', description: 'Description for Workout 6', image: workoutPlaceholderImage },
  { id: '7', name: 'Workout 7', description: 'Description for Workout 7', image: workoutPlaceholderImage },
  { id: '8', name: 'Workout 8', description: 'Description for Workout 8', image: workoutPlaceholderImage },
  { id: '9', name: 'Workout 9', description: 'Description for Workout 9', image: workoutPlaceholderImage },
  { id: '10', name: 'Workout 10', description: 'Description for Workout 10', image: workoutPlaceholderImage },
];

const CreateWorkoutScreen = () => {
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const navigation = useNavigation(); // Use the useNavigation hook

  const handleSelectWorkout = (id) => {
    setSelectedWorkouts((prevSelected) => {
      if (prevSelected.includes(id)) {
        // Remove selected workout
        return prevSelected.filter(workoutId => workoutId !== id);
      } else {
        // Add selected workout
        return [...prevSelected, id];
      }
    });
  };

  const renderWorkoutItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.workoutItem, selectedWorkouts.includes(item.id) && styles.selectedWorkout]}
      onPress={() => handleSelectWorkout(item.id)}
    >
      <Image source={item.image} style={styles.workoutImage} />
      <View>
        <Text style={styles.workoutName}>{item.name}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleSaveRoutine = () => {
    navigation.navigate('SaveRoutine', { selectedWorkouts: selectedWorkouts.map(id => workoutData.find(w => w.id === id)) });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={workoutData}
        keyExtractor={(item) => item.id}
        renderItem={renderWorkoutItem}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveRoutine}>
        <Text style={styles.saveButtonText}>Save Routine</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  workoutItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedWorkout: {
    backgroundColor: '#e0f7fa',
  },
  workoutImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  workoutName: {
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CreateWorkoutScreen;
