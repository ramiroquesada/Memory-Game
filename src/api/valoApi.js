export const valoApi = async () => {
	try {
		const resp = await fetch('https://valorant-api.com/v1/agents');

		const { data } = await resp.json();

		const agents = data
			.filter((objeto) => {
				if (objeto.isPlayableCharacter) {
					return true;
				}
				return false;
			})
			.map((objeto) => {
				return {
					uuid: objeto.uuid,
					displayName: objeto.displayName,
					displayIcon: objeto.displayIcon,
					gradient: objeto.backgroundGradientColors
				};
			});

		return agents;
	} catch (error) {
		throw new Error(error)
	}
};

export const playerCardsApi = async () => {
	try {
		const resp = await fetch('https://valorant-api.com/v1/playercards');

		const { data } = await resp.json();

		const cards = data			
			.map((objeto) => {
				return {
					uuid: objeto.uuid,
					displayIcon: objeto.displayIcon,
				};
			});

		return cards;
	} catch (error) {
		throw new Error(error)
	}
};
