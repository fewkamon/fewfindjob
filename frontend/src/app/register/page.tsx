"use client"

import React, { ChangeEvent, FormEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Register1 from '../../assets/register.png'
import fetchWithToken from '@/utils/fetchUtils';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Register() {

    const [tab, setTab] = useState<string>("หางาน")
    const router = useRouter()

    const [formData1, setFormData1] = useState({
        email: '',
        password: '',
        confirm: '',
        role: 'JOB_SEEKER',
    });

    const [formData2, setFormData2] = useState({
        email: '',
        password: '',
        confirm: '',
        role: 'COMPANY',
        phonenumber: '',
        companyname: '',
        description: '',
        name: '',
    });


    const [showPassword1, setShowPassword1] = useState(false);

    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };

    const [showPassword2, setShowPassword2] = useState(false);

    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };


    const handleSubmit1 = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetchWithToken(`${tab === "หางาน" ? "/auth/signup/jobseeker" : "/auth/signup/company"}`, {
                method: 'POST',
                body: JSON.stringify(tab === "หางาน" ? formData1 : formData2),
            }, 0)
            if (!response.ok) {
                const test = await response.json()
                throw new Error(test["message"]);
            }

            router.push("/login")
            await toast.success("สมัครสมาชิกเรียบร้อย")

        } catch (err: any) {
            toast.error(err.message)
        }
    };

    const handleChange1 = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData1({
            ...formData1,
            [event.target.name]: event.target.value,
        });
    };

    const handleChange2 = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData2({
            ...formData2,
            [event.target.name]: event.target.value,
        });
    };

    const formik1 = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('อีเมลที่ไม่ถูกต้อง')
                .required('กรุณากรอกอีเมล'),
            password: Yup.string()
                .min(6, 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 หลัก')
                .required('กรุณากรอกรหัสผ่าน')
                .matches(
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                    'รหัสผ่านควรมีตัวพิมพ์ใหญ่ 1 ตัว ตัวพิมพ์เล็ก พร้อมด้วยตัวเลขและอักขระพิเศษ'
                ),
            confirm: Yup.string()
                .oneOf([Yup.ref('password')], 'รหัสผ่านไม่ตรงกัน')
                .required('กรุณากรอกยืนยันรหัสผ่าน'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetchWithToken("/auth/signup/jobseeker", {
                    method: 'POST',
                    body: JSON.stringify({ email: values.email, password: values.password, confirm: values.confirm, role: "JOB_SEEKER" }),
                }, 0)
                if (!response.ok) {
                    const test = await response.json()
                    throw new Error(test["message"]);
                }
                router.push("/login")
                await toast.success("สมัครสมาชิกเรียบร้อย")
            } catch (err: any) {
                toast.error(err.message)
            }
        },
    });


    const formik2 = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm: '',
            phonenumber: '',
            companyname: '',
            description: '',
            name: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('อีเมลที่ไม่ถูกต้อง')
                .required('กรุณากรอกอีเมล'),
            password: Yup.string()
                .min(6, 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 หลัก')
                .required('กรุณากรอกรหัสผ่าน')
                .matches(
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                    'รหัสผ่านควรมีตัวพิมพ์ใหญ่ 1 ตัว ตัวพิมพ์เล็ก พร้อมด้วยตัวเลขและอักขระพิเศษ'
                ),
            confirm: Yup.string()
                .oneOf([Yup.ref('password')], 'รหัสผ่านไม่ตรงกัน')
                .required('กรุณากรอกยืนยันรหัสผ่าน'),
            phonenumber: Yup.string()
                .required('กรุณากรอกหมายเลขโทรศัพท์')
                .matches(
                    /^0[1-9][0-9]{8}$/,
                    'ท่านกรอกหมายเลขโทรศัพท์ไม่ถูกต้อง'
                ),
            companyname: Yup.string()
                .required('กรุณากรอกชื่อบริษัท')
                .min(6, 'ชื่อบริษัทควรมีความยาว 4 ตัว')
                .max(50, 'ชื่อบริษัทควรมีความยาวไม่เกิน 50 ตัว'),
            description: Yup.string()
                .required('กรุณากรอกลักษณะธุรกิจ')
                .min(10, 'ลักษณะธุรกิจควรมีความยาวอย่างน้อย 10 ตัวอักษร'),
            name: Yup.string()
                .required('กรุณากรอกชื่อผู้ติดต่อ')


        }),
        onSubmit: async (values) => {
            try {
                const response = await fetchWithToken("/auth/signup/company", {
                    method: 'POST',
                    body: JSON.stringify({ email: values.email, password: values.password, confirm: values.confirm, phonenumber: values.phonenumber, companyname: values.companyname, description: values.description, name: values.name, role: "COMPANY" }),
                }, 0)
                if (!response.ok) {
                    const test = await response.json()
                    throw new Error(test["message"]);
                }
                router.push("/login")
                await toast.success("สมัครสมาชิกเรียบร้อย")
            } catch (err: any) {
                toast.error(err.message)
            }
        },
    });



    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-x-6 gap-y-8">
                    <div className="col-span-5 hidden md:block">
                        <Image
                            src={Register1}
                            alt="My Image "
                            width={400}
                        ></Image>
                    </div>
                    <div className="col-span-7">
                        <div className="flex justify-center">
                            <button onClick={() => setTab("หางาน")} className={`font-semibold text-[20px] mx-6 ${tab === "หางาน" ? 'text-[#2357A5] underline' : 'text-[#000000]'}`}>หางาน</button>
                            <p className="w-[1px] border-[1px] bg-[#B6B6B6] mx-3"></p>
                            <button onClick={() => setTab("หาคน")} className={` font-semibold text-[20px] mx-6 ${tab === "หาคน" ? 'text-[#2357A5] underline' : 'text-[#000000]'}`}>หาคน</button>
                        </div>
                        {tab === "หางาน" ? (
                            <form onSubmit={formik1.handleSubmit}>


                                <div>
                                    <div className="mt-9 md:mx-20">
                                        <p className='text-[18px]'>อีเมลล์</p>

                                        <input type="email" {...formik1.getFieldProps('email')} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@xxxx.xx" required />
                                        {formik1.touched.email && formik1.errors.email && (
                                            <div className="text-red-500 text-sm mt-1">{formik1.errors.email}</div>
                                        )}
                                    </div>

                                    <div className="mt-6 md:mx-20">
                                        <p className='text-[18px]'>รหัสผ่าน</p>
                                        <div className="relative">
                                            <input type={showPassword1 ? 'text' : 'password'}
                                                {...formik1.getFieldProps('password')} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xxxxxxxxx" required />
                                            <button
                                                type="button"
                                                className="absolute top-0 right-0 mt-2 mr-2 text-sm p-1"
                                                onClick={togglePasswordVisibility1}
                                            >
                                                {showPassword1 ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                        {formik1.touched.password && formik1.errors.password && (
                                            <div className="text-red-500 text-sm mt-1">{formik1.errors.password}</div>
                                        )}
                                    </div>

                                    <div className="mt-6 md:mx-20">
                                        <p className='text-[18px]'>ยืนยันรหัสผ่าน</p>

                                        <div className="relative">
                                            <input type={showPassword2 ? 'text' : 'password'}
                                                {...formik1.getFieldProps('confirm')} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xxxxxxxxx" required />
                                            <button
                                                type="button"
                                                className="absolute top-0 right-0 mt-2 mr-2 text-sm p-1"
                                                onClick={togglePasswordVisibility2}
                                            >
                                                {showPassword2 ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                        {formik1.touched.confirm && formik1.errors.confirm && (
                                            <div className="text-red-500 text-sm mt-1">{formik1.errors.confirm}</div>
                                        )}
                                    </div>
                                </div>


                                <div className="mt-6 md:mx-20">
                                    <button type='submit' className="bg-[#2255A4] text-[16px] px-8 text-white py-1 w-full rounded-md">สมัครสมาชิก</button>
                                </div>

                            </form>
                        ) : (
                            <form onSubmit={formik2.handleSubmit}>
                                <div>
                                    <div className="mt-9 md:mx-20">
                                        <p className='text-[18px]'>อีเมลล์</p>
                                        <input type="email" {...formik2.getFieldProps('email')} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@xxxx.xx" required />
                                        {formik2.touched.email && formik2.errors.email && (
                                            <div className="text-red-500 text-sm mt-1">{formik2.errors.email}</div>
                                        )}
                                    </div>

                                    <div className="mt-6 md:mx-20">
                                        <p className='text-[18px]'>รหัสผ่าน</p>
                                        <div className="relative">
                                            <input type={showPassword1 ? 'text' : 'password'}
                                                {...formik2.getFieldProps('password')} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xxxxxxxxx" required />
                                            <button
                                                type="button"
                                                className="absolute top-0 right-0 mt-2 mr-2 text-sm p-1"
                                                onClick={togglePasswordVisibility1}
                                            >
                                                {showPassword1 ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                        {formik2.touched.password && formik2.errors.password && (
                                            <div className="text-red-500 text-sm mt-1">{formik2.errors.password}</div>
                                        )}
                                    </div>

                                    <div className="mt-6 md:mx-20">
                                        <p className='text-[18px]'>ยืนยันรหัสผ่าน</p>

                                        <div className="relative">
                                            <input type={showPassword2 ? 'text' : 'password'}
                                                {...formik2.getFieldProps('confirm')} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xxxxxxxxx" required />
                                            <button
                                                type="button"
                                                className="absolute top-0 right-0 mt-2 mr-2 text-sm p-1"
                                                onClick={togglePasswordVisibility2}
                                            >
                                                {showPassword2 ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                        {formik2.touched.confirm && formik2.errors.confirm && (
                                            <div className="text-red-500 text-sm mt-1">{formik2.errors.confirm}</div>
                                        )}
                                    </div>

                                    <div className="mt-6 md:mx-20">
                                        <p className='text-[18px]'>ชื่อบริษัท</p>
                                        <input type="text" {...formik2.getFieldProps('companyname')} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xxxxxxxxx" required />
                                        {formik2.touched.companyname && formik2.errors.companyname && (
                                            <div className="text-red-500 text-sm mt-1">{formik2.errors.companyname}</div>
                                        )}
                                    </div>

                                    <div className="mt-6 md:mx-20">
                                        <p className='text-[18px]'>ลักษณะธุรกิจ</p>
                                        <input type="text"  {...formik2.getFieldProps('description')} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xxxxxxxxx" required />
                                        {formik2.touched.description && formik2.errors.description && (
                                            <div className="text-red-500 text-sm mt-1">{formik2.errors.description}</div>
                                        )}
                                    </div>

                                    <div className="mt-6 md:mx-20">
                                        <p className='text-[18px]'>ชื่อผู้ติดต่อ</p>
                                        <input type="text" {...formik2.getFieldProps('name')} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xxxxxxxxx" required />
                                        {formik2.touched.name && formik2.errors.name && (
                                            <div className="text-red-500 text-sm mt-1">{formik2.errors.name}</div>
                                        )}
                                    </div>

                                    <div className="mt-6 md:mx-20">
                                        <p className='text-[18px]'>โทรศัพท์</p>
                                        <input type="text" {...formik2.getFieldProps('phonenumber')} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xxxxxxxxx" required />
                                        {formik2.touched.phonenumber && formik2.errors.phonenumber && (
                                            <div className="text-red-500 text-sm mt-1">{formik2.errors.phonenumber}</div>
                                        )}
                                    </div>
                                </div>
                            </form>
                        )}

                        <div className="mt-6 md:mx-20 float-right">
                            <span className="text-[16px] text-[#777777] py-1 w-full rounded-md">คุณมีบัญชีอยู่แล้ว?

                                <Link href="/login">
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
