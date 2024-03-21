import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useUser } from './UserContext'; // Import useUser from UserContext

const SaveRoutineScreen = ({ route, navigation }) => {
  const { selectedWorkouts, routineId } = route.params;
  const [routineName, setRoutineName] = useState('');
  const [description, setDescription] = useState('');
  const { saveRoutine } = useUser(); // Use saveRoutine function from UserContext

  const renderWorkoutItem = ({ item }) => (
    <View style={styles.workoutItem}>
      <Text style={styles.workoutName}>{item.name}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  const handleSaveCompleteRoutine = async () => {
    // Call saveRoutine from UserContext with the new routine data
    await saveRoutine({
      routineName,
      description,
      workouts: selectedWorkouts,
    }, routineId);
    console.log('Complete Routine Saved:', { routineName, description, selectedWorkouts });
    navigation.navigate('WorkoutHome') // Navigate back to the main workout screen
  };

  useEffect(() => {
    if (route.params?.routineDetails) {
      setRoutineName(route.params.routineDetails.name);
      setDescription(route.params.routineDetails.description);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Routine Name"
        value={routineName}
        onChangeText={setRoutineName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={styles.input}
      />
      <FlatList
        data={selectedWorkouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderWorkoutItem}
        style={styles.list}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveCompleteRoutine}>
        <Text style={styles.buttonText}>Save Complete Routine</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  list: {
    marginBottom: 20,
  },
  workoutItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  workoutName: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default SaveRoutineScreen;