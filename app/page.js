'use client'

import React from "react";

import { useRouter } from 'next/navigation'
import { Hero } from "@/components";

function Page() {

  return (
    <main className="overflow-hidden">
      <Hero />
    </main>
  )
}

export default Page;