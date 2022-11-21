import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Head from 'next/head';
import Script from 'next/script';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = ({ cart, clearCart, addToCart, removeFromCart, subTotal }) => {

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [disabled, setdisabled] = useState(true);
  const [user, setuser] = useState({value:null});

  useEffect(() => {
  
    const myuser = JSON.parse(localStorage.getItem("myuser"))
    if(myuser && myuser.token)
    {
      setuser(myuser)
      setemail(myuser.email)    
      fetchData(myuser.token)
    }
  
  }, []);

  useEffect(() => {
    if (name.length > 3 && email.length > 3 && phone.length > 3 && address.length > 3 && pincode.length > 3) {
      setdisabled(false);
    }
    else {
      setdisabled(true)
    }

  }, [name,email,phone,pincode,address]);

  const fetchData = async (token) => {
    let data = { token: token }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let res = await a.json();
    console.log(res)
    setname(res.name)
    setaddress(res.address)
    setpincode(res.pincode)
    setphone(res.phone)
    getPincode(res.pincode)
  }

  const getPincode = async(pin) =>{
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setstate(pinJson[pin][1])
      setcity(pinJson[pin][0])
    }
    else {
      setstate('');
      setcity('');
    }
  }

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setname(e.target.value)
    }
    else if (e.target.name == "email") {
      setemail(e.target.value)
    }
    else if (e.target.name == "phone") {
      setphone(e.target.value)
    }
    else if (e.target.name == "address") {
      setaddress(e.target.value)
    }
    else if (e.target.name == "pincode") {
      setpincode(e.target.value)
      if (e.target.value.length == 6) {

        getPincode(e.target.value);
      }
      else {
        setstate('');
        setcity('');
      }
    }

  }

  const initiatePayment = async () => {

    let oid = Math.floor(Math.random() * Date.now());
    

    // Get a transaction token
    // const data = { cart, subTotal, oid, cid };
    const data = { cart, subTotal, oid, email: email, name, address, pincode, phone, city, state }; 

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let txnRes = await a.json();
    // console.log(txnRes)
    if (txnRes.success) {
      
      let txnToken = txnRes.txnToken

      var config = {
        "root": "",
        "flow": "DEFAULT",
        "data": {
          "orderId": oid, /* update order id */
          "token": txnToken, /* update token value */
          "tokenType": "TXN_TOKEN",
          "amount": subTotal /* update amount */
        },
        "handler": {
          "notifyMerchant": function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          }
        }
      };

      // initialze configuration using init method

      window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      }).catch(function onError(error) {
        console.log("error => ", error);
      });

    }
    else {
      
      if(txnRes.cartClear){
        clearCart();
      }
      
      toast.error(txnRes.error, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

  }

  return (
    <div className='container m-auto min-h-screen'>

      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Head>
        <title>Checkout - Codeswear.com</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      </Head>

      <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} crossorigin="anonymous"></Script>

      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <div className='mx-4 md:mx-20'>
        <h2 className='font-semibold text-xl '>1. Delivery Details</h2>
        <div className='mx-auto flex my-2'>
          <div className='px-2 w-1/2'>
            <div className="mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>

          <div className='px-2 w-1/2'>
            <div className="mb-4">
              
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              {user && user.token? <input value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly/> : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /> }

            </div>
          </div>

        </div>

        <div className='px-2 w-full'>
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea onChange={handleChange} value={address} name="address" id="address" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" cols="30" rows="2"></textarea>
          </div>
        </div>

        <div className='mx-auto flex my-2'>
          <div className='px-2 w-1/2'>
            <div className="mb-4">
              <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone Number</label>
              <input placeholder='Your 10-digit Phone Number' onChange={handleChange} value={phone} type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>

          <div className='px-2 w-1/2'>
            <div className="mb-4">
              <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
              <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>

        <div className='mx-auto flex my-2'>
          <div className='px-2 w-1/2'>
            <div className="mb-4">
              <label htmlFor="city" className="leading-7 text-sm text-gray-600">District</label>
              {/* onChange={handleChange} in main */}
              <input value={city} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />

            </div>
          </div>

          <div className='px-2 w-1/2'>
            <div className="mb-4">
              <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
              {/* onChange={handleChange} in main */}
              <input value={state} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
            </div>
          </div>

        </div>
        


        <h2 className='font-semibold text-xl '>2. Review Cart Items</h2>

        <div className="  bg-green-100 p-6 my-2">

          <ol className='list-decimal font-semibold'>
            {Object.keys(cart).length === 0 && <div className='my-4 font-semibold'>Your cart is Empty!!</div>}

            {Object.keys(cart).map((k) => {
              return <li key={k}>
                <div className="item flex my-5">
                  <div className=' font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                  <div className='flex items-center justify-center w-1/3 font-semibold text-lg'><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-green-500' /><span className='mx-2 text-sm'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-green-500' /></div>
                </div>
              </li>
            })}
          </ol>
          <div className='font-bold my-3' >SubTotal: ₹{subTotal}</div>
        </div>

        <div className="mx-1">

          <Link href={"/checkout"}><button disabled={disabled} onClick={initiatePayment} className="disabled:bg-green-300 flex mr-2 text-white bg-green-500 border-0 py-1.5 px-2 focus:outline-none hover:bg-green-600 rounded text-sm">Pay ₹{subTotal}</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Checkout
