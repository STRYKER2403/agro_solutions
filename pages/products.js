import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Product from '../models/Product';
const mongoose = require("mongoose");

import { useRouter } from 'next/router'

const products = ({products,category}) => {

  const router = useRouter()
  
  useEffect(() => {

  router.query.category && category == "" ? refreshVariant(router.query.category) : refreshVariant(category)
  
  }, [category]);

  const refreshVariant = (category) => {
  
    let url = `${process.env.NEXT_PUBLIC_HOST}/products?category=${category}`
    router.push(url);
  }

  return (
    <div>
      <section className="text-gray-600 body-font min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center">
          {Object.keys(products).length === 0 && <p>Sorry! All The Products are Currently Out Of Stock!! New stock Coming soon. Stay Tuned!</p>}
            {Object.keys(products).map((item) => {

              return <Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`}><div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-5">
                <a className="block relative rounded overflow-hidden">
                  <img alt="ecommerce" className="m-auto h-[36vh] block" src={products[item].img} />
                </a>
                <div className="mt-4 text-center ">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                  <p className="mt-1">₹{products[item].price}</p>

                </div>
              </div></Link>
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  
  let allproducts = await Product.find({category:context.query.category})

  return {
    props: { products: JSON.parse(JSON.stringify(allproducts))}
  }
}

export default products
