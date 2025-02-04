import Link from 'next/link';
import React from 'react'
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Social = ({ ConStyle, iconStyle }) => {
    // <FaLinkedinIn /> 
    // <FaGithub /> 
    const socials = [
        { icon: <FaLinkedinIn />, path: "https://www.linkedin.com/in/saad-imran-it-" },
        { icon: <FaGithub />, path: "https://github.com/SaadIT23" },
    ]
    return (
        <div className={ConStyle}>
            {socials.map((item, index) => {
                return <Link key={index} target='_blank' href={item.path} className={iconStyle}>{item.icon} </Link>
            })}
        </div>
    )
}

export default Social
