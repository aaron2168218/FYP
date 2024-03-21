import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to load the user's workouts
  const loadUserWorkouts = async (username) => {
    try {
      const userString = await AsyncStorage.getItem(username);
      if (userString) {
        const userData = JSON.parse(userString);
        return userData.savedWorkouts || [];
      }
      return [];
    } catch (error) {
      console.error("Error loading user workouts:", error);
      return [];
    }
  };
  const login = async (username, password) => {
    try {
      const userString = await AsyncStorage.getItem(username);
      const storedUser = userString ? JSON.parse(userString) : null;
      if (storedUser && storedUser.password === password) {
        // Assume savedWorkouts is part of storedUser
        setUser(storedUser); // Set the user with all details including fitnessLevel
        console.log("User logged in:", storedUser); // Log the full user object
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };
  

  const signup = async (username, password, userDetails) => {
    try {
      const existingUser = await AsyncStorage.getItem(username);
      if (existingUser) {
        return false; // User already exists
      } else {
        const newUser = {
          username,
          password,
          ...userDetails, // Include additional details such as fitnessLevel, age, etc.
          savedWorkouts: []
        };
        await AsyncStorage.setItem(username, JSON.stringify(newUser));
        setUser(newUser); // Set the newly created user
        return true;
      }
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };
  const updateUserDetails = async (updatedDetails) => {
    if (user) {
      const updatedUser = { ...user, ...updatedDetails };
      try {
        await AsyncStorage.setItem(user.username, JSON.stringify(updatedUser));
        setUser(updatedUser); // Update user in context with new details
      } catch (error) {
        console.error("Error updating user details:", error);
      }
    }
  };
  

  const logout = () => {
    setUser(null);
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Clearing AsyncStorage failed", error);
    }
  };

  // Function to save a new workout routine for the logged-in user
  const saveRoutine = async (routine, routineId = null) => {
    if (user) {
      let updatedUser;
      if (routineId !== null) {
        // Update existing routine
        updatedUser = {
          ...user,
          savedWorkouts: user.savedWorkouts.map((item, index) => {
            if (index === routineId) {
              return { ...item, ...routine };
            }
            return item;
          }),
        };
      } else {
        // Add new routine
        updatedUser = {
          ...user,
          savedWorkouts: [...user.savedWorkouts, routine],
        };
      }
  
      try {
        await AsyncStorage.setItem(user.username, JSON.stringify(updatedUser));
        setUser(updatedUser); // Update user in context with updated workouts
      } catch (error) {
        console.error("Error saving or updating routine:", error);
      }
    }
  };

  

  // Function to delete a workout routine
  const deleteRoutine = async (routineIndex) => {
    if (user && user.savedWorkouts) {
      const updatedWorkouts = [...user.savedWorkouts];
      updatedWorkouts.splice(routineIndex, 1);
      const updatedUser = { ...user, savedWorkouts: updatedWorkouts };
      try {
        await AsyncStorage.setItem(user.username, JSON.stringify(updatedUser));
        setUser(updatedUser);
      } catch (error) {
        console.error("Error deleting workout routine:", error);
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, login, signup, logout, clearStorage, saveRoutine, deleteRoutine, updateUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
