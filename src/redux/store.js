import { configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "./gameSlice";
import { uiSlice } from "./uiSlice";
import { memorySlice } from "./memorySlice";

export const store = configureStore({
	reducer:{
		game: gameSlice.reducer,
		ui: uiSlice.reducer,
		memory: memorySlice.reducer
		
	}
})