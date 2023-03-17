import { sendEmail } from '$lib/utils';

export async function notifyUnattendedRequest(request){
    const result = await sendEmail({
        to: request.email,
        subject: 'Appointment Schedule Reminder',
        html: `
        <h1>Hello ${request.firstName},</h1>
        <p>We are here to let you know about your unattended appointment with ${request.selectedOfficial.name} this last [ ${request.appointmentDate} ] at [ ${request.appointmentTime} ]. We will now close this request.</p>
        <a href="https://bars-gf.vercel.app/${request.requestPath}/${request.requestId}">Here: [https://bars-gf.vercel.app/${request.requestPath}/${request.requestId}]</a><p> is your tracker-id if you wish to view or track your request</p>
        <p>Thank you for using B.A.R.S.!</p>


        <p>This is an auto-generated email, please do not reply back. If you have further questions, please proceed to the barangay office. Thank you for your understanding!</p>
        `
    });
    
    console.log(`Hello ${request.firstName}`, `We are here to let you know about your unattended appointment with ${request.selectedOfficial.name} this last [ ${request.appointmentDate} ] at [ ${request.appointmentTime} ]. We will now close this request.`)
    console.log(JSON.stringify(result)) 
}