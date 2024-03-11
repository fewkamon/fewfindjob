"use client"

import Link from "next/link";
import { useState } from "react";
import Image from 'next/image';
const BASE_URL = process.env.BACKEND_URL;

export function Filter({ data1 }: { data1: { companyname: string }[] }) {

    const [data, setData] = useState(data1);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        const filteredName = data1.filter(data =>
            data.companyname.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setData(filteredName);
    };

    return data && (
        <div>
            <div className="flex items-center max-w-md mx-auto bg-white rounded-lg mb-9" >
                <div className="w-full">
                    <input type="search" className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="ค้นหาบริษัท" />
                </div>
                <div>
                    <button onClick={handleSearch} type="submit" className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg"   >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12">

                {data.map((item: any, i: number) => (
                    <div className="col-span-3 transition-all duration-200 hover:opacity-[0.6]" key={i}>
                        <Link href={`/partner/${item.id}`}>
                            <Image src={
                                `${BASE_URL}/file/${item.image}`
                            } className='object-cover mx-auto rounded-lg' width={150} height={150} alt="t" />
                            <p className='mt-3 text-center'>

                                {item.companyname}
                            </p>
                        </Link>

                    </div>
                ))}

            </div>
        </div >
    )
}