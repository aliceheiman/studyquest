import firebase_app from "../config";
import { getFirestore, collection, doc, setDoc, addDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)


export default async function addData(collection_name, data_object) {
    try {

        const docRef = doc(collection(db, collection_name));
        data_object.id = docRef.id

        await setDoc(docRef, data_object)

        return { result: docRef.id, error: null }
    } catch (e) {
        console.error("Error adding document: ", e);

        return { result: null, error: e }
    }
}