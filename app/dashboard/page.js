"use client"

import { useAuthContext } from "../../src/context/AuthContext";

export default function Page() {
    const { user } = useAuthContext()

    return (
        <main>
            {
                (user != null) ? (
                    <section className="mt-12 padding-x padding-y max-width" id="discover">
                        <h2 class="study__title">Decks</h2>
                        <p class="study__description">Select or create a deck to start studying.</p>

                        <p>No decks found. Use QuickPlay to get up and running.</p>

                    </section>
                ) : (
                    <></>
                )
            }
        </main>
    )
}