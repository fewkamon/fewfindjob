import Image from 'next/image';
import Link from 'next/link';
import Art from '../assets/art.png'
import Navbar from '../components/navbar'
import { useDispatch, useSelector } from 'react-redux';



export default async function Home() {

  const newslist: number[] = [0, 0, 0, 0, 0, 0, 0, 0]
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-6">
            <div className="mt-[10rem] px-5 md:px-[10rem]">
              <p className='text-[#2255A4] font-bold text-[30px] '>
                ยินดีต้อนรับสู่ FindJob -
              </p>
              <p className='text-[#2255A4] font-bold text-[30px] '>
                แหล่งหางานออนไลน์ที่ใหญ่ที่สุด!
              </p>
            </div>

            <div className="mt-5 flex flex-col items-end px-5 md:px-0">
              <p className='text-[#7D7272] font-semibold  text-[17px] '>
                เรียกใช้พลังของ
              </p>
              <p className='text-[#7D7272] font-semibold  text-[17px] '>
                FindJob เพื่อเปลี่ยนชีวิตของคุณด้วยงานที่คุณต้องการและในอาชีพที่ฝันอยากได้!
              </p>
            </div>

            <div className="mt-12">
              <center>
                <button className="text-white border-[#2357A5] bg-[#2357A5] border py-3 shadow px-4 font-medium rounded-[10px] shadow-blue-500/50">รายละเอียดเพิ่มเติม</button>
              </center>
            </div>
          </div>
          <div className="col-span-6 mb-12 md:mt-0">
            <div className="hidden md:block p-4 shadow-sm bg-[#1B5BC2] px-[40%] py-[40%] rounded-bl-[400px] float-right relative">
              <Image
                className='absolute bottom-[0rem] md:bottom-[8rem] left-[1rem] md:left-[-7rem]'
                src={Art}
                alt="My Image"
                width={600}
                height={600}
              ></Image>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto md:px-20 px-6 mt-12 ">
        <div className="flex justify-between items-center">
          <div className="">
            <p className="text-black font-bold text-[22px]">ประกาศ</p>
          </div>
          <div className="">
            <p className="text-[#2357A5] font-bold text-[16px] underline">ดูทั้งหมด</p>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8 mt-6">

          {newslist.map((item, index) => (
            <div className="col-span-3" key={index}>
              <div className="shadow  p-5">
                <div className="max-w-sm animate-pulse">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

                  <span className="sr-only">Loading...</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        <div className="mt-[8rem]"></div>
      </div>

    </main>
  )
}
