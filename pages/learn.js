import React from 'react'
import { TbPlant2 } from 'react-icons/Tb';  
import EqualizerIcon from '@mui/icons-material/Equalizer';
import  Link  from 'next/link';

const learn = () => {
  return (
    <div>
      <section className="text-gray-600 body-font min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-2xl font-medium title-font mb-4 text-gray-900">Learn The Green</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Learn About the prices of crops all over India and choose your market accordingly.</p>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Learn About crop plans of various crops.</p>
          </div>
          <div className="flex flex-wrap -m-4 text-center justify-center">
            <Link href={'/markettrends'}  >
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full no-underline cursor-pointer">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  <div className='ml-0'><EqualizerIcon className='text-6xl text-green-500 mr-0' /></div>
                  <h2 className="title-font font-medium text-3xl text-gray-900">Market Trends</h2>
                  {/* <p className="leading-relaxed">Downloads</p> */}
                </div>
              </div>
            </Link>

            <Link href={"/cropplan"}>
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full no-underline cursor-pointer">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  <div className='ml-32'><TbPlant2 className='text-6xl text-green-500 mr-0' /></div>
                  <h2 className="title-font font-medium text-3xl text-gray-900">Crop Plan</h2>
                  {/* <p className="leading-relaxed">Users</p> */}
                </div>
              </div>
              </Link>

          </div>
        </div>
      </section>
    </div>
  )
}

export default learn

