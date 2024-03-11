"use client"
import Link from "next/link";
import { RiAccountCircleFill, RiLockPasswordFill, RiMapPinFill, RiPassValidFill, RiReactjsFill, RiCamera2Fill } from "react-icons/ri";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname()

  const tabloop = [
    { name: "บัญชีผู้ใช้", href: "/account/manage", icon: <RiAccountCircleFill className={`w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300`} /> },
    { name: "เปลี่ยนรหัสผ่าน", href: "/account/manage/changepassword", icon: <RiLockPasswordFill className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" /> },
    { name: "ข้อมูลส่วนตัว", href: "/account/manage/info", icon: <RiPassValidFill className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" /> },
    { name: "ที่อยู่", href: "/account/manage/location", icon: <RiMapPinFill className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" /> },
    { name: "ความสามารถ", href: "/account/manage/ability", icon: <RiReactjsFill className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" /> },
    { name: "รูปถ่าย", href: "/account/manage/photo", icon: <RiCamera2Fill className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" /> },
  ]

  return (
    <main>
      <div className="container mx-auto px-1 md:px-[9rem] mt-12">

        <div className="border-b border-gray-200 dark:border-gray-700 md:px-[-2rem] mb-5 print:hidden">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li className="mr-2">

              {tabloop.map((item: any, index: number) => (
                <Link href={item.href} key={index} className={`inline-flex items-center justify-center p-4 border-b-2  rounded-t-lg ${pathname === item.href ? "text-gray-600 border-gray-500 " : "hover:text-gray-600 hover:border-gray-300 "}  dark:hover:text-gray-300 group`}>
                  {item.icon}
                  {item.name}
                </Link>
              ))}

            </li>

          </ul>
        </div>

        <div className="px-5 mt-4 py-8 bg-white shadow-lg ">
          {children}
        </div>
      </div>
    </main>
  )
}
