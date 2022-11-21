import { Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import AllProducts from "../../src/components/dashboard/AllProducts";
import Product from '../../models/Product';
const mongoose = require("mongoose");

export default function Index({products}) {
  return (
    <ThemeProvider theme={theme}>

      <style jsx global>{`
        footer{
          display:none;
        }
      `}</style>
      
    <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SalesOverview />
      </Grid>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={4}>
        <DailyActivity />
      </Grid>
      <Grid item xs={12} lg={8}>
        <AllProducts products={products} />
      </Grid>
      <Grid item xs={12} lg={12}>
        <BlogCard />
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
