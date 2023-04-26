import { Card } from "react-bootstrap";
import homeStyles from "../src/styles/Home.module.css";

export default function WeatherCity() {
  return (
    <div>
      <h6>Bucharest</h6>
      <Card className={homeStyles.cityCard + " text-center"}>
        <Card.Img src="images/bucharest.jpg" alt="bucharest image" />
        <Card.ImgOverlay>
          <Card.Body>
            <Card.Title>Today</Card.Title>
            <Card.Img id="imageSize" src="icons/rain.svg" alt="rain image"/>
            <Card.Text>15&deg;</Card.Text>
          </Card.Body>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
}
