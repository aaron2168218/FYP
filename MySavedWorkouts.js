import React, { useState, useEffect } from 'react';
import { Modal, Button, Platform, View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { useUser } from './UserContext';

const MySavedWorkouts = ({ navigation }) => {
  const { user, deleteRoutine } = useUser();
  const [expandedWorkout, setExpandedWorkout] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value || date);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      alert(notification.request.content.body);
    });
  
    return () => {
      Notifications.removeNotificationSubscription(subscription);
    };
  }, []);

  

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

  const handleScheduleWorkout = async (workoutName) => {
    setIsPickerShow(false); // Ensure the picker is closed immediately when this function is invoked

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('You need to grant permissions to send notifications.');
      return;
    }

    let secondsUntilScheduled = Math.floor((date.getTime() - new Date().getTime()) / 1000);
    if (secondsUntilScheduled < 0) {
      alert('Please pick a date and time in the future.');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Workout Reminder",
        body: `It's time for your ${workoutName} workout!`,
      },
      trigger: { seconds: secondsUntilScheduled },
    });

    alert(`Workout scheduled for ${date.toLocaleString()}!`);
};

  const renderDateTimePicker = () => (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isPickerShow}
      onRequestClose={() => setIsPickerShow(false)}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', elevation: 5 }}>
          <DateTimePicker
            value={date}
            mode={'datetime'}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Button title="Cancel" onPress={() => setIsPickerShow(false)} />
            <Button title="Set Reminder" onPress={() => handleScheduleWorkout("Your Workout")} />
          </View>
        </View>
      </View>
    </Modal>
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
      {renderDateTimePicker()}
      {user && user.savedWorkouts.filter(workout => 
        workout.routineName.toLowerCase().includes(searchQuery.toLowerCase())
      ).map((workout, index) => (
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
            <TouchableOpacity style={styles.actionButton} onPress={showPicker}>
              <Text style={styles.actionButtonText}>Schedule</Text>
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
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#0277BD', 
    marginBottom: 20, 
    textAlign: 'center', 


    textShadowRadius: 2, 
  },

    buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#2196F3', 
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexGrow: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center', 
    fontSize: 16,
  },
  
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#E0F7FA",
    },
    workoutBox: {
      backgroundColor: '#ffffff', 
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3, 
    },
    workoutHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    workoutName: {
      fontSize: 20,
      fontWeight: '600', 
      color: '#444',
    },
    workoutDescription: {
      marginTop: 10,
      fontStyle: 'italic',
      color: '#666',
    },
    workoutDetails: {
      marginTop: 20,
    },
    subWorkoutName: {
      fontSize: 18,
      marginTop: 5,
      color: '#555',
    },

  });
  

export default MySavedWorkouts;
