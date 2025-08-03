import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AppScreens, DUMMY_TASK } from '../utils/constants'
import AddTaskScreen from '../screens/AddTaskScreen'
import HomeScreen from '../screens/HomeScreen'

const AppManager = () => {

  const [currentScreen, setCurrentScreen] = useState(AppScreens.HomeScreen);
  const [tasks, setTasks] = useState([...DUMMY_TASK]);

  return (
    <View>
      {currentScreen === AppScreens.AddTaskScreen ? (
        <AddTaskScreen />
      ) : (
        <HomeScreen tasks={tasks}/>
      )}
    </View>
  )
}

export default AppManager

const styles = StyleSheet.create({})