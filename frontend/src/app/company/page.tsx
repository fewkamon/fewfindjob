"use client"

import React, { FormEvent, useState } from 'react'
import provincesData from '@/assets/thai-province-data/thai_provinces.json'
import amphuresData from '@/assets/thai-province-data/thai_amphures.json'
import tambonsData from '@/assets/thai-province-data/thai_tambons.json'
import { AppUseSelector, AppDispatch } from '@/store/Reducer';
import fetchWithToken, { fetchUploadWithToken } from '@/utils/fetchUtils'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataMe } from '@/store/membersSlice'
import Image from 'next/image';
import { Modal, Button, Descriptions } from 'antd';
import MyListBox from '@/components/Listbox'

export default function Page() {

    const data = AppUseSelector((state) => state.member);
    const [sss, setSss] = useState(data.data)
    const dispatch = useDispatch<AppDispatch>()
    const [open, setOpen] = useState<boolean>(false)

    const [inBul, setInbul] = useState<string>("")

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const provinces = provincesData.RECORDS;
    const amphures = amphuresData.RECORDS.filter((amphure) => amphure.province_id === parseInt(sss.company.location.province));
    const tambons = tambonsData.RECORDS.filter((tambon) => tambon.amphure_id === parseInt(sss.company.location.district));
    const zipcode = tambonsData.RECORDS.findIndex(item => item.id === ~~sss.company.location.subdistrict);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {

            setSss((prevData: any) => ({
                ...prevData,
                company: {
                    ...prevData.company,
                    location: {
                        ...prevData.company.location,
                        postalCode: zipcode
                    }
                }
            }));

            const response = await fetchWithToken("/company/info", {
                method: 'PATCH',
                body: JSON.stringify(sss.company),
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
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

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

    const handleOk = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            try {
                const response = await fetchUploadWithToken("/company/logo", {
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
                setOpen(false)
                await toast.success("บันทึกข้อมูลสำเร็จ")
            } catch (err: any) {
                toast.error(err.message)
            }
        } else {
            toast.error("ท่านยังไม่ได้ใส่รูป")
        }
    };

    const addData = async () => {
        setSss((prevData: any) => ({
            ...prevData,
            company: {
                ...prevData.company,
                benefits: [
                    ...prevData.company.benefits,
                    inBul
                ]
            }
        }));
    }

    const DeleteListbox = async (i: number) => {
        setSss((prevData: any) => ({
            ...prevData,
            company: {
                ...prevData.company,
                benefits: prevData.company.benefits.filter((_: any, index: number) => index !== i),
            }
        }));

    }

    return (
        <div className=''>

            <Modal
                open={open}
                onCancel={handleCancel}
                width={500}
                title={"ข้อมูลโพสต์"}
                style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }}
                footer={[
                    <Button key="back" style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }} onClick={() => handleOk()}>
                        บันทึก
                    </Button>
                ]}
            >
                <p>

                    <span className='text-[#535353]'>กรุณาใช้รูปโลโก้บริษัท ขนาดแนะนำ 250 x 250</span>
                    <div className="flex justify-center">
                        {previewUrl ? (<div className="w-[250px] h-[250px] mt-7 rounded-md border">

                            <Image
                                src={previewUrl}
                                alt=""
                                width={250}
                                height={250}
                            >
                            </Image>

                        </div>
                        ) : (<></>)}

                    </div>

                    <div className="mt-9">
                        <label htmlFor="file-input" className="sr-only">Choose file</label>
                        <input type="file" onChange={handleFileChange} name="file-input" id="file-input" className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400" />
                    </div>

                </p>
            </Modal>

            <form onSubmit={handleSubmit}>

                <div className="flex justify-between items-end">

                    <p className='text-[25px]  font-semibold'>ข้อมูลบริษัท</p>
                    <div className="flex">
                        <div onClick={() => setOpen(true)} className="text-[#2357A5] border-[#2357A5] bg-white border mr-3 py-2 shadow px-4 font-medium rounded-[10px] shadow-blue-500/50 cursor-pointer	">เปลี่ยนรูป</div>
                        <button className="text-white border-[#2357A5] bg-[#2357A5] border py-2 shadow px-4 font-medium rounded-[10px] shadow-blue-500/50">บันทึกข้อมูล</button>
                    </div>
                </div>
                <div className="bg-white mt-4 rounded-lg p-5 py-9">
                    <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-12 gap-y-8 mt-6 mb-6 md:mx-9 ">

                        <div className="col-span-6">
                            <p className='text-[18px]'>ชื่อบริษัท</p>
                            <input
                                type="text"
                                id="first_name"
                                value={sss.company.companyname}
                                onChange={(e) => {
                                    setSss((prevData: any) => ({
                                        ...prevData,
                                        company: {
                                            ...prevData.company,
                                            companyname: e.target.value
                                        }
                                    }));
                                }}
                                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="example@xxxx.xx"
                                required
                            />
                        </div>

                        <div className="col-span-6">
                            <p className='text-[18px]'>เบอร์โทรติดต่อ</p>
                            <input
                                type="text"
                                id="first_name"
                                value={sss.company.phonenumber}
                                onChange={(e) => {
                                    setSss((prevData: any) => ({
                                        ...prevData,
                                        company: {
                                            ...prevData.company,
                                            phonenumber: e.target.value
                                        }
                                    }));
                                }}
                                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="example@xxxx.xx"
                                required
                            />
                        </div>


                        <div className="col-span-6">
                            <p className='text-[18px]'>อีเมล</p>
                            <input
                                type="text"
                                id="first_name"
                                value={sss.email}
                                readOnly
                                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="example@xxxx.xx"
                                required
                            />
                        </div>

                        <div className="md:col-span-12">
                            <span className='text-[#535353]'>รายละเอียดบริษัท *</span>
                            <textarea
                                id="first_name"
                                rows={6}
                                className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3.5"
                                placeholder="xxxxxxxxx"
                                required
                                value={sss.company.description}
                                onChange={(e) => {
                                    setSss((prevData: any) => ({
                                        ...prevData,
                                        company: {
                                            ...prevData.company,
                                            description: e.target.value
                                        }
                                    }));
                                }}
                            ></textarea>
                        </div>

                        <div className="md:col-span-6">
                            <span className='text-[#535353]'>สวัสดิการ *</span>
                            <div className="py-5 px-3">
                                {sss.company.benefits.map((item: any, i: number) => (
                                    <div className="flex justify-between px-2 py-2 hover:bg-blue-100 hover:rounded" key={i}>
                                        <p className="flex text-gray-700" key={i}>
                                            <svg className="h2 w-2 text-gray-500 mx-2" viewBox="0 0 8 8" fill="currentColor">
                                                <circle cx="4" cy="4" r="3" />
                                            </svg>
                                            {item}
                                        </p>
                                        <p onClick={() => DeleteListbox(i)} className="cursor-pointer text-gray-500 font-thin">Delete</p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-gray-100 flex items-center px-5 py-4">
                                <input type="text" value={inBul} onChange={(e: any) => setInbul(e.target.value)} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex: ประกันสุขภาพ" />
                                <div onClick={() => addData()} className="cursor-pointer ml-3 bg-[#2357A5] py-1 px-4 rounded text-white">เพิ่ม</div>
                                <div onClick={() => setInbul("")} className="cursor-pointer py-2 px-4 rounded text-gray-600">ยกเลิก</div>
                            </div>
                        </div>

                        <div className="md:col-span-12">
                            <span className='text-[#535353]'>ที่อยู่ *</span>
                            <textarea
                                id="first_name"
                                rows={6}
                                className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3.5"
                                placeholder="xxxxxxxxx"
                                required
                                value={sss.company.location.address}
                                onChange={(e) => {
                                    setSss((prevData: any) => ({
                                        ...prevData,
                                        company: {
                                            ...prevData.company,
                                            location: {
                                                ...prevData.company.location,
                                                address: e.target.value
                                            }
                                        }
                                    }));
                                }}
                            ></textarea>
                        </div>

                        <div className="col-span-6">
                            <span className='text-[#535353]'>จังหวัด *</span>

                            <select
                                id="province"
                                value={sss.company.location.province}
                                className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3.5"
                                onChange={(e) => {
                                    setSss((prevData: any) => ({
                                        ...prevData,
                                        company: {
                                            ...prevData.company,
                                            location: {
                                                ...prevData.company.location,
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


                        <div className="col-span-6">
                            <span className='text-[#535353]'>อำเภอ *</span>
                            <select
                                id="amphure"
                                value={sss.company.location.district}
                                onChange={(e) => {
                                    setSss((prevData: any) => ({
                                        ...prevData,
                                        company: {
                                            ...prevData.company,
                                            location: {
                                                ...prevData.company.location,
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



                        <div className="col-span-6">
                            <span className='text-[#535353]'>ตำบล *</span>

                            <select
                                id="tambon"
                                value={sss.company.location.subdistrict}
                                onChange={(e) => {
                                    setSss((prevData: any) => ({
                                        ...prevData,
                                        company: {
                                            ...prevData.company,
                                            location: {
                                                ...prevData.company.location,
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


                        <div className="col-span-6">
                            <span className='text-[#535353]'>รหัสไปรษณีย์ *</span>
                            <input id="first_name" readOnly value={zipcode >= 0 ? tambonsData.RECORDS[zipcode].zip_code : 0} className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3.5" placeholder="xxxxxxxxx" required />
                        </div>
                    </div>
                </div>
            </form>

        </div >
    )
}
