const getWeather = (latitude: number, longitude: number) =>
	`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m&hourly=relativehumidity_2m&hourly=precipitation_probability&hourly=visibility&daily=temperature_2m_min&daily=temperature_2m_max&daily=sunrise&daily=sunset&forecast_days=8&windspeed_10m&daily=uv_index_max&timezone=auto&daily=weathercode`;

export default async function handler(req: any, res: any) {
	const { latitude, longitude } = req.query;
	const weather = await fetch(getWeather(parseFloat(latitude), parseFloat(longitude)));
	const data = await weather.json();
	res.status(200).json(data);
}


