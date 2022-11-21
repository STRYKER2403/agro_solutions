import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Myaccount = () => {

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [password, setpassword] = useState("");
  const [npassword, setnpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [user, setuser] = useState({ value: null });
  const router = useRouter();

  useEffect(() => {

    const myuser = JSON.parse(localStorage.getItem("myuser"))

    if (!myuser) {
      router.push("/")
    }

    if (myuser && myuser.token) {
      setuser(myuser)
      setemail(myuser.email)
      fetchData(myuser.token)
    }
  }, []);

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

  }


  const handleUserSubmit = async () => {
    let data = { token: user.token, address, name, phone, pincode }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let res = await a.json();
    toast.success("Successfully Updated Details", {
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

  const handlePasswordSubmit = async () => {
    let res;
    if (cpassword == npassword) {
      let data = { token: user.token, password, npassword, cpassword }
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      res = await a.json();
    }
    else {
      res = { success: false }
    }

    if (res.success) {
      toast.success("Successfully Updated Password", {
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
    else {
      toast.error("Error Updating Password", {
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
    setpassword("");
    setcpassword("");
    setnpassword("");
  }

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setname(e.target.value)
    }
    else if (e.target.name == "phone") {
      setphone(e.target.value)
    }
    else if (e.target.name == "address") {
      setaddress(e.target.value)
    }
    else if (e.target.name == "pincode") {
      setpincode(e.target.value)
    }
    else if (e.target.name == "password") {
      setpassword(e.target.value)
    }
    else if (e.target.name == "npassword") {
      setnpassword(e.target.value)
    }
    else if (e.target.name == "cpassword") {
      setcpassword(e.target.value)
    }

  }

  return (
    <div className='container mx-auto my-9'>
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
      <h1 className='font-bold text-3xl text-center mb-10 md:mb-5'>Update your Account</h1>

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
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email (cannot be updated)</label>
              {user && user.token ? <input value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly /> : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}
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

        <button onClick={handleUserSubmit} className="flex m-2 mb-5 text-white bg-green-500 border-0 py-1.5 px-2 focus:outline-none hover:bg-green-600 rounded text-sm">Submit</button>

        <h2 className='font-semibold text-xl '>2. Change Password</h2>
        <form className='mx-auto flex my-2'>
          <div className='px-2 w-1/2'>
            <div className="mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
              <input onChange={handleChange} autoComplete="off" value={password} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>

          <div className='px-2 w-1/2'>
            <div className="mb-4">
              <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">New Password</label>
              <input onChange={handleChange} autoComplete="off" value={npassword} type="password" id="npassword" name="npassword" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>

          <div className='px-2 w-1/2'>
            <div className="mb-4">
              <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Confirm New Password</label>
              <input onChange={handleChange} autoComplete="off" value={cpassword} type="password" id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>

        </form>

        <button onClick={handlePasswordSubmit} className="flex m-2 text-white bg-green-500 border-0 py-1.5 px-2 focus:outline-none hover:bg-green-600 rounded text-sm">Submit</button>
      </div>
    </div>
  )
}

export default Myaccount
