import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useUser } from './UserContext';

const MySavedWorkouts = ({ navigation }) => {
  const { user, deleteRoutine } = useUser();
  const [expandedWorkout, setExpandedWorkout] = useState(null);

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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Saved Workouts</Text>
      {user && user.savedWorkouts.map((workout, index) => (
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
            <TouchableOpacity style={styles.actionButton} onPress={() =>  handleEditWorkout(workout, index)}>
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
  
  editButton: {
    backgroundColor: '#2196F3', // Blue color for the edit button
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 10, // Space between delete and edit buttons
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  
  goButton: {
    backgroundColor: '#4CAF50', // Green color for the go button
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 10, // Space between edit and go buttons
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f5f5f5', // Lighter background for a cleaner look
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333', // Darker color for better contrast
      marginBottom: 20,
      textAlign: 'center', // Center-align the title
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
    goButton: {
      backgroundColor: '#4CAF50', // A more vibrant green
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 20, // More rounded button
      shadowColor: '#4CAF50', // Matching shadow color
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 2,
    },
    goButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16, // Larger font for button text
    },
    workoutDetails: {
      marginTop: 20,
    },
    subWorkoutName: {
      fontSize: 18, // Larger for readability
      marginTop: 5,
      color: '#555', // Dark gray for sub workout names
    },
    deleteButton: {
        marginTop: 20,
        backgroundColor: '#f44336', // A vibrant red for visibility
        paddingVertical: 8, // Reduced padding to make the button smaller
        paddingHorizontal: 20, // Adjusted for text length
        borderRadius: 20, // Rounded corners for a modern look
        width: '50%', // Adjust width as needed or use 'auto' if you want it to shrink-wrap the content
        alignSelf: 'center', // Center the button in its container
        shadowColor: '#f44336',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
      },
    deleteButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center',
    },
  });
  

export default MySavedWorkouts;
