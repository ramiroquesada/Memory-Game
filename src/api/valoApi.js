
export const valoApi = async() => {

	try {
		
		const resp = await fetch('https://valorant-api.com/v1/agents')

		const {data} = await resp.json()

		const agents = data.slice(9, 21)


		return agents

		

	} catch (error) {
		console.log(error)
	}


}