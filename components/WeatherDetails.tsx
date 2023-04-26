import { Card } from "react-bootstrap";
import homeStyles from "../src/styles/Home.module.css";

export default function WeatherDetails() {
  return (
    <Card className={homeStyles.card + " me-3 text-center"}>
      <Card.Body>
        <Card.Title className="fs-6">Sunrise & Sunset</Card.Title>
        <Card.Body className="width d-flex flex-row p-0 m-0">
          <Card.Img src="icons/sunrise.svg" alt="sunrise image"/>
          <Card.Text className="fw-bold mt-3">6:35 AM</Card.Text>
        </Card.Body>
        <Card.Body className="width d-flex flex-row p-0 m-0">
          <Card.Img src="icons/sunset.svg" alt="sunset image"/>
          <Card.Text className="fw-bold d-flex flex-row mt-1">5:42<span> PM</span></Card.Text>
        </Card.Body>
      </Card.Body>
    </Card>
  );
}
