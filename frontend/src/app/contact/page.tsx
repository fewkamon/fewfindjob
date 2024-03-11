"use client"

import fetchWithToken from '@/utils/fetchUtils';
import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react'
import toast from 'react-hot-toast';

export default function Page() {


    const [formData, setFormData] = useState({
        topic: '',
        name: '',
        phonenumber: '',
        email: '',
        message: '',
    });



    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetchWithToken("/ticket", {
                method: 'POST',
                body: JSON.stringify(formData),
            }, 0)
            if (!response.ok) {
                const test = await response.json()
                throw new Error(test["message"]);
            }
            const test = await response.json()
            setFormData({
                topic: '',
                name: '',
                phonenumber: '',
                email: '',
                message: ''
            })

            await toast.success("ส่งเรื่องไปหาแอดมินเรียบร้อย")
        } catch (err: any) {
            toast.error(err.message)
        }
    };



    return (
        <div className="container mx-auto md:px-[15rem] mt-12 ">
            <div className="">

                <div className=" p-8 my-4 md:px-12 lg:w-12/12 lg:pl-20 lg:pr-20 mr-auto rounded-2xl shadow-2xl">
                    <div className="flex">
                        <h1 className="font-bold mb-3 text-5xl">ส่งข้อความ <br /> มาให้พวกเรา</h1>
                    </div>
                    <form onSubmit={handleSubmit}>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            <input
                                className="w-full bg-gray-100 border text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="หัวข้อ"
                                name="topic"
                                value={formData.topic}
                                required
                                onChange={handleChange}
                            />
                            <input
                                className="w-full bg-gray-100 border text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="ชื่อ"
                                name='name'
                                value={formData.name}
                                required
                                onChange={handleChange}
                            />

                            <input
                                className="w-full bg-gray-100 border text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                type="email"
                                placeholder="อีเมล"
                                name="email"
                                value={formData.email}
                                required
                                onChange={handleChange}
                            />
                            <input
                                className="w-full bg-gray-100 border text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                type="number"
                                placeholder="เบอร์โทรศัพท์"
                                name="phonenumber"
                                value={formData.phonenumber}
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="my-4">
                            <textarea required placeholder="ช้อความ" className="w-full border h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" name="message" value={formData.message} onChange={handleChange}></textarea>
                        </div>
                        <div className="my-2 w-1/2 lg:w-1/4">
                            <button type="submit" className="uppercase text-sm font-bold tracking-wide bg-[#2357A5] text-gray-100 p-3 rounded-lg w-full 
              focus:outline-none focus:shadow-outline">
                                ส่งข้อความ
                            </button>
                        </div>

                    </form>

                </div>




            </div>

        </div>
    )
}
