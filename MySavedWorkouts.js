import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, TextInput } from 'react-native';
import { useUser } from './UserContext';

const MySavedWorkouts = ({ navigation }) => {
  const { user, deleteRoutine } = useUser();
  const [expandedWorkout, setExpandedWorkout] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleWorkoutDetails = (index) => {
    setExpandedWorkout(expandedWorkout === index ? null : index);
  };

  const handleDeleteWorkout = async (index) => {
    Alert.alert("Delete Workout", "Are you sure you want to delete this workout?", [
      { text: "Cancel" },
      {
        text: "Yes", onPress: async () => {
          await deleteRoutine(index);
          Alert.alert("Workout Deleted", "The workout has been successfully deleted.");
        },
      },
    ]);
  };

  const handleGoToWorkoutSession = (workouts) => {
    // Navigate to WorkoutSession screen with the workouts of the selected routine
    navigation.navigate('WorkoutSession', { workouts });
  };

  const handleEditWorkout = (workout, index) => {
    navigation.navigate('CreateWorkout', {
      selectedWorkoutIds: workout.workouts.map(w => w.id),
      routineDetails: {
        name: workout.routineName,
        description: workout.description,
      },
      routineId: index, // Pass the index as routineId
    });
  };

  const filteredWorkouts = user && user.savedWorkouts.filter(workout => 
    workout.routineName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Saved Workouts</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search workouts..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      {filteredWorkouts && filteredWorkouts.map((workout, index) => (
        <View key={index} style={styles.workoutBox}>
          <TouchableOpacity onPress={() => toggleWorkoutDetails(index)} style={styles.workoutHeader}>
            <Text style={styles.workoutName}>{workout.routineName}</Text>
          </TouchableOpacity>
          {expandedWorkout === index && (
            <View style={styles.workoutDetails}>
              <Text style={styles.workoutDescription}>{workout.description}</Text>
              {workout.workouts.map((subWorkout, subIndex) => (
                <Text key={subIndex} style={styles.subWorkoutName}>{subWorkout.name}</Text>
              ))}
            </View>
          )}
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleEditWorkout(workout, index)}>
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleDeleteWorkout(index)}>
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleGoToWorkoutSession(workout.workouts)}>
              <Text style={styles.actionButtonText}>GO</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  searchBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    fontSize: 16,
    marginBottom: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 28, // Increased font size for prominence
    fontWeight: 'bold', // Bold for a strong presence
    color: '#0277BD', // Adjusted to a vibrant shade of blue for contrast
    marginBottom: 20, // Space below the title
    textAlign: 'center', // Center-aligned
    textShadowColor: 'rgba(0, 0, 0, 0.25)', // Dark shadow for depth
    textShadowOffset: { width: 1, height: 1 }, // Slight shadow offset
    textShadowRadius: 2, // Soft shadow blur
  },

    buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // This will space out your buttons evenly
    alignItems: 'center',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#2196F3', // Blue color for all action buttons
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    // Ensuring each button has equal width and alignments
    flexGrow: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center', // Ensuring text is centered in each button
    fontSize: 16,
  },
  // Keep your deleteButton styles as they are
  
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#E0F7FA",
    },
    workoutBox: {
      backgroundColor: '#ffffff', // Use white for a clean, modern appearance
      borderRadius: 15, // Rounded corners for a softer look
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000', // Shadow for depth
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3, // Elevation for Android shadow
    },
    workoutHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    workoutName: {
      fontSize: 20,
      fontWeight: '600', // Slightly less bold for a modern look
      color: '#444', // Dark gray for text
    },
    workoutDescription: {
      marginTop: 10,
      fontStyle: 'italic',
      color: '#666', // Lighter text for descriptions
    },
    workoutDetails: {
      marginTop: 20,
    },
    subWorkoutName: {
      fontSize: 18, // Larger for readability
      marginTop: 5,
      color: '#555', // Dark gray for sub workout names
    },

  });
  

export default MySavedWorkouts;
