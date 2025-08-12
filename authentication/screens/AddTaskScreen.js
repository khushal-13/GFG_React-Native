import { Alert, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import { Appbar, Button, TextInput } from "react-native-paper";
import { TaskContext } from "../context/task";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddTaskScreen = () => {
  const insets = useSafeAreaInsets(); // gets safe area padding
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { handleAddNewTask } = useContext(TaskContext);

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
      title,
      description,
      isComplete: false,
      date: new Date().toLocaleString(),
    };

    handleAddNewTask(newTask);
    setTitle("");
    setDescription("");
  };

  return (
    <View style={[styles.container, { marginTop: insets.top + 10 }]}>
      <Appbar>
        <Appbar.Content title="Add New Task" />
      </Appbar>

      <TextInput
        style={styles.textInput}
        label="Title"
        mode="outlined"
        placeholder="Enter Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        multiline
        numberOfLines={5}
        style={styles.textInput}
        label="Description"
        mode="outlined"
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
      />

      <Button style={{marginTop: 20}} mode="contained" onPress={handleSubmit}>
        Save Task
      </Button>
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
});
