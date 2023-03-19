import { sendEmail } from '$lib/utils';
import { doc, collection, deleteDoc, query, where, getDocs, updateDoc, } from "firebase/firestore"; 
import { deleteObject, listAll, ref } from "firebase/storage";
import { db, storage } from "$lib/firebase/client.js";

export async function notifyTrashedRequest(request, expiryDate){
    const result = await sendEmail({
        to: request.email,
        subject: `Trashed ${request.typeOfRequest}`,
        html: `
        <h1>Hello ${request.firstName},</h1>
        <p>Your request have been temporarily set aside by the administrator. Your request is still open and you can discuss with the administrator on this request's chat section about the details about the things you need to do the take this request back on track</p>
        <p>Below is your tracker-id if you wish to view or track your request:</p>
        <a href="https://bars-gf.vercel.app/${request.requestPath}/${request.requestId}">[https://bars-gf.vercel.app/${request.requestPath}/${request.requestId}]</a>
        <p>However, if there is still no update after [ ${expiryDate} ], this request will automatically close</p>
        <p>Thank you for using B.A.R.S.!</p>
        <p>This is an auto-generated email, please do not reply back. If you have further questions, please proceed to the barangay office. Thank you for your understanding!</p>
        `
    });
    
    // console.log(`Trashed ${request.typeOfRequest}`, `However, if there is still no update after [ ${expiryDate} ], this request will automatically close`)
    console.log(JSON.stringify(result)) 
}

export async function notifyExpiredTrashedRequest(request, lastUpdatedString){
    const result = await sendEmail({
        to: request.email,
        subject: `Expired Trashed ${request.typeOfRequest}`,
        html: `
        <h1>Hello ${request.firstName.toUpperCase().trim()},</h1>
        <p>Your request have been lacking updates for more than 1 week since it has been trashed [ ${lastUpdatedString} ]. We are very sorry, but we will now close this request.</p>
        <p>Below is your tracker-id if you still wish to view your request:</p>
        <a href="https://bars-gf.vercel.app/${request.requestPath}/${request.requestId}">[https://bars-gf.vercel.app/${request.requestPath}/${request.requestId}]</a>
        <p>Thank you for using B.A.R.S.!</p>
        <p>This is an auto-generated email, please do not reply back. If you have further questions, please proceed to the barangay office. Thank you for your understanding!</p>
        `
    });
    
    // console.log(`Hello ${request.firstName.toUpperCase().trim()},`,`Your request have been lacking updates for more than 1 week since it has been trashed [ ${lastUpdatedString} ]. We are very sorry, but will now close this request.`)
    console.log(JSON.stringify(result)) 
}

export async function removeHandler(dataToView){
    try{
        let requestId = dataToView.requestId;

        // const requestMessages = await getDocs(query(collection(db, "requestMessages"), where("trackingId", "==", "id-" + requestId)));
        // requestMessages.forEach((message)=>{
        //     deleteDoc(doc(db, "requestMessages", message.id))
        // })
        // console.log("messages have been successfully deleted")

        // listAll(ref(storage, "message_files/" + requestId))
        // .then((files)=>{
        //     files.items.forEach(async (file) => {
        //         const fileRef = ref(storage, file.fullPath)
        //         await deleteObject(fileRef)
        //     })
        //     console.log("message files have been successfully deleted")
        // })

        // if(dataToView.typeOfRequest === "Document Request"){
        //     clearDocumentRequestFiles(requestId)
        // }
        await updateDoc(doc(db, dataToView.collectionReference, requestId), {
            status: "Closed",
        })
        alert("Request removed successfully")
        // dispatch("close")
    }catch(error){
        alert(error.message)
    }
}

function clearDocumentRequestFiles(requestId){
    listAll(ref(storage, "documentRequestsFiles/" + requestId))
    .then((requirements)=>{
        requirements.prefixes.forEach((requirement) => {
            listAll(ref(storage, requirement.fullPath)).then((files)=>{
                files.items.forEach(async (file)=>{
                    const fileRef = ref(storage, file.fullPath)
                    await deleteObject(fileRef)
                })
            })
        })
        console.log("Files removed successfully");
    })
}