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

    const drivelist = [
        { name: 'รถยนต์', value: "CAR" },
        { name: 'รถจักรยานยนต์', value: "MOTORCYCLE" },
        { name: 'รถบรรทุก', value: "TRUCK" },
        { name: 'รถกระบะ', value: "PICKUP_TRUCK" },
        { name: 'รถฟอร์คลิฟท์', value: "FORKLIFT" },
    ];


    const viheclelist = [
        { name: 'รถยนต์', value: "CAR" },
        { name: 'รถจักรยานยนต์', value: "MOTORCYCLE" },
        { name: 'รถบรรทุก', value: "TRUCK" },
    ];


    const handleDriveChange = (selectedOptions: string[]) => {
        setSss((prevData: any) => ({
            ...prevData,
            jobseeker: {
                ...prevData.jobseeker,
                skill: {
                    ...prevData.jobseeker.skill,
                    driving_ability: selectedOptions
                }
            }
        }));
    };

    const handleVihecleChange = (selectedOptions: string[]) => {
        setSss((prevData: any) => ({
            ...prevData,
            jobseeker: {
                ...prevData.jobseeker,
                skill: {
                    ...prevData.jobseeker.skill,
                    private_vehicle: selectedOptions
                }
            }
        }));
    };


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetchWithToken("/jobseeker/info/3", {
                method: "PATCH", body: JSON.stringify(
                    {
                        "skill": sss.jobseeker.skill,
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
                ความสามารถ
            </div>
            <div className="font-medium mt-2 text-[15px] text-gray-500 mb-6">
                ข้อมูลส่วนบุคคลที่เกี่ยวกับผู้ใช้
            </div>

            <hr />

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-12 gap-y-8 mt-6 text-[14px] ">
                    <div className="col-span-12">
                        <span className='text-[#535353]'>พิมพ์ดีด</span>
                        <div className="flex mt-1 ">
                            <div className="flex items-end mt-1">
                                <p className="text-[#535353] mr-3">ไทย</p>
                                <input type="text"
                                    value={sss.jobseeker.skill.th_typing}
                                    onChange={(e) => {
                                        setSss((prevData: any) => ({
                                            ...prevData,
                                            jobseeker: {
                                                ...prevData.jobseeker,
                                                skill: {
                                                    ...prevData.jobseeker.skill,
                                                    th_typing: e.target.value
                                                }
                                            }
                                        }));
                                    }}
                                    id="first_name" className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center w-12" placeholder="30" required />
                                <p className="text-[#535353] ml-3">คำ/นาที</p>
                            </div>

                            <div className="flex items-end mt-1 ml-12">
                                <p className="text-[#535353] mr-3">อังกฤษ</p>
                                <input type="text"
                                    value={sss.jobseeker.skill.eng_typing}
                                    onChange={(e) => {
                                        setSss((prevData: any) => ({
                                            ...prevData,
                                            jobseeker: {
                                                ...prevData.jobseeker,
                                                skill: {
                                                    ...prevData.jobseeker.skill,
                                                    eng_typing: e.target.value
                                                }
                                            }
                                        }));
                                    }}
                                    id="first_name" className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center w-12" placeholder="30" required />
                                <p className="text-[#535353] ml-3">คำ/นาที</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12">
                        <span className='text-[#535353]'>ความสามารถในการขับขี่</span>
                        <div className="mt-4">
                            <CheckboxGroup options={drivelist} onChange={handleDriveChange} checked={sss.jobseeker.skill.driving_ability} />
                        </div>
                    </div>


                    <div className="col-span-12">
                        <span className='text-[#535353]'>มีพาหนะส่วนตัว </span>
                        <div className="mt-4">
                            <CheckboxGroup options={viheclelist} onChange={handleVihecleChange} checked={sss.jobseeker.skill.private_vehicle} />
                        </div>
                    </div>


                    <div className="col-span-12 md:col-span-6">
                        <span className='text-[#535353]'>ความสามารถพิเศษอื่นๆ * </span>
                        <textarea

                            value={sss.jobseeker.skill.other_special_skills}
                            onChange={(e) => {
                                setSss((prevData: any) => ({
                                    ...prevData,
                                    jobseeker: {
                                        ...prevData.jobseeker,
                                        skill: {
                                            ...prevData.jobseeker.skill,
                                            other_special_skills: e.target.value
                                        }
                                    }
                                }));
                            }}
                            id="first_name" rows={6} className="mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3.5" placeholder="xxxxxxxxx" required ></textarea>
                    </div>

                    <div className="col-span-12 md:col-span-6">
                        <span className='text-[#535353]'>โครงการ ผลงานเกียรติประวัติและประสบการณ์อื่นๆ * </span>
                        <textarea id="first_name"
                            value={sss.jobseeker.skill.achievements}
                            onChange={(e) => {
                                setSss((prevData: any) => ({
                                    ...prevData,
                                    jobseeker: {
                                        ...prevData.jobseeker,
                                        skill: {
                                            ...prevData.jobseeker.skill,
                                            achievements: e.target.value
                                        }
                                    }
                                }));
                            }}
                            rows={6} className="mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3.5" placeholder="xxxxxxxxx" required ></textarea>
                    </div>

                    <div className="col-span-12 md:col-span-6">
                        <span className='text-[#535353]'>บุคคลอ้างอิง * </span>
                        <textarea id="first_name"
                            value={sss.jobseeker.skill.references}
                            onChange={(e) => {
                                setSss((prevData: any) => ({
                                    ...prevData,
                                    jobseeker: {
                                        ...prevData.jobseeker,
                                        skill: {
                                            ...prevData.jobseeker.skill,
                                            references: e.target.value
                                        }
                                    }
                                }));
                            }}
                            rows={6} className="mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3.5" placeholder="xxxxxxxxx" required ></textarea>
                    </div>

                </div>


                <div className="flex justify-end">

                    <button className=" mt-12 text-white  border-[#2357A5] bg-[#2357A5] border py-2  px-5 font-medium rounded-[10px] text-[15px]">บันทึกข้อมูล</button>
                </div>
            </form>

        </div>
    )
}
