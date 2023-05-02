import { useEffect, useState, useReducer } from "react"
import mobileHeaderImg from "./assets/pattern-bg-mobile.png"
import desktopHeaderImg from "./assets/pattern-bg-desktop.png"
import { MdKeyboardArrowRight } from "react-icons/md"
import roling from "./assets/Rolling.svg"
import Map from "./Map"
import axios from "axios"
import reducer from "./reducer"
import { INVALID_IP, CURRECT_IP, REST } from "./actions"
const getUserIP = "https://api.ipify.org/?format=json"
const mainUrl = "https://geo.ipify.org/api/v2"
const apiKey = `apiKey=${import.meta.env.VITE_API_KEY}`
const initialData = {
  ip: "164.89.39.12",
  location: "US, Kingsport 37660",
  timezone: "-04:00",
  isp: "Eastman Chemical Company",
}
const ipValidate =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

const initialState = {
  content: "",
  isShow: false,
}
function App() {
  const [userInput, setUserInput] = useState("")
  const [userAPI, setUserAPI] = useState("")
  const [userData, setUserData] = useState(initialData)
  const [position, setPosition] = useState<any>([35.505, -0.09])
  const [isLoading, setIsLoading] = useState(false)
  const [notificationState, notificationDistpatch] = useReducer(
    reducer,
    initialState
  )

  const fetchUserAPI = async () => {
    try {
      if (userAPI.length === 0) {
        const { data } = await axios(getUserIP)
        setUserAPI(data.ip)
        setUserInput(data.ip)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUserAPIData = async () => {
    setIsLoading(true)
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
      setPosition([x, y])
      notificationDistpatch({
        type: CURRECT_IP,
        payload: "Location Updated Click on the Map",
      })
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      // notificationDistpatch({ type: INVALID_IP, payload: "Invalid IP" })
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchUserAPI()
  }, [])
  useEffect(() => {
    fetchUserAPIData()
  }, [userAPI])
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (notificationState.isShow) {
        notificationDistpatch({ type: REST, payload: "" })
      }
    }, 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [notificationState.isShow])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (ipValidate.test(userInput)) {
      setUserAPI((oldState) => {
        if (oldState !== userInput) return userInput
        return oldState
      })
      return
    }
    notificationDistpatch({ type: INVALID_IP, payload: "Invalid IP" })
  }

  return (
    <main className='relative grid min-h-screen items-start justify-center'>
      <div className='floatContent h-full absolute w-full top-0 left-0 z-10'>
        <img src={mobileHeaderImg} className='md:hidden' alt='header' />
        <img src={desktopHeaderImg} className='hidden md:block' alt='header' />
        <Map pos={position} />
      </div>

      <div className='py-8 space-y-5 relative z-20 md:space-y-7 md:py-6'>
        <h1 className='text-center text-2xl text-white'>IP Address Tracker</h1>
        <form className='relative max-w-md mx-auto' onSubmit={handleSubmit}>
          <input
            value={userInput}
            placeholder='Search for any IP address or domain'
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
        <div className='p-5 grid gap-4 rounded-xl bg-white text-center shadow-xl relative md:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:p-10 lg:text-left'>
          {isLoading && (
            <div className='absolute inset-0 bg-clDarkGray bg-opacity-50 rounded-xl'>
              <img
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:scale-50'
                src={roling}
                alt=''
              />
            </div>
          )}
          <div className='space-y-1'>
            <p className='headerinfo font-bold uppercase text-clVeryDarkGray opacity-50'>
              ip address
            </p>
            <h1 className='font-bold text-clVeryDarkGray'>{userData.ip}</h1>
          </div>
          <div className='space-y-1 lg:border-l lg:border-clDarkGray lg:pl-6'>
            <p className='headerinfo font-bold uppercase text-clVeryDarkGray opacity-50'>
              location
            </p>
            <h1 className='font-bold text-clVeryDarkGray'>
              {userData.location === "ZZ,  "
                ? "Middle of nowhere"
                : userData.location}
            </h1>
          </div>
          <div className='space-y-1 lg:border-l lg:border-clDarkGray lg:pl-6'>
            <p className='headerinfo font-bold uppercase text-clVeryDarkGray opacity-50'>
              timezone
            </p>
            <h1 className='font-bold text-clVeryDarkGray'>
              {userData.timezone ? `UTC${userData.timezone}` : "undefined"}
            </h1>
          </div>
          <div className='space-y-1 lg:border-l lg:border-clDarkGray lg:pl-6'>
            <p className='headerinfo font-bold uppercase text-clVeryDarkGray opacity-50'>
              isp
            </p>
            <h1 className='font-bold text-clVeryDarkGray'>
              {userData.isp || "undefined"}
            </h1>
          </div>
        </div>
      </div>
      <div
        className={`fixed bottom-0 left-1/2 bg-gray-900 w-fit z-50 text-white p-2 px-4 -translate-x-1/2 rounded-t-xl transition-transform text-sm ${
          notificationState.isShow ? "translate-y-0" : "translate-y-14"
        }`}
      >
        {notificationState.content}
      </div>
    </main>
  )
}

export default App
