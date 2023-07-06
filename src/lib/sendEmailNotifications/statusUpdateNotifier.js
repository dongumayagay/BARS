import { sendEmail } from '$lib/utils';

export async function requestStatusUpdateNotifier(dataToView){
    const result = await sendEmail({
        to: dataToView.email,
        subject: dataToView.typeOfRequest + 'Status Update',
        html: `
        <h1>Hello ${dataToView.firstName},</h1>
        <p> ${dataToView.nextStatusEmailContent??[]}</p>
        ${dataToView.nextStatus === "Ready to claim" ? "<p>Also, you have exactly [1] week or [7] days to claim your documents before your request will automatically close</p>" : ""}
        <a href="https://bars-gf.vercel.app/${dataToView.requestPath}/${dataToView.requestId}">Here: [https://bars-gf.vercel.app/${dataToView.requestPath}/${dataToView.requestId}]</a><p> is your tracker-id if you wish to view or track your request</p>
        ${dataToView.nextStatus === "Request Completed" || dataToView.nextStatus === "Appointment Served" ? "<p>If you have time, please do fill up our feedback form attached below:</p>" : ""}
        ${dataToView.nextStatus === "Request Completed" || dataToView.nextStatus === "Appointment Served" ? "<a href=\"https://forms.gle/XiPycVoJ8BsTm7jaA\">https://forms.gle/XiPycVoJ8BsTm7jaA</a>" : ""}
        <p>This is an auto-generated email, please do not reply back. If you have further questions, please proceed to the barangay office. Thank you for your understanding!</p>
        <p>Thank you for using B.A.R.S.!</p>
        `
    });
    
    // console.log(`
    // <h1>Hello ${dataToView.firstName},</h1>
    // <p> ${dataToView.nextStatusEmailContent??[]}</p>
    // ${dataToView.nextStatus === "Ready to claim" ? "<p>Also, you have exactly [1] week or [7] days to claim your documents before your request will automatically close</p>" : ""}
    // <a href="https://bars-gf.vercel.app/${dataToView.requestPath}/${dataToView.requestId}">Here: [https://bars-gf.vercel.app/${dataToView.requestPath}/${dataToView.requestId}]</a><p> is your tracker-id if you wish to view or track your request</p>
    // ${dataToView.nextStatus === "Request Completed" || dataToView.nextStatus === "Appointment Served" ? "<p>If you have time, please do fill up our feedback form attached below:</p>" : ""}
    // ${dataToView.nextStatus === "Request Completed" || dataToView.nextStatus === "Appointment Served" ? "<a href=\"https://forms.gle/XiPycVoJ8BsTm7jaA\">https://forms.gle/XiPycVoJ8BsTm7jaA</a>" : ""}
    // <p>This is an auto-generated email, please do not reply back. If you have further questions, please proceed to the barangay office. Thank you for your understanding!</p>
    // <p>Thank you for using B.A.R.S.!</p>
    // `)
    console.log(JSON.stringify(result))
} 