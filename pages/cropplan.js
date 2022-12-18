import React from 'react'
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Link from 'next/link';
import { useState } from 'react';


const cropplan = () => {

  const [commodity, setcommodity] = useState("");

  return (
    <div className='min-h-screen'>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-green-500 tracking-widest font-medium title-font mb-1">AGRO CROP PLANS</h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">LEARN YOUR CROP</h1>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-green-500 text-white flex-shrink-0">
                    <AcUnitIcon />
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">Rabi Crops</h2>
                </div>
                <div className="flex-grow">
                  <div className="relative ">

                    <select onChange={(e)=>{setcommodity(e.target.value)}} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base pl-3 w-[20rem] md:w-full ">
                      <option value={"Select"}>--Select Your Crop--</option>
                      <option>Wheat</option>
                      <option>Barley</option>
                      <option>Peas</option>
                      <option>Gram</option>

                    </select>
                    <span className="md:mr-0 mr-1 absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                  <div className='flex justify-start mt-4'>
                  <Link href={`/cropplan/${commodity}?crop=${commodity}`}><button className="disabled:bg-green-300 flex  mr-1 text-white bg-green-500 border-0 py-2 px-[8.3rem] md:px-6 focus:outline-none hover:bg-green-600 rounded justify-center">Submit</button></Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-green-500 text-white flex-shrink-0">
                    <ThunderstormIcon />
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">Kharif Crops</h2>
                </div>
                <div className="flex-grow">
                  <div className="relative ">

                    <select onChange={(e)=>{setcommodity(e.target.value)}} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base pl-3 w-[20rem] md:w-full ">
                      <option value={"Select"}>--Select Your Crop--</option>
                      <option>Rice</option>
                      <option>Maize</option>
                      <option>Jowar</option>
                      <option>Bajra</option>

                    </select>
                    <span className="md:mr-0 mr-1 absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                  <div className='flex justify-start mt-4'>
                    <Link href={`/cropplan/${commodity}?crop=${commodity}`}><button className="disabled:bg-green-300 flex  mr-1 text-white bg-green-500 border-0 py-2 px-[8.3rem] md:px-6 focus:outline-none hover:bg-green-600 rounded justify-center">Submit</button></Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col pr-6">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-green-500 text-white flex-shrink-0">
                    <WbSunnyOutlinedIcon />
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">Zaid Crops</h2>
                </div>
                <div className="flex-grow">
                  <div className="relative ">

                    <select onChange={(e)=>{setcommodity(e.target.value)}} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base pl-3 w-[20rem] md:w-full ">
                      <option value={"Select"}>--Select Your Crop--</option>
                      <option>Watermelon</option>
                      <option>Muskmelon</option>
                      <option>Cucumber</option>
                      <option>Guar</option>
                    </select>
                    <span className="md:mr-0 mr-1 absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                  <div className='flex justify-start mt-4'>
                  <Link href={`/cropplan/${commodity}?crop=${commodity}`}><button className="disabled:bg-green-300 flex  mr-1 text-white bg-green-500 border-0 py-2 px-[8.3rem] md:px-6 focus:outline-none hover:bg-green-600 rounded justify-center">Submit</button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default cropplan
