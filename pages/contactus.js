import Link from 'next/link'
import React from 'react'
import Product from '../models/Product';
const mongoose = require("mongoose");

const contactus = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center">
            {Object.keys(products).length === 0 && <p>Sorry! All The mugs are Currently Out Of Stock!! New stock Coming soon. Stay Tuned!</p>}
            {Object.keys(products).map((item) => {

              return <Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`}><div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-5">
                <a className="block relative rounded overflow-hidden">
                  <img alt="ecommerce" className="m-auto h-[36vh] block" src={products[item].img} />
                  {/* in image diff */}
                  {/* md:mx-0 h-[30vh] md:h-[36vh] */}
                </a>
                <div className="mt-4 text-center ">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                  <p className="mt-1">₹{products[item].price}</p>
                  <div className="mt-1">
                    {products[item].size.includes('S') && <span className='border border-gray-300 px-1 mx-1'> S </span>}   
                    {products[item].size.includes('M') && <span className='border border-gray-300 px-1 mx-1'> M </span>} 
                    {products[item].size.includes('L') && <span className='border border-gray-300 px-1 mx-1'> L </span>}  
                    {products[item].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1'> XL </span>}  
                    {products[item].size.includes('XXL') && <span className='border border-gray-300 px-1 mx-1'> XXL </span>} 
                  </div>
                  
                  <div className="mt-1">
                    {products[item].color.includes('Red') &&<button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Blue') &&<button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Yellow') &&<button className="border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Green') &&<button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    
                  </div>

                </div>
              </div></Link>
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps() {

  // Do it this way with fetch or directly write logic which is recommended in documentation
  // let res = await fetch("http://localhost:3000/api/getproducts")
  // let products = await res.text()

  // Direct logic
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  
  let products = await Product.find({category:"mugs"})

  let mugs = {}

    for (let item of products)
    {
        if(item.title in mugs)
        {
            if(!mugs[item.title].color.includes(item.color) && item.availableQty > 0)
            {
                mugs[item.title].color.push(item.color);   
            }

            if(!mugs[item.title].size.includes(item.size) && item.availableQty > 0)
            {
                mugs[item.title].size.push(item.size);   
            }
        }
        else
        {
            mugs[item.title] = JSON.parse(JSON.stringify(item));

            if(item.availableQty > 0)
            {
                mugs[item.title].color = [item.color];
                mugs[item.title].size = [item.size];
            }
            else{
                mugs[item.title].color = [];
                mugs[item.title].size = [];
            }
        }
    }

  return {
    // fetch way
    // props: {products:JSON.parse(products)}, // will be passed to the page component as props

    // Direct logic
    props: { products: JSON.parse(JSON.stringify(mugs))}
  }
}

export default contactus
