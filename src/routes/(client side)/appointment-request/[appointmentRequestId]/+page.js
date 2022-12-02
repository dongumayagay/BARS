import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase/client';

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
    try {
        const {appointmentRequestId} = params;
        
        const docRef = await getDoc(doc(db, "appointmentRequests", appointmentRequestId))
        
        if(!docRef.exists()){
            throw error(404, "That request does not exist")
        }
        
        const appointmentRequestData = await docRef.data();
        const appointmentRequest = {
            id: docRef.id,
            ...appointmentRequestData
        }
        return {appointmentRequest};
        
    } catch (error) {
        console.log(error)
    }
};