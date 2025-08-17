// context/task.js
import { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { databases, appwriteConfig, account } from "../appwrite/appwrite";
import { ID, Query } from "appwrite";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from Appwrite
  const fetchTasks = async () => {
    try {
      const user = await account.get(); // get logged-in user
      const res = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        [
          Query.equal("userId", user.$id), // 👈 only tasks of this user
          Query.orderDesc("$createdAt")
        ]
      );

      // Convert Appwrite documents to our local task format
      const loadedTasks = res.documents.map((doc) => ({
        id: doc.$id,
        title: doc.title,
        description: doc.description,
        date: doc.date,
        isComplete: doc.isComplete,
      }));

      setTasks(loadedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskComplete = async (id) => {
    try {
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        id,
        { isComplete: true }
      );
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, isComplete: true } : task
        )
      );
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleTaskDelete = async (id) => {
    try {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        id
      );
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleAddNewTask = async (newTask) => {
    try {
      const user = await account.get();
      const res = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        ID.unique(),
        {
          ...newTask,
          userId: user.$id, // 👈 save userId with task
        }
      );
      setTasks((prev) => [
        {
          id: res.$id,
          title: res.title,
          description: res.description,
          date: res.date,
          isComplete: res.isComplete,
          userId: res.userId,
        },
        ...prev,
      ]);
      Alert.alert("New Task Added");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        handleTaskComplete,
        handleTaskDelete,
        handleAddNewTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
