import React from 'react'

const markettrends = () => {
  return (
     
    <div className='min-h-screen'>
      {/* boxes and button */}
      <div className="flex items-center md:justify-between flex-col md:flex-row space-y-6 mx-12">

        <div className='flex space-x-8 flex-row mt-6'>
        <div className="relative ">
            <span className="mr-3 ">Commodity:</span>
            <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base pl-3 pr-10">

              <option value={"Commodity"}>Select</option>
              <option value={"M"}>M</option>
              <option value={"L"}>L</option>
              <option value={"XL"}>XL</option>
              <option value={"XXL"}>XXL</option>
            </select>
            <span className="mt-3  md:mt-0 absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>
          </div>


          <div className="relative ">
            <span className="mr-3 ">State:</span>
            <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base pl-3 pr-10">

              <option value={"State"}>Select</option>
              <option value={"M"}>M</option>
              <option value={"L"}>L</option>
              <option value={"XL"}>XL</option>
              <option value={"XXL"}>XXL</option>
            </select>
            <span className="mt-3 md:mt-0 absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>
          </div>


          <div className="relative">
            <span className="mr-3">District:</span>
            <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base pl-3 pr-10">

              <option value={"District"}>Select</option>
              <option value={"M"}>M</option>
              <option value={"L"}>L</option>
              <option value={"XL"}>XL</option>
              <option value={"XXL"}>XXL</option>
            </select>
            <span className="mt-3  md:mt-0  absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>
          </div>
        </div>

        <div className='flex justify-end'>
          <button className="disabled:bg-green-300 flex md:ml-8 text-white bg-green-500 border-0 py-2 px-36 md:px-6 focus:outline-none hover:bg-green-600 rounded justify-center">Submit</button>
        </div>

      </div>

      {/* table  */}
      {/* <div className="overflow-hidden border rounded-md"> */}
      <table className="table-auto mx-8 mt-8 md:w-[88rem] overflow-hidden border-b rounded-md">
        <thead className="border-b bg-gray-50 dark:bg-gray-700">
          <tr className="border-b hover:bg-gray-100">
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Song</th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Artist</th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Year</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-100">
            <td className="text-sm text-gray-900 font-semibold px-6 py-4">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td className="text-sm text-gray-900 font-semibold px-6 py-4">Malcolm Lockyer</td>
            <td className="text-sm text-gray-900 font-semibold px-6 py-4">1961</td>
          </tr>
          
        </tbody>
      </table>
      {/* </div> */}

    </div>
  )
}

export default markettrends
