import { Inter } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { Weather } from '../../components/Interfaces';
import TodaysHighlights from '../../components/TodaysHighlights';
import WeatherCity from '../../components/WeatherCity';
import WeatherDay from '../../components/WeatherDay';
import Weathercode from '../../components/Weathercode';

const inter = Inter({ subsets: [ 'latin' ] });

export default function Home() {
	const [ weather, setWeather ] = useState<Weather>({ current_weather: {}, daily: {}, hourly: {} } as Weather);
	const [ latitude, setLatitude ] = useState(45.71);
	const [ longitude, setLongitude ] = useState(25.3441);
	const [ cities, setCities ] = useState([]);
	const [ city, setCity ] = useState('Brasov');
	const inputRef = useRef(null);

	useEffect(
		() => {
			//get current position
			fetchWeatherData();
		},
		[ latitude, longitude ]
	);

	async function fetchWeatherData() {
		const res = await fetch(`api/weather?latitude=${latitude}&longitude=${longitude}`);
		let weather: Weather = await res.json();
		setWeather({ ...weather }, '');
	}

	function getCurrentPosition() {
		if (navigator.geolocation) {
			let position = navigator.geolocation.getCurrentPosition(position => {
				setCity('Your position');
				setLatitude(position.coords.latitude);
				setLongitude(position.coords.longitude);
				// console.log("Date :",latitude,longitude,position.coords)
				// fetchWeatherData();
			});
		}
	}

	async function fetchCities(name: string) {
		const res = await fetch(`api/cities?name=` + name);
		let data: any = await res.json();
		setCities(data);
	}

	function search() {
		const searchData: string = inputRef.current.value;
		fetchCities(searchData);
	}

	function selectCity(city) {
		setCity(city.name);
		setLatitude(city.latitude);
		setLongitude(city.longitude);
		fetchWeatherData();
	}

	function handleKeyPress(event) {
		if (event.key === 'Enter') {
			search();
		}
	}

	function getCurrentTime(): string {
		if (weather.current_weather.time && weather.current_weather.time.length > 0) {
			const curentTime: Array<string> = weather.current_weather.time.split('T');
			return curentTime[1];
		}
		return '';
	}

	function getDayName(): string {
		if (weather.current_weather.time && weather.current_weather.time.length > 0) {
			const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
			const dayOfWeekName = formatter.format(new Date(weather.current_weather.time));
			return dayOfWeekName;
		}
		return '';
	}

	function getVisibilityInKm(): number {
		if (weather.hourly.visibility && weather.hourly.visibility.length > 0) {
			const visibilityInKm: number = weather.hourly.visibility[0] / 1000;
			return visibilityInKm;
		}
		return 0;
	}

	return (
		<div className="d-flex flex-row">
			<div className="p-5" style={{ backgroundColor: 'white' }}>
				<input
					type="search"
					id="search"
					onKeyDown={handleKeyPress}
					placeholder="Search for city..."
					aria-label="Search for city..."
					aria-describedby="basic-addon2"
					ref={inputRef}
				/>
				<Button type="text" onClick={() => search()}>
					<Search />
				</Button>
				<Button type="text" onClick={() => getCurrentPosition()}>
					<GeoAltFill />
				</Button>
				<ul>
					{cities &&
						cities.map((city, index) => {
							return (
								<li key={index} onClick={() => selectCity(city)}>
									{city.name}
								</li>
							);
					})}
				</ul>
				<h1 className="text-center mt-5">{city}</h1>
				<h5 className="mt-4 text-center">
					{getDayName()}, {getCurrentTime()}
				</h5>
				{weather.daily.weathercode ? (
					<Weathercode
						weathercode={weather.daily.weathercode[0]}
						isDayOrNight={weather.current_weather.is_day}
					/>
				) : (
					''
				)}
				<h1 className="text-center">{weather.current_weather.temperature}&deg;C</h1>
				<hr />
				{weather.hourly.precipitation_probability && weather.hourly.precipitation_probability ? (
					<p>Precipitation: {weather.hourly.precipitation_probability[0]}%</p>
				) : (
					'Not Found'
				)}
				<p>Visibility: {getVisibilityInKm()} km</p>
				<div>Your Location + Image</div>
				{/* <br />
				<small>
					<a
            href={"https://maps.google.com/maps?q="+latitude+","+longitude+"&hl=es&z=14&amp;output=embed"}
						target="_blank"
					>
						See on map 
					</a>
				</small> */}
			</div>
			<div className="d-flex flex-column p-5" style={{ backgroundColor: '#f1f8f9' }}>
				<h5 className="fw-bold">Week</h5>
				<div className="d-flex flex-row mt-4">
					{weather.daily &&
						weather.daily.time &&
						weather.daily.time.map((time, index) => {
							return (
								<WeatherDay
									key={index}
									date={time}
									temperatureMax={
										weather.daily.temperature_2m_max &&
										weather.daily.temperature_2m_max.length > 0 ? (
											weather.daily.temperature_2m_max[index]
										) : (
											0
										)
									}
									temperatureMin={
										weather.daily.temperature_2m_min &&
										weather.daily.temperature_2m_min.length > 0 ? (
											weather.daily.temperature_2m_min[index]
										) : (
											0
										)
									}
									weathercode={
										weather.daily.weathercode && weather.daily.weathercode.length > 0 ? (
											weather.daily.weathercode[index]
										) : (
											0
										)
									}
									is_day={
										weather.current_weather.is_day && weather.current_weather.is_day.length > 0 ? (
											weather.current_weather.is_day
										) : (
											0
										)
									}
								/>
							);
						})}
				</div>
				<div className="d-flex flex-column mt-5">
					<h5 className="fw-bold">Today&apos;s Highlights</h5>
					<div className="d-flex flex-row mt-3">
						{weather.daily ? (
							<TodaysHighlights
								daily={weather.daily}
								current_weather={weather.current_weather}
								hourly={weather.hourly}
							/>
						) : (
							'Not any other information was found.'
						)}
					</div>
					<div className="d-flex flex-row mt-3">
						<WeatherCity
							name={'Bucharest'}
							latitude={'44.439663'}
							longitude={'26.096306'}
							image={'bucharest.jpg'}
						/>
						<WeatherCity
							name={'London'}
							latitude={'51.509865'}
							longitude={'-0.118092'}
							image={'london.jpg'}
						/>
						<WeatherCity name={'Paris'} latitude={'48.864716'} longitude={'2.349014'} image={'paris.jpg'} />
					</div>
				</div>
			</div>
		</div>
	);
}
