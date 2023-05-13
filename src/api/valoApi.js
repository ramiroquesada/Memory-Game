
export const valoApi = async() => {

	try {
		
		const resp = await fetch('https://valorant-api.com/v1/agents')

		const {data} = await resp.json()


		const agents = data.filter(objeto => {
			if (objeto.isPlayableCharacter) {
				return true;
			}
			return false;
		}).map(objeto => {
			return {
				uuid: objeto.uuid,
				displayName: objeto.displayName,
				displayIcon: objeto.displayIcon
			};
		});
		
		return agents.slice(0,3)

		

	} catch (error) {
		console.log(error)
	}


}