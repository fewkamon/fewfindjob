"use client"

import React, { useState, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Login1 from '../../assets/login.png'
import { setTokenInCookie } from '@/utils/cookieUtils'
import fetchWithToken from '@/utils/fetchUtils'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { AppUseSelector, AppDispatch } from '@/store/Reducer';
import { fetchDataMe } from '@/store/membersSlice';
import { useRouter } from 'next/navigation'
import pushAfter3Seconds from '@/utils/cooldown';

import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Login() {
    const data = AppUseSelector((state) => state.member);
    const dispatch = useDispatch<AppDispatch>()
    const [tab, setTab] = useState<string>("หางาน")
    const router = useRouter()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });


    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('อีเมลที่ไม่ถูกต้อง')
                .required('กรุณากรอกอีเมล'),
            password: Yup.string()
                .min(6, 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 หลัก')
                .required('กรุณากรอกรหัสผ่าน'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetchWithToken("/auth/signin", {
                    method: 'POST',
                    body: JSON.stringify({ email: values.email, password: values.password }),
                }, 0)
                if (!response.ok) {
                    const test = await response.json()
                    console.log(test["message"]);

                    throw new Error(test["message"]);
                }
                const test = await response.json()
                setTokenInCookie(test.access_token)
                dispatch(fetchDataMe())
                router.push("/")
                await toast.success("เข้าสู่ระบบสำเร็จ")


            } catch (err: any) {
                toast.error(err.message)
            }
        },
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-x-6 gap-y-8">
                    <div className="col-span-5 hidden md:block">
                        <Image
                            src={Login1}
                            alt="My Image "
                            width={400}
                        ></Image>
                    </div>
                    <div className="col-span-7">
                        <form onSubmit={formik.handleSubmit}>

                            <div className="mt-9 md:mx-20">
                                <p className='text-[18px]'>อีเมลล์</p>
                                <input
                                    type="email"
                                    {...formik.getFieldProps('email')}
                                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="example@xxxx.xx"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                                )}
                            </div>

                            <div className="mt-6 md:mx-20">
                                <p className='text-[18px]'>รหัสผ่าน</p>

                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        {...formik.getFieldProps('password')}
                                        className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="xxxxxxxxx"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 mt-2 mr-2 text-sm p-1"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>


                                {formik.touched.password && formik.errors.password && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                                )}
                            </div>

                            <div className="mt-6 md:mx-20">
                                <button type="submit" className="bg-[#2255A4] text-[16px] px-8 text-white py-1 w-full rounded-md">เข้าสู่ระบบ</button>
                            </div>

                        </form>



                        <div className="mt-6 md:mx-20 float-right">
                            <span className="text-[16px] text-[#777777] py-1 w-full rounded-md">ยังบัญชีใช่ไหม?

                                <Link href="/register">
                                    <span className='ml-2 text-[#000000]'>กดที่นี่สิ</span>
                                </Link>

                            </span>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
