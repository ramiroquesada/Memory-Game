import { useDispatch, useSelector } from "react-redux"
import { valoApi } from "../api/valoApi"
import { onSetCards } from "./gameSlice"


export const useGameStore = () => {


	const {cards, clickedCards} = useSelector(state => state.game)

	const dispatch = useDispatch()
	
	const onGetCards =  async() => {

		const newCards = await valoApi()

		dispatch( onSetCards(newCards) )
	};


	const onAddToClicked = (card) => {
		dispatch( onAddToClicked(card) )
	}



	return{
		cards,
		clickedCards,

		onGetCards,
		onAddToClicked,
		

	}


}
