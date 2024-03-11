"use client"

import React, { FormEvent, useState } from 'react'
import provincesData from '@/assets/thai-province-data/thai_provinces.json'
import amphuresData from '@/assets/thai-province-data/thai_amphures.json'
import tambonsData from '@/assets/thai-province-data/thai_tambons.json'
import CheckboxGroup from '@/components/CheckboxGroup'
import { useDispatch } from 'react-redux'
import { AppUseSelector, AppDispatch } from '@/store/Reducer';
import fetchWithToken, { fetchUploadWithToken } from '@/utils/fetchUtils'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { fetchDataMe } from '@/store/membersSlice';
import Image from 'next/image';

type PageProps = {
    params: {
        slug: number
    }
}

export default function Steppers({ params }: PageProps) {

    const data = AppUseSelector((state) => state.member);
    const [sss, setSss] = useState(data.data)
    const dispatch = useDispatch<AppDispatch>()

    const router = useRouter()


    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    if (~~params.slug === 1) {

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

                router.push("/account/steppers/2")
                await toast.success("บันทึกข้อมูลสำเร็จ")


            } catch (err: any) {
                toast.error(err.message)
            }
        }

        return (
            <main className='mt-12'>
                <div className="flex flex-col justify-end items-center">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-8 mt-6 md:mx-9 ">
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

                        <div className="flex justify-center">

                            <button className=" mt-20 text-white  border-[#2357A5] bg-[#2357A5] border py-3 shadow px-8 font-medium rounded-[10px] shadow-blue-500/50">บันทึกข้อมูล</button>
                        </div>
                    </form>
                </div>

            </main>
        )
    } else if (~~params.slug === 2) {
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

                router.push("/account/steppers/3")
                await toast.success("บันทึกข้อมูลสำเร็จ")


            } catch (err: any) {
                toast.error(err.message)
            }

        }
        return (
            <main className='mt-12'>
                <div className="flex flex-col justify-end items-center">

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-12 gap-y-8 mt-6 md:mx-9 ">
                            <div className="col-span-1 md:col-span-12">
                                <span className='text-[#535353]'>ที่อยู่ *</span>
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

                            <div className="col-span-6">
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


                            <div className="col-span-6">
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



                            <div className="col-span-6">
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


                            <div className="col-span-6">
                                <span className='text-[#535353]'>รหัสไปรษณีย์ *</span>
                                <input id="first_name" readOnly value={zipcode >= 0 ? tambonsData.RECORDS[zipcode].zip_code : 0} className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3.5" placeholder="xxxxxxxxx" required />
                            </div>
                        </div>


                        <div className="flex justify-center">

                            <button className=" mt-20 text-white  border-[#2357A5] bg-[#2357A5] border py-3 shadow px-8 font-medium rounded-[10px] shadow-blue-500/50">บันทึกข้อมูล</button>
                        </div>
                    </form>
                </div>
            </main>
        )
    } else if (~~params.slug === 3) {


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
                router.push("/account/steppers/4")
                await toast.success("บันทึกข้อมูลสำเร็จ")
            } catch (err: any) {
                toast.error(err.message)
            }
        }

        return (
            <main className='mt-12'>
                <div className="flex flex-col justify-end items-center">

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-12 gap-y-8 mt-6 md:mx-9 ">
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


                            <div className="col-span-12">
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

                            <div className="col-span-12">
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

                            <div className="col-span-12">
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


                        <div className="flex justify-center">

                            <button className=" mt-20 text-white  border-[#2357A5] bg-[#2357A5] border py-3 shadow px-8 font-medium rounded-[10px] shadow-blue-500/50">บันทึกข้อมูล</button>
                        </div>
                    </form>
                </div>

            </main>
        )
    } else if (~~params.slug === 4) {

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

                    router.push("/account")
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
            <main className='mt-12'>
                <div className="flex flex-col justify-end items-center">

                    <form onSubmit={handleSubmit}>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-8 mt-6 md:mx-9 ">
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

                        <div className="flex justify-center">


                            <button className=" mt-20 text-white border-[#2357A5] bg-[#2357A5] border py-3 shadow px-8 font-medium rounded-[10px] shadow-blue-500/50">บันทึกข้อมูล</button>
                        </div>
                    </form>
                </div>

            </main>
        )
    }

}
