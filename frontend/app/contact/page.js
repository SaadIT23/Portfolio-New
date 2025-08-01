"use client"
import React, { useState } from 'react'
import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from 'react-icons/fa'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const info = [
  {
    icon: <FaPhoneAlt />,
    name: "Phone",
    des: "(+92) 3354747057",
  },
  {
    icon: <FaEnvelope />,
    name: "Email",
    des: "saadimran936@gmail.com",
  },
  {
    icon: <FaMapMarkedAlt />,
    name: "Address",
    des: "House no 4 Shah Jahan Street Islamia Park, Lahore",
  },
]

const Contact = () => {
  useGSAP(() => {
    gsap.from(".container >div", {
      y: -20,
      opacity: 0,
      delay: 0.5,
      duration: 0.5,
      stagger: 0.3
    })
  })

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.firstName || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.", { autoClose: 3000 });
      return;
    }

    setIsSubmitting(true);

    try {

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!", { autoClose: 3000 });
        setFormData({ firstName: "", lastName: "", email: "", phone: "", service: "", message: "" });


      } else {
        toast.error(result.error || "Something went wrong!", { autoClose: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message.", { autoClose: 3000 });
    } finally {
      // Re-enable the button after submission (either success or failure)
      setIsSubmitting(false);
    }
  };

  return (
    <div className='container items-center  mx-auto flex flex-col lg:flex-row gap-[30px] w-[100vw] md:w-[95vw] xl:w-[85vw] min-h-[85vh]  2xl:max-h-[85vh] my-2'>
      <div className="form w-[90%] lg:w-[60%] max-h-full order-2 lg:order-none">
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-5 md:p-10 bg-[#27272c] rounded-xl min-h-full 2xl:max-h-full'>
          <h3 className='text-4xl text-accent'>Let&apos;s Work together</h3>
          <p className='text-white/60'>Get in touch to discuss your project.</p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <input className='flex h-[48px] rounded-md border border-white/10 focus:border-accent font-light bg-primary px-4 py-5 text-base placeholder:text-white/60 outline-none' type="text" placeholder='Firstname' name="firstName" value={formData.firstName}
              onChange={handleChange} required />
            <input className='flex h-[48px] rounded-md border border-white/10 focus:border-accent font-light bg-primary px-4 py-5 text-base placeholder:text-white/60 outline-none' type="text" placeholder='Lastname' name="lastName"
              value={formData.lastName}
              onChange={handleChange} />
            <input className='flex h-[48px] rounded-md border border-white/10 focus:border-accent font-light bg-primary px-4 py-5 text-base placeholder:text-white/60 outline-none' type="email" placeholder='Email' name="email"
              value={formData.email}
              onChange={handleChange} required />
            <input className='flex h-[48px] rounded-md border border-white/10 focus:border-accent font-light bg-primary px-4 py-5 text-base placeholder:text-white/60 outline-none' type="phone" placeholder='Phone' name="phone"
              value={formData.phone}
              onChange={handleChange} />
          </div>

          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            id=""
            className="flex h-[58px] w-full items-center justify-between rounded-md border border-white/10 bg-primary px-4 py-5 text-base text-white/60 placeholder:text-white/10 focus:border-accent outline-none"
          >
            <option value="ss" className="bg-primary text-accent py-1.5 text-sm rounded-sm">
              Select a Service
            </option>
            <option value="web" className="bg-primary text-accent py-1.5 text-sm rounded-sm">
              Web Development
            </option>
            <option value="ui" className="bg-primary text-accent py-1.5 text-sm rounded-sm">
              UX/UI Design
            </option>
            <option value="database" className="bg-primary text-accent py-1.5 text-sm rounded-sm">
              Database Development
            </option>
          </select>
          <textarea name="message" id="" cols="30" rows="6" placeholder='Type your message here...' value={formData.message}
            onChange={handleChange} className='h-[200px] flex min-h-[80px] rounded-md border border-white/10 bg-primary px-4 py-5 text-base placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50' required></textarea>
          <button className='bg-accent min-w-[200px] lg:max-w-40 py-2 px-3 rounded-full text-primary font-bold hover:bg-accent-hover mx-auto lg:mx-0' disabled={isSubmitting} >{isSubmitting ? "Sending..." : "Send Message"}</button>
        </form>
      </div>

      <div className="info my-4 lg:my-0 w-[90%] lg:w-[40%] min-h-full flex justify-center items-center order-1 lg:order-none">
        <ul className='flex flex-col gap-10 justify-center'>
          {info.map((item, index) => {
            return (
              <li key={index} className='flex items-center gap-6 '>
                <div className='w-[40px] h-[40px] md:w-[52px] md:h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center'>
                  <div className='text-[28px]'>{item.icon}</div>
                </div>
                <div className='flex-1'>
                  <p className='text-white/60'>{item.name}</p>
                  <h3 className='text-white/80 md:text-xl text-[15px]'>{item.des}</h3>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  )
}

export default Contact
