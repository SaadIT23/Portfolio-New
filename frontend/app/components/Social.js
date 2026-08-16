import React from 'react'
import portfolio from "@/data/portfolio.json";
import { socialIconMap } from "./iconMaps";

const Social = ({ ConStyle, iconStyle }) => {
    const socials = portfolio.socials || [];

    return (
        <div className={ConStyle}>
            {socials.map((item, index) => {
                const Icon = socialIconMap[item.icon];
                if (!Icon) return null;

                return (
                    <a key={index} target='_blank' href={item.url} className={iconStyle} aria-label={item.platform}>
                        <Icon />
                    </a>
                )
            })}
        </div>
    )
}

export default Social
