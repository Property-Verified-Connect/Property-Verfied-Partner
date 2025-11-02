import Nav from '@/components/layout/nav'
import { Button } from '@/components/ui/button'
import inter from '@/lib/font/Inter'
import { Search ,ArrowLeft,ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'




function page() {
  return (
  <>
  <Nav/>
    <div className='min-h-screen w-full overflow-hidden bg-[#CDE4F9] py-17 px-4 flex items-center justify-start flex-col'>
    <div className="flex items-center justify-center gap-1 md:gap-3">
         <Link  href={"/dashboard/partner"}>
          <Button variant="outline" className="mb-2  rounded-full"><ArrowLeft/></Button>
              </Link>

      <div className="flex items-center bg-white rounded-full shadow px-3 w-11/12 max-w-md mb-3">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by property name or location..."
          className="w-67 md:w-75 px-3 py-2 text-sm outline-none bg-transparent"
        />
      </div>
      </div>
        <div className="  py-2 px-5 md:-ml-20 flex items-start  w-96 ">
    
         <h1 className={`${inter.className} font-bold text-gray-600 text-2xl     flex items-center justify-center  `}> Hot Leads <ChevronRight/> </h1>
            
              </div>

              <div className='h-full w-96 px-3.5
                flex flex-col gap-2 '>
                   No Hot Refers
                     
              </div>
    </div>
  
  </>
  )
}

export default page