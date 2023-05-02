import { iconPerson } from "./Icon"
import { MapContainer, TileLayer, Marker, useMapEvent } from "react-leaflet"
type MapProps = {
  pos: any
}
const NewMarker = ({ pos }: MapProps) => {
  const map = useMapEvent("click", () => {
    map.setView(pos, map.getZoom())
  })
  return <Marker position={pos} icon={iconPerson} />
}
const Map = ({ pos }: MapProps) => {
  return (
    <MapContainer center={pos} zoom={14} className='map-container'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      <NewMarker pos={pos} />
    </MapContainer>
  )
}
export default Map
