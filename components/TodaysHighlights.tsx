import { Card } from "react-bootstrap";
import { Daily, CurrentWeather, Hourly } from "./Interfaces";
import homeStyles from "../src/styles/Home.module.css";

interface ComponentProps {
  daily:Daily; 
  current_weather:CurrentWeather;
  hourly:Hourly;
}

export default function TodaysHighlights(props:ComponentProps) {
  const { daily, current_weather, hourly } = props;

  function getSunriseTime():string {
    if (daily.sunrise && daily.sunrise.length > 0) {
      const sunriseAr:Array<string> = daily.sunrise[0].split("T");
      return sunriseAr[1]+" AM";
    }
    return"";
  }

  function getSunsetTime():string {
    if (daily.sunset && daily.sunset.length > 0) {
       const sunsetDate:Array<string> = daily.sunset[0].split("T");
       return sunsetDate[1]+" PM";
      }
    return"";
  }

  return (
    <>
    <Card className={homeStyles.card + " me-3 text-center"}>
      <Card.Body>
        <Card.Title className="fs-6">Sunrise & Sunset</Card.Title>
        <Card.Body className="width d-flex flex-row p-0 m-0">
          <Card.Img src="icons/sunrise.svg" alt="sunrise image"/>
          <Card.Text className="fw-bold mt-3">{getSunriseTime()}</Card.Text>
        </Card.Body>
        <Card.Body className="width d-flex flex-row p-0 m-0">
          <Card.Img src="icons/sunset.svg" alt="sunset image"/>
          <Card.Text className="fw-bold d-flex flex-row mt-3">{getSunsetTime()}</Card.Text>
        </Card.Body>
      </Card.Body>
    </Card>
    <Card className={homeStyles.card + " me-3 text-center"}>
      <Card.Body>
        <Card.Title className="fs-6">Wind Status</Card.Title>
        <Card.Body className="d-flex flex-row p-0 m-0">
          <Card.Img src="icons/wind.svg" alt="wind image"/>
        </Card.Body>
        <Card.Text className="fw-bold fs-5 mt-3">{current_weather.windspeed} km/h</Card.Text>
      </Card.Body>
    </Card>
    <Card className={homeStyles.card + " me-3 text-center"}>
      <Card.Body>
        <Card.Title className="fs-6">UV Index</Card.Title>
        <Card.Body className="d-flex flex-row p-0 m-0">
          <Card.Img src="icons/uv-index.svg" alt="uv-index image"/>
        </Card.Body>
        <Card.Text className="fw-bold fs-5 mt-3">{daily.uv_index_max && daily.uv_index_max.length > 0 ? daily.uv_index_max[0]:""}</Card.Text>
      </Card.Body>
    </Card>
    <Card className={homeStyles.card + " me-3 text-center"}>
      <Card.Body>
        <Card.Title className="fs-6">Humidity</Card.Title>
        <Card.Body className="d-flex flex-row p-0 m-0">
          <Card.Img src="icons/humidity.svg" alt="humidity image"/>
        </Card.Body>
        <Card.Text className="fw-bold fs-5 mt-3">{hourly.relativehumidity_2m && hourly.relativehumidity_2m.length > 0 ? hourly.relativehumidity_2m[0] : ""}</Card.Text>
      </Card.Body>
    </Card>
    </>
  );
}
