import { Card } from "react-bootstrap";

interface ComponentProps {
    weathercode: number;
    isDayOrNight: number;
  }

export default function Weathercode(props:ComponentProps) {
    const {weathercode, isDayOrNight} = props;

    return <>
      {(weathercode === 0 || weathercode === 1) && <Card.Img src={"icons/clear-"+(isDayOrNight === 1 ? "day":"night")+".svg"} alt="clear day or night image"/>}
      {weathercode === 2 && <Card.Img src="icons/cloudy.svg" alt="cloudy image"/>}
      {weathercode === 3 && <Card.Img src={"icons/overcast-"+(isDayOrNight === 1 ? "day":"night")+".svg"} alt="overcast day or night image"/>}
      {weathercode === 45 && <Card.Img src={"icons/fog-"+(isDayOrNight === 1 ? "day":"night")+".svg"} alt="fog day or night image"/>}
      {weathercode === 48 && <Card.Img src="icons/fog.svg" alt="fog image"/>}
      {weathercode === 51 && <Card.Img src={"icons/partly-cloudy-"+(isDayOrNight === 1 ? "day":"night")+"-drizzle.svg"} alt="partly cloudy day or night drizzle image"/>}
      {(weathercode === 53 || weathercode === 55) && <Card.Img src="icons/drizzle.svg" alt="drizzle image"/>}
      {(weathercode === 56 || weathercode === 57) && <Card.Img src="icons/hail.svg" alt="hail image"/>}
      {weathercode === 61 && <Card.Img src={"icons/partly-cloudy-"+(isDayOrNight === 1 ? "day":"night")+"-rain.svg"} alt="partly cloudy day or night rain image"/>}
      {(weathercode === 63 || weathercode === 65) && <Card.Img src="icons/rain.svg" alt="rain image"/>}
      {weathercode === 66 && <Card.Img src={"icons/partly-cloudy-"+(isDayOrNight === 1 ? "day":"night")+"-sleet.svg"} alt="partly cloudy day or night sleet image"/>}
      {weathercode === 67 && <Card.Img src="icons/sleet.svg" alt="sleet image"/>}
      {(weathercode === 71 || weathercode === 73 || weathercode === 75) && <Card.Img src="icons/snow.svg" alt="snow image"/>} 
      {weathercode === 77 && <Card.Img src="icons/hail.svg" alt="hail image"/>}
      {weathercode === 80 && <Card.Img src={"icons/partly-cloudy-"+(isDayOrNight === 1 ? "day":"night")+"-rain.svg"} alt="partly cloudy day or night rain image"/>}
      {(weathercode === 81 || weathercode === 82) && <Card.Img src="icons/rain.svg" alt="rain image"/>}
      {weathercode === 85 && <Card.Img src={"icons/partly-cloudy-"+(isDayOrNight === 1 ? "day":"night")+"-snow.svg"} alt="partly cloudy day or night snow image"/>}
      {weathercode === 86 && <Card.Img src="icons/snow.svg" alt="snow image"/>}
      {weathercode === 95 && <Card.Img src={"icons/thunderstorms-"+(isDayOrNight === 1 ? "day":"night")+".svg"} alt="thunderstorms day or night drizzle image"/>}
      {(weathercode === 96 || weathercode === 99) && <Card.Img src={"icons/thunderstorms-"+(isDayOrNight === 1 ? "day":"night")+"-snow.svg"} alt="thunderstorms day or night snow image"/>}
    </>
};