import React, { useState } from 'react'
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import {
    Grid,
    Stack,
    TextField,
    Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const add = () => {
    const [form, setform] = useState({});

    const router = useRouter();

    useEffect(() => {
      
      if (JSON.parse(localStorage.getItem("myuser")).type == "Buyer") {
        router.push("/")
      }
  
    }, []);

    const submitForm = async (e) => {
        e.preventDefault();
        const { title, slug, description, imgLink, category, price, availableQty } = form

        const data = [{ title, slug, description, imgLink, category, price, availableQty }];

        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateproducts`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        let res = await a.json();
        console.log(res)

        if (res.success) {
            toast.success("Product Updated Successfully", {
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
            toast.error("Some Error Occured!! Please Try Again", {
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

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <ThemeProvider theme={theme}>
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

            <FullLayout>
                <style jsx global>{`
        footer{
          display:none;
        }
      `}</style>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <BaseCard title="Update Product">
                            <Stack spacing={3}>

                                <TextField onChange={handleChange} value={form.title ? form.title : ""} name="title" label="Title" variant="outlined" />
                                <TextField onChange={handleChange} value={form.slug ? form.slug : ""} name="slug" label="Slug" variant="outlined" />
                                <TextField
                                    onChange={handleChange}
                                    value={form.description ? form.description : ""}
                                    name="description"
                                    label="Description"
                                    multiline
                                    rows={4}
                                />
                                <TextField onChange={handleChange} value={form.imgLink ? form.imgLink : ""} name="imgLink" label="Image Link" variant="outlined" />
                                <TextField onChange={handleChange} value={form.category ? form.category : ""} name="category" label="Category" variant="outlined" />
                                <TextField onChange={handleChange} value={form.price ? form.price : ""} name="price" label="Price" variant="outlined" />
                                <TextField onChange={handleChange} value={form.availableQty ? form.availableQty : ""} name="availableQty" label="Available Quantity" variant="outlined" />


                            </Stack>
                            <br />
                            <Button onClick={submitForm} variant="outlined" mt={2}>
                                Submit
                            </Button>
                        </BaseCard>
                    </Grid>

                </Grid>
            </FullLayout>
        </ThemeProvider>
    );
}


export default add
