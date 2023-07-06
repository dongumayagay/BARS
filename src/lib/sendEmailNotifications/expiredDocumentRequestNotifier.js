import { sendEmail } from '$lib/utils';

export async function notifyExpiredRequest(request, lastUpdatedString){
    const result = await sendEmail({
        to: request.email,
        subject: 'Unclaimed Requested Document/s Reminder',
        html: `
        <h1>Hello ${request.firstName.toUpperCase()},</h1>
        <p>Your requested document/s has been unclaimed for more than 7 days since this request's last update: [ ${lastUpdatedString} ]. We will now close this request.</p>
        <p>Below is your tracker-id if you wish to view or track your request:</p>
        <a href="https://bars-gf.vercel.app/${request.requestPath}/${request.requestId}">[https://bars-gf.vercel.app/${request.requestPath}/${request.requestId}]</a>
        ${request.nextStatus === "Request Completed" || request.nextStatus === "Appointment Served" ? "<p>If you have time, please do fill up our feedback form attached below:</p>" : ""}
        ${request.nextStatus === "Request Completed" || request.nextStatus === "Appointment Served" ? "<a href=\"https://forms.gle/XiPycVoJ8BsTm7jaA\">https://forms.gle/XiPycVoJ8BsTm7jaA</a>" : ""}
        <p>Thank you for using B.A.R.S.!</p>


        <p>This is an auto-generated email, please do not reply back. If you have further questions, please proceed to the barangay office. Thank you for your understanding!</p>
        `
    });
    
    // console.log(`Your requested document/s has been unclaimed for exactly or more than 7 days since this request's last update: [ ${lastUpdatedString} ]. We will now close this request.`)
    console.log(JSON.stringify(result)) 
}