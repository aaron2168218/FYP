import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Tips array
const tips = [
  "Remember to warm up before starting your workout to prevent injuries and improve performance.",
  "Stay hydrated throughout your workout to keep your energy levels up.",
  "Incorporate a mix of cardio, strength, and flexibility exercises into your routine.",
  "Listen to your body and rest when needed to avoid overtraining.",
  "Set realistic goals and track your progress to stay motivated.",
  "Focus on form over speed or weight to maximize efficiency and reduce the risk of injury.",
  "Incorporate rest days into your routine to allow your body to recover and rebuild.",
  "Vary your workouts to prevent boredom and to challenge different muscle groups.",
  "Eat a balanced meal with protein and carbohydrates after your workout to aid recovery.",
];

const WorkoutScreen = ({ navigation }) => {
  const getRandomTip = () => tips[Math.floor(Math.random() * tips.length)];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Workouts</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MySavedWorkouts')}
      >
        <Text style={styles.buttonText}>My Saved Workouts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateWorkout')}
      >
<Text style={styles.buttonText}>Create Workout</Text>
      </TouchableOpacity>
      {/* Assuming WorkoutLibrary is a placeholder for a future feature */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('WorkoutLibrary')} // Placeholder, adjust as needed
      >
        <Text style={styles.buttonText}>Workout Library</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <Text style={styles.tipTitle}>Tip of the Day</Text>
      <Text style={styles.tipText}>{getRandomTip()}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#BCE6E5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#083D77',
  },
  button: {
    backgroundColor: '#F4D35E',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#083D77',
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#E0E0E0',
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#083D77',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 16,
    color: '#083D77',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default WorkoutScreen;
