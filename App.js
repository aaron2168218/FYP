import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProvider } from "./UserContext"; // Adjust the path to your UserContext file
import WorkoutScreen from "./WorkoutScreen";
import ProfileScreen from "./ProfileScreen";
import FoodScreen from "./FoodScreen";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import CreateWorkoutScreen from "./CreateWorkoutScreen";
import SaveRoutineScreen from './SaveRoutineScreen';
import MySavedWorkouts from './MySavedWorkouts';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Define a standalone component for the Workout related screens
function WorkoutStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WorkoutHome" component={WorkoutScreen} />
      <Stack.Screen name="CreateWorkout" component={CreateWorkoutScreen} />
      <Stack.Screen name="SaveRoutine" component={SaveRoutineScreen} />
      <Stack.Screen name="MySavedWorkouts" component={MySavedWorkouts} />
    </Stack.Navigator>
  );
}

function MainApp() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Workout" component={WorkoutStack} />
      <Tab.Screen name="Food" component={FoodScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="MainApp" component={MainApp} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </UserProvider>
  );
}
