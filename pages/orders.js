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
      <div className="container">

              <table className="table-auto ml-4 md:ml-16 mt-8 md:w-[88rem] overflow-hidden border-b rounded-md">
                  <thead className="border-b bg-gray-50 dark:bg-gray-700">
                    <tr className="border-b hover:bg-gray-100">
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">#Order Id</th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Amount</th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item) => { return <tr key={item._id} className="border-b hover:bg-gray-100">
                      <td className="text-sm text-gray-900 font-semibold px-6 py-4">{item.orderId}</td>
                      <td className="text-sm text-gray-900 font-semibold px-6 py-4">{item.amount}</td>
                      <td className="text-sm text-gray-900 font-semibold px-6 py-4"><Link href={"/order?id=" + item._id}><a>Details</a></Link></td>
                    </tr>})}

                  </tbody>
                </table>

      </div>
    </div>
  )
}

export default Orders
