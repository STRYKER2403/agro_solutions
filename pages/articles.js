import Link from 'next/link';
import React, { useEffect } from 'react'


const articles = ({articles}) => {
  useEffect(() => {
    
  console.log(articles)
  }, []);
  return (
    <div className='mx-8'>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-100">
            
            {articles.all_Images.map((item,index) => {
              return <div key={index} className="py-8 flex flex-wrap md:flex-nowrap my-8 bg-gray-900 rounded-3xl">
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              
                <img src={item} className='w-52 h-32 ml-6'></img>
                <span className="mt-2 text-sm ml-6 text-green-500">{articles.all_time[index]}</span>
                {/* <span className="font-semibold title-font text-white ml-6 mt-2">CATEGORY</span> */}
                
              </div>
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-white title-font mb-4">{articles.titles[index]}</h2>
                <p className="leading-relaxed text-gray-300 pr-10">{articles.all_desc[index]}</p>
                <Link href={`${articles.all_links[index]}`}>
                  <a className="text-green-500 flex flex-row-reverse items-center mt-4 mr-12">
                  <button className='disabled:bg-green-300 flex mr-2 text-gray-900 bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-600 rounded text-sm font-semibold'>Read More</button>
                  {/* <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg> */}
                </a></Link>
              </div>
            </div>})}

          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {

  let res = await fetch("http://localhost:3001/articles")
  let articles = await res.text()

  return {
    props: {articles:JSON.parse(articles)},
  }
}

export default articles

