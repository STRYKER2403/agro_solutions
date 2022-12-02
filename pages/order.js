import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
const mongoose = require("mongoose");
import Order from '../models/Order';


const MyOrder = ({clearCart,order}) => {
  const products = order.products;
  const router = useRouter();
  const [date, setdate] = useState();

  useEffect(() => {     
    const d  = new Date(order.createdAt)
    setdate(d)
     if(router.query.clearCart == 1){
      clearCart();
     }

  }, []);
   
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden min-h-screen">
  <div className="container px-5 py-16 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">AGRO SOLUTIONS</h2>
        <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4">Order Id: #{order.orderId}</h1>
        <p className="leading-relaxed mb-2">Yayy! Your order has been successfully placed!</p>
        <p className="leading-relaxed mb-2">Order placed on : {date && date.toLocaleString("en-IN",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p> Your Payment Status is : <span className='font-semibold text-slate-700'>{order.status}</span></p>
        <div className="flex mb-4">
          <a className="flex-grow  py-2 text-lg px-1">Item Description</a>
          <a className="flex-grow  py-2 text-lg px-1 text-right">Quantity</a>
          <a className="flex-grow  py-2 text-lg px-1 text-right">Item Total</a>
        </div>
        
        {Object.keys(products).map((item)=>{ return <div key={item} className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">{products[item].name}</span>
          <span className="ml-auto text-gray-900">{products[item].qty}</span>
          <span className="ml-auto text-gray-900">₹{products[item].price} X {products[item].qty} = ₹{products[item].price * products[item].qty}</span>
        </div>})}
        
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900 my-6">SubTotal : ₹{order.amount}</span>  
        </div>

        <button className="flex  text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">Track Order</button>

      </div>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded p-8" src="/bg2.jpg"/>
    </div>
  </div>
</section>
    </div>
  )
}


export async function getServerSideProps(context) {

  // Do it this way with fetch or directly write logic which is recommended in documentation
  // let res = await fetch("http://localhost:3000/api/getproducts")
  // let products = await res.text()

  // Direct logic
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let order = await Order.findById(context.query.id)

  return {
    // fetch way
    // props: {products:JSON.parse(products)}, // will be passed to the page component as props

    // Direct logic
    props: { order: JSON.parse(JSON.stringify(order)) }
  }
}

export default MyOrder
