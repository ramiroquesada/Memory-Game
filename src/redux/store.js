import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./uiSlice";
import { gameSlice } from "./gameSlice";
import { memorySlice } from "./memorySlice";
import { cronometroSlice } from "./cronometroSlice";

export const store = configureStore({
	reducer:{
		ui: uiSlice.reducer,
		game: gameSlice.reducer,
		memory: memorySlice.reducer,
		cronometro: cronometroSlice.reducer
		
	}
})

