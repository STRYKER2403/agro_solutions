import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';

const Orders = () => {

  const router = useRouter();
  const [orders, setorders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem("myuser")).token }),
      })
      let res = await a.json()
      setorders(res.orders);
      
    }

    if (!localStorage.getItem("myuser")) {
      router.push("/")
    }
    else {
      fetchOrders();
      
    }

  }, [router.query]); //router.query not on file

  return (
    
    <div className='min-h-screen'>
      
        <h1 className="font-semibold text-2xl text-center p-8">My Orders</h1>
        <div className="container mx-auto">

        <div className="flex flex-col items-center">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-[88rem] sm:px-6 lg:px-8">
              <div className="overflow-hidden border rounded-md">
                <table className="min-w-full">
                  <thead className="border-b bg-gray-50 dark:bg-gray-700">


                    <tr>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        #Order Id
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Email
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Amount
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Details
                      </th>
                    </tr>


                  </thead>
                  <tbody>

                    {orders.map((item)=>{ 
                      return  <tr key={item._id} className="border-b hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.orderId}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.email}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.amount}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <Link href={"/order?id=" + item._id}><a>Details</a></Link>
                        </td>
                      </tr>
                    })}
                    

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

// export async function getServerSideProps(context) {

//   // Do it this way with fetch or directly write logic which is recommended in documentation
//   // let res = await fetch("http://localhost:3000/api/getproducts")
//   // let products = await res.text()

//   // Direct logic
//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect(process.env.MONGO_URI);
//   }

//   let orders = await Order.find({ email: email })

//   return {
//     // fetch way
//     // props: {products:JSON.parse(products)}, // will be passed to the page component as props

//     // Direct logic
//     props: { orders: JSON.parse(JSON.stringify(orders)) }
//   }
// }

export default Orders
