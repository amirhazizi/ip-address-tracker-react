import L from "leaflet"
import iconSVG from "./icon-location.svg"
const iconPerson = new L.Icon({
  iconUrl: iconSVG,
  iconAnchor: undefined,
  popupAnchor: undefined,
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(30, 40),
  className: "leaflet-div-icon",
})

export { iconPerson }
