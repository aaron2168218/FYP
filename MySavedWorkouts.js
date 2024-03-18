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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Saved Workouts</Text>
      {user && user.savedWorkouts.map((workout, index) => (
        <View key={index} style={styles.workoutBox}>
          <TouchableOpacity onPress={() => toggleWorkoutDetails(index)} style={styles.workoutHeader}>
            <Text style={styles.workoutName}>{workout.routineName}</Text>
            <TouchableOpacity style={styles.goButton} onPress={() => handleGoToWorkoutSession(workout.workouts)}>
              <Text style={styles.goButtonText}>GO</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          {expandedWorkout === index && (
            <View style={styles.workoutDetails}>
              <Text style={styles.workoutDescription}>{workout.description}</Text>
              {workout.workouts.map((subWorkout, subIndex) => (
                <Text key={subIndex} style={styles.subWorkoutName}>{subWorkout.name}</Text>
              ))}
            </View>
          )}
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteWorkout(index)}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  workoutBox: {
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  workoutDescription: {
    marginTop: 10,
    fontStyle: 'italic',
  },
  goButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  goButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  workoutDetails: {
    marginTop: 15,
  },
  subWorkoutName: {
    fontSize: 16,
    marginTop: 5,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MySavedWorkouts;
