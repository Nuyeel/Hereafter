// 用於儲存Redux變數資料

// 以下用於 活動購物車數字
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice'; //將檔案counterSlice引入

export default configureStore({
    reducer: {
        counter: counterReducer, //使用counterSlice的資料邏輯，並將其作為變數命名為 counter
    },
});
