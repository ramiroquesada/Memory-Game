// import { configureStore } from "@reduxjs/toolkit";
// import { gameSlice } from "./gameSlice";
// import { uiSlice } from "./uiSlice";
// import { memorySlice } from "./memorySlice";

// export const store = configureStore({
// 	reducer:{
// 		game: gameSlice.reducer,
// 		ui: uiSlice.reducer,
// 		memory: memorySlice.reducer
		
// 	}
// })

import { configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "./gameSlice";
import { uiSlice } from "./uiSlice";
import { memorySlice } from "./memorySlice";
import { createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit";

// Crea el middleware de serialización
const serializableMiddleware = createSerializableStateInvariantMiddleware();

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    ui: uiSlice.reducer,
    memory: memorySlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serializableMiddleware)
});