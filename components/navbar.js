import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AiFillPlusCircle, AiFillMinusCircle, AiFillCloseCircle, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/Md';
import { useRouter } from 'next/router';


const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal,categoryselect }) => {

  const [dropdown, setdropdown] = useState(false);
  const [dropdown1, setdropdown1] = useState(false);
  const [sidebar, setsidebar] = useState(false);
  const [category, setcategory] = useState(""); 
  
  const ref = useRef();
  const router = useRouter()

  useEffect(() => {

    Object.keys(cart).length !== 0 && setsidebar(true)
    let exempted = ['/checkout', '/orders', '/orders', '/myaccount']
    if (exempted.includes(router.pathname)) {
      setsidebar(false)
    }
    
  }, []);

  const toggleCart = () => {

    setsidebar(!sidebar)
  }

  return (
    <>
      {!sidebar && <span onMouseOver={() => setdropdown(true)} onMouseLeave={() => setdropdown(false)} className='fixed md:right-12 right-10 md:top-5 top-3.5 z-30 cursor-pointer'>
        {dropdown && <div className='absolute right-4 bg-white shadow-lg border md:top-7 top-5 rounded-md px-5 w-32 py-4'>
          <ul>
            <Link href={"/myaccount"}><a><li className='py-1 text-sm font-bold hover:text-green-700'>My Account</li></a></Link>
            <Link href={"/orders"}><a><li className='py-1 text-sm font-bold hover:text-green-700'>My Orders</li></a></Link>
            <li onClick={logout} className='py-1 text-sm font-bold hover:text-green-700'>Logout</li>
          </ul>
        </div>}
        <span   >
          {user.value && <MdAccountCircle className='text-xl md:text-3xl mx-2' />}
        </span>

      </span>}

      <div className={`flex flex-col md:flex-row md:justify-start justify-center items-center shadow-md sticky top-0 z-10 bg-white ${!sidebar && "overflow-hidden"}`}>

        <div className='mr-auto logo  md:mt-2 md:mx-2'>
          <Link href={"/"}><a><Image src='/logo1.png' alt='lg' width={175} height={55} /></a></Link>
        </div>


        <div className='nav md:mb-0 mb-1.5'>
          <ul className='flex space-x-2 font-bold md:text-lg '>
            
            { <span onMouseOver={() => setdropdown1(true)} onMouseLeave={() => setdropdown1(false)} className='fixed md:top-5 md:ml-0 top-14.5 ml-7 z-30 cursor-pointer'>
              {dropdown1 && <div className='absolute  bg-white shadow-lg border md:top-7 top-5 rounded-md px-5 w-32 py-4'>
                <ul>
                <Link href={"/products?category=Seeds"}><li onClick={() => { setcategory("Seeds"); categoryselect(1);}} className='py-1 text-sm font-bold hover:text-green-700'>Seeds</li></Link>
                  <Link href={"/products?category=Fertilisers"}><li onClick={() => { setcategory("Fertilisers"); categoryselect(2);}} className='py-1 text-sm font-bold hover:text-green-700'>Fertilisers</li></Link>
                  <Link href={"/products?category=Tools"}><li onClick={() => { setcategory("Tools"); categoryselect(3);}} className='py-1 text-sm font-bold hover:text-green-700'>Tools</li></Link>
                </ul>
              </div>}
              <span   >
              <li className='hover:text-green-700 md:mr-8'>Products</li>
              </span>
            </span>}

            <Link href={"/articles"}><a><li className='hover:text-green-700 md:mr-6 ml-24'>Articles</li></a></Link>
            <Link href={"/learn"}><a><li className='hover:text-green-700 md:mr-6'>Learn</li></a></Link>
            <Link href={"/contactus"}><a><li className='hover:text-green-700 md:mr-6'>Contact Us</li></a></Link>
          </ul>
        </div>
        <div className="flex cursor-pointer cart absolute right-0 top-3.5 md:top-5 mx-5 items-center">



          {!user.value && <Link href={"/login"}><a><button className=" text-white text-sm bg-green-500 border-0 mx-2 px-2 py-1.5 md:py-2 focus:outline-none hover:bg-green-600 rounded ">Login</button></a></Link>}



          <AiOutlineShoppingCart onClick={toggleCart} className='text-xl md:text-3xl' />
        </div>


        <div ref={ref} className={`z-10 w-72 h-screen sideCart overflow-y-scroll absolute top-0 bg-green-100 px-8 py-10 transition-all ${sidebar ? "right-0" : "-right-96"}`}>
          <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
          <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-green-500"><AiFillCloseCircle /></span>
          <ol className='list-decimal font-semibold'>
            {Object.keys(cart).length === 0 && <div className='my-4 font-semibold'>Your cart is Empty!!</div>}

            {Object.keys(cart).map((k) => {
              return <li key={k}>
                <div className="item flex my-5">
                  <div className='w-2/3 font-semibold'>{cart[k].name}</div>
                  <div className='flex items-center justify-center w-1/3 font-semibold text-lg'><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name) }} className='cursor-pointer text-green-500' /><span className='mx-2 text-sm'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name)}} className='cursor-pointer text-green-500' /></div>
                </div>
              </li>
            })}

          </ol>

          <div className='font-semibold my-3' >SubTotal: ₹{subTotal}</div>

          <div className='flex'>
            <Link href={"/checkout"}><button disabled={Object.keys(cart).length === 0} className="disabled:bg-green-300 flex mr-2 text-white bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />Checkout</button></Link>
            <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className="disabled:bg-green-300 flex mr-2  text-white bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-600 rounded text-sm">Clear Cart</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
