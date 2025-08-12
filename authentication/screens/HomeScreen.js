import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AddTaskScreen from "./AddTaskScreen";
import AllTaskScreen from "./AllTaskScreen";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      initialRouteName="AllTask"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          position: "absolute",
          bottom: 15,
          left: 10,
          right: 10,
          borderRadius: 20,
          height: 60,
          paddingBottom: 5,
          elevation: 5,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 8
        },
        tabBarLabelStyle: { fontSize: 14 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "AddTask") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "AllTask") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray"
      })}
    >
      <Tab.Screen name="AllTask" component={AllTaskScreen} />
      <Tab.Screen name="AddTask" component={AddTaskScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
