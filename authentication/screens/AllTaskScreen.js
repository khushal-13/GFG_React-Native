import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Appbar, Button, Chip } from "react-native-paper";
import TaskItem from "../components/TaskItem";
import { TaskContext } from "../context/task";

const HomeScreen = () => {

  // const {tasks, handleTaskComplete, handleTaskDelete, setCurrentScreen} = useContext(TaskContext);
  const {tasks, handleTaskComplete, handleTaskDelete} = useContext(TaskContext);

  return (
    <View style={styles.container}>
      <Appbar>
        <Appbar.Content title="All Task" />
      </Appbar>
      {/* <Chip
        icon={"plus"}
        textStyle={{
          fontSize: 20,
        }}
        onPress={() => setCurrentScreen(AppScreens.AddTaskScreen)}
        style={styles.newTask}
      >
        Add New Task
      </Chip> */}
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
        // contentContainerStyle={{ paddingVertical: 10, paddingBottom: 20 }}

        // contentContainerStyle={{ padding: 10, marginTop: 4 }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container:{
    paddingBottom:80,
    margin: 20
  },
  list:{
    marginTop:20,
    marginBottom: 50
  },
  newTask: {
    padding: 4,
    marginTop: 15,
    marginHorizontal: 10,
  },
});
