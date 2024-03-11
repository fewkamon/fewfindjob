"use client"

import fetchWithToken from '@/utils/fetchUtils';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import toast from 'react-hot-toast';

export default function Page() {

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
            <div className="mt-12 flex items-center justify-center">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">

                    <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">เปลี่ยนรหัสผ่าน</h1>
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

                        <button type="submit" className="w-32 bg-[#2357A5] text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-4">เปลี่ยนรหัสผ่าน</button>
                    </form>

                </div>
            </div>

        </div>
    )
}
