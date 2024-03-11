"use client"
import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation'
import getLocation from '@/utils/location';
import Image from 'next/image'
const BASE_URL = process.env.BACKEND_URL;

export default function Page({ data1 }: any) {
    const router = useRouter();

    const [data, setData] = useState<User[]>(data1)
    const [dataone, setDataone] = useState<User>()

    const [open, setOpen] = useState(false);
    const showModal = (record: any) => {
        setDataone(record)
        setOpen(true);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    useEffect(() => {
        setData(data1)
    }, [data1])


    const getLoca = (path: any) => {
        const test: any = getLocation(path)
        console.log(test);

        return `ตำบล${test[2].name_th}, อำเภอ${test[1].name_th}, จังหวัด${test[0].name_th}`
    }

    const vihecle = (test: any) => {
        return test.join(", ").replace("CAR", "รถยนต์").replace("MOTORCYCLE", "รถจักรยานยนต์").replace("TRUCK", "รถบรรทุก").replace("PICKUP_TRUCK", "รถกระบะ").replace("FORKLIFT", "รถฟอร์คลิฟท์")
    }



    interface Location {
        id: number;
        address: string | null;
        district: string | null;
        subdistrict: string | null;
        province: string | null;
        postalCode: string | null;
        jobseekerId: number;
        companyId: number | null;
    }

    interface Skill {
        id: number;
        th_typing: string | null;
        eng_typing: string | null;
        driving_ability: string[];
        private_vehicle: string[];
        other_special_skills: string | null;
        achievements: string[] | null;
        other_experience: string | null;
        references: string[] | null;
        jobseekerId: number;
    }

    interface JobSeeker {
        id: number;
        firstName: string | null;
        lastName: string | null;
        userId: number;
        dob: string | null;
        gender: string | null;
        phonenumber: string | null;
        image: string | null;
        skillId: number | null;
        location: Location;
        skill: Skill;
    }

    interface User {
        id: number;
        email: string;
        password: string;
        role: string;
        createdAt: string;
        updatedAt: string;
        jobseeker: JobSeeker;
    }


    const columns: ColumnsType<User> = [
        {
            title: 'อีเมล',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'ชื่อนามสกุล',
            key: 'name',
            dataIndex: 'name',

            render: (_, record) => (
                <Space size="middle">
                    {record.jobseeker.firstName}
                    {record.jobseeker.lastName}
                </Space>
            ),
        },
        {
            title: 'เบอร์โทรศัพท์',
            key: 'phonenumber',
            dataIndex: 'phonenumber',

            render: (_, record) => (
                <Space size="middle">
                    {record.jobseeker.phonenumber}
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => showModal(record)}>ดูรายละเอียดเพิ่มเติม</a>
                </Space>
            ),
        },

    ];


    return (
        <div>
            <Modal
                open={open}
                onCancel={handleCancel}
                width={1000}
                title={"ข้อมูลผู้ใช้"}
                style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }}
                footer={[]}
            >
                <p>

                    <div className="bg-white mt-4 rounded-lg p-2 ">
                        {dataone && (
                            <div className="border p-5 mt-3">
                                <div className="flex justify-between">
                                    <div className="">
                                        <p className='mb-4 text-[19px] text-[#2357A5] font-semibold'>ข้อมูลส่วนตัว</p>
                                        <div className="flex text-[16px] ">
                                            <div className="flex mr-5">
                                                <p className='text-gray-500 mr-3'>ชื่อ</p>
                                                <p>{(dataone?.jobseeker.firstName)}</p>
                                            </div>

                                            <div className="flex ml-5">
                                                <p className='text-gray-500 mr-3'>นามสกุล</p>
                                                <p>{(dataone?.jobseeker.lastName)}</p>
                                            </div>
                                        </div>

                                        <div className="flex text-[17px] mt-3 ">
                                            <div className="flex mr-5">
                                                <p className='text-gray-500 mr-3'>ที่อยู่</p>
                                                <p>{dataone?.jobseeker.location.address}, {dataone?.jobseeker.location ? "" : getLoca(dataone?.jobseeker.location)}</p>
                                            </div>
                                        </div>

                                        <div className="flex text-[17px] mt-3 ">
                                            <div className="flex mr-5">
                                                <p className='text-gray-500 mr-3'>อีเมล</p>
                                                <p>{(dataone?.email)}</p>
                                            </div>

                                            <div className="flex ml-5">
                                                <p className='text-gray-500 mr-3'>เบอร์</p>
                                                <p>{(dataone?.jobseeker.phonenumber)}</p>
                                            </div>
                                        </div>

                                        <div className="flex text-[17px] mt-3 ">
                                            <div className="flex mr-5">
                                                <p className='text-gray-500 mr-3'>วันเกิด</p>
                                                <p>{(dataone?.jobseeker.dob)}</p>
                                            </div>

                                            <div className="flex ml-5">
                                                <p className='text-gray-500 mr-3'>อายุ</p>
                                                <p>18 ปี</p>
                                            </div>
                                        </div>

                                        <div className="flex text-[17px] mt-3 ">
                                            <div className="flex mr-5">
                                                <p className='text-gray-500 mr-3'>เพศ</p>
                                                <p>{(dataone?.jobseeker.gender === "MALE" ? "ชาย" : dataone?.jobseeker.gender === "FEMALE" ? "หญิง" : "อื่นๆ")}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="w-[110px] h-[140px] mx-auto rounded-md border">
                                            {dataone?.jobseeker.image ? (
                                                <Image

                                                    src={`${BASE_URL}/file/${dataone?.jobseeker.image}`}
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
                                                <p>{dataone?.jobseeker.skill.th_typing} คำ/นาที</p>
                                            </div>

                                            <div className="flex ml-5">
                                                <p className='text-gray-500 mr-3'>พิมพ์ดีดอังกฤษ</p>
                                                <p>{dataone?.jobseeker.skill.eng_typing} คำ/นาที</p>
                                            </div>
                                        </div>

                                        <div className="flex text-[17px] mt-3 ">
                                            <div className="flex mr-5">
                                                <p className='text-gray-500 mr-3'>ความสามารถในการขับขี่</p>
                                                <p>{vihecle(dataone?.jobseeker.skill.driving_ability)}</p>
                                            </div>
                                        </div>

                                        <div className="flex text-[17px] mt-3 ">
                                            <div className="flex mr-5">
                                                <p className='text-gray-500 mr-3'>มีพาหนะส่วนตัว</p>
                                                <p>{vihecle(dataone?.jobseeker.skill.private_vehicle)}</p>
                                            </div>
                                        </div>

                                        <div className="flex text-[17px] mt-3 ">
                                            <div className="flex mr-5">
                                                <p className='text-gray-500 mr-3'>ความสามารถพิเศษอื่นๆ *</p>
                                                <p>{dataone?.jobseeker.skill.other_special_skills}</p>
                                            </div>
                                        </div>

                                        <div className="flex text-[17px] mt-3 ">
                                            <div className="flex mr-5">
                                                <p className='text-gray-500 mr-3'>โครงการ ผลงานเกียรติประวัติและประสบการณ์อื่นๆ *</p>
                                                <p>{dataone?.jobseeker.skill.achievements}</p>
                                            </div>
                                        </div>

                                        <div className="flex text-[17px] mt-3 ">
                                            <div className="flex mr-5">
                                                <p className='text-gray-500 mr-3'>บุคคลอ้างอิง *</p>
                                                <p>{dataone?.jobseeker.skill.references}</p>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        )}


                    </div>
                </p>
            </Modal>
            <Table
                style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }}
                scroll={{ x: '992px' }}
                columns={columns}
                rowKey='id'
                dataSource={data}
            />

        </div>
    )
}
