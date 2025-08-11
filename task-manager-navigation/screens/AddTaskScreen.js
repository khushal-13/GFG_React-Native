import { Alert, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import { Appbar, Button, Chip, TextInput } from "react-native-paper";
import { AppScreens } from "../utils/constants";
import { TaskContext } from "../context/task";

const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // const {handleAddNewTask, setCurrentScreen} = useContext(TaskContext);
  const {handleAddNewTask} = useContext(TaskContext);

  const handleSubmit = () => {
    if (
      !title ||
      title.trim() === "" ||
      !description ||
      description.trim() === ""
    ) {
      return Alert.alert("Invalid Data");
    }

    const newTask = {
      id: Date.now(),
      title: title,
      description: description,
      isComplete: false,
      date: new Date().toLocaleString(),
    };

    handleAddNewTask(newTask);
  };

  return (
    <View style={styles.container}>
      <Appbar>
        {/* <Appbar.BackAction onPress={() => setCurrentScreen(AppScreens.HomeScreen)} />           */}
        <Appbar.BackAction onPress={() => navigation.goBack()} />          
        <Appbar.Content title="Add New task" />
      </Appbar>

      <TextInput
        style={styles.textInput}
        label={"Title"}
        mode="outlined"
        placeholder="Enter Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        multiline
        numberOfLines={5} // for android only
        style={styles.textInput}
        label={"Description"}
        mode="outlined"
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
      />

      <Button onPress={handleSubmit}> Save Task</Button>
    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  textInput: {
    marginTop: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    padding: 10,
    // textShadowOffset: { width: 3, height: 5 },
    // textShadowColor: "#ccc",
    // textShadowRadius: 10,
  },
});
