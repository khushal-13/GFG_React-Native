import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_TASK } from "../utils/constants";

const initialState = DUMMY_TASK;

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {

        },
        removeTask: (state, action) => {
            
        }
    }
})