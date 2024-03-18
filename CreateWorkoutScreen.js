import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const workoutData = [
  { id: '1', name: 'Pushups', description: 'Pushups are a versatile bodyweight exercise that strengthens the chest, shoulders, and arms.', image: require('./assets/pushup.png'), category: 'Chest' },
  { id: '2', name: 'Sit-ups', description: 'Sit-ups are a classic core exercise that targets the abdominal muscles, helping to strengthen the core and improve overall stability.', image: require('./assets/situps.png'), category: 'Core' },
  { id: '3', name: 'Squats', description: 'Squats are a fundamental lower body exercise that targets the quadriceps, hamstrings, and glutes, helping to improve leg strength and functional movement.', image: require('./assets/squats.png'), category: 'Legs' },
  { id: '4', name: 'Lunges', description: 'Lunges are effective for targeting the quadriceps, hamstrings, and glutes, as well as improving balance and stability.', image: require('./assets/pushup.png'), category: 'Legs' },
  { id: '5', name: 'Planks', description: 'Planks are an isometric core exercise that targets the abdominal muscles, lower back, and shoulders, helping to improve core strength and stability.', image: require('./assets/lunges.png'), category: 'Core' },
  { id: '6', name: 'Mountain Climbers', description: 'Mountain climbers are a dynamic exercise that targets the core, shoulders, and legs, while also providing cardiovascular benefits.', image: require('./assets/mountain.png'), category: 'Core' },
  { id: '7', name: 'Burpees', description: 'Burpees are a full-body exercise that combines elements of strength training and cardio, targeting multiple muscle groups including the chest, arms, shoulders, core, and legs.', image: require('./assets/burpees.png'), category: 'Chest' },
  { id: '8', name: 'Leg Raises', description: 'Leg raises are an effective abdominal exercise that targets the lower abs, helping to strengthen the core and improve hip flexibility.', image: require('./assets/Leg-raises.png'), category: 'Core' },
  { id: '9', name: 'Tricep Dips', description: 'Tricep dips are a bodyweight exercise that targets the triceps, shoulders, and chest, helping to improve arm strength and muscle tone.', image: require('./assets/dips.png'), category: 'Arms' },
  { id: '10', name: 'Bridge', description: 'Bridges are a great exercise for targeting the glutes, hamstrings, and lower back, helping to improve hip mobility and strengthen the posterior chain.', image: require('./assets/bridge.png'), category: 'Legs' },
];

const CreateWorkoutScreen = () => {
    const [selectedWorkouts, setSelectedWorkouts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const navigation = useNavigation();
  
    const handleSelectWorkout = (id) => {
      setSelectedWorkouts((prevSelected) => {
        if (prevSelected.includes(id)) {
          return prevSelected.filter(workoutId => workoutId !== id);
        } else {
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
        <View style={styles.workoutDetails}>
          <Text style={styles.workoutName}>{item.name}</Text>
          <Text style={styles.workoutDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  
    const handleSaveRoutine = () => {
      navigation.navigate('SaveRoutine', { selectedWorkouts: selectedWorkouts.map(id => workoutData.find(w => w.id === id)) });
    };
  
    const filteredWorkouts = workoutData.filter(workout => workout.name.toLowerCase().includes(searchQuery.toLowerCase()) && (selectedCategory === 'All' || workout.category === selectedCategory));
  
    const categories = ['All', 'Chest', 'Core', 'Legs', 'Arms'];
  
    return (
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={styles.categoryButtonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={[styles.searchInput, {flex: 0}]} // Remove flex: 1 from searchInput style to fix the size inconsistency
          placeholder="Search by name"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <FlatList
          data={filteredWorkouts}
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
    paddingHorizontal: 10,
  },
  workoutItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    paddingRight: 10, // Add padding to the right side of the container
    marginRight: 10, // Add margin to the right side of the container
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  workoutDetails: {
    flex: 1, // Take up remaining space
  },
  workoutName: {
    fontWeight: 'bold',
    marginBottom: 5, // Add some bottom margin for spacing
  },
  workoutDescription: {
    marginBottom: 5, // Add some bottom margin for spacing
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
  },
  categoryButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedCategory: {
    backgroundColor: '#007bff',
  },
  categoryButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default CreateWorkoutScreen;
