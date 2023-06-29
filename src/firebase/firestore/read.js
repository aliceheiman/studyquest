import firebase_app from "../config";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app)

export async function getItem(collectionName, id) {
    let docRef = doc(db, collectionName, id);

    try {
        result = await getDoc(docRef);

        return { result: result, error: null }
    } catch (error) {
        return { result: null, error: error }
    }

}

export async function getItems(collectionName) {

    try {
        const snapshot = await getDocs(collection(db, collectionName));
        const dataArray = []

        snapshot.forEach((doc) => {
            dataArray.push(doc.data())
        });

        return { result: dataArray, error: null }
    } catch (e) {
        return { result: null, error: e }
    }

}