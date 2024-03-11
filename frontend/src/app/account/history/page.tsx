"use client"

import { AppUseSelector } from '@/store/Reducer';
import getLocation from '@/utils/location';
import React from 'react'
import { AiFillFilePdf, AiFillPrinter } from 'react-icons/ai';
import { FaTimesCircle } from "react-icons/fa";
import Image from 'next/image'
const BASE_URL = process.env.BACKEND_URL;

export default function page() {
    const data = AppUseSelector((state) => state.member);


    const getLoca = (path: any) => {
        const test: any = getLocation(path)
        return `ตำบล${test[2].name_th}, อำเภอ${test[1].name_th}, จังหวัด${test[0].name_th}`
    }

    const vihecle = (test: any) => {
        return test.join(", ").replace("CAR", "รถยนต์").replace("MOTORCYCLE", "รถจักรยานยนต์").replace("TRUCK", "รถบรรทุก").replace("PICKUP_TRUCK", "รถกระบะ").replace("FORKLIFT", "รถฟอร์คลิฟท์")
    }



    return (
        <div className='p-6'>


            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

                <div className="col-span-1 md:col-span-11 print:block" id="pdf-content">

                    <div className="border p-5 mt-3">
                        <div className="flex flex-col md:flex-row justify-between">
                            <div className="">
                                <p className='mb-4 text-[19px] text-[#2357A5] font-semibold'>ข้อมูลส่วนตัว</p>
                                <div className="flex text-[16px] ">
                                    <div className="flex mr-5">
                                        <p className='text-gray-500 mr-3'>ชื่อ</p>
                                        <p>{(data.data.jobseeker.firstName)}</p>
                                    </div>

                                    <div className="flex ml-5">
                                        <p className='text-gray-500 mr-3'>นามสกุล</p>
                                        <p>{(data.data.jobseeker.lastName)}</p>
                                    </div>
                                </div>

                                <div className="flex text-[17px] mt-3 ">
                                    <div className="flex mr-5">
                                        <p className='text-gray-500 mr-3'>ที่อยู่</p>
                                        <p>{data.data.jobseeker.location.address}, {getLoca(data.data.jobseeker.location)}</p>
                                    </div>
                                </div>

                                <div className="flex text-[17px] mt-3 ">
                                    <div className="flex mr-5">
                                        <p className='text-gray-500 mr-3'>อีเมล</p>
                                        <p>{(data.data.email)}</p>
                                    </div>

                                    <div className="flex md:ml-5">
                                        <p className='text-gray-500 mr-3'>เบอร์</p>
                                        <p>{(data.data.jobseeker.phonenumber)}</p>
                                    </div>
                                </div>

                                <div className="flex text-[17px] mt-3 ">
                                    <div className="flex mr-5">
                                        <p className='text-gray-500 mr-3'>วันเกิด</p>
                                        <p>{(data.data.jobseeker.dob)}</p>
                                    </div>

                                    <div className="flex ml-5">
                                        <p className='text-gray-500 mr-3'>อายุ</p>
                                        <p>18 ปี</p>
                                    </div>
                                </div>

                                <div className="flex text-[17px] mt-3 ">
                                    <div className="flex mr-5">
                                        <p className='text-gray-500 mr-3'>เพศ</p>
                                        <p>{(data.data.jobseeker.gender === "MALE" ? "ชาย" : data.data.jobseeker.gender === "FEMALE" ? "หญิง" : "อื่นๆ")}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="w-[110px] h-[140px] mx-auto rounded-md border">
                                    {data.data.jobseeker.image ? (
                                        <Image

                                            src={`${BASE_URL}/file/${data.data.jobseeker.image}`}
                                            alt=""
                                            width={110}
                                            height={140}
                                        >
                                        </Image>
                                    ) : (<></>)}
                                </div>


                            </div>
                        </div>

                        <div className="flex mt-6 ">
                            <div className="">
                                <p className='mb-4 text-[19px] text-[#2357A5] font-semibold'>ความสามารถ</p>
                                <div className="flex text-[16px] ">
                                    <div className="flex mr-5">
                                        <p className='text-gray-500 mr-3'>พิมพ์ดีดไทย</p>
                                        <p>{data.data.jobseeker.skill.th_typing} คำ/นาที</p>
                                    </div>

                                    <div className="flex ml-5">
                                        <p className='text-gray-500 mr-3'>พิมพ์ดีดอังกฤษ</p>
                                        <p>{data.data.jobseeker.skill.eng_typing} คำ/นาที</p>
                                    </div>
                                </div>

                                <div className="flex text-[17px] mt-3 ">
                                    <div className="flex mr-5">
                                        <p className='text-gray-500 mr-3'>ความสามารถในการขับขี่</p>
                                        <p>{vihecle(data.data.jobseeker.skill.driving_ability)}</p>
                                    </div>
                                </div>

                                <div className="flex text-[17px] mt-3 ">
                                    <div className="flex mr-5">
                                        <p className='text-gray-500 mr-3'>มีพาหนะส่วนตัว</p>
                                        <p>{vihecle(data.data.jobseeker.skill.private_vehicle)}</p>
                                    </div>
                                </div>

                                <div className="flex text-[17px] mt-3 ">
                                    <div className="flex mr-5">
                                        <p className='text-gray-500 mr-3'>ความสามารถพิเศษอื่นๆ *</p>
                                        <p>{data.data.jobseeker.skill.other_special_skills}</p>
                                    </div>
                                </div>

                                <div className="flex text-[17px] mt-3 ">
                                    <div className="flex mr-5">
                                        <p className='text-gray-500 mr-3'>โครงการ ผลงานเกียรติประวัติและประสบการณ์อื่นๆ *</p>
                                        <p>{data.data.jobseeker.skill.archievements}</p>
                                    </div>
                                </div>

                                <div className="flex text-[17px] mt-3 ">
                                    <div className="flex mr-5">
                                        <p className='text-gray-500 mr-3'>บุคคลอ้างอิง *</p>
                                        <p>{data.data.jobseeker.skill.references}</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
                <div className="col-span-1 print:hidden">
                    <div className=" mt-3">
                        <button onClick={() => window.print()} className="group text-white bg-[#2357A5] border-[#2357A5]  border py-2 w-full px-4 font-medium rounded-lg  ">

                            <div className="text-[18px]">

                                <AiFillPrinter className="text-[40px] mx-auto" />
                                <div className="mt-1">Print</div>

                            </div>
                        </button>
                        {/* <button onClick={() => console.log("")} className="mt-3 group text-white bg-[#2357A5] border-[#2357A5]  border py-2 w-full px-4 font-medium rounded-lg ">

                            <div className="text-[18px]">

                                <AiFillFilePdf className="text-[40px] mx-auto" />
                                <div className="mt-1">PDF</div>

                            </div>
                        </button> */}
                    </div>
                </div>

            </div>
        </div>
    )
}
