import React from 'react'

export default function page() {
    return (
        <main className='mt-12'>

            <div className="container mx-auto md:px-[10rem] mt-12 ">
                <div className="text-[23px] font-bold mb-7 mt-[100px]">ทำไมถึงควรเลือก FindJob?</div>
                <div className="grid grid-cols-12 gap-7">
                    <div className="col-span-4">
                        <div className="bg-[#2255A4] rounded-[20px] h-[200px] py-9 px-7 text-white">
                            <p className='font-bold'>ค้นหางานที่คุณต้องการ:</p>
                            เรามีรายชื่องานที่หลากหลายให้คุณเลือก ไม่ว่าจะเป็นงานประเภทใด ๆ ทั้งงานเต็มเวลา, งานพาร์ทไทม์, งานอิสระ, หรืองานที่ทำที่บ้าน

                        </div>
                    </div>

                    <div className="col-span-4">
                        <div className="bg-[#2255A4] rounded-[20px] h-[200px] py-9 px-7 text-white">
                            <p className='font-bold'>ตัวกรองแบบสูงสุด:</p>
                            ใช้ตัวกรองที่กำหนดเองเพื่อค้นหา งานที่ตรงกับความสนใจและความถนัดของคุณ

                        </div>
                    </div>

                    <div className="col-span-4">
                        <div className="bg-[#2255A4] rounded-[20px] h-[200px] py-9 px-7 text-white">
                            <p className='font-bold'>ความสะดวกสบายและเร็ว:</p>
                            กรอกข้อมูลของคุณและแนบเรซูเม่ออนไลน์ในไม่กี่คลิกเท่านั้น แล้วรอรับการติดต่อจากผู้ประกาศงานที่คุณสนใจ


                        </div>
                    </div>

                </div>

            </div>
        </main>
    )
}
