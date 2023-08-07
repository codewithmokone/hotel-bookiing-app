import React, { useState } from 'react';
import Footer from '../../components/Footer';
import HeroSec from '../../components/HeroSec'
import NewRoomNavbar from '../../components/navbar/NewRoomNavbar'
import ProgressBar from '../../components/ProgressBar';
import ImageGrid from '../../components/ImageGrid';

const UploadGallery = ({logout}) => {

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null)

    const types = ['image/png', 'image/jpeg'];

    const changeHandler = (e) => {
        let selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file (png or jpeg)')
        }

        console.log(selected);
    }

    return (
        <div>
            <header>
            <NewRoomNavbar signOut={logout} />
            <HeroSec />
            </header>
            <main className="w-[1024px] m-auto flex flex-col items-center justify-center">
                <div>.
                    <form>
                        <h2>Gallery</h2>
                        <input type="file" onChange={changeHandler} />
                        {error && <div>{error}</div>}
                        {file && <div>{file.name}</div>}
                        {file && <ProgressBar file={file} setFile={setFile} />}
                    </form>
                </div>
                <div className="m-4">
                    <ImageGrid />
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default UploadGallery