import React from 'react'
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import { Grid } from "@mui/material";
import AllProducts from "../../src/components/dashboard/AllProducts";
import Product from '../../models/Product';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const mongoose = require("mongoose");

const allorders = ({products}) => {

  const router = useRouter();

  useEffect(() => {
    
    if (JSON.parse(localStorage.getItem("myuser")).type == "Buyer") {
      router.push("/")
    }

  }, []);

  return (
    <ThemeProvider theme={theme}>
    <FullLayout>
    <style jsx global>{`
        footer{
          display:none;
        }
      `}</style>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <AllProducts products={products} />
      </Grid>
    </Grid>
    </FullLayout>
    </ThemeProvider>
  );
}

export async function getServerSideProps(context){

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find({})
  
  return {
    props: { products: JSON.parse(JSON.stringify(products))}
  }
}

export default allorders
