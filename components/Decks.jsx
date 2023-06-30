"use client"

import { fetchDecks } from '@/utils';
import React, { useEffect, useState } from 'react';
import Image from "next/image"

const Decks = () => {
    const [allDecks, setAllDecks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const decks = await fetchDecks();
                setAllDecks(decks);
                console.log(decks)
            } catch (error) {
                console.log('Error fetching decks:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (allDecks.length === 0) {
        return <h2>No results.</h2>;
    }

    return (
        <section className="home__cars-wrapper">
            <div className="car-card__content">
                <h2 className="car-card__content-title mb-10">💪 New features in progress! Use QuickPlay for now.</h2>
            </div>
            {/* {allDecks.map((deck) => (
                <div key={deck.id} className="car-card group">
                    <div className="car-card__content">
                        <h2 className="car-card__content-title">Deck</h2>
                    </div>

                    <p>10 flashcards</p>
                </div>
            ))} */}
        </section>
    );
};

export default Decks;
