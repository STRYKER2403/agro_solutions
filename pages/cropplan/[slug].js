import { useRouter } from 'next/router'
import React from 'react'
import AgricultureOutlinedIcon from '@mui/icons-material/AgricultureOutlined';
import FormatLineSpacingOutlinedIcon from '@mui/icons-material/FormatLineSpacingOutlined';
import { TbSeeding } from 'react-icons/Tb';
import { GiFarmer } from 'react-icons/Gi';
import { BiTimeFive } from 'react-icons/Bi';
import { MdWaterDrop } from 'react-icons/Md';

const fs = require('fs');


const slug = ({MyCrop}) => {

    const router = useRouter();
   
  return (
    
    <div>
      <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">{router.query.crop} Crop Plan</h1>
      <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Learn Everything From Sowing To Harvesting</p>
    </div>
    <div className="flex flex-wrap -m-4">
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
        <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
        <GiFarmer className='text-2xl'/>
            </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Soil</h2>
          <p className="leading-relaxed text-base">{MyCrop.soil}</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
          <BiTimeFive className='text-2xl'/>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Time of Sowing</h2>
          <p className="leading-relaxed text-base">{MyCrop.TimeOS}</p>
          
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
            <FormatLineSpacingOutlinedIcon/>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Spacing</h2>
          <p className="leading-relaxed text-base">{MyCrop.Spacing}</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
            <TbSeeding className='text-2xl'/>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Seed Depth</h2>
          <p className="leading-relaxed text-base">{MyCrop.SDepth}</p>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2 mt-2">Seed Rate</h2>
          <p className="leading-relaxed text-base">{MyCrop.SeedR}</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
           <MdWaterDrop className="text-2xl"/>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Irrigation</h2>
          <p className="leading-relaxed text-base">{MyCrop.Irrigation}</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
            <AgricultureOutlinedIcon/>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Harvesting</h2>
          <p className="leading-relaxed text-base">{MyCrop.Harvesting}</p>
          {/* <h2 className="text-lg text-gray-900 font-medium title-font mb-2 mt-2">Post Harvesting</h2>
          <p className="leading-relaxed text-base">{MyCrop.PHarvest}</p> */}
        </div>
      </div>
    </div>

  </div>
</section>
    </div>
    
  )
}

export async function getServerSideProps(context) {
    const { slug } = context.params;
    
    let MyCrop = await fs.promises.readFile(`cropplan1/${slug}.json`,"utf-8")
    // console.log(MyCrop) 
    return {
      props: {MyCrop: JSON.parse(MyCrop)}
    }
  }

export default slug
