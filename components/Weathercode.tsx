import { Card } from "react-bootstrap";
interface ComponentProps {
    weathercode: number;
    isDayOrNight: number;
  }

export default function Weathercode({weathercode, isDayOrNight}: ComponentProps) {
  
  const renderImage = () => {
    const dayOrNight = isDayOrNight === 1 ? "day" : "night";
    switch (weathercode) {
        case 0:
        case 1: 
          return `icons/clear-${dayOrNight}.svg`;
        case 2:
          return "icons/cloudy.svg";
        case 3:
          return `icons/overcast-${dayOrNight}.svg`;
        case 45:
          return `icons/fog-${dayOrNight}.svg`;
        case 48:
          return "icons/fog.svg";
        case 51:
          return `icons/partly-cloudy-${dayOrNight}-drizzle.svg`;
        case 53:
        case 55:
          return "icons/drizzle.svg";
        case 56:
        case 57:
          return "icons/hail.svg";
        case 61:
          return `icons/partly-cloudy-${dayOrNight}-rain.svg`;
        case 63:
        case 65:
          return "icons/rain.svg";
        case 66:
          return `icons/partly-cloudy-${dayOrNight}-sleet.svg`;
        case 67:
          return "icons/sleet.svg";
        case 71:
        case 73:
        case 75:
          return "icons/snow.svg";
        case 77:
          return "icons/hail.svg";
        case 80:
          return `icons/partly-cloudy-${dayOrNight}-rain.svg`;
        case 81:
        case 82:
          return "icons/rain.svg";
        case 85:
          return `icons/partly-cloudy-${dayOrNight}-snow.svg`;
        case 86:
          return "icons/snow.svg";
        case 95:
          return `icons/thunderstorms-${dayOrNight}.svg`;
        case 96:
        case 99:
          return `icons/thunderstorms-${dayOrNight}-snow.svg`;
        default:
          return "";
    }
  };

  return <>
  {renderImage() && <Card.Img src={renderImage()} alt={`${isDayOrNight === 1 ? "day" : "night"} weather image`} />}
  </>;
};