import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { workoutData } from './Data';


const workoutsLibrary = [
    {
      id: 'chestPump',
      routineName: 'Chest Pump',
      description: 'A challenging chest routine to build strength and endurance.',
      difficulty: 'Intermediate',
      caloriesBurned: 210,
      workouts: [
        {
          id: '1',
          name: 'Pushups',
        },
        {
          id: '7',
          name: 'Burpees'
        },
        {
          id: '9',
          name: 'Tricep Dips',
        },
      ],
    },
    {
      id: 'coreCrush',
      routineName: 'Core Crush',
      description: 'Strengthen your core with these intense abdominal exercises.',
      difficulty: 'Intermediate',
      caloriesBurned: 240,
      workouts: [
        {
          id: '2',
          name: 'Sit-ups',
        },
        {
          id: '5',
          name: 'Planks',
        },
        {
          id: '6',
          name: 'Mountain Climbers',
        },

      ],
    },
    {
        id: 'legDay',
        routineName: 'Leg Day',
        description: 'A comprehensive leg workout targeting strength and endurance.',
        difficulty: 'Intermediate',
        caloriesBurned: 200,
        workouts: [
          {
            id: '3',
            name: 'Squats',
          },
          {
            id: '4',
            name: 'Lunges',
          },
          {
            id: '10',
            name: 'Bridge',
          },
          {
            id: '8',
            name: 'Leg Raises',
          },
          {
            id: '6',
            name: 'Mountain Climbers',
          },
        ],
      },
      {
        id: 'armAssault',
        routineName: 'Arm Assault',
        description: 'Tone and strengthen your arms with these targeted exercises.',
        difficulty: 'Beginner',
        caloriesBurned: 180,
        workouts: [
          {
            id: '1',
            name: 'Pushups',
          },
          {
            id: '9',
            name: 'Tricep Dips',
          },
          {
            id: '7',
            name: 'Burpees',
          },

        ],
      },
      {
        id: 'totalBody',
        routineName: 'Total Body',
        description: 'Engage all major muscle groups with this full-body workout routine.',
        difficulty: 'Advanced',
        caloriesBurned: 210,
        workouts: [
          {
            id: '3',
            name: 'Squats',
          },
          {
            id: '1',
            name: 'Pushups',
          },
          {
            id: '5',
            name: 'Planks',
          },
          {
            id: '7',
            name: 'Burpees',
          },
          {
            id: '6',
            name: 'Mountain Climbers',
          },
        ],
      },
      {
        id: 'flexibilityFocus',
        routineName: 'Flexibility Focus',
        description: 'A routine aimed at improving flexibility and core strength.',
        difficulty: 'Beginner',
        caloriesBurned: 150,
        workouts: [
          {
            id: '15', // Lateral Planks Walks
            name: 'Lateral Planks Walks',
          },
          {
            id: '17', // Flutter Kicks
            name: 'Flutter Kicks',
          },
          {
            id: '20', // Inchworms
            name: 'Inchworms',
          },
          {
            id: '5', // Planks
            name: 'Planks',
          },
        ],
      },
    
      {
        id: 'cardioBlast',
        routineName: 'Cardio Blast',
        description: 'An intense routine designed to boost cardiovascular health and endurance.',
        difficulty: 'Advanced',
        caloriesBurned: 300,
        workouts: [
          {
            id: '6', // Mountain Climbers
            name: 'Mountain Climbers',
          },
          {
            id: '7', // Burpees
            name: 'Burpees',
          },
          {
            id: '19', // Frog Jumps
            name: 'Frog Jumps',
          },
          {
            id: '14', // Bear Crawls
            name: 'Bear Crawls',
          },
          
        ],
      },
      {
        id: 'balanceBasics',
        routineName: 'Balance Basics',
        description: 'Focus on improving your balance and coordination with these foundational exercises.',
        difficulty: 'Beginner',
        caloriesBurned: 150,
        workouts: [
          {
            id: '22', // Hollow Body Hold
            name: 'Hollow Body Hold',
          },
          {
            id: '20', // Inchworms
            name: 'Inchworms',
          },
          {
            id: '21', // Reverse Snow Angels
            name: 'Reverse Snow Angels',
          },
          {
            id: '24', // Cossack Squats
            name: 'Cossack Squats',
          },
        ],
      },
      {
        id: 'agilityAces',
        routineName: 'Agility Aces',
        description: 'Enhance your agility, speed, and reaction time with these dynamic exercises.',
        difficulty: 'Intermediate',
        caloriesBurned: 200,
        workouts: [
          {
            id: '14', // Bear Crawls
            name: 'Bear Crawls',
          },
          {
            id: '16', // Crab Walks
            name: 'Crab Walks',
          },
          {
            id: '19', // Frog Jumps
            name: 'Frog Jumps',
          },
          {
            id: '6', // Mountain Climbers
            name: 'Mountain Climbers',
          },
        ],
      },
      {
        id: 'hiitHeroes',
        routineName: 'HIIT Heroes',
        description: 'A high-intensity interval training routine to boost your cardiovascular fitness and endurance.',
        difficulty: 'Advanced',
        caloriesBurned: 300,
        workouts: [
          {
            id: '7', // Burpees
            name: 'Burpees',
          },
          {
            id: '12', // Pike Pushups
            name: 'Pike Pushups',
          },
          {
            id: '18', // Russian Twists
            name: 'Russian Twists',
          },
          {
            id: '17', // Flutter Kicks
            name: 'Flutter Kicks',
          },
        ],
      }
      
      
    
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
    const handleGoToWorkoutSession = (routine) => {
      const detailedWorkouts = routine.workouts.map(workout => {
        // Find the detailed workout data by matching the workout name
        const detailedWorkout = workoutData.find(w => w.name === workout.name);
        return {
          ...workout,

          description: detailedWorkout.description,
          recommendations: detailedWorkout.recommendations,
          caloriesBurned: detailedWorkout.caloriesBurned, 
        };
      });
    
      navigation.navigate('WorkoutSession', { workouts: detailedWorkouts, caloriesBurned: routine.caloriesBurned, showRecommendations: true });
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
<TouchableOpacity style={styles.goButton} onPress={() => handleGoToWorkoutSession(routine)}>
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
      backgroundColor: '#ccc', 
    },
    filterButtonActive: {
      backgroundColor: '#007bff', 
    },
    filterButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    goButton: {
      backgroundColor: '#4CAF50',
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
      backgroundColor: "#E0F7FA",
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