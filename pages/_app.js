import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import '../styles/globals.css'
import LoadingBar from 'react-top-loading-bar'

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [cart, setcart] = useState({});
  const [user, setuser] = useState({value:null});
  const [key, setkey] = useState(0);
  const [subTotal, setsubTotal] = useState(0);

  const [category, setcategory] = useState("");

  const categoryselect = (num) =>{
    if(num == 1)
    {
      
      setcategory("Seeds")
    }
    else if(num == 2)
    {
      
      setcategory("Fertilisers")
    }
    else
    {
      
      setcategory("Tools")
    }
  }

  useEffect(() => {

    router.events.on('routeChangeStart', ()=>{setProgress(40)})
    router.events.on('routeChangeComplete', ()=>{setProgress(100)})

    try {
      if (localStorage.getItem("cart")) {
        setcart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
         console.log(error);
         localStorage.clear();
    }

    const myuser = JSON.parse(localStorage.getItem("myuser"))
    if(myuser)
    {
      setuser({value: myuser.token ,email: myuser.email})    
    }
    setkey(Math.random())

  }, [router.query]);

  const logout = () =>{
    localStorage.removeItem("myuser")
    setuser({value:null})
    setkey(Math.random())
    router.push('/')
  }

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart))
    let subt=0;
    // Object.keys() method changes cart into iterable array
    let keys = Object.keys(myCart)

      for(let i=0; i<keys.length ;i++){
        subt += myCart[keys[i]].price * myCart[keys[i]].qty
      }
      setsubTotal(subt); 
  }

  const addToCart = (ItemCode, qty, price, name) => {
    if(Object.keys(cart).length == 0)
    {
      setkey(Math.random())
    }
    let newCart = cart;
    if (ItemCode in cart) {
      newCart[ItemCode].qty = cart[ItemCode].qty + qty
    }
    else {
      newCart[ItemCode] = { qty: 1, price, name}
    }

    setcart(newCart)
    saveCart(newCart);
  }

  const removeFromCart = (ItemCode, qty) => {
    let newCart = cart;
    if (ItemCode in cart) {
      newCart[ItemCode].qty = cart[ItemCode].qty - qty
    }
    if (newCart[ItemCode].qty <= 0) {
      delete newCart[ItemCode]
    }

    setcart(newCart)
    saveCart(newCart);
  }

  const clearCart = () => {
    setcart({})
    saveCart({})
  }

  const buyNow = (ItemCode, qty, price, name) =>{
    let newCart = {};
    newCart[ItemCode] = { qty: 1, price, name};

    setcart(newCart)
    saveCart(newCart);
    router.push('/checkout')
 }

  return <>
    <LoadingBar
        color='#17912B'
        progress={progress}
        waitingTime = {400}
        onLoaderFinished={() => setProgress(0)}
      />
      
    {key && <Navbar categoryselect={categoryselect} key={key} logout={logout} user={user} cart={cart} addToCart = {addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />}
    <Component category={category} buyNow={buyNow} cart={cart} addToCart = {addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
    <Footer />
  </>
}

export default MyApp
