// Redux - 處理活動購物車Nav數字
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0, //初始值
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
        decrementByAmount: (state, action) => {
            state.value -= action.payload;
        },
        // 活動購物車數字用
        eventCartNum: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const {
    increment,
    decrement,
    incrementByAmount,
    decrementByAmount,
    eventCartNum,
} = counterSlice.actions;

export default counterSlice.reducer;
