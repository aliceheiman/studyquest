"use client"

import { useAuthContext } from "../../src/context/AuthContext";

export default function Page() {
    const { user } = useAuthContext()

    return (
        <main>
            {
                (user != null) ? (
                    <section className="section left mt-12 padding-x padding-y max-width study_height" id="discover">
                        <h2 class="study__title">Decks</h2>
                        <p class="study__description">Select or create a deck to start studying.</p>



                    </section>
                ) : (
                    <section className="section left mt-12 padding-x padding-y max-width study_height">
                        <h2 class="study__title">Not Logged In</h2>
                        <p>Log in to view saved decks.</p>
                    </section>

                )
            }
        </main>
    )
}