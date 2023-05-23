import { useMemo } from "react";
import { useGameStore } from "../hooks/useGameStore"

export const InfoBar = () => {

	const { allCards, clickedCards } = useGameStore();

	const restantes = useMemo(() => allCards.length - clickedCards.length);


	return (
		<div className="infobar">
			<div>Restantes: {restantes}</div>
			<div>XD</div>
		</div>
	)
}
