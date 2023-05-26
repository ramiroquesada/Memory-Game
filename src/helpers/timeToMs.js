
export const timeToMs = (record) => {

	const { minutes, seconds, miliseconds } = record

	const minutesToMs = Math.floor((minutes * 60) * 1000)

	const secondsToMs = Math.floor(seconds * 1000)
	
	return minutesToMs + secondsToMs + miliseconds
	

}