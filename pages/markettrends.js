import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
const Country = require('country-state-city').Country;
const State = require('country-state-city').State;
const City = require('country-state-city').City;
import { useRouter } from 'next/router'

const markettrends = ({ commodity, cropdata }) => {

  const router = useRouter()

  const [state, setstate] = useState("");
  const [statecode, setstatecode] = useState("");
  const [city, setcity] = useState("");
  const [crop, setcrop] = useState("");
  const [sub, setsub] = useState("");

  useEffect(() => {
    const refreshVariant = () => {

      let url = `${process.env.NEXT_PUBLIC_HOST}/markettrends?state=${state}&district=${city}&crop=${crop}`
      router.push(url);
    }
    console.log(cropdata.records)

    refreshVariant();

  }, [sub]);

  const handleSubmit = () => {
    let random = Math.random()
    setsub(random)
  }

  return (

    <div className='min-h-screen'>

      <div className="flex items-center md:justify-between flex-col md:flex-row space-y-6 mx-12">

        <div className='flex space-x-8 md:flex-row flex-col mt-6'>
          <div className="relative">
            <span className="ml-8 md:ml-0 md:mr-3">Commodity:</span>
            <select onChange={(e) => { setcrop(e.target.value) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base pl-3 max-w-[21rem] w-[20.5rem] md:mr-0 mr-4 ml-8 md:ml-0">

              {commodity.commodities.map((item, index) => {
                return <option key={index} value={item}>{item}</option>
              })}
            </select>
            {!crop && <span className="md:mr-0 mr-6 mt-3  md:mt-0 absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>}
          </div>    


          <div className="relative ">
            <span className="md:mr-3 ">State:</span>
            <select onChange={(e) => { setstatecode(e.target.value), setstate(State.getStateByCodeAndCountry(e.target.value, "IN").name) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base pl-3 max-w-[21rem] ">

              <option value={"Select"}>--Select--</option>
              {State.getStatesOfCountry("IN").map((item) => {
                return <option key={item.name} value={item.isoCode}>{item.name}</option>
              })}

            </select>
            {!state && <span className="md:mr-0 mr-6 mt-3 md:mt-0 absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>}
          </div>


          <div className="relative">
            <span className="md:mr-3">District:</span>
            <select onChange={(e) => { setcity(e.target.value) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base pl-3 max-w-[21rem] w-[20.5rem] mr-4">

              <option value={"Select"}>--Select--</option>
              {City.getCitiesOfState("IN", statecode).map((item) => {

                return <option key={item.name} value={item.name}>{item.name}</option>
              })}
            </select>
            {!city && <span className="mt-3 md:mr-3 mr-6 md:mt-0  absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>}
          </div>
        </div>

        <div className='flex justify-end'>
          <button onClick={handleSubmit} disabled={!statecode && !state} className="disabled:bg-green-300 flex md:ml-8 text-white bg-green-500 border-0 py-2 px-36 md:px-6 focus:outline-none hover:bg-green-600 rounded justify-center">Submit</button>
        </div>

      </div>

      <table className="table-auto mr-8 ml-4 mb-5 md:mx-8 mt-8 md:w-[88rem] overflow-hidden border-b rounded-md">
        {(crop && crop != "--Select--") && <thead className="border-b bg-gray-50 dark:bg-gray-700">
          <tr className="border-b hover:bg-gray-100">
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Market</th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Min Price</th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Modal Price</th>
          </tr>
        </thead>}
        {(!crop || crop == "--Select--") && <thead className="border-b bg-gray-50 dark:bg-gray-700">
          <tr className="border-b hover:bg-gray-100">
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Market</th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Commodity</th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Min Price</th>
          </tr>
        </thead>}
        <tbody>
          {(!crop || crop == "--Select--") && cropdata.records.map((item, index) => {
            return <tr key={index} className="border-b hover:bg-gray-100">
              <td className="text-sm text-gray-900 font-semibold px-6 py-4">{item.market}</td>
              <td className="text-sm text-gray-900 font-semibold px-6 py-4">{item.commodity}</td>
              <td className="text-sm text-gray-900 font-semibold px-6 py-4">{item.min_price}</td>
            </tr>
          })}

          {(crop && crop != "--Select--") && cropdata.records.map((item, index) => {
            return <tr key={index} className="border-b hover:bg-gray-100">
              <td className="text-sm text-gray-900 font-semibold px-6 py-4">{item.market}</td>
              <td className="text-sm text-gray-900 font-semibold px-6 py-4">{item.min_price}</td>
              <td className="text-sm text-gray-900 font-semibold px-6 py-4">{item.modal_price}</td>
            </tr>
          })}

        </tbody>
      </table>


    </div>
  )
}

export async function getServerSideProps(context) {

  let res = await fetch(`${process.env.NEXT_PYTHON_HOST}/commodity`)

  let result;
  if (context.query.crop && context.query.crop != "--Select--") {
    result = await fetch(`https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${process.env.DATA_GOV_API_KEY}&format=json&limit=all&filters[state]=${context.query.state}&filters[district]=${context.query.district}&filters[commodity]=${context.query.crop}`)
  }
  else {
    result = await fetch(`https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${process.env.DATA_GOV_API_KEY}&format=json&limit=all&filters[state]=${context.query.state}&filters[district]=${context.query.district}`)
  }

  let commodity = await res.text()
  let cropdata = await result.text()

  return {
    props: { commodity: JSON.parse(commodity), cropdata: JSON.parse(cropdata) },
  }
}

export default markettrends
