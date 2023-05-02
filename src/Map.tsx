import { useEffect, useRef } from "react"
import { iconPerson } from "./Icon"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
type MapProps = {
  pos: any
}
const Map = ({ pos }: MapProps) => {
  const mapRef = useRef<any>(null)
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo(pos, 14)
    }
  }, [pos])
  return (
    <MapContainer center={pos} zoom={14} ref={mapRef} className='map-container'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      <Marker position={pos} icon={iconPerson}>
        <Popup>You are Here</Popup>
      </Marker>
    </MapContainer>
  )
}
export default Map
