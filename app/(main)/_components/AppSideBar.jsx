"use client"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SideBarOptions } from "@/services/Constants"
import { ArrowLeft, ArrowRight, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {

    const path = usePathname();


    return (
        <Sidebar>
            <SidebarHeader className='flex items-center'>
                <Link href='https://ai-course-generator-indol.vercel.app/dashboard'>
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={1000}
                        height={60}
                        className="w-full h-[70px] object-cover my-4"
                    />
                </Link>
                <Link href="https://ai-course-generator-indol.vercel.app/dashboard" className="w-full" >
                    <Button className='w-full mt-5'> <ArrowLeft /> Back to dashboard </Button>
                </Link>
                
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarContent>
                    <SidebarMenu>
                        {SideBarOptions.map((option, index) => (
                            <SidebarMenuItem key={index} className='p-1'>
                                <SidebarMenuButton asChild className={`p-5 ${path == option.path && 'bg-blue-100'}`}>
                                    <Link href={option.path}>

                                        <option.icon className={`${path == option.path && 'text-primary'}`} />
                                        <span className={`text-[16px] font-medium ${path==option.path&&'text-primary'}`}>{option.name}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}