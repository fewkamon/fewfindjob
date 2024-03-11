"use client"
import { AppUseSelector } from '@/store/Reducer';
import fetchWithToken from '@/utils/fetchUtils';
import provincesData from '@/assets/thai-province-data/thai_provinces.json'
import amphuresData from '@/assets/thai-province-data/thai_amphures.json'
import tambonsData from '@/assets/thai-province-data/thai_tambons.json'
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

export default function Page() {
    const data = AppUseSelector((state) => state.member);
    const router = useRouter()
    const [sss, setSss] = useState(data.data)
    const provinces = provincesData.RECORDS;
    const amphures = amphuresData.RECORDS.filter((amphure) => amphure.province_id === parseInt(sss.jobseeker.location.province));
    const tambons = tambonsData.RECORDS.filter((tambon) => tambon.amphure_id === parseInt(sss.jobseeker.location.district));
    const zipcode = tambonsData.RECORDS.findIndex(item => item.id === ~~sss.jobseeker.location.subdistrict);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetchWithToken("/jobseeker/info/2", {
                method: "PATCH", body: JSON.stringify(
                    {
                        "location": sss.jobseeker.location,
                    }
                )
            }, 0)
            if (!response.ok) {
                const test = await response.json()
                throw new Error(test["message"]);
            }
            await toast.success("บันทึกข้อมูลสำเร็จ")
        } catch (err: any) {
            toast.error(err.message)
        }

    }

    return (
        <div>

            <div className="font-semibold text-[20px]">
                ที่อยู่ปัจจุบัน
            </div>
            <div className="font-medium mt-2 text-[15px] text-gray-500 mb-6">
                ข้อมูลส่วนบุคคลที่เกี่ยวกับผู้ใช้
            </div>

            <hr />


            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-12 gap-y-8 mt-6  ">
                    <div className="col-span-1 md:col-span-12 text-[14px]">
                        <span className='text-[#535353] '>ที่อยู่ *</span>
                        <textarea id="first_name" rows={6}

                            value={sss.jobseeker.location.address}
                            onChange={(e) => {
                                setSss((prevData: any) => ({
                                    ...prevData,
                                    jobseeker: {
                                        ...prevData.jobseeker,
                                        location: {
                                            ...prevData.jobseeker.location,
                                            address: e.target.value
                                        }
                                    }
                                }));
                            }}
                            className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3.5" placeholder="xxxxxxxxx" required ></textarea>
                    </div>

                    <div className="col-span-3 text-[14px]">
                        <span className='text-[#535353]'>จังหวัด *</span>

                        <select
                            id="province"
                            className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3.5"
                            value={sss.jobseeker.location.province}
                            onChange={(e) => {
                                setSss((prevData: any) => ({
                                    ...prevData,
                                    jobseeker: {
                                        ...prevData.jobseeker,
                                        location: {
                                            ...prevData.jobseeker.location,
                                            province: e.target.value
                                        }
                                    }
                                }));
                            }}
                            required
                        >
                            <option value="">-- เลือกจังหวัด --</option>
                            {provinces.map((province) => (
                                <option key={province.id} value={province.id}>
                                    {province.name_th}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className="col-span-3 text-[14px]">
                        <span className='text-[#535353]'>อำเภอ *</span>
                        <select
                            id="amphure"
                            value={sss.jobseeker.location.district}
                            onChange={(e) => {
                                setSss((prevData: any) => ({
                                    ...prevData,
                                    jobseeker: {
                                        ...prevData.jobseeker,
                                        location: {
                                            ...prevData.jobseeker.location,
                                            district: e.target.value
                                        }
                                    }
                                }));
                            }}
                            className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3.5"
                            required
                        >
                            <option value="">-- เลือกอำเภอ --</option>
                            {amphures.map((amphure) => (
                                <option key={amphure.id} value={amphure.id}>
                                    {amphure.name_th}
                                </option>
                            ))}
                        </select>
                    </div>



                    <div className="col-span-3 text-[14px]">
                        <span className='text-[#535353]'>ตำบล *</span>

                        <select
                            id="tambon"
                            value={sss.jobseeker.location.subdistrict}
                            onChange={(e) => {
                                setSss((prevData: any) => ({
                                    ...prevData,
                                    jobseeker: {
                                        ...prevData.jobseeker,
                                        location: {
                                            ...prevData.jobseeker.location,
                                            subdistrict: e.target.value
                                        }
                                    }
                                }));
                            }}
                            className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3.5"
                            required
                        >
                            <option value="">-- เลือกตำบล --</option>
                            {tambons.map((tambon) => (
                                <option key={tambon.id} value={tambon.id}>
                                    {tambon.name_th}
                                </option>
                            ))}
                        </select>

                    </div>


                    <div className="col-span-3 text-[14px]">
                        <span className='text-[#535353]'>รหัสไปรษณีย์ *</span>
                        <input id="first_name" readOnly value={zipcode >= 0 ? tambonsData.RECORDS[zipcode].zip_code : 0} className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3.5" placeholder="xxxxxxxxx" required />
                    </div>
                </div>


                <div className="flex justify-end">

                    <button className=" mt-12 text-white  border-[#2357A5] bg-[#2357A5] border py-2  px-5 font-medium rounded-[10px] text-[15px]">บันทึกข้อมูล</button>
                </div>
            </form>

        </div>
    )
}
