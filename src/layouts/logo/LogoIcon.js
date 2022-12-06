import React from "react";
import  Link  from "next/link";
import Image from "next/image";

const LogoIcon = () => {
  return (
    <Link href={"/"}> 
      <a><Image src='/logo1.png' alt='lg' width={175} height={55} /></a>
    </Link>
  );
};

export default LogoIcon;
