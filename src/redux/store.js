import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./uiSlice";
import { gameSlice } from "./gameSlice";
import { memorySlice } from "./memorySlice";

export const store = configureStore({
	reducer:{
		ui: uiSlice.reducer,
		game: gameSlice.reducer,
		memory: memorySlice.reducer
		
	}
})

