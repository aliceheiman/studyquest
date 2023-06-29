'use client'
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../src/context/AuthContext";
import { useRouter } from "next/navigation";
import addData from "../../src/firebase/firestore/create"
import { getItems } from "../../src/firebase/firestore/read"


function Page() {
    const { user } = useAuthContext()
    const router = useRouter()
    const [data, setData] = useState([]);

    useEffect(() => {
        if (user == null) router.push("/")

        const fetchData = async () => {
            try {
                const response = await getItems("decks");
                setData(response.result);
            } catch (error) {
                // Handle error
            }
        }

        fetchData();
    }, [user])

    // const addSomething = async (e) => {
    //     const dataObject = {
    //         front: "When was the perceptron invented?",
    //         back: "In the 1940's"
    //     }

    //     const response = await addData("decks", dataObject)

    //     if (response.error) {
    //         return console.log(response.error);
    //     }

    //     // Otherwise success!
    //     console.log(response.result)
    // }

    return (
        <main>
            {
                (user != null) ? (
                    <div>
                        <h1>Success! You have access to the admin panel!</h1>
                        <p>Hi there {user.displayName}</p>
                        <p>You User Uid is {user.uid}</p>
                        <div>
                            {data.map((item, index) => (
                                <div key={index}>
                                    <p><b>{item.front}</b></p>
                                    <p>{item.back}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>Log in to access.</p>
                )
            }
        </main>
    )
}

export default Page;