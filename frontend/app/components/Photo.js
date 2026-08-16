"use client"
import React from 'react'
import portfolio from "@/data/portfolio.json";

const Photo = () => {
    return (
        <img src={portfolio.site.heroImage} width={"450"} height={"450"} className='rounded-full  drop-shadow-lg shadow-lg animate-blink-shadow ' priority="true" quality={100} alt={portfolio.site.ownerName} />
    )
}

export default Photo
