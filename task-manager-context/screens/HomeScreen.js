import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Button, Chip } from "react-native-paper";
import TaskItem from "../components/TaskItem";
import { AppScreens } from "../utils/constants";
import { TaskContext } from "../context/task";

const HomeScreen = () => {

  const {tasks, handleTaskComplete, handleTaskDelete, setCurrentScreen} = useContext(TaskContext);

  return (
    <View style={styles.container}>
      <Chip
        icon={"plus"}
        textStyle={{
          fontSize: 20,
        }}
        onPress={() => setCurrentScreen(AppScreens.AddTaskScreen)}
        style={styles.newTask}
      >
        Add New Task
      </Chip>
      <FlatList
        style={styles.list}
        data={tasks}
        // keyExtractor={(item, index) => item.title + index}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(iter) => (
          <TaskItem
            date={iter.item.date}
            title={iter.item.title}
            description={iter.item.description}
            id={iter.item.id}
            isComplete={iter.item.isComplete}
            onComplete={(id) => handleTaskComplete(id)}
            onDelete={(id) => handleTaskDelete(id)}
          />
        )}
        contentContainerStyle={{ paddingVertical: 10, paddingBottom: 80 }}

        // contentContainerStyle={{ padding: 10, marginTop: 4 }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container:{
    paddingBottom:60
  },
  list:{
    marginTop:10
  },
  newTask: {
    padding: 4,
    marginTop: 15,
    marginHorizontal: 10,
  },
});
