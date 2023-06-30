"use client"

import { useAuthContext } from "../../src/context/AuthContext";
import { useRouter } from "next/navigation";
import addData from "../../src/firebase/firestore/create"
import { getItems } from "../../src/firebase/firestore/read"
import { CustomFilter, Decks, SearchBar } from "@/components";
import { fetchDecks } from "@/utils"

export default function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    return (
        <main>
            {
                (user != null) ? (
                    <section className="mt-12 padding-x padding-y max-width" id="discover">
                        <h2 className="text-[30px] font-bold">Decks</h2>
                        <p>Select or create a deck to explore.</p>

                        <Decks />

                    </section>
                ) : (
                    <p></p>
                )
            }
        </main>
    )
}