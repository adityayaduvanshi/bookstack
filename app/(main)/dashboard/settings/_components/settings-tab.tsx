"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from '@/components/ui/separator'
import DomainSettings from './setting-domain'
import BillingSettings from './setting-billing'
import { User } from '@prisma/client'

interface SettingMainProps{
  data:User
}

const SettingsMain = ({data}:SettingMainProps) => {
  return (
    <div>
      <div className="p-8 bg-white">
      <Tabs defaultValue="domain" className="w-full">
  <TabsList>
    <div className='flex gap-14'>
    <TabsTrigger value="domain" className='text-zinc-900 text-md '>Domain</TabsTrigger>
    <TabsTrigger value="billing" className="text-zinc-900 text-md">Billing</TabsTrigger>
    </div>
  </TabsList>
  <Separator className=" mt-2 bg-gray-700 w-full" />
  <TabsContent value="domain"><DomainSettings data={data}/></TabsContent>
  <TabsContent value="billing"><BillingSettings/></TabsContent>
</Tabs>

    </div>
    </div>
  )
}

export default SettingsMain