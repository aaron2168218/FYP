import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


// Static data simulating predefined workouts
const workoutsLibrary = [
    {
      id: 'chestPump',
      routineName: 'Chest Pump',
      description: 'A challenging chest routine to build strength and endurance.',
      difficulty: 'Intermediate',
      workouts: [
        {
          id: '1',
          name: 'Pushups',
          description: 'Standard pushups to strengthen the chest, shoulders, and triceps.',
          image: require('./assets/pushup.png'),
        },
        {
          id: '7',
          name: 'Burpees',
          description: 'A full-body exercise that includes a pushup in each rep.',
          image: require('./assets/burpees.png'),
        },
        {
          id: '9',
          name: 'Tricep Dips',
          description: 'Targets the triceps and also engages the chest and shoulders.',
          image: require('./assets/dips.png'),
        },
        // Adding two more exercises for the chest workout
      ],
    },
    {
      id: 'coreCrush',
      routineName: 'Core Crush',
      description: 'Strengthen your core with these intense abdominal exercises.',
      difficulty: 'Intermediate',
      workouts: [
        {
          id: '2',
          name: 'Sit-ups',
          description: 'Targets the abdominal muscles for core strength.',
          image: require('./assets/situps.png'),
        },
        {
          id: '5',
          name: 'Planks',
          description: 'An isometric core strength exercise that involves maintaining a position similar to a pushup for the maximum possible time.',
          image: require('./assets/plank.png'),
        },
        {
          id: '6',
          name: 'Mountain Climbers',
          description: 'A compound exercise that works several muscles simultaneously and increases the heart rate.',
          image: require('./assets/mountain.png'),
        },
        // Adding two more exercises for the core workout
      ],
    },
    {
        id: 'legDay',
        routineName: 'Leg Day',
        description: 'A comprehensive leg workout targeting strength and endurance.',
        difficulty: 'Intermediate',
        workouts: [
          {
            id: '3',
            name: 'Squats',
            description: 'A fundamental exercise that targets the quadriceps, hamstrings, and glutes.',
            image: require('./assets/squats.png'),
          },
          {
            id: '4',
            name: 'Lunges',
            description: 'Effective for strengthening the legs and improving balance and stability.',
            image: require('./assets/lunges.png'),
          },
          {
            id: '10',
            name: 'Bridge',
            description: 'Great for targeting the glutes, hamstrings, and lower back.',
            image: require('./assets/bridge.png'),
          },
          {
            id: '8',
            name: 'Leg Raises',
            description: 'Targets the lower abs and improves hip flexibility.',
            image: require('./assets/Leg-raises.png'),
          },
          {
            id: '6',
            name: 'Mountain Climbers',
            description: 'Provides a cardiovascular workout while targeting the legs.',
            image: require('./assets/mountain.png'),
          },
        ],
      },
      {
        id: 'armAssault',
        routineName: 'Arm Assault',
        description: 'Tone and strengthen your arms with these targeted exercises.',
        difficulty: 'Beginner',
        workouts: [
          {
            id: '1',
            name: 'Pushups',
            description: 'Engages the triceps, chest, and shoulders.',
            image: require('./assets/pushup.png'),
          },
          {
            id: '9',
            name: 'Tricep Dips',
            description: 'Focuses on the triceps with some engagement of the shoulders and chest.',
            image: require('./assets/dips.png'),
          },
          {
            id: '7',
            name: 'Burpees',
            description: 'A full-body exercise that helps tone the arms.',
            image: require('./assets/burpees.png'),
          },
          // Adding two more exercises that focus on arm strength
        ],
      },
      {
        id: 'totalBody',
        routineName: 'Total Body',
        description: 'Engage all major muscle groups with this full-body workout routine.',
        difficulty: 'Advanced',
        workouts: [
          {
            id: '3',
            name: 'Squats',
            description: 'Builds lower body and core strength.',
            image: require('./assets/squats.png'),
          },
          {
            id: '1',
            name: 'Pushups',
            description: 'Strengthens the upper body and core.',
            image: require('./assets/pushup.png'),
          },
          {
            id: '5',
            name: 'Planks',
            description: 'Strengthens the core, shoulders, and arms.',
            image: require('./assets/plank.png'),
          },
          {
            id: '7',
            name: 'Burpees',
            description: 'Boosts strength and cardiovascular fitness.',
            image: require('./assets/burpees.png'),
          },
          {
            id: '6',
            name: 'Mountain Climbers',
            description: 'Improves cardiovascular health while strengthening the body.',
            image: require('./assets/mountain.png'),
          },
        ],
      },
      // Existing routines continued...
    ];
    
    const WorkoutLibrary = () => {
      const [expandedRoutineId, setExpandedRoutineId] = useState(null);
      const navigation = useNavigation();
      const [filter, setFilter] = useState('All'); // State to keep track of the current filter
      const [difficultyFilter, setDifficultyFilter] = useState('All');
    
      const toggleRoutineDetails = (id) => {
        setExpandedRoutineId(expandedRoutineId === id ? null : id);
      };

      const filteredWorkouts = workoutsLibrary.filter(routine => 
        difficultyFilter === 'All' || routine.difficulty === difficultyFilter
      );
  
    // Updated function to navigate to WorkoutSession screen
    const handleGoToWorkoutSession = (workouts) => {
        navigation.navigate('WorkoutSession', { workouts, showRecommendations: false });
      };
  
      return (
        <View style={styles.container}>
          <View style={styles.filterContainer}>
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((difficulty) => (
              <TouchableOpacity
                key={difficulty}
                style={[styles.filterButton, difficultyFilter === difficulty && styles.filterButtonActive]}
                onPress={() => setDifficultyFilter(difficulty)}
              >
                <Text style={styles.filterButtonText}>{difficulty}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <ScrollView>
            {filteredWorkouts.map((routine) => (
              <View key={routine.id} style={styles.routineBox}>
                <TouchableOpacity onPress={() => toggleRoutineDetails(routine.id)} style={styles.routineHeader}>
                  <Text style={styles.routineName}>{routine.routineName}</Text>
                  <Text style={styles.routineDescription}>{routine.description}</Text>
                </TouchableOpacity>
                {expandedRoutineId === routine.id && (
                  <View style={styles.workoutDetails}>
                    {routine.workouts.map((workout, index) => (
                      <Text key={index} style={styles.workoutName}>{workout.name} - {workout.description}</Text>
                    ))}
                  </View>
                )}
                <TouchableOpacity style={styles.goButton} onPress={() => handleGoToWorkoutSession(routine.workouts)}>
                  <Text style={styles.goButtonText}>GO</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      );
    };
    
    
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      paddingHorizontal: 10,
    },
    filterContainer: {
      flexDirection: 'row',
      marginBottom: 20,
      justifyContent: 'center',
    },
    filterButton: {
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
      backgroundColor: '#ccc', // Default background color for filter buttons
    },
    filterButtonActive: {
      backgroundColor: '#007bff', // Active background color for filter buttons
    },
    filterButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    goButton: {
      backgroundColor: '#4CAF50', // Example color
      padding: 10,
      marginTop: 10,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    goButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
    container: {
      flex: 1,
      padding: 20,
    },
    routineBox: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    routineHeader: {
      marginBottom: 10,
    },
    routineName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    routineDescription: {
      fontSize: 14,
      color: '#666',
      marginTop: 5,
    },
    workoutDetails: {
      marginTop: 10,
    },
    workoutName: {
      fontSize: 16,
      fontWeight: 'normal',
      marginTop: 5,
    },
  });
  
  export default WorkoutLibrary;