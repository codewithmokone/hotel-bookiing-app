import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage, db } from '../../config/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

const useStorage = (file) => {

    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)


    useEffect(() => {
        // References
        const storageRef = ref(storage, `gallery/${file.name}`);

        const collectionRef = collection(db, 'images');

        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_change", (snapshot) => {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(percentage);
            }, (err) => {
                setError(err)
            }, async () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const collectionRef = doc(db, "images", file.name);
                    setDoc(collectionRef, {
                       name: file.name,
                       imageUrl: downloadURL 
                    })
                    setUrl(downloadURL);
                    console.log("Url ", downloadURL)
                });
                
               
            })

        // storageRef.put(file).on("state_change", (snap) => {
        //     let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        //     setProgress(percentage);
        // }, (err) => {
        //     setError(err)
        // }, async () => {
        //     const url = await storageRef.getDownloadURL();
        //     setUrl(url);
        // })
    }, [file])

    return { progress, url, error}
}

export default useStorage