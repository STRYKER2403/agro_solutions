import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Product from '../../models/Product';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const mongoose = require("mongoose");
import Error from 'next/error'

const Slug = ({ buyNow, addToCart, product, error}) => {
  
  const router = useRouter()
  const { slug } = router.query
  
  const [pin, setpin] = useState();
  const [service, setservice] = useState();


  const checkServiceability = async () => { 
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setservice(true)
      toast.success('Your Pincode is Serviceable!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else {
      setservice(false)
      toast.error('Sorry, Pincode is not Serviceable!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  const onChangePin = (e) => {
    setpin(e.target.value);
  }


  if (error == 404) {
    return <Error statusCode={error} />
  }

  return <>
    <section className="text-gray-600 body-font overflow-hidden min-h-screen">
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-16 object-cover object-top rounded shadow-md" src={product.img} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">AGRO SOLUTIONS</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} </h1>
            <div className="flex mb-4">

            </div>
            <p className="leading-relaxed my-4">{product.desc}</p>
           
            <div className="flex ">
              {product.availableQty<=0 && <span className="title-font font-medium text-2xl text-gray-900">Out Of Stock!</span>}
              {product.availableQty>0 && <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>}
              <button disabled={product.availableQty<=0} onClick={() => { buyNow(slug, 1, product.price, product.title) }} className="disabled:bg-green-300 flex ml-3 md:ml-6 text-white bg-green-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-green-600 rounded">Buy Now</button>
              <button disabled={product.availableQty<=0} onClick={() => { addToCart(slug, 1, product.price, product.title) }} className="disabled:bg-green-300 flex ml-4 text-white bg-green-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-green-600 rounded">Add to Cart</button>


            </div>

            <div className="pin mt-6 flex space-x-3 text-sm">
              <input onChange={onChangePin} type="text" className='px-2 border-2 border-gray-400 rounded' placeholder='Enter Your Pincode' />
              <button onClick={checkServiceability} className=" text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">Check</button>
            </div>

            {!service && service != null && <div className="text-red-700 mt-3 text-sm">
              Sorry! We do not deliver to This Pincode yet
            </div>}

            {service && service != null && <div className="text-green-700 mt-3 text-sm">
              Yay! This Pincode is Serviceable
            </div>}

          </div>
        </div>
      </div>
    </section>
  </>
}

export async function getServerSideProps(context) {

  // Do it this way with fetch or directly write logic which is recommended in documentation
  // let res = await fetch("http://localhost:3000/api/getproducts")
  // let products = await res.text()

  let error=null;

  // Direct logic
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let product = await Product.findOne({ slug: context.query.slug })
  if(product == null){
    return {
      
      props: {error:404}
    }
  }

  return {
    props: {error:error, product: JSON.parse(JSON.stringify(product))}
  }
}

export default Slug
