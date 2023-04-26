import { Card } from "react-bootstrap";
import Weathercode from "./Weathercode";

interface ComponentProps {
  date: string; 
  temperatureMax: number;
  temperatureMin: number;
  weathercode: number;
  is_day: number;
}

export default function WeatherDay(props:ComponentProps) {
  const {date, temperatureMax, temperatureMin, weathercode, is_day} = props;

  function getDayName():string {
  if (date && date.length > 0) {
     const formatter = new Intl.DateTimeFormat("en-US", { weekday: "short" });
     const dayOfWeekName = formatter.format(new Date(date));
     return dayOfWeekName;
  }
    return"";
  }

  return (
    <>
      <Card className="card text-center me-1">
      <Card.Body>
      <Card.Title>{getDayName()}</Card.Title>
      <Weathercode weathercode={weathercode} isDayOrNight={is_day} />
      <Card.Text>
        <span className="fw-bold">{temperatureMax}&deg;C</span>/
        <br />
        <span className="text-secondary fw-bold">{temperatureMin}&deg;C</span>
      </Card.Text>
      </Card.Body>
      </Card>
    </>
  )
}

