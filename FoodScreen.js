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
          <Text style={styles.addButtonText}>+</Text>
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
              <Text style={styles.deleteButtonText}>X</Text>
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
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#E0F7FA',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center',
    marginBottom: 20,
  },
  setTargetButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  setTargetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  foodInputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  addButton: {
    backgroundColor: '#29B6F6',
    padding: 15,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  foodItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodItemText: {
    color: '#37474F',
    fontSize: 16,
    flexShrink: 1,
    paddingRight: 10,
  },
  timestamp: {
    fontSize: 14,
    color: '#78909C',
    paddingRight: 10,
  },
  deleteButton: {
    backgroundColor: '#EF5350',
    padding: 8,
    borderRadius: 16,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  clearAllButton: {
    backgroundColor: '#EF5350',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#D32F2F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  clearAllButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  totalCalories: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#43A047',
  },
  targetCalories: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1B5E20',
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalInput: {
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 5,
    fontSize: 16,
  },
  remainingCalories: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black'
  },
});
