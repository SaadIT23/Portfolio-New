import React from 'react'
import { memo } from 'react'
import { skillIconMap } from './iconMaps'
import { getSkillColorClass } from './skillColorClass'
const Details = ({ details }) => {
    if (details.title === "My Experience") {
        return <div className='flex flex-col gap-[30px] text-center lg:text-left '>
            <h3 className='text-4xl font-bold border-b-2 border-accent pb-1'>{details.title}</h3>
            <p className='text-white/60 mx-auto lg:mx-0 max-w-[600px]'>{details.des}</p>
            <div className='overflow-x-auto h-[400px]'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-[30px]'>
                    {details.items.map((obj, index) => {
                        return (
                            <div key={index} className='bg-[#232329] h-auto min-h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-2'>
                                <span className='text-accent'>{obj.duration}</span>
                                <h3 className='text-xl max-w-[260px] min-h-[60px] text-center lg:text-left'>{obj.position}</h3>
                                <div className='flex items-center gap-3'>
                                    <span className='size-[6px] rounded-full bg-accent'></span>
                                    <p className='text-white/60'>{obj.company}</p>
                                </div>
                                {obj.highlights && (
                                    <ul className='text-white/70 text-sm list-disc pl-5 mt-2 space-y-1'>
                                        {obj.highlights.slice(0, 3).map((point, i) => <li key={i}>{point}</li>)}
                                    </ul>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    }
    else if (details.title === "My Education") {
        return <div className='flex flex-col gap-[30px] text-center lg:text-left '>
            <h3 className='text-4xl font-bold border-b-2 border-accent pb-1'>{details.title}</h3>
            <p className='text-white/60 mx-auto lg:mx-0 max-w-[600px]'>{details.des}</p>
            <div className='overflow-x-auto h-[400px]'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-[30px]'>
                    {details.items.map((obj, index) => {
                        return (
                            <div key={index} className='bg-[#232329] h-auto min-h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-2'>
                                <span className='text-accent'>{obj.duration}</span>
                                <h3 className='xl:text-xl max-w-[260px] min-h-[60px] text-center lg:text-left lg:text-[18px]'>{obj.degree}</h3>
                                <div className='flex items-center gap-3'>
                                    <span className='size-[6px] rounded-full bg-accent'></span>
                                    <p className='text-white/60'>{obj.institute}</p>
                                </div>
                                {obj.notes && <p className='text-sm text-white/70'>{obj.notes}</p>}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    }
    else if (details.title === "My Skills") {
        return <div className='flex flex-col gap-[30px]'>
            <div className='flex flex-col gap-[30px] text-center lg:text-left'>
                <h3 className='text-4xl font-bold border-b-2 border-accent pb-1'>{details.title}</h3>
                <p className='max-w-[600px] text-white/60 mx-auto lg:mx-0' >{details.des}</p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:gap-[30px] sm:gap-[20px]'>
                {details.skillset.map((obj, index) => {
                    const Icon = skillIconMap[obj.icon]
                    return (
                        <div key={index} className='flex flex-col justify-center items-center bg-[#232329] w-full h-[150px] rounded-xl group'>
                            <div className={`icon text-6xl ${getSkillColorClass(obj.color)} group-hover:text-accent transition-all duration-300`}>{Icon ? <Icon /> : null}</div>
                            <div className="name capitalize group-hover:text-accent transition-all duration-300 text-center">{obj.name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    }
    else if (details.title === "Achievements" || details.title === "Certifications") {
        return <div className='flex flex-col gap-[30px] text-center lg:text-left'>
            <h3 className='text-4xl font-bold border-b-2 border-accent pb-1'>{details.title}</h3>
            <p className='text-white/60 mx-auto lg:mx-0 max-w-[700px]'>{details.des}</p>
            <div className='grid grid-cols-1 gap-4 max-w-[760px] mx-auto lg:mx-0'>
                {details.items.map((item, idx) => (
                    <div key={idx} className='bg-[#232329] rounded-xl px-5 py-4 flex flex-col gap-1 border border-white/10'>
                        <h4 className='text-white text-[18px]'>{item.title}</h4>
                        {item.org && <p className='text-white/60 text-sm'>{item.org}</p>}
                        {item.duration && <p className='text-accent text-sm'>{item.duration}</p>}
                    </div>
                ))}
            </div>
        </div>
    }
    else if (details.title === "About Me") {
        return <div className='flex flex-col gap-[30px] text-center lg:text-left'>
            <h3 className='text-4xl font-bold border-b-2 border-accent pb-1'>{details.title}</h3>
            <p className='max-w-[600px] text-white/60 mx-auto lg:mx-0'>{details.des}</p>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0 gap-10'>
                {details.info.map((obj, index) => {
                    return (
                        <div key={index} className='flex items-center justify-center lg:justify-start gap-3'>
                            <span className='text-white/60'>{obj.fieldname}</span>
                            <span className='text-xl text-gray-200'>{obj.fieldvalue}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    }

}

export default memo(Details)
