"use client"
import { AppDispatch, AppUseSelector } from '@/store/Reducer';
import fetchWithToken, { fetchUploadWithToken } from '@/utils/fetchUtils';
import provincesData from '@/assets/thai-province-data/thai_provinces.json'
import amphuresData from '@/assets/thai-province-data/thai_amphures.json'
import tambonsData from '@/assets/thai-province-data/thai_tambons.json'
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import CheckboxGroup from '@/components/CheckboxGroup';
import { useDispatch } from 'react-redux';
import { fetchDataMe } from '@/store/membersSlice';
import Image from 'next/image';

export default function Page() {
    const data = AppUseSelector((state) => state.member);
    const router = useRouter()
    const [sss, setSss] = useState(data.data)
    const dispatch = useDispatch<AppDispatch>()

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            try {
                const response = await fetchUploadWithToken("/jobseeker/info/4", {
                    method: "PATCH",
                    body: formData,
                    headers: {
                    },
                }, 0)
                if (!response.ok) {
                    const test = await response.json()
                    throw new Error(test["message"]);
                }

                dispatch(fetchDataMe())

                await toast.success("บันทึกข้อมูลสำเร็จ")
            } catch (err: any) {
                toast.error(err.message)
            }
        } else {
            toast.error("ท่านยังไม่ได้ใส่รูป")
        }
    }

    return (
        <div>

            <div className="font-semibold text-[20px]">
                รูปถ่าย
            </div>
            <div className="font-medium mt-2 text-[15px] text-gray-500 mb-6">
                ข้อมูลส่วนบุคคลที่เกี่ยวกับผู้ใช้
            </div>

            <hr />

            <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-8 mt-6 text-[14px] ">
                    <div className="col-span-6">
                        <span className='text-[#535353]'>กรุณาใช้รูปถ่ายหน้าตรงขนาดประมาณ 140 x 110 pixels</span>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-8 mt-6 ">
                            <div className="col-span-5 md:col-span-4">
                                <div className="w-[110px] h-[140px] mx-auto rounded-md border">
                                    {previewUrl ? (
                                        <Image
                                            src={previewUrl}
                                            alt=""
                                            width={110}
                                            height={140}
                                        >
                                        </Image>
                                    ) : (<></>)}

                                </div>
                            </div>
                            <div className="col-span-5">

                                <div className="text-red-400 mt-5 ">
                                    อัพโหลดได้เฉพาะไฟล์รูปภาพ ประเภท jpg png gif และมีขนาดไม่เกิน 3 Mb
                                </div>
                            </div>
                        </div>
                        <div className="mt-9">
                            <label htmlFor="file-input" className="sr-only">Choose file</label>
                            <input type="file" onChange={handleFileChange} name="file-input" id="file-input" className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400" />
                        </div>

                    </div>
                    <div className="col-span-6">
                        <div className="bg-[#F5F5F5] p-7 rounded-lg">

                            <p className="text-[#303030]">
                                ขั้นตอนการอัพโหลดรูป<br />
                                1. กดที่ปุ่ม Choose file แล้วเลือกรูปถ่ายที่ต้องการ<br />
                                2. กดที่ปุ่ม Upload<br />
                                3. รูปถ่ายที่ท่านเลือก จะปรากฎขึ้นที่กรอบสี่เหลี่ยมทางด้านซ้าย<br />
                                4. หากต้องการเปลี่ยนรูป กรุณากดปุ่ม Choose file แล้วทำตามขั้นตอนเดิม
                            </p>
                        </div>
                    </div>

                </div>
                <div className="flex justify-end">

                    <button className=" mt-12 text-white  border-[#2357A5] bg-[#2357A5] border py-2  px-5 font-medium rounded-[10px] text-[15px]">บันทึกข้อมูล</button>
                </div>
            </form>

        </div>
    )
}
