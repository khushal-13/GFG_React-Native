import { StyleSheet, View } from "react-native";
import { useContext } from "react";
import { AppScreens } from "../utils/constants";
import AddTaskScreen from "../screens/AddTaskScreen";
import HomeScreen from "../screens/HomeScreen";
import { TaskContext } from "../context/task";

const AppManager = () => {

  const {tasks, setTasks, currentScreen, setCurrentScreen} = useContext(TaskContext);

  return (
    <View>
      {currentScreen === AppScreens.AddTaskScreen ? (
        <AddTaskScreen/>
      ) : (
        <HomeScreen/>
      )}
    </View>
  );
};

export default AppManager;

const styles = StyleSheet.create({});
