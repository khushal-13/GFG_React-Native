import { createContext, useState } from "react";
import { DUMMY_TASK } from "../utils/constants";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {

    const [tasks, setTasks] = useState([...DUMMY_TASK]);

    return (
        <TaskContext.Provider value={{tasks, setTasks}}>
            {children}
        </TaskContext.Provider>
    );
};