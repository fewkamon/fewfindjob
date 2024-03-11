"use client"
import { AppUseSelector } from '@/store/Reducer';
import fetchWithToken from '@/utils/fetchUtils';
import provincesData from '@/assets/thai-province-data/thai_provinces.json'
import amphuresData from '@/assets/thai-province-data/thai_amphures.json'
import tambonsData from '@/assets/thai-province-data/thai_tambons.json'
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import CheckboxGroup from '@/components/CheckboxGroup';

export default function Page() {
    const data = AppUseSelector((state) => state.member);
    const router = useRouter()
    const [sss, setSss] = useState(data.data)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetchWithToken("/jobseeker/info/1", {
                method: "PATCH", body: JSON.stringify(
                    {
                        "firstname": sss.jobseeker.firstName,
                        "lastname": sss.jobseeker.lastName,
                        "birthdate": sss.jobseeker.dob,
                        "gender": sss.jobseeker.gender,
                        "phonenumber": sss.jobseeker.phonenumber
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
                ข้อมูลส่วนตัว
            </div>
            <div className="font-medium mt-2 text-[15px] text-gray-500 mb-6">
                ข้อมูลส่วนบุคคลที่เกี่ยวกับผู้ใช้
            </div>

            <hr />

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-8 mt-6 text-[14px] ">
                    <div className="col-span-6">
                        <span className='text-[#535353]'>ชื่อจริง *</span>
                        <input type="text" id="first_name"

                            value={sss.jobseeker.firstName}
                            onChange={(e) => {
                                setSss((prevData: any) => ({
                                    ...prevData,
                                    jobseeker: {
                                        ...prevData.jobseeker,
                                        firstName: e.target.value
                                    }
                                }));
                            }}

                            className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3.5" placeholder="xxxxxxxxx" required />
                    </div>
                    <div className="col-span-6">
                        <span className='text-[#535353]'>นามสกุล *</span>
                        <input
                            type="text"
                            id="first_name"
                            value={sss.jobseeker.lastName}
                            onChange={(e) => {
                                setSss((prevData: any) => ({
                                    ...prevData,
                                    jobseeker: {
                                        ...prevData.jobseeker,
                                        lastName: e.target.value
                                    }
                                }));
                            }}
                            className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3.5" placeholder="xxxxxxxxx" required />
                    </div>

                    <div className="col-span-6">
                        <span className='text-[#535353]'>วันเกิด *</span>

                        <input
                            type="date"
                            value={sss.jobseeker.dob}
                            onChange={(e) => {
                                setSss((prevData: any) => ({
                                    ...prevData,
                                    jobseeker: {
                                        ...prevData.jobseeker,
                                        dob: e.target.value
                                    }
                                }));
                            }}
                            className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3" placeholder="xxxxxxxxx" required
                        />
                    </div>

                    <div className="col-span-6">
                        <span className='text-[#535353]'>เพศ *</span>
                        <select
                            id="selectOption"

                            value={sss.jobseeker.gender}
                            onChange={(e) => {
                                setSss((prevData: any) => ({
                                    ...prevData,
                                    jobseeker: {
                                        ...prevData.jobseeker,
                                        gender: e.target.value
                                    }
                                }));
                            }}

                            className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="MALE">ชาย</option>
                            <option value="FEMALE">หญิง</option>
                            <option value="OTHER">อื่นๆ</option>
                        </select>
                    </div>

                    <div className="col-span-6">
                        <span className='text-[#535353]'>เบอร์โทรศัพท์ *</span>
                        <input type="text" id="first_name"


                            value={sss.jobseeker.phonenumber}
                            onChange={(e) => {
                                setSss((prevData: any) => ({
                                    ...prevData,
                                    jobseeker: {
                                        ...prevData.jobseeker,
                                        phonenumber: e.target.value
                                    }
                                }));
                            }}

                            className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3.5" placeholder="xxxxxxxxx" required />
                    </div>
                </div>

                <div className="flex justify-end">

                    <button className=" mt-12 text-white  border-[#2357A5] bg-[#2357A5] border py-2  px-5 font-medium rounded-[10px] text-[15px]">บันทึกข้อมูล</button>
                </div>
            </form>

        </div>
    )
}
