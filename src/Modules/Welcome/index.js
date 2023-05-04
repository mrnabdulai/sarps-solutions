import { useState } from "react"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../../firebase"
import { uploadFileToFirebase } from "../../Shared/utils/files_utils";
const { v5: uuidv5, } = require('uuid');

export default function Welcome() {
    const [file, setFile] = useState(null)
    return (
        <div className="flex items-center justify-center h-screen bg-green-400">
            <input type='file' onChange={(e) => {
                setFile(e.target.files[0])


            }} id='file' />
            <button onClick={async () => {
              const fileUrl = await  uploadFileToFirebase(file)
              console.log(fileUrl)
            }}>Click this button</button>
        </div>

    )
}