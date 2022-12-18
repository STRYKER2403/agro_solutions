import Head from 'next/head'
import { TbPlant2 } from 'react-icons/Tb';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

import EqualizerIcon from '@mui/icons-material/Equalizer';
import Link from 'next/link';


export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>Agro Solutions</title>
          <meta name="description" content="Agro Solutions" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <section className="text-gray-600 body-font ">
          
            <div className="flex bg-back bg-no-repeat bg-cover bg-center bg-fixed h-[65vh] opacity-90 text-center items-center justify-center flex-col">
              <div className='md:text-6xl text-3xl text-green-900 font-semibold font-serif '>AGRO SOLUTIONS</div>
              <div className='md:text-4xl text-2xl mb-28 text-green-700 font-semibold font-serif'>Adding Green To Life</div>
              </div>
        </section>
        
        <section className="text-gray-600 body-font">
        
        
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Get Work Done With Agro Solutions</h1>
              
              <p className="lg:w-1/2 w-full leading-relaxed text-gray-500 text-xl">Adding Green To Life</p>
            </div>
            <div className="flex flex-wrap -m-4">
              <Link href={"/markettrends"}><div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                    <EqualizerIcon className='text-2xl'/>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Market Trends</h2>
                  <p className="leading-relaxed text-base">Get Information About Latest Market Trends of Crops and Plan your sale accordingly.</p>
                </div>
              </div></Link>
              <Link href={"/cropplan"}><div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                    <TbPlant2 className='text-2xl'/>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Crop Plan</h2>
                  <p className="leading-relaxed text-base">Get the right plan for your crops from sowing to harvesting for maximum yield.</p>
                </div>
              </div></Link>
              <Link href={"/articles"}><div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                    <ImportContactsIcon className='text-2xl'/>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Read Articles</h2>
                  <p className="leading-relaxed text-base">Stay Updated with every agriculture related news and policies implemented.</p>
                </div>
              </div></Link>
              {/* <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Melanchole</h2>
                  <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Bunker</h2>
                  <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Ramona Falls</h2>
                  <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                </div>
              </div> */}
            </div>
            
          </div>
        </section>

       

      </div>
    </>
  )
}
