import { sendEmail } from '$lib/utils';

export async function notifyExpiringRequest(request, expiryDate){
    const result = await sendEmail({
        to: request.email,
        subject: 'Unclaimed Requested Document/s Reminder',
        html: `
        <h1>Hello ${request.firstName},</h1>
        <p>Your requested document/s has been unclaimed for exactly or more than 5 days. This request will automatically close at [ ${expiryDate} ] if your document/s are remained unclaimed.</p>
        <a href="https://bars-gf.vercel.app/${request.requestPath}/${request.requestId}">Here: [https://bars-gf.vercel.app/${request.requestPath}/${request.requestId}]</a><p> is your tracker-id if you wish to view or track your request</p>
        ${request.nextStatus === "Request Completed" || request.nextStatus === "Appointment Served" ? "<p>If you have time, please do fill up our feedback form attached below:</p>" : ""}
        ${request.nextStatus === "Request Completed" || request.nextStatus === "Appointment Served" ? "<a href=\"https://forms.gle/XiPycVoJ8BsTm7jaA\">https://forms.gle/XiPycVoJ8BsTm7jaA</a>" : ""}
        <p>Thank you for using B.A.R.S.!</p>


        <p>This is an auto-generated email, please do not reply back. If you have further questions, please proceed to the barangay office. Thank you for your understanding!</p>
        `
    });
    
    console.log(`Your requested document/s has been unclaimed for exactly or more than 5 days. This request will automatically close at [ ${expiryDate} ] if your document/s are remained unclaimed.`)
    console.log(JSON.stringify(result)) 
}