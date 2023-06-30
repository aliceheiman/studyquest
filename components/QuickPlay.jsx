"use client";

// REACT
import React, { useEffect, useState } from "react";
import { CustomButton, MapPicker } from ".";
import { Switch } from '@headlessui/react'
import Link from 'next/link'

// SWAL
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from "next/navigation";

const QuickPlay = ({ accessToken }) => {

    const [questions, setQuestions] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [enabled, setEnabled] = useState(false)

    const router = useRouter()

    const MySwal = withReactContent(Swal)

    const swalSuccess = (msg) => {
        MySwal.fire({
            icon: "success",
            title: <p>Success!</p>,
            text: msg
        })
    }

    const swalError = (msg) => {
        MySwal.fire({
            icon: "error",
            title: <p>Hm?</p>,
            text: msg
        })
    }

    const handleQuestions = (e) => {
        const textarea = document.getElementById("question-area")

        // Split the input text into individual lines
        const lines = textarea.value.trim().split('\n');

        // Initialize an empty array to store the parsed objects
        const parsedList = [];

        // Initialize an empty array to store lines with errors
        const errorLines = [];

        // Process each line
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Skip empty lines
            if (line === '') {
                continue;
            }

            // Split the line into question and answer parts
            const parts = line.split('A:');

            // Validate the line format
            if (parts.length !== 2) {
                errorLines.push(i + 1);
                continue;
            }

            // Extract the question and answer
            const question = parts[0].trim().replace('Q:', '');
            const answer = parts[1].trim();

            // Validate the question and answer
            if (question === '') {
                errorLines.push(i + 1);
                continue;
            }

            if (answer === '') {
                errorLines.push(i + 1);
                continue;
            }

            // Create an object and add it to the parsed list
            parsedList.push({ front: question, back: answer });
        }

        // Messed up lines
        if (errorLines.length > 0) {
            const errorMsg = `It looks like some lines contain errors. Check your input on lines ${errorLines.join(', ')} and try again.`
            swalError(errorMsg)
            return
        }

        if (parsedList.length > 0) {
            // Success!
            setQuestions(parsedList);
            const flashMsg = parsedList.length === 1 ? "flashcard" : "flashcards"
            swalSuccess(`Saved ${parsedList.length} ${flashMsg}. Let's add them to the map!`)
        }
    }

    const beginAdventure = () => {
        // Save adventure to session storage
        const adventure = {
            questions: questions,
            markers: markers,
            randomize: enabled
        }

        sessionStorage.setItem("adventure", JSON.stringify(adventure))

        router.push("/adventure")
    }

    const studyQuestItem = () => {
        if (questions.length === 0) {
            return (
                <p>Begin by adding flashcards at Step #1.</p>
            )
        }

        if (questions.length != markers.length) {
            return (
                <p>You got markers left to add at Step #2!</p>
            )
        }

        return (
            <CustomButton
                title="BEGIN ADVENTURE!"
                containerStyles="bg-primary-blue text-white w-full"
                handleClick={beginAdventure}
            />
        )
    }

    function RandomToggle() {
        return (
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
                <span className="sr-only">Enable notifications</span>
                <span
                    className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
            </Switch>
        )
    }

    return (
        <div className="quickplay p-8">
            <div className="mb-10">
                <h2 className="font-extrabold text-[25px]">Step #1: Enter Flashcards</h2>
                <p className="mb-2">Enter your flashcards, one per row, in the format &quot;Q: Question A: Answer&quot;.</p>
                <textarea id="question-area" className="w-full bg-slate-100 h-48 p-2" placeholder="Q: What does DNA stand for? A: Deoxyribonucleic acid"></textarea>
                <CustomButton
                    title="Save"
                    containerStyles="bg-primary-blue text-white w-full"
                    handleClick={handleQuestions}
                />
            </div>
            <div className="mb-10">
                <h2 className="font-extrabold text-[25px]">Step #2: Place Markers</h2>
                <p className="mb-2"><b>🦜 Tip!</b> Click on the map to add markers in the order you want to explore them. The Red Marker shows your position.</p>
                <MapPicker
                    accessToken={accessToken}
                    markers={markers}
                    setMarkers={setMarkers}
                    targetMarkers={questions.length}
                />
            </div>
            <div>
                <h2 className="font-extrabold text-[25px]">Step #3: Configure your Study Quest</h2>
                <div className="flex mt-4 mb-6">
                    <p className="font-bold mr-4">Randomize question order?</p>
                    {RandomToggle()}
                </div>

                {studyQuestItem()}
            </div>

        </div>
    )
}

export default QuickPlay