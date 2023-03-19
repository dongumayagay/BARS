import { sendEmail } from '$lib/utils';

export async function notifyUnattendedRequest(request){
    const result = await sendEmail({
        to: request.email,
        subject: 'Appointment Schedule Reminder',
        html: `
        <h1>Hello ${request.firstName.toUpperCase()},</h1>
        <p>We are here to let you know about your unattended appointment with ${request.selectedOfficial.name} this last [ ${request.appointmentDate} ] at [ ${request.appointmentTime} ].</p>
        <p>Due to this unattended appointment, we will now close this request.</p>
        <p>Below is your tracker-id if you wish to view or track your request:</p>
        <a href="https://bars-gf.vercel.app/${request.requestPath}/${request.requestId}">[https://bars-gf.vercel.app/${request.requestPath}/${request.requestId}]</a>
        <p>Thank you for using B.A.R.S.!</p>


        <p>This is an auto-generated email, please do not reply back. If you have further questions, please proceed to the barangay office. Thank you for your understanding!</p>
        `
    });
    
    // console.log(`
    // <h1>Hello ${request.firstName.toUpperCase()},</h1>
    // <p>We are here to let you know about your unattended appointment with ${request.selectedOfficial.name} this last [ ${request.appointmentDate} ] at [ ${request.appointmentTime} ].</p>
    // <p>Due to this unattended appointment, this request will now be automatically closed.</p>
    // <p>Below is your tracker-id if you wish to view or track your request:</p>
    // <a href="https://bars-gf.vercel.app/${request.requestPath}/${request.requestId}">[https://bars-gf.vercel.app/${request.requestPath}/${request.requestId}]</a>
    // <p>Thank you for using B.A.R.S.!</p>


    // <p>This is an auto-generated email, please do not reply back. If you have further questions, please proceed to the barangay office. Thank you for your understanding!</p>
    // `)
    console.log(JSON.stringify(result)) 
}