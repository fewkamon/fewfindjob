"use client"
import provincesData from '@/assets/thai-province-data/thai_provinces.json'
import amphuresData from '@/assets/thai-province-data/thai_amphures.json'
import tambonsData from '@/assets/thai-province-data/thai_tambons.json'
import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import fetchWithToken from '@/utils/fetchUtils';
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import getLocation from '@/utils/location'
export default function Page() {
    const router = useRouter();

    const [data, setData] = useState<Company[]>([])
    const [dataone, setDataone] = useState<Company>()

    const [location, setLocation] = useState<{
        province?: string;
        amphures?: string;
        tambons?: string;
        zip_code?: number;
    }>()


    const [open, setOpen] = useState(false);
    const showModal = (record: any) => {
        setDataone(record)
        const province = provincesData.RECORDS.find((amphure) => amphure.id === parseInt(record?.company.location.province));
        const amphures = amphuresData.RECORDS.find((amphure) => amphure.id === parseInt(record?.company.location.district));
        const tambons = tambonsData.RECORDS.find((tambon) => tambon.id === parseInt(record?.company.location.subdistrict));
        setLocation({ province: province?.name_th, amphures: amphures?.name_th, tambons: tambons?.name_th, zip_code: tambons?.zip_code })
        setOpen(true);
    };
    const handleOk = async (status: string) => {
        try {
            const response = await fetchWithToken(`/admin/company/${dataone?.id}/${status}`, { method: "PATCH" }, 0)
            if (!response.ok) {
                const test = await response.json()
                throw new Error(test["message"]);
            }
            fetchthis()

            await setOpen(false)

            await toast.success("เปลี่ยนสถานะเรียบร้อย")
        } catch (err: any) {
            toast.error(err.message)
        }
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const getLoca = (path: any) => {
        const test: any = getLocation(path)
        return `ตำบล${test[2].name_th}, อำเภอ${test[1].name_th}, จังหวัด${test[0].name_th}`
    }

    useEffect(() => {
        fetchthis()
    }, [])

    const fetchthis = async () => {
        const response = await fetchWithToken("/admin/company", {
            method: 'GET',
        }, 60)
        setData(await response.json())
    }

    interface Company {
        id: number;
        email: string;
        password: string;
        role: string;
        createdAt: string;
        updatedAt: string;
        company: {
            id: number;
            userId: number;
            phonenumber: string;
            companyname: string;
            description: string;
            name: string;
            status: string;
            location: {
                id: number;
                address: string;
                district: number | null;
                subdistrict: number | null;
                province: number | null;
                postalCode: number | null;
                jobseekerId: number | null;
                companyId: number;
            };
        };
    }

    const columns: ColumnsType<Company> = [
        {
            title: 'อีเมล',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'ชื่อบริษัท',
            key: 'companyname',
            dataIndex: 'companyname',

            render: (_, record) => (
                <Space size="middle">
                    {record.company.companyname}
                </Space>
            ),
        },
        {
            title: 'เบอร์โทรศัพท์',
            key: 'companyname',
            dataIndex: 'companyname',

            render: (_, record) => (
                <Space size="middle">
                    {record.company.phonenumber}
                </Space>
            ),
        },
        {
            title: 'สถานะ',
            key: 'status',
            dataIndex: 'status',

            render: (_, record) => (
                <Space size="middle">
                    {record.company.status}
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
            <p className='text-[25px]  font-semibold'>ตรวจสอบบริษัท</p>
            <Modal
                open={open}
                onCancel={handleCancel}
                width={1000}
                title={"ข้อมูลบริษัท"}
                style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }}
                footer={[
                    <Button key="back" style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }} onClick={() => handleOk("APPROVE")}>
                        อนุมัติ
                    </Button>,
                    <Button key="submit" style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }} onClick={() => handleOk("DISAPPROVAL")}>
                        ไม่อนุมัติ
                    </Button>,
                ]}
            >
                <p>

                    <div className="bg-white mt-4 rounded-lg p-2 ">
                        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-12 gap-y-8 mt-6 mb-6 md:mx-9 ">

                            <div className="col-span-6">
                                <p className=''>ชื่อบริษัท</p>
                                <span>{dataone?.company.companyname}</span>
                            </div>

                            <div className="col-span-6">
                                <p className=''>เบอร์โทรติดต่อ</p>
                                <span>{dataone?.company.phonenumber}</span>
                            </div>


                            <div className="col-span-6">
                                <p className=''>อีเมล</p>
                                <span>{dataone?.email}</span>
                            </div>

                            <div className="md:col-span-12">
                                <p className='text-[#535353]'>ที่อยู่ *</p>
                                <span>{dataone?.company.location.address}</span>
                                <span> {dataone?.company.location ? getLoca(dataone?.company.location) : ""}</span>
                                <span> {location?.zip_code?.toString()}</span>
                            </div>
                        </div>
                    </div>
                </p>
            </Modal>
            <div className="bg-white mt-4 rounded-lg p-5 py-9">
                <Table
                    style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }}
                    scroll={{ x: '992px' }}
                    columns={columns}
                    rowKey='id'
                    dataSource={data}
                />

            </div>
        </div>
    )
}
