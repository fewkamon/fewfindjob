"use client"

import React, { FormEvent, useState } from 'react'
import { Modal } from 'antd';
import fetchWithToken, { fetchUploadWithToken } from '@/utils/fetchUtils';
import toast from 'react-hot-toast';

type ServerProps = {
    id: string;
}


export const Modal2 = ({ id }: ServerProps) => {

    const [open, setOpen] = useState<boolean>(false)

    const [formData, setFormData] = useState<{
        id: string,
        email: string,
        file: File | null
    }>({
        id: id.toString(),
        email: '',
        file: null,
    });


    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                file: file,
            })
        }
    };


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formData.file) {
            const formData1 = new FormData();
            formData1.append('id', formData.id);
            formData1.append('email', formData.email);
            formData1.append('file', formData.file);
            try {
                const response = await fetchUploadWithToken("/job/jobseeker/recruit/file", {
                    method: "POST",
                    body: (formData1),
                }, 0)
                if (!response.ok) {
                    const test = await response.json()
                    throw new Error(test["message"]);
                }
                await toast.success("สมัครสำเร็จรอตอบกลับจากบริษัททางเมล")
                setOpen(false)
            } catch (err: any) {
                toast.error(err.message)
            }
        } else {
            toast.error("ท่านยังไม่ได้ใส่รูป")
        }
    }

    return (
        <>

            <Modal
                open={open}
                onCancel={handleCancel}
                title={"ส่งไฟล์ประวัติ"}
                centered
                style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }}
                footer={[
                ]}
            >
                <div>
                    <hr />
                    <div className="bg-white mt-8 rounded-lg ">
                        <div className="">
                            <form onSubmit={handleSubmit}>
                                <p className="text-[16px] mb-2">อีเมลล์</p>
                                <input
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="ระบุอีเมลของคุณ" />

                                <div className="mt-9">
                                    <label className="block">
                                        <span className="sr-only">Choose profile photo</span>
                                        <input onChange={handleFileChange} type="file" required className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-1 file:text-sm file:font-semibold file:bg-white file:border-[#2255A4] file:text-[#2255A4] hover:file:opacity-[0.8]" />
                                    </label>
                                </div>

                                <div className="flex items-center mt-9 mb-4">
                                    <input required id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className="ml-2 text-sm font-medium text-gray-600 ">ยอมรับ เงื่อนไขข้อตกลงการใช้บริการ และ นโยบายความเป็นส่วนตัว </label>
                                </div>

                                <button className="mt-5 w-full text-center transition-all duration-300 bg-[#2255A4] hover:opacity-[0.8] cursor-pointer py-2 rounded-lg px-3 text-white">
                                    ส่งไฟล์
                                </button>
                            </form>

                        </div>

                    </div>
                </div>
            </Modal>

            <div className="col-span-5">
                <div onClick={() => setOpen(true)} className="transition-all duration-300 bg-[#2255A4] hover:opacity-[0.8] cursor-pointer py-3 rounded-lg px-3 text-white">
                    สมัครไฟล์ประวัติ
                </div>
            </div>
            <div className="col-span-7 md:mt-3">
                <p>สมัครด้วยการส่งไฟล์เรซูเม่ ผลงาน หรืออื่นๆ</p>
            </div>
        </>
    )
}

export default function Modal1({ id }: ServerProps) {

    const [open, setOpen] = useState<boolean>(false)

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const recruit = async () => {
        try {
            const response = await fetchWithToken("/job/jobseeker/recruit/urgent", {
                method: "POST", body: JSON.stringify(
                    {
                        "id": ~~id,
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

            <Modal
                open={open}
                onCancel={handleCancel}
                title={"เลือกวิธีการสมัครงาน"}
                style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }}
                centered
                footer={[
                ]}
            >
                <div>

                    <div className="bg-white mt-8 rounded-lg p-2 ">
                        <div className="grid grid-cols-1 md:grid-cols-12  gap-4">
                            <div className="col-span-5">
                                <div onClick={recruit} className="transition-all duration-300 bg-[#2255A4] hover:opacity-[0.8] cursor-pointer py-3 rounded-lg px-3 text-white">
                                    สมัครด่วน
                                </div>
                            </div>
                            <div className="col-span-7 md:mt-3 place-items-center">
                                <p>สมัครด้วยประวัติที่ฝากกับ Findjob</p>
                            </div>
                            <Modal2 id={id} />
                        </div>

                    </div>
                </div>
            </Modal>

            <button type="submit" onClick={() => setOpen(true)} className="absolute left-[45%] text-white bg-[#2255A4] hover:bg-[#244E8F] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-20 py-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">สมัครงาน</button>
        </div>
    )
}
