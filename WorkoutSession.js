import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useUser } from './UserContext';

// Image lookup based on workout names
const workoutImages = {
  'pushups': require('./assets/pushup.png'),
  'sit-ups': require('./assets/situps.png'),
  'squats': require('./assets/squats.png'),
  'lunges': require('./assets/lunges.png'),
  'planks': require('./assets/plank.png'),
  'mountain climbers': require('./assets/mountain.png'),
  'burpees': require('./assets/burpees.png'),
  'leg raises': require('./assets/Leg-raises.png'),
  'tricep dips': require('./assets/dips.png'),
  'bridge': require('./assets/bridge.png'),
  'default': require('./assets/Logo.png'),
};

const resolveImage = (workoutName) => {
  const imageName = workoutName.toLowerCase();
  return workoutImages[imageName] || workoutImages['default'];
};


// Manual descriptions based on workout names
const workoutDescriptions = {
    'pushups': "Pushups target your chest, shoulders, and triceps. Keep your body in a straight line from head to heels and lower your body until your chest nearly touches the floor.",
    'sit-ups': "Sit-ups primarily target your abdominal muscles. Lie on your back with knees bent and feet anchored. Tuck your chin slightly, and lift your upper body towards your thighs.",
    'squats': "Squats strengthen your lower body and core. Stand with feet hip-width apart, then bend at the knees and hips to lower down as if sitting back into a chair.",
    'lunges': "Lunges are great for leg and glute strengthening. Step forward with one leg, lowering your hips until both knees are bent at about a 90-degree angle.",
    'planks': "Planks strengthen the core, shoulders, and arms. Position yourself in a pushup stance but with your forearms on the ground. Keep your body straight and hold.",
    'mountain climbers': "Mountain climbers are a full-body workout that also provides a cardio boost. Start in a plank position, then alternate bringing your knees towards your chest rapidly.",
    'burpees': "Burpees are a high-intensity, full-body exercise. Start standing, drop into a squat, kick your feet back into a pushup position, then return to standing and jump.",
    'leg raises': "Leg raises target the lower abdomen. Lie on your back, legs straight, then lift your legs to a 90-degree angle and slowly lower them back down.",
    'tricep dips': "Tricep dips help build upper arm strength. Use a bench or chair, with hands behind you. Lower your body by bending your elbows, then press back up.",
    'bridge': "Bridges target the glutes, hamstrings, and lower back. Lie on your back with knees bent and feet flat on the ground, then lift your hips towards the ceiling.",
    'default': "Explore each exercise to learn proper form and techniques for a safe and effective workout."
  };
  

const getWorkoutDescription = (workoutName) => {
  const description = workoutName.toLowerCase();
  return workoutDescriptions[description] || workoutDescriptions['default'];
};

const WorkoutSessionScreen = ({ route, navigation }) => {
  const { workouts } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = new Animated.Value(0);
  const screenWidth = Dimensions.get('window').width;
  const { user } = useUser();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  const handleNextWorkout = () => {
    if (currentIndex < workouts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('WorkoutHome');
    }
  };

  const handleEndSession = () => {
    navigation.navigate('WorkoutHome');
  };

  const displayRecommendation = () => {
    const currentWorkout = workouts[currentIndex];
    if (!user || !user.fitnessLevel || !currentWorkout.recommendations) {
      return "No recommendation available";
    }
  
    const recommendation = currentWorkout.recommendations[user.fitnessLevel];
  
    // Initialize an empty array to hold recommendation parts
    let recommendationParts = [];
  
    // Check for reps and add to recommendationParts if present
    if (recommendation.reps) {
      recommendationParts.push(`${recommendation.reps} reps`);
    }
  
    // Check for sets and add to recommendationParts if present
    if (recommendation.sets) {
      recommendationParts.push(`${recommendation.sets} sets`);
    }
  
    // Check for time and add to recommendationParts if present
    if (recommendation.time) {
      // Adjust text based on presence of reps or sets
      const timeText = recommendationParts.length > 0 ? `for ${recommendation.time}` : `Hold for ${recommendation.time}`;
      recommendationParts.push(timeText);
    }
  
    // Join recommendationParts with a comma and space, or return a default message if empty
    return recommendationParts.length > 0 ? recommendationParts.join(", ") : "No specific recommendation";
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { opacity: fadeAnim, width: screenWidth - 40 }]}>
        <Text style={styles.title}>{workouts[currentIndex].name}</Text>
        <Image source={resolveImage(workouts[currentIndex].name)} style={styles.image} />
        <Text style={styles.description}>{getWorkoutDescription(workouts[currentIndex].name)}</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${((currentIndex + 1) / workouts.length) * 100}%` }]} />
        </View>
        <Text style={styles.recommendationText}>Based on you Fitness Level, we recommend: {displayRecommendation()}</Text>
        <TouchableOpacity style={styles.button} onPress={handleNextWorkout}>
          <Text style={styles.buttonText}>{currentIndex < workouts.length - 1 ? 'Next Workout' : 'Finish Session'}</Text>
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity style={[styles.button, styles.endSessionButton]} onPress={handleEndSession}>
        <Text style={styles.buttonText}>End Session</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  recommendationText: {
    fontSize: 20,
    color: '#F89880', // Blue color
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between', // Add this line
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F0F4F8',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  image: {
    width: 150, // Adjusted from '100%' to a fixed width
    height: 150, // Adjusted height to maintain aspect ratio, if necessary
    borderRadius: 10, // You can adjust this as needed
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  endSessionButton: {
    backgroundColor: '#FF6347', // Different color to distinguish it from the next/finish button
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WorkoutSessionScreen;