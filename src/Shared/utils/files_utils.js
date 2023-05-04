import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import {storage} from '../../firebase'
const { v5: uuidv5, DNS } = require('uuid');


export const  uploadFileToFirebase = async (file) =>{
    const timestamp = Date.now();
    const fileName = file.name;
    var ext = fileName.substr(fileName.lastIndexOf('.') + 1);

    const fileNameToSend = `${timestamp}-${fileName.trim()}`;

    const uuid = uuidv5(fileNameToSend, uuidv5.DNS);
    console.log(uuid)
    console.log(uuid + '.' + ext)
    const imagesStorageRef = ref(storage, `images/${uuid + '.' + ext}`)
  const uploadSnapShot =  await  uploadBytes(imagesStorageRef, file)
  const fileUrl = await getDownloadURL(uploadSnapShot.ref)
  return fileUrl
}