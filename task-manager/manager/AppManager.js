import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AppScreens, DUMMY_TASK } from "../utils/constants";
import AddTaskScreen from "../screens/AddTaskScreen";
import HomeScreen from "../screens/HomeScreen";

const AppManager = () => {
  const [currentScreen, setCurrentScreen] = useState(AppScreens.HomeScreen);
  const [tasks, setTasks] = useState([...DUMMY_TASK]);

  const handleTaskComplete = (id) => {
    alert(`Task Complete from APP ${id}`);

    //find index
    //update task, creata updated list
    //update list

    const taskIndex = tasks.findIndex((task) => task.id === id);
    const newList = [...tasks];
    newList[taskIndex] = {
      ...newList[taskIndex],
      isComplete: true,
    };

    setTasks(newList);
  };

  const handleTaskDelete = (id) => {
    alert(`Task Delete from APP ${id}`);
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks); // ✅ update with new array
  };

  const handleAddNewTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    setCurrentScreen(AppScreens.HomeScreen);
  };

  return (
    <View>
      {currentScreen === AppScreens.AddTaskScreen ? (
        <AddTaskScreen
          onAddNewTask={handleAddNewTask}
          changeScreen={(screenName) => setCurrentScreen(screenName)}
        />
      ) : (
        <HomeScreen
          tasks={tasks}
          onTaskComplete={handleTaskComplete}
          onTaskDelete={handleTaskDelete}
          changeScreen={(screenName) => setCurrentScreen(screenName)}
        />
      )}
    </View>
  );
};

export default AppManager;

const styles = StyleSheet.create({});
