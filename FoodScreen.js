import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Modal, Alert, Dimensions } from 'react-native';
import moment from 'moment';
import { useUser } from './UserContext'; // Adjust the import path as necessary

const screenWidth = Dimensions.get('window').width;

export default function FoodScreen() {
  const { user, updateUserDetails } = useUser(); // Use the useUser hook to access user data and actions
  const [calorieTarget, setCalorieTarget] = useState(user?.calorieTarget || '');
  const [tempTarget, setTempTarget] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [foodItems, setFoodItems] = useState(user?.foodItems || []);
    
  useEffect(() => {
    // Load user-specific data (if any) when the component mounts or user changes
    setFoodItems(user?.foodItems || []);
    setCalorieTarget(user?.calorieTarget || '');
  }, [user]);

  const handleSetTarget = () => {
    if (!tempTarget || isNaN(tempTarget)) {
      Alert.alert('Invalid Input', 'Please enter a valid number for the calorie target.');
      return;
    }
    setCalorieTarget(tempTarget);
    updateUserDetails({ ...user, calorieTarget: tempTarget }); // Save updated calorie target in user profile
    setModalVisible(false);
    setTempTarget('');
  };

  const addFoodItem = () => {
    if (!foodName || !calories || isNaN(calories)) {
      Alert.alert('Invalid Input', 'Please make sure to fill all fields correctly.');
      return;
    }
    const newItem = {
      id: Date.now().toString(),
      name: foodName,
      calories: parseInt(calories, 10),
      timestamp: new Date().toLocaleString(),
    };
    const updatedFoodItems = [...foodItems, newItem];
    setFoodItems(updatedFoodItems);
    updateUserDetails({ ...user, foodItems: updatedFoodItems }); // Save updated food items in user profile
    setFoodName('');
    setCalories('');
  };

  const deleteFoodItem = (id) => {
    const updatedFoodItems = foodItems.filter(item => item.id !== id);
    setFoodItems(updatedFoodItems);
    updateUserDetails({ ...user, foodItems: updatedFoodItems }); // Update user profile with the item removed
  };

  const clearAllFoodItems = () => {
    Alert.alert('Confirm', 'Clear all food items?', [
      { text: 'Cancel' },
      { text: 'Yes', onPress: () => {
        setFoodItems([]);
        updateUserDetails({ ...user, foodItems: [] }); // Clear all items in user profile
      }},
    ]);
  };

  const getTotalCalories = () => foodItems.reduce((total, item) => total + item.calories, 0);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.setTargetButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.setTargetButtonText}>Enter Target Calories</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Target Calories"
              value={tempTarget}
              onChangeText={setTempTarget}
              keyboardType="numeric"
              style={styles.modalInput}
            />
            <Button title="Set Target" onPress={handleSetTarget} color="#4CAF50" />
          </View>
        </View>
      </Modal>
      {calorieTarget && <Text style={styles.targetCalories}>Calorie Target: {calorieTarget}</Text>}
      <View style={styles.foodInputContainer}>
        <TextInput
          placeholder="Food name"
          value={foodName}
          onChangeText={setFoodName}
          style={styles.input}
        />
        <TextInput
          placeholder="Calories"
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addFoodItem}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.foodItem}>
            <Text style={styles.foodItemText}>{item.name} - {item.calories} Calories</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteFoodItem(item.id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.clearAllButton} onPress={clearAllFoodItems}>
        <Text style={styles.clearAllButtonText}>Clear All</Text>
      </TouchableOpacity>
      <Text style={styles.totalCalories}>Total Calories: {getTotalCalories()}</Text>
      <Text style={styles.remainingCalories}>
      Calories Remaining: {calorieTarget - getTotalCalories()}
    </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  remainingCalories: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: '#00695C', // Choose a color that fits your app's theme
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5C6BC0',
    alignSelf: 'center',
    marginBottom: 20,
  },
  setTargetButton: {
    backgroundColor: '#1E88E5',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  setTargetButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  foodInputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#B3E5FC',
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#1E88E5',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  foodItem: {
    backgroundColor: '#E0F7FA',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  foodItemText: {
    color: '#00695C',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
    marginRight: 10,
  },
  timestamp: {
    color: '#666',
    fontSize: 14,
    marginRight: 5, // Added space between timestamp and delete button
  },
  deleteButton: {
    backgroundColor: '#E53935',
    padding: 6,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  clearAllButton: {
    backgroundColor: '#1E88E5',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  clearAllButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  totalCalories: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#00695C', // Deep Teal for importance
  },
  targetCalories: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00695C', // Teal Green for information
    marginBottom: 20,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalInput: {
    width: 200,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 15,
    padding: 10,
    textAlign: 'center',
  },
}); 