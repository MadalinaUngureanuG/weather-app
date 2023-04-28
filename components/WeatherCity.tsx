import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Weather  from './interfaces/WeatherInterface';
import Weathercode from './Weathercode';
import homeStyles from '../src/styles/Home.module.css';

interface ComponentProps {
	name: string;
	latitude: number;
	longitude: number;
	image: string;
}

export default function WeatherCity(props: ComponentProps) {
	const { name, latitude, longitude, image} = props;
	const [ weather, setWeather ] = useState<Weather>({ current_weather: {}, daily: {} } as Weather);

	useEffect(() => {
		async function fetchWeatherData() {
			const res = await fetch(`api/weather?latitude=${latitude}&longitude=${longitude}`);
			let weather: Weather = await res.json();
			setWeather({ ...weather });
		}
		fetchWeatherData();
	}, [ latitude, longitude]);

	return (
		<div >
			<h6 className="mt-3">{name}:</h6>
			<Card className={homeStyles.cityCard} style={{ backgroundImage: `url(city-images/${image})` }}>
			<p className={homeStyles.temp + " fw-bold text-center"}>
				{weather.daily.temperature_2m_max && weather.daily.temperature_2m_max.length > 0 ? (
								weather.daily.temperature_2m_max[0]
							) : (
								0
							)}&deg;C/ {weather.daily.temperature_2m_min && weather.daily.temperature_2m_min.length > 0 ? (
								weather.daily.temperature_2m_min[0]
							) : (
								0
							)}&deg;C
				</p>
				<Card.ImgOverlay>
					<Card.Body className="d-flex flex-column py-4">
						<div className={homeStyles.iconSize}>
						{weather.daily.weathercode && weather.current_weather.is_day ? (
							<Weathercode
								weathercode={weather.daily.weathercode[0]}
								isDayOrNight={weather.current_weather.is_day}
							/>
						) : (
							'Not Found'
						)}
						</div>
					</Card.Body>
				</Card.ImgOverlay>
			</Card>
		</div>
	);
}
