import React, { useState, useEffect } from 'react';
import { collection } from 'firebase/firestore';
import { db } from '../../config/firebase';

const useFirestore = (collection) => {

    const [docs, setDocs] = useState([]);

    const allImages = async () => {

        try {
            const querySnapshot = await getDocs(db, "images");
            querySnapshot.forEach((doc) => {
                console.log(doc.id, "=>", doc.data())
                setDocs(doc.id, "=>", doc.data());
            })
        } catch (error) {

        }

    }

    useEffect(() => {
        allImages();
    }, [])

    return (
        <div>useFirestore</div>
    )
}

export default useFirestore