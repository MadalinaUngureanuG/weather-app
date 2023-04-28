import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup, Image } from "react-bootstrap";
import { ArrowRightShort, GeoAltFill } from "react-bootstrap-icons";
import TodaysHighlights from "../../components/TodaysHighlights";
import WeatherCity from "../../components/WeatherCity";
import WeatherDay from "../../components/WeatherDay";
import Weathercode from "../../components/Weathercode";
import City from "../../components/interfaces/CityInterface";
import Weather from "../../components/interfaces/WeatherInterface";
import homeStyles from "../styles/Home.module.css";

const inter = Inter({ subsets: [ "latin" ] });

export default function Home() {
	const [ weather, setWeather ] = useState<Weather>({ current_weather: {}, daily: {}, hourly: {} } as Weather);
	const [ latitude, setLatitude ] = useState(45.653699949009734);
	const [ longitude, setLongitude ] = useState(25.60715741739149);
	const [ cities, setCities ] = useState<Array<City>>([]);
	const [ city, setCity ] = useState("Brasov");
	const inputRef = useRef<HTMLInputElement>(null);
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(
		() => {
			fetchWeatherData();
		},
		[ latitude, longitude ]
	);

	async function fetchWeatherData() {
		const res = await fetch(`api/weather?latitude=${latitude}&longitude=${longitude}`);
		let weather: Weather = await res.json();
		setWeather({ ...weather });
	}

	function getCurrentPosition() {
		if (navigator.geolocation) {
			let position = navigator.geolocation.getCurrentPosition(position => {
				setCity("Your current location");
				setLatitude(position.coords.latitude);
				setLongitude(position.coords.longitude);
				fetchWeatherData();
			});
		}
	}

	async function fetchCities(name: string) {
		const res = await fetch(`api/cities?name=` + name);
		let data: Array<City> = await res.json();
		if(Array.isArray(data) && data.length>0){
			setCities(data);
		} else{
			alert("Please introduce an valid city.");
			setCities([]);
		} 
	}

	function search(e: any) {
		e.preventDefault();
		if (inputRef.current !== null) {
			const searchData: string = inputRef.current.value;
			fetchCities(searchData);
		}
	}

	function selectCity(city:any) {
		setCity(city.name);
		setCities([]);
		if (inputRef.current !== null) {
			inputRef.current.value = "";
		}
		setLatitude(city.latitude);
		setLongitude(city.longitude);
		fetchWeatherData();
	}

	function handleKeyPress(event:any) {
		if (event.key === "Enter") {
			if (formRef.current && formRef.current.dispatchEvent !== null)
			{new Event("submit", { bubbles: true, cancelable: true })}
		}
	}

	function getCurrentTime(): string {
		if (weather.current_weather.time && weather.current_weather.time.length > 0) {
			const curentTime: Array<string> = weather.current_weather.time.split("T");
			return curentTime[1];
		}
		return "";
	}

	function getDayName(): string {
		if (weather.current_weather.time && weather.current_weather.time.length > 0) {
			const formatter = new Intl.DateTimeFormat("en-US", { weekday: "long" });
			const dayOfWeekName = formatter.format(new Date(weather.current_weather.time));
			return dayOfWeekName;
		}
		return "";
	}

	function getVisibilityInKm(): number {
		if (weather.hourly.visibility && weather.hourly.visibility.length > 0) {
			const visibilityInKm: number = weather.hourly.visibility[0] / 1000;
			return visibilityInKm;
		}
		return 0;
	}

	return (
		<main id="main" className="d-flex flex-row px-2">
			<div className="side-panel p-5">
				<form onSubmit={search} ref={formRef}>
					<InputGroup onKeyDown={handleKeyPress}>
						<Form.Control
							minLength={3}
							required
							ref={inputRef}
							placeholder="Search for city..."
							aria-label="Search for city..."
							aria-describedby="search"
						/>
					</InputGroup>
					<Button type="button" title="Click to see the weather at your location" onClick={() => getCurrentPosition()}>
							<GeoAltFill />
					</Button>
				</form>
				<ul className="fs-5 p-0">
					{cities &&
						cities.map((city, index) => {
							return (
								<>
								<p>Please select your city:</p>
								<li key={index} onClick={() => selectCity(city)}>
								<ArrowRightShort /> {city.name}
								</li>
								</>
							);
						})}
				</ul>
				<h1 className="text-center mt-3">{city}</h1>
				<h5 className="mt-4 text-center">
					{getDayName()}, {getCurrentTime()}
				</h5>
				{weather.daily.weathercode ? (
					<Weathercode
						weathercode={weather.daily.weathercode[0]}
						isDayOrNight={weather.current_weather.is_day}
					/>
				) : (
					""
				)}
				<h1 className="text-center">{weather.current_weather.temperature}&deg;C</h1>
				<hr className="my-5"/>
				{weather.hourly.precipitation_probability && weather.hourly.precipitation_probability ? (
					<div className="d-flex flex-row align-items-center">					
					   <Image id={homeStyles.imageSize} src="icons/raindrops.svg" alt="raindrops image" />
					   <p className="fw-bold fs-6 mb-0">Precipitation: {weather.hourly.precipitation_probability[0]}%</p>
                    </div>
				) : (
					"Not Found"
				)}
				<div className="d-flex flex-row align-items-center mt-2">
					<Image id={homeStyles.imageSize} src="icons/fog.svg" alt="fog image" />
					<p className="fw-bold fs-6 mb-0">Visibility: {getVisibilityInKm()} km</p>
				</div>
				<div className="title text-center">
					<h1 className="fw-bold">Weather App</h1>
					<p><Image src="icons/celsius.svg" alt="celsius image" /></p>
				</div>
			</div>
			<div className="main-panel d-flex flex-column p-5">
				    <h5 className="fw-bold">Week</h5>
				    <div className="week-card d-flex flex-row flex-wrap mt-4 justify-content-around ms-2">
					{weather.daily &&
						weather.daily.time &&
						weather.daily.time.map((time:any, index:number) => {
							if(index>0){
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
										weather.current_weather.is_day!==undefined ? (
											weather.current_weather.is_day
										) : (
											0
										)
									}
								/>
							);
								}
						})}
				    </div>
				<div className="d-flex flex-column mt-5">
					<h5 className="fw-bold">Today&apos;s Highlights</h5>
					<div className="highlights-card d-flex flex-row flex-wrap mt-4 justify-content-around">
						{weather.daily ? (
							<TodaysHighlights
								daily={weather.daily}
								current_weather={weather.current_weather}
								hourly={weather.hourly}
							/>
						) : (
							"Not any other information was found."
						)}
					</div>
				</div>
				<div className="d-flex flex-column mt-5">
				<h5 className="fw-bold">Weather Today In:</h5>
					<div className="d-flex flex-row flex-wrap justify-content-around mt-1 ms-3"> 
						<WeatherCity
							name={"Bucharest"}
							latitude={44.439663}
							longitude={26.096306}
							image={"bucharest.jpg"}
						/>
						<WeatherCity
							name={"London"}
							latitude={51.509865}
							longitude={-0.118092}
							image={"london.jpg"}
						/>
						<WeatherCity name={"Paris"} latitude={48.864716} longitude={2.349014} image={"paris.jpg"} />
				    </div>
				</div>
			</div>
		</main>
	);
}
