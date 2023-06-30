import React from "react";

import { CustomButton, Hero, VideoBackground } from "@/components";
import Link from "next/link";

function Page() {

  return (
    <main className="overflow-hidden">
      <Hero />

      <section className="mt-10 padding-x max-w-[1440px] mx-auto">
        <h2 className="text-[30px] font-bold">How it works</h2>
        <p>Give your flashcards a new dimension by adding a location component. StudyQuest allows you to Quick Play by entering questions and locations on-the-fly. With an account you can create and save decks for future use.</p>

        <div className="flex flex-wrap justify-between gap-4 mt-4 mb-4">
          <div className="text-center bg-slate-200 p-4 flex-1 min-w-[300px]">
            <p className="font-bold">#1: Enter Flashcards</p>
            <p>Enter your study questions in a Question-Answer format.</p>
          </div>

          <div className="text-center bg-slate-200 p-4 flex-1 min-w-[300px]">
            <p className="font-bold">#2: Place Markers</p>
            <p>Create as many locations to explore on the map.</p>
          </div>

          <div className="text-center bg-slate-200 p-4 flex-1 min-w-[300px]">
            <p className="font-bold">#3: Adventure!</p>
            <p>Configure your route and begin the study adventure!</p>
          </div>
        </div>

        <Link href="/quickplay">
          <CustomButton
            title="Start your Quest"
            containerStyles="bg-primary-blue text-white rounded-full mt-6"
          />
        </Link>
      </section>

      <section className="mt-10 mb-10 padding-x max-w-[1440px] mx-auto">
        <h2 className="text-[30px] font-bold">Feedback</h2>
        <p>Have any ideas on how to make this web-app better? Email hi@aliceheiman.xyz with your suggestions. Thank you!</p>
      </section>

    </main>
  )
}

export default Page;