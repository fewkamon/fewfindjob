"use client"

import React, { useState } from 'react'
import provincesData from '@/assets/thai-province-data/thai_provinces.json'
import amphuresData from '@/assets/thai-province-data/thai_amphures.json'
import tambonsData from '@/assets/thai-province-data/thai_tambons.json'

export default function Page() {
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedAmphure, setSelectedAmphure] = useState('');
    const [selectedTambon, setSelectedTambon] = useState('');

    const provinces = provincesData.RECORDS;
    const amphures = amphuresData.RECORDS.filter((amphure) => amphure.province_id === parseInt(selectedProvince));
    const tambons = tambonsData.RECORDS.filter((tambon) => tambon.amphure_id === parseInt(selectedAmphure));


    return (
        <div className=''>
            <p className='text-[25px]  font-semibold'>แดชบอร์ด</p>
            <div className="bg-white mt-4 rounded-lg p-5 py-9">
            
            </div>
        </div>
    )
}
