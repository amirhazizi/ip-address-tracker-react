import headerImg from "./assets/pattern-bg-mobile.png"
import { MdKeyboardArrowRight } from "react-icons/md"
import { GoLocation } from "react-icons/go"
function App() {
  return (
    <main className='relative grid min-h-screen items-start justify-center'>
      <div className='floatContent h-full absolute w-full top-0 left-0 -z-10'>
        <img src={headerImg} alt='header' />
        <div id='map' className=''></div>
      </div>
      <div className='py-8 space-y-5'>
        <h1 className='text-center text-2xl text-white'>IP Address Tracker</h1>
        <form className='relative'>
          <input
            type='text'
            className='w-full py-3 rounded-xl overflow-hidden'
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
            <h1 className='font-bold text-clVeryDarkGray'>000.000.000.000</h1>
          </div>
          <div className='space-y-1'>
            <p className='headerinfo font-bold uppercase text-clVeryDarkGray opacity-50'>
              location
            </p>
            <h1 className='font-bold text-clVeryDarkGray'>
              Brooklyn, NY 10001
            </h1>
          </div>
          <div className='space-y-1'>
            <p className='headerinfo font-bold uppercase text-clVeryDarkGray opacity-50'>
              timezone
            </p>
            <h1 className='font-bold text-clVeryDarkGray'>UTC-05:00</h1>
          </div>
          <div className='space-y-1'>
            <p className='headerinfo font-bold uppercase text-clVeryDarkGray opacity-50'>
              isp
            </p>
            <h1 className='font-bold text-clVeryDarkGray'>SpaceX Starlink</h1>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
