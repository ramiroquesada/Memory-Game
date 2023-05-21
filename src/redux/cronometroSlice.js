import { createSlice } from '@reduxjs/toolkit'

export const cronometroSlice = createSlice({
	name: 'cronometro',
	initialState: {
    minutos: 0,
    segundos: 0,
    milisegundos: 0,
    corriendo: false,
  },
	reducers: {

		iniciarCronometro: (state) => {
      state.corriendo = true;
    },

		pararCronometro: (state) => {
      state.corriendo = false;
    },

		reiniciarCronometro: (state) => {
      state.minutos = 0;
      state.segundos = 0;
      state.milisegundos = 0;
    },

		actualizarTiempo: (state) => {
      if (state.corriendo) {
        state.milisegundos += 1;
        if (state.milisegundos >= 100) {
          state.milisegundos = 0;
          state.segundos += 1;
          if (state.segundos >= 60) {
            state.segundos = 0;
            state.minutos += 1;
          }
        }
      }
    },
		

	},
})

export const { iniciarCronometro, pararCronometro, reiniciarCronometro, actualizarTiempo } = cronometroSlice.actions