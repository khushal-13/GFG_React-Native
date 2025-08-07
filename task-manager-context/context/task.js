import { createContext, useState } from "react";
import { AppScreens, DUMMY_TASK } from "../utils/constants";

export const TaskContext = createContext(); 

export const TaskProvider = ({ children }) => {

    const [tasks, setTasks] = useState([...DUMMY_TASK]);
    const [currentScreen, setCurrentScreen] = useState(AppScreens.HomeScreen);

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
        <TaskContext.Provider value={{
          tasks, 
          setTasks, 
          handleTaskComplete, 
          handleTaskDelete, 
          handleAddNewTask, 
          currentScreen, 
          setCurrentScreen
          }}>
            {children}
        </TaskContext.Provider>
    );
};