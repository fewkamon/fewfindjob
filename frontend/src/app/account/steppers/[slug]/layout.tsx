import Navbar from '@/components/navbar';
import { redirect } from 'next/navigation';

type PageProps = {
  children: React.ReactNode,
  params: {
    slug: number
  }
}

export default function RootLayout({
  children,
  params
}: PageProps) {

  function isNumeric(input: any) {
    return !isNaN(input) && Number(input) === parseInt(input);
  }

  if (~~params.slug > 4 || ~~params.slug < 1 || !isNumeric(params.slug)) {
    redirect('/');
  }

  const steppers = ["ข้อมูลส่วนตัว", "ที่อยู่", "ความสามารถ", "รูปถ่าย"]




  return (
    <main>
      <div className="container mx-auto px-1 md:px-[9rem] mt-12">
        <div className="px-5 py-12 bg-white shadow-lg ">
          <div className="md:mx-40 ">

            <div className="hidden md:block mt-12">

              <div className="grid grid-cols-14 gap-x-6 gap-y-8 mt-6 md:mx-9 ">
                {steppers.map((item, index) => (
                  <>
                    <div className="col-span-2" key={index}>
                      <div className={`w-8 h-8 md:w-16 md:h-16 ${params.slug >= index + 1 ? 'bg-[#2255A4]' : 'bg-[#D9D9D9]'} rounded-full flex items-center justify-center mx-auto`}>
                        <p className={` ${params.slug >= index + 1 ? 'text-white' : 'text-[#3F3F3F]'} font-semibold`}>{index + 1}</p>
                      </div>
                      <p className={`text-center mt-3 font-semibold text-[13px] md:text-[15px] ${params.slug >= index + 1 ? 'text-[#2255A4]' : 'text-[#3F3F3F]'}`}>{item}</p>
                    </div>
                    {index < 3 ? (<div className="col-span-2">
                      <div className={`py-1 rounded-md flex items-center md:mt-7 mt-3 w-full ${params.slug >= index + 2 ? 'bg-[#2255A4]' : 'bg-[#D9D9D9]'} `}></div>
                    </div>) : (<div></div>)}
                  </>
                ))}
              </div>
            </div>

            <div className="md:hidden block">
              <div className="grid grid-cols-6 gap-x-3 gap-y-4  md:mx-9" >

                {steppers.map((item, index) => (
                  <>
                    <div className="col-span-2" key={index}>
                      <div className={`w-8 h-8 md:w-16 md:h-16 ${params.slug >= index + 1 ? 'bg-[#2255A4]' : 'bg-[#D9D9D9]'} rounded-full flex items-center justify-center mx-auto`}>
                        <p className={` ${params.slug >= index + 1 ? 'text-white' : 'text-[#3F3F3F]'}  text-[14px] font-semibold`}>{index + 1}</p>
                      </div>
                    </div>

                    <div className="col-span-2">

                      <div className={`py-1 rounded-md flex items-center md:mt-7 mt-3 w-full ${params.slug >= index + 1 ? 'bg-[#2255A4]' : 'bg-[#D9D9D9]'} `}></div>
                    </div>
                    <div className="col-span-2">

                      <p className={`text-center mt-2 font-semibold text-[13px] md:text-[15px] ${params.slug >= index + 1 ? 'text-[#2255A4]' : 'text-[#3F3F3F]'}`}>{item}</p>
                    </div>
                  </>
                ))}
              </div>
            </div>


          </div>
          {children}
        </div>
      </div>
    </main>
  )
}
