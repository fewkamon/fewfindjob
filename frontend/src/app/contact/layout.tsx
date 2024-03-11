import { redirect } from 'next/navigation';
import Navbar from '@/components/navbar';
type PageProps = {
  children: React.ReactNode,
}

export default function RootLayout({
  children,
}: PageProps) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  )
}
