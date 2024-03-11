"use client"

import { fetchUploadWithToken } from '@/utils/fetchUtils';
import React, { FormEvent, useEffect, useState } from 'react'
import { AiOutlineCloudUpload } from "react-icons/ai";
import dynamic from 'next/dynamic'

const Quil = dynamic(() => import('./quil'), { ssr: false })
import { useRouter, usePathname } from 'next/navigation'

import toast from 'react-hot-toast';

export default function Add() {

    const [open, setOpen] = useState<boolean>(false)
    const [data, setData] = useState<string>("");

    const router = useRouter()
    const pathname = usePathname()

    const [formData, setFormData] = useState<{
        topic: string,
        detail: string,
        file: File | null
    }>({
        topic: '',
        detail: '',
        file: null,
    });


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                file: file,
            })
        }
    };

    const humanFileSize = (size: number) => {
        const units = ["B", "kB", "MB", "GB", "TB"];
        let unitIndex = 0;
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(2)} ${units[unitIndex]}`;
    }


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formData.file) {
            const formData1 = new FormData();
            formData1.append('topic', formData.topic);
            formData1.append('detail', data);
            formData1.append('file', formData.file);
            try {

                const response = await fetchUploadWithToken("/admin/news", {
                    method: "POST",
                    body: (formData1),
                }, 0)
                if (!response.ok) {
                    const test = await response.json()
                    throw new Error(test["message"]);
                }


                await toast.success("บันทึกข้อมูลสำเร็จ")
                setOpen(false)
                router.refresh()

            } catch (err: any) {
                toast.error(err.message)
            }
            router.refresh()

        } else {
            toast.error("ท่านยังไม่ได้ใส่รูป")
        }
    }

    return (
        <div>
            <div className="flex justify-between items-end">
                <p className='text-[25px] font-semibold'>ประกาศข่าวสาร</p>
                <button onClick={() => setOpen(!open)} className="text-white border-[#2357A5] text-[16px] bg-[#2357A5] border py-2 shadow px-4 font-medium rounded-[10px] shadow-blue-500/50">{!open ? `เพิ่มประกาศ` : `ปิดเมนู`}</button>
            </div>


            <div className={`${open ? "block" : 'hidden'} bg-white mt-4 rounded-lg p-5 py-9`}>
                <form onSubmit={handleSubmit}>

                    <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-12 gap-y-8 mt-6 mb-6 md:mx-9 ">

                        <div className="col-span-4">
                            <p className='text-[18px]'>ชื่อบริษัท</p>
                            <input type="text" id="first_name"
                                onChange={(e) => setFormData({
                                    ...formData,
                                    topic: e.target.value,
                                })}
                                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>

                        <div className="col-span-12">
                            <p className='text-[18px] mb-2'>เนื้อหา</p>
                            <Quil
                                onChange={(data: string) => {
                                    setData(data);
                                }}
                                value={''}
                            />

                        </div>

                        <div className="col-span-12">
                            <p className='text-[18px]'>รูปภาพ</p>

                            <div className="mt-2 flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">

                                        <AiOutlineCloudUpload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{formData.file ? `${formData.file.name} ${humanFileSize(formData.file.size)}` : `SVG, PNG, JPG or GIF`}</p>
                                    </div>
                                    <input id="dropzone-file" onChange={handleFileChange} type="file" className="hidden" />
                                </label>
                            </div>
                        </div>

                        <div className="col-span-12">
                            <div className="flex justify-center mt-5">
                                <button className="text-white border-[#2357A5] text-[16px] bg-[#2357A5] border py-3 w-[180px]  shadow px-4 font-medium rounded-[10px] shadow-blue-500/50">เพิ่มประกาศ</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>


        </div>
    )
}
