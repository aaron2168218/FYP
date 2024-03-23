import React, { useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext';

const workoutData = [
  {
    id: '1',
    name: 'Pushups',
    description: 'Pushups are a versatile bodyweight exercise that strengthens the chest, shoulders, and arms.',
    image: require('./assets/pushup.png'),
    category: 'Chest',
    recommendations: {
      Beginner: { reps: '8-10', time: '30 secs' },
      Intermediate: { reps: '15-20', time: '45 secs' },
      Advanced: { reps: '25+', time: '60 secs' },
    },
    caloriesBurned: 30,
  },
  {
    id: '2',
    name: 'Sit-ups',
    description: 'Sit-ups are a classic core exercise that targets the abdominal muscles, helping to strengthen the core and improve overall stability.',
    image: require('./assets/situps.png'),
    category: 'Core',
    recommendations: {
      Beginner: { reps: '10-15', time: '30 secs' },
      Intermediate: { reps: '20-25', time: '45 secs' },
      Advanced: { reps: '30+', time: '60 secs' },
    },
    caloriesBurned: 30,
  },
  {
    id: '3',
    name: 'Squats',
    description: 'Squats are a fundamental lower body exercise that targets the quadriceps, hamstrings, and glutes, helping to improve leg strength and functional movement.',
    image: require('./assets/squats.png'),
    category: 'Legs',
    recommendations: {
      Beginner: { reps: '8-10', time: '30 secs' },
      Intermediate: { reps: '15-20', time: '45 secs' },
      Advanced: { reps: '25+', time: '60 secs' },
    },
    caloriesBurned: 30,
  },
  {
    id: '4',
    name: 'Lunges',
    description: 'Lunges are effective for targeting the quadriceps, hamstrings, and glutes, as well as improving balance and stability.',
    image: require('./assets/lunges.png'),
    category: 'Legs',
    recommendations: {
      Beginner: { reps: '8-10 per leg', time: '30 secs' },
      Intermediate: { reps: '15-20 per leg', time: '45 secs' },
      Advanced: { reps: '25+ per leg', time: '60 secs' },
    },
    caloriesBurned: 30,
  },
  {
    id: '5',
    name: 'Planks',
    description: 'Planks are an isometric core exercise that targets the abdominal muscles, lower back, and shoulders, helping to improve core strength and stability.',
    image: require('./assets/plank.png'),
    category: 'Core',
    recommendations: {
      Beginner: { reps: 'N/A', time: '20 secs' },
      Intermediate: { reps: 'N/A', time: '40 secs' },
      Advanced: { reps: 'N/A', time: '60 secs' },
    },
    caloriesBurned: 30,
  },
  {
    id: '6',
    name: 'Mountain Climbers',
    description: 'Mountain climbers are a dynamic exercise that targets the core, shoulders, and legs, while also providing cardiovascular benefits.',
    image: require('./assets/mountain.png'),
    category: 'Core',
    recommendations: {
      Beginner: { reps: 'N/A', time: '20 secs' },
      Intermediate: { reps: 'N/A', time: '40 secs' },
      Advanced: { reps: 'N/A', time: '60 secs' },
    },
    caloriesBurned: 30,
  },
  {
    id: '7',
    name: 'Burpees',
    description: 'Burpees are a full-body exercise that combines elements of strength training and cardio, targeting multiple muscle groups including the chest, arms, shoulders, core, and legs.',
    image: require('./assets/burpees.png'),
    category: 'Chest',
    recommendations: {
      Beginner: { reps: '5-8', time: '30 secs' },
      Intermediate: { reps: '10-15', time: '45 secs' },
      Advanced: { reps: '20+', time: '60 secs' },
    },
    caloriesBurned: 30,
  },
  {
    id: '8',
    name: 'Leg Raises',
    description: 'Leg raises are an effective abdominal exercise that targets the lower abs, helping to strengthen the core and improve hip flexibility.',
    image: require('./assets/Leg-raises.png'),
    category: 'Core',
    recommendations: {
      Beginner: { reps: '8-10', time: '30 secs' },
      Intermediate: { reps: '15-20', time: '45 secs' },
      Advanced: { reps: '25+', time: '60 secs' },
    },
    caloriesBurned: 30,
  },
  {
      id: '9',
      name: 'Tricep Dips',
      description: 'Tricep dips are a bodyweight exercise that targets the triceps, shoulders, and chest, helping to improve arm strength and muscle tone.',
      image: require('./assets/dips.png'),
      category: 'Arms',
      recommendations: {
        Beginner: { reps: '8-10', time: '30 secs' },
        Intermediate: { reps: '15-20', time: '45 secs' },
        Advanced: { reps: '25+', time: '60 secs' },
      },
      caloriesBurned: 30,
    },
    {
      id: '10',
      name: 'Bridge',
      description: 'Bridges are a great exercise for targeting the glutes, hamstrings, and lower back, helping to improve hip mobility and strengthen the posterior chain.',
      image: require('./assets/bridge.png'),
      category: 'Legs',
      recommendations: {
        Beginner: { reps: '10-12', time: '30 secs' },
        Intermediate: { reps: '15-20', time: '45 secs' },
        Advanced: { reps: '25+', time: '60 secs' },
      },
      caloriesBurned: 30,
    },
    {
      id: '11',
      name: 'Hand Release Pushups',
      description: 'Enhances standard pushups by requiring you to lift your hands off the ground at the bottom of the movement, increasing chest and arm engagement.',
      image: require('./assets/handReleasePushups.png'),
      category: 'Chest',
      recommendations: {
        Beginner: { reps: '6-8', time: '30 secs' },
        Intermediate: { reps: '12-15', time: '45 secs' },
        Advanced: { reps: '20+', time: '60 secs' },
      },
      caloriesBurned: 40,
    },
    {
      id: '12',
      name: 'Pike Pushups',
      description: 'Focuses on the shoulders by adopting a pike position and performing a pushup, simulating an overhead press.',
      image: require('./assets/pikePushups.jpg'),
      category: 'Arms',
      recommendations: {
        Beginner: { reps: '5-7', time: '30 secs' },
        Intermediate: { reps: '10-12', time: '45 secs' },
        Advanced: { reps: '15+', time: '60 secs' },
      },
      caloriesBurned: 35,
    },
    {
      id: '13',
      name: 'Diamond Pushups',
      description: 'Targets the triceps and inner chest by placing hands close together in a diamond shape during the pushup.',
      image: require('./assets/diamondPushups.jpg'),
      category: 'Chest',
      recommendations: {
        Beginner: { reps: '4-6', time: '30 secs' },
        Intermediate: { reps: '8-10', time: '45 secs' },
        Advanced: { reps: '15+', time: '60 secs' },
      },
      caloriesBurned: 45,
    },
    {
      id: '14',
      name: 'Bear Crawls',
      description: 'Enhances core stability and coordination by crawling on all fours, keeping hips low and back flat.',
      image: require('./assets/bearCrawls.jpg'),
      category: 'Core',
      recommendations: {
        Beginner: { reps: 'N/A', time: '20 secs' },
        Intermediate: { reps: 'N/A', time: '40 secs' },
        Advanced: { reps: 'N/A', time: '60 secs' },
      },
      caloriesBurned: 50,
    },
    {
      id: '15',
      name: 'Lateral Planks Walks',
      description: 'Strengthens the core, shoulders, and arms by moving laterally in a plank position.',
      image: require('./assets/lateralPlankWalks.jpg'),
      category: 'Core',
      recommendations: {
        Beginner: { reps: 'N/A', time: '20 secs' },
        Intermediate: { reps: 'N/A', time: '40 secs' },
        Advanced: { reps: 'N/A', time: '60 secs' },
      },
      caloriesBurned: 30,
    },
    {
      id: '16',
      name: 'Crab Walks',
      description: 'Improves flexibility and strength in the arms and legs by walking backward and forward in a crab position.',
      image: require('./assets/crabWalks.jpg'),
      category: 'Legs',
      recommendations: {
        Beginner: { reps: 'N/A', time: '30 secs' },
        Intermediate: { reps: 'N/A', time: '45 secs' },
        Advanced: { reps: 'N/A', time: '60 secs' },
      },
      caloriesBurned: 55,
    },
    {
      id: '17',
      name: 'Flutter Kicks',
      description: 'Targets the lower abdominal muscles by lying on your back and making small, rapid up and down kicks with your legs.',
      image: require('./assets/flutterKicks.jpg'),
      category: 'Core',
      recommendations: {
        Beginner: { reps: 'N/A', time: '30 secs' },
        Intermediate: { reps: 'N/A', time: '45 secs' },
        Advanced: { reps: 'N/A', time: '60 secs' },
      },
      caloriesBurned: 25,
    },
    { id: '18',
    name: 'Russian Twists',
    description: 'Engages the entire core, especially the obliques, by sitting on the floor with knees bent, leaning back slightly, and twisting the torso from side to side.',
    image: require('./assets/russianTwists.jpg'),
    category: 'Core',
    recommendations: {
      Beginner: { reps: '20 (10 per side)', time: '30 secs' },
      Intermediate: { reps: '30 (15 per side)', time: '45 secs' },
      Advanced: { reps: '40+ (20+ per side)', time: '60 secs' },
    },
    caloriesBurned: 20,
  },
  {
    id: '19',
    name: 'Frog Jumps',
    description: 'Increases lower body strength and explosiveness by squatting down and then jumping forward, landing back in a squat.',
    image: require('./assets/frogJumps.jpg'),
    category: 'Legs',
    recommendations: {
      Beginner: { reps: '8-10', time: '30 secs' },
      Intermediate: { reps: '12-15', time: '45 secs' },
      Advanced: { reps: '20+', time: '60 secs' },
    },
    caloriesBurned: 60,
  },
  {
    id: '20',
    name: 'Inchworms',
    description: 'Improves flexibility and strength in the arms, chest, and hamstrings by walking the hands out into a plank position and then walking the feet towards the hands.',
    image: require('./assets/inchworms.jpg'),
    category: 'Arms',
    recommendations: {
      Beginner: { reps: '5-7', time: '30 secs' },
      Intermediate: { reps: '8-10', time: '45 secs' },
      Advanced: { reps: '12+', time: '60 secs' },
    },
    caloriesBurned: 45,
  },

];
  const CreateWorkoutScreen = ({ route }) => {
    const [selectedWorkouts, setSelectedWorkouts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const navigation = useNavigation();
    const { user } = useUser();
    const [routineName, setRoutineName] = useState('');
    const [description, setDescription] = useState('');

useEffect(() => {
  // Check if we have selected workout IDs and pre-select them
  if (route.params?.selectedWorkoutIds) {
    setSelectedWorkouts(route.params.selectedWorkoutIds);
  }

  // Also pre-populate the routine name and description if present
  if (route.params?.routineDetails) {
    setRoutineName(route.params.routineDetails.name);
    setDescription(route.params.routineDetails.description);
  }
}, [route.params]);

const recommendedWorkouts = {
  Beginner: ['1', '2', '7', '8', '9'],
  Intermediate: ['3', '4', '5', '6', '10'],
  Advanced: ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
};

  const handleSelectWorkout = (id) => {
    setSelectedWorkouts(prevSelected => prevSelected.includes(id) ? prevSelected.filter(workoutId => workoutId !== id) : [...prevSelected, id]);
  };

  const getFilteredWorkouts = () => {
    let filteredWorkouts = [];
  
    if (selectedCategory === 'Recommended' && user?.fitnessLevel) {
      const levelWorkouts = recommendedWorkouts[user.fitnessLevel] || [];
      filteredWorkouts = workoutData.filter(workout => 
        levelWorkouts.includes(workout.id) && 
        workout.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      filteredWorkouts = workoutData.filter(workout =>
        workout.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === 'All' || workout.category === selectedCategory)
      );
    }
  
    return filteredWorkouts;
  };

  const categories = ['All', 'Chest', 'Core', 'Legs', 'Arms', 'Recommended'];

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {categories.map((category) => (
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
        style={styles.searchInput}
        placeholder="Search by name"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={getFilteredWorkouts()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.workoutItem, selectedWorkouts.includes(item.id.toString()) && styles.selectedWorkout]}
            onPress={() => handleSelectWorkout(item.id.toString())}
          >
            <Image source={item.image} style={styles.workoutImage} />
            <View style={styles.workoutDetails}>
              <Text style={styles.workoutName}>{item.name}</Text>
              <Text style={styles.workoutDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
<TouchableOpacity

  style={styles.saveButton}
  onPress={() => {
    const selectedWorkoutsFull = selectedWorkouts.map(id => workoutData.find(workout => workout.id === id));
    navigation.navigate('SaveRoutine', {
      selectedWorkouts: selectedWorkoutsFull,
      routineDetails: {
        name: routineName,
        description: description,
      },
      routineId: route.params?.routineId, 
    });
  }}
>
  <Text style={styles.saveButtonText}>Save Routine</Text>
</TouchableOpacity>
    </View>
  );
};

  

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
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
    paddingRight: 10, 
    marginRight: 10, 
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
    flex: 1,
  },
  workoutName: {
    fontWeight: 'bold',
    marginBottom: 5, 
  },
  workoutDescription: {
    marginBottom: 5, 
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
    backgroundColor: 'white',
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