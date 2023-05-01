import { useEffect, useState } from "react"
import headerImg from "./assets/pattern-bg-mobile.png"
import { MdKeyboardArrowRight } from "react-icons/md"
import { iconPerson } from "./assets/Icon"
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet"
import axios from "axios"
const getUserIP = "https://api.ipify.org/?format=json"
const mainUrl = "https://geo.ipify.org/api/v2"
// country,city?apiKey=&ipAddress=8.8.8.8
const apiKey = `apiKey=${import.meta.env.VITE_API_KEY}`
const initialData = {
  ip: "loading...",
  location: "loading...",
  timezone: "loading...",
  isp: "loading...",
}
function App() {
  const [userInput, setUserInput] = useState("")
  const [userAPI, setUserAPI] = useState(0)
  const [userData, setUserData] = useState(initialData)
  const fetchUserAPI = async () => {
    try {
      const { data } = await axios(getUserIP)
      setUserAPI(data.ip)
      setUserInput(data.ip)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchUserAPIData = async () => {
    try {
      const { data } = await axios(
        `${mainUrl}/country,city?${apiKey}&ipAddress=${userAPI}`
      )
      const {
        ip,
        isp,
        location: { city, country, lat: x, lng: y, postalCode, timezone },
      } = data
      const newData = {
        ip,
        location: `${country}, ${city} ${postalCode}`,
        timezone,
        isp,
      }
      setUserData(newData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchUserAPI()
    fetchUserAPIData()
  }, [])

  return (
    <main className='relative grid min-h-screen items-start justify-center'>
      <div className='floatContent h-full absolute w-full top-0 left-0  z-10'>
        <img src={headerImg} alt='header' />
        <MapContainer
          center={[35.75, 51.5148]}
          zoom={15}
          className='map-container'
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={[51.505, -0.09]} icon={iconPerson}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className='py-8 space-y-5 relative z-20'>
        <h1 className='text-center text-2xl text-white'>IP Address Tracker</h1>
        <form className='relative'>
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            type='text'
            className='pl-4 w-full py-3 rounded-xl overflow-hidden focus:outline-none'
          />
          <button
            type='submit'
            className='absolute right-0 top-1/2 -translate-y-1/2 bg-black h-full w-12 rounded-r-xl'
          >
            <MdKeyboardArrowRight className='fill-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-125' />
          </button>
        </form>
        <div className='p-5 space-y-4 rounded-xl bg-white text-center shadow-xl'>
          <div className='space-y-1'>
            <p className='headerinfo font-bold uppercase text-clVeryDarkGray opacity-50'>
              ip address
            </p>
            <h1 className='font-bold text-clVeryDarkGray'>{userData.ip}</h1>
          </div>
          <div className='space-y-1'>
            <p className='headerinfo font-bold uppercase text-clVeryDarkGray opacity-50'>
              location
            </p>
            <h1 className='font-bold text-clVeryDarkGray'>
              {userData.location}
            </h1>
          </div>
          <div className='space-y-1'>
            <p className='headerinfo font-bold uppercase text-clVeryDarkGray opacity-50'>
              timezone
            </p>
            <h1 className='font-bold text-clVeryDarkGray'>
              {userData.timezone !== "loading..."
                ? `UTC${userData.timezone}`
                : `loading...`}
            </h1>
          </div>
          <div className='space-y-1'>
            <p className='headerinfo font-bold uppercase text-clVeryDarkGray opacity-50'>
              isp
            </p>
            <h1 className='font-bold text-clVeryDarkGray'>{userData.isp}</h1>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
