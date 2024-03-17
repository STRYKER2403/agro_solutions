import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div>

      <footer className="text-gray-600 body-font bg-gray-50">
        <div className="container px-5 md:pl-24 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link href={"/"}>
              <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">

                <Image src='/logo1.png' alt='lg' width={300} height={88} />

              </a>
            </Link>
            <p className="mt-2 text-sm text-gray-500 ml-8 font-semibold">Adding Green To Life</p>
            <p className="text-sm text-gray-500 mx-8">Trusted By Millions</p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">SHOP</h2>

              <nav className="list-none mb-10">
                <li>
                  <Link href={"/products?category=Seeds"}><a className="text-gray-600 hover:text-gray-800">Seeds</a></Link>
                </li>
                <li>
                  <Link href={"/products?category=Fertilizers"}><a className="text-gray-600 hover:text-gray-800">Fertilizers</a></Link>
                </li>
                <li>
                  <Link href={"/products?category=Tools"}><a className="text-gray-600 hover:text-gray-800">Tools</a></Link>
                </li>
                <li>
                  <Link href={"/products?category=Fruits"}><a className="text-gray-600 hover:text-gray-800">Fruits</a></Link>
                </li>
                <li>
                  <Link href={"/products?category=Vegetables"}><a className="text-gray-600 hover:text-gray-800">Vegetables</a></Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href={"/markettrends"}><a className="text-gray-600 hover:text-gray-800">Market Trends</a></Link>
                </li>
                <li>
                  <Link href={"/articles"}><a className="text-gray-600 hover:text-gray-800">Articles</a></Link>
                </li>
                <li>
                  <Link href={"/learn"}><a className="text-gray-600 hover:text-gray-800">Learn</a></Link>
                </li>
                <li>
                  <Link href={"/contactus"}><a className="text-gray-600 hover:text-gray-800">Contact Us</a></Link>
                </li>
              </nav>
            </div>

            <div className="lg:w-96 md:w-1/4 w-full">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">ABOUT</h2>
              <nav className="list-none mb-10">
                <li>
                  <p className="text-gray-600 hover:text-gray-800"><strong>Agro Solutions</strong> Platform is a modern solution for farmers, researchers, and agricultural professionals to help them manage their operations and meet the challenges of a changing climate. Our platform provides a comprehensive suite of tools, data, and services that enable farmers to be more efficient and successful.</p>
                </li>

              </nav>
            </div>
          </div>
        </div>
        <div className="bg-gray-100">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">© 2022 AgroSolutions.com — All Rights Reserved
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Footer
