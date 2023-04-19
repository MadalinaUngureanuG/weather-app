import { Card } from "react-bootstrap";

export default function WeatherDay() {
  return (
    <Card className="card text-center me-1">
    <Card.Body>
      <Card.Title>Mon</Card.Title>
      <Card.Img src="icons/rain.svg" alt="rain image"/>
      <Card.Text>15&deg;</Card.Text>
    </Card.Body>
  </Card>
  )
}
