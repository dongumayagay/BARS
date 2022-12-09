import { error } from '@sveltejs/kit';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase/client';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
    const {documentRequestId} = params;
    // console.log(documentRequestId)
    const docRef = await getDoc(doc(db, "documentRequests", documentRequestId) )
    if(!docRef.exists()){
        // console.log('kahit ano 2')
        throw error(404, "That request does not exist")
    }
    // console.log('kahit ano')
    const documentRequestData = await docRef.data()
    const documentRequest = {
        id: docRef.id,
        ...documentRequestData
    }
    console.log(documentRequest)
    return {documentRequest};
};