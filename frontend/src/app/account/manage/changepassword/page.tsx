"use client"
import { AppUseSelector } from '@/store/Reducer';
import fetchWithToken from '@/utils/fetchUtils';
import provincesData from '@/assets/thai-province-data/thai_provinces.json'
import amphuresData from '@/assets/thai-province-data/thai_amphures.json'
import tambonsData from '@/assets/thai-province-data/thai_tambons.json'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import CheckboxGroup from '@/components/CheckboxGroup';

export default function Page() {
    const data = AppUseSelector((state) => state.member);
    const router = useRouter()
    const [sss, setSss] = useState(data.data)

    const [formData, setFormData] = useState({
        passwordold: '',
        passwordnew: '',
        passwordnewconfirm: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetchWithToken("/auth/changepassword", {
                method: 'PATCH',
                body: JSON.stringify(formData),
            }, 0)
            if (!response.ok) {
                const test = await response.json()
                throw new Error(test["message"]);
            }
            setFormData({
                passwordold: '',
                passwordnew: '',
                passwordnewconfirm: '',
            })
            await toast.success("เปลี่ยนรหัสผ่านสำเร็จ")
        } catch (err: any) {
            toast.error(err.message)
        }
    };




    return (
        <div>

            <div className="font-semibold text-[20px]">
                เปลี่ยนรหัสผ่าน
            </div>
            <div className="font-medium mt-2 text-[15px] text-gray-500 mb-6">
                ข้อมูลส่วนบุคคลที่เกี่ยวกับผู้ใช้
            </div>

            <hr />
            <form onSubmit={handleSubmit} className='mt-5'>
                <div className="mb-6">
                    <label className="block mb-2 text-sm text-gray-600">รหัสผ่านเก่า</label>
                    <input type="password" name="passwordold" value={formData.passwordold} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-sm text-gray-600">รหัสผ่านใหม่</label>
                    <input type="password" name="passwordnew" value={formData.passwordnew} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-sm text-gray-600">ยืนยันรหัสผ่านใหม่</label>
                    <input type="password" name="passwordnewconfirm" value={formData.passwordnewconfirm} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                </div>

                <button type="submit" className=" text-white  border-[#2357A5] bg-[#2357A5] border py-2  px-5 font-medium rounded-[10px] text-[15px]">เปลี่ยนรหัสผ่าน</button>
            </form>


        </div>
    )
}
