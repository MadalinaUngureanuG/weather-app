import { Inter } from "next/font/google";
import { Button, Form, InputGroup, Image } from "react-bootstrap";
import WeatherDay from "../../components/WeatherDay";
import WeatherCity from "../../components/WeatherCity";
import WeatherDetails from "../../components/WeatherDetails";
import { Search } from "react-bootstrap-icons";

const inter = Inter({ subsets: [ "latin" ] });

export default function Home() {
  return (
    <div className="d-flex flex-row">
      <div className="p-5" style={{ backgroundColor: "white" }}>
        <InputGroup id="search">
          <Form.Control
            placeholder="Search for places..."
            aria-label="Search for places..."
            aria-describedby="basic-addon2"
            id="form"
          />
           <Button type="submit">
            <Search />
          </Button>
        </InputGroup>
        <Image src="icons/clear-day.svg" />
        <h1>12&deg;C</h1>
        <h4>Monday, 16:00</h4>
        <hr />
        <p>Mostly Cloudly</p>
        <p>Rain -30%</p>
        <div>Your Location + Image</div>
      </div>
      <div
        className="d-flex flex-column p-5"
        style={{ backgroundColor: "#f1f8f9" }}
      >
        <h5 className="fw-bold">Week</h5>
        <div className="d-flex flex-row mt-4">
          <WeatherDay />
          <WeatherDay />
          <WeatherDay />
          <WeatherDay />
          <WeatherDay />
          <WeatherDay />
          <WeatherDay />
        </div>
        <div className="d-flex flex-column mt-5">
          <h5 className="fw-bold">Today's Highlights</h5>
          <div className="d-flex flex-row mt-3">
            <WeatherDetails />
            <WeatherDetails />
            <WeatherDetails />
            <WeatherDetails />
          </div>
          <div className="d-flex flex-row mt-3">
            <WeatherCity />
          </div>
        </div>
      </div>
    </div>
  );
}
