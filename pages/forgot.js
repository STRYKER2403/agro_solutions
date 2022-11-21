import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgot = () => {

  const router = useRouter();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  useEffect(() => {

    if (localStorage.getItem("myuser")) {
      router.push("/")
    }

  }, []);

  const sendResetEmail = async(e) =>{
    e.preventDefault()
    let data = {email,sendMail:true}

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let res = await a.json();
    if(res.success){
      
      toast.success("Password reset instructions sent on mail", {
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
    else{
      toast.error("Unknown error occured", {
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

  const resetPassword = async(e) =>{
    e.preventDefault()
    if(password == cpassword){
    let data = {password,sendMail:false,token:router.query.token}
      
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let res = await a.json();
    if(res.success){

      toast.success("Password reset successful", {
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
    else{

      toast.error("Unknown error occured", {
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
  }

  const handleChange = async (e) => {
    if (e.target.name == "email") {
      setemail(e.target.value)
    }
    else if (e.target.name == "password") {
      setpassword(e.target.value)
    }
    else if (e.target.name == "cpassword") {
      setcpassword(e.target.value)
    }
  }  

  return (
    <div>
      
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
      <div className="flex min-h-screen items-start justify-center pt-28 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>

          <img className="md:ml-28 h-20 w-auto ml-16" src="/logo1.png" alt="Agro Solution" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link href={"/login"}><a href="#" className="font-medium text-green-600 hover:text-green-500"> Login</a></Link>
            </p>
          </div>
          {router.query.token && <div>
            <form className="mt-8 space-y-6" action="#" method="POST">
              
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="password" className="sr-only">New Password</label>
                  <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="password" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" placeholder="New Password" />
                </div>

                <div>
                  <label htmlFor="cpassword" className="sr-only">Confirm New Password</label>
                  <input value={cpassword} onChange={handleChange} id="cpassword" name="cpassword" type="password" autoComplete="cpassword" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" placeholder="Confirm New Password" />
                </div>
              </div>

              <div>
                <button onClick={resetPassword} type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">

                    <svg className="h-5 w-5 text-green-500 group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Continue
                </button>
              </div>
              {password != cpassword && <span className='text-red-600 '>Passwords dont match</span>}
              {password && password == cpassword && <span className='text-green-600 '>Passwords match</span>}
            </form>

          </div>}
          {!router.query.token && <form className="mt-8 space-y-6" action="#" method="POST">
            
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input value={email} onChange={handleChange} id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" placeholder="Email address" />
              </div>
            </div>

            <div>
              <button onClick={sendResetEmail} type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">

                  <svg className="h-5 w-5 text-green-500 group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                </span>
                Continue
              </button>
            </div>
          </form>}
        </div>
      </div>

    </div>
  )
}

export default Forgot
