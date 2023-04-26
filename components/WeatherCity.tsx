import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Weather } from './Interfaces';
import Weathercode from './Weathercode';
import homeStyles from '../src/styles/Home.module.css';

interface ComponentProps {
	name: string;
	latitude: string;
	longitude: string;
	image: string;
	weathercode: number;
	is_day: number;
}

export default function WeatherCity(props: ComponentProps) {
	const { name, latitude, longitude, image, weathercode, is_day } = props;
	const [ weather, setWeather ] = useState<Weather>({ current_weather: {}, daily: {} } as Weather);

	useEffect(() => {
		async function fetchWeatherData() {
			const res = await fetch(`api/weather?latitude=${latitude}&longitude=${longitude}`);
			let weather: Weather = await res.json();
			setWeather({ ...weather });
		}
		fetchWeatherData();
	}, []);

	return (
		<div>
			<h6>{name}</h6>
			<Card className={homeStyles.cityCard + ' text-center'}>
				<Card.Img id="imageSize" src={'city-images/' + image} alt={name + ' image'} />
				<Card.ImgOverlay>
					<Card.Body>
						{/* <Card.Title>Today</Card.Title> */}
						{weather.daily.weathercode && weather.current_weather.is_day ? (
							<Weathercode
								weathercode={weather.daily.weathercode[0]}
								isDayOrNight={weather.current_weather.is_day}
							/>
						) : (
							'Not Found'
						)}
						<Card.Text className="fw-bold">
							{weather.daily.temperature_2m_max && weather.daily.temperature_2m_max.length > 0 ? (
								weather.daily.temperature_2m_max[0]
							) : (
								0
							)}&deg;C/
							<br />
							{weather.daily.temperature_2m_min && weather.daily.temperature_2m_min.length > 0 ? (
								weather.daily.temperature_2m_min[0]
							) : (
								0
							)}
						</Card.Text>
					</Card.Body>
				</Card.ImgOverlay>
			</Card>
		</div>
	);
}
