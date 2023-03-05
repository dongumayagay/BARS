import { months, ordinals } from "../stores";
import { jsPDF } from "jspdf"
import "jspdf-autotable";

export function residency(officialsList, dataToView){
    let document = new jsPDF("p", "px", "letter");

    const pageWidth = document.internal.pageSize.width;
    const pageHeight = document.internal.pageSize.height;

    document.setFont("times", "normal")
    document.setFontSize(8)
    document.text("REPUBLIC OF THE PHILIPPINES", pageWidth/2 ,10, { maxWidth: pageWidth, align: "center",})

    document.text("PROVINCE OF LAGUNA", pageWidth/2 ,18, { maxWidth: pageWidth, align: "center",})

    document.text("CITY OF SAN PEDRO", pageWidth/2 ,26, { maxWidth: pageWidth, align: "center",})

    document.text("BARANGAY UNITED BAYANIHAN", pageWidth/2 ,34, { maxWidth: pageWidth, align: "center",})

    document.setFont("helvetica", "bold")
    document.setFontSize(14)
    document.setTextColor("#2563eb")
    document.text("OFFICE OF THE BARANGAY CHAIRMAN", pageWidth/2 ,48, { maxWidth: pageWidth, align: "center",})

    document.setFont("times", "italic")
    document.setFontSize(8)
    document.setTextColor("")
    document.text("Tel No. (02) 961-43-44", pageWidth/2 ,58, { maxWidth: pageWidth, align: "center",})
    document.addImage("/brgyLogo.png", 15,5,60,60)
    document.addImage("/PUP_San_Pedro_Logo.png", pageWidth-80,5,60,60)
    
    document.setLineWidth(1.5)
    document.setDrawColor("#2563eb")
    document.line( 5, 70, pageWidth-5, 70)
    document.line(pageWidth * 0.28, 70, pageWidth * 0.28, pageHeight - 20)

    document.setFont("helvetica", "bold")
    document.setFontSize(10)
    document.setTextColor("#b91c1c")
    document.text("Sangguniang Barangay", (pageWidth * 0.28)/2, 80, {maxWidth: (pageWidth * 0.28) * 0.80, align: "center" })


    // console.log(document.getFontList())

    let totalOfficialsBoxHeight = 85;

    officialsList.docs.map((doc, index)=>{
        let rectHeight; 
        if(doc.data().departments === "") {rectHeight = 20} else {rectHeight = 47}
        // document.rect( (pageWidth * 0.28) * 0.05, 5 + totalOfficialsBoxHeight, (pageWidth * 0.28)*0.9, rectHeight)

        document.setFont("helvetica", "bold")
        document.setFontSize(8      )
        document.setTextColor("")
        document.text((doc.data().positionOrder <= 3 ? "HON. " : "") + doc.data().name.toUpperCase(), (pageWidth * 0.28)/2, 10 + totalOfficialsBoxHeight,  {maxWidth: (pageWidth * 0.28) * 0.90, align: "center" })

        document.setFont("helvetica", "normal")
        document.setFontSize(8)
        document.setTextColor("#b91c1c")
        document.text((doc.data().posisyon == "" ? doc.data().position : doc.data().posisyon), (pageWidth * 0.28)/2, 18 + totalOfficialsBoxHeight, {maxWidth: (pageWidth * 0.28) * 0.80, align: "center" })

        document.setFontSize(8)
        document.setTextColor("")
        document.text(doc.data().departments??"", (pageWidth * 0.28)/2, 26 + totalOfficialsBoxHeight, {maxWidth: (pageWidth * 0.28) * 0.80, align: "center" })

        totalOfficialsBoxHeight += 5 + rectHeight;
    })

    document.setFont("times", "normal")
    document.setFontSize(20)
    document.text("CERTIFICATE OF RESIDENCY",  (pageWidth * 0.28) + ((pageWidth * 0.72) / 2), 102.5, {maxWidth: (pageWidth * 72) * 0.80, align: "center"})

    document.saveGraphicsState();
    document.setGState(new document.GState({opacity: 0.2}));
    document.setFontSize(60)
    document.text("SAMPLE ONLY", ((pageWidth * 0.325) + ((pageWidth * 0.598)*0.60)+15), ((((pageHeight - 30) * 0.15) + 60) + (((pageHeight - 30) * 0.70)*0.3)), {align: "center", angle: 315})
    document.restoreGraphicsState();

    // document.setDrawColor("")
    document.setLineWidth(0.5)
    document.rect((pageWidth * 0.28) + 9.5, 79.5, (pageWidth * 0.72) - 19, 36)
    document.setLineWidth(1.5)
    document.rect((pageWidth * 0.28) + 11.5, 81.5, (pageWidth * 0.72) - 23, 32)
    document.setLineWidth(0.5)
    document.rect((pageWidth * 0.28) + 13.5, 83.5, (pageWidth * 0.72) - 27, 28)

    // document.addImage( "/brgyWatermark3.png",(pageWidth * 0.28) + 9.5, 125.5, (pageWidth * 0.72) - 19, (pageWidth * 0.72) - 19)

    document.setFont("times", "bold")
    document.setFontSize(15)
    document.text("TO WHOM IT MAY CONCERN: ", (pageWidth * 0.28) + 9.5, 140)
    document.text("This certification is hereby granted to:", (pageWidth * 0.28) + 9.5, 170)

    // document.setFont("Times.")
    document.setFontSize(12)
    document.text("NAME: " ,(pageWidth * 0.28) + 9.5, 200, {maxWidth: (pageWidth * .72) * 0.80 })
    document.setFontSize(15)
    document.setFont("Times", "bold")
    document.text(
        dataToView.lastName.toUpperCase() + ", " + dataToView.firstName.toUpperCase() + " " + dataToView?.middleName??"".toUpperCase(),
        ((pageWidth * 0.28) + 9.5) + (document.getTextWidth("NAME: ") - 7), 
        200, 
        {maxWidth: (pageWidth * .72) * 0.80}
    )

    // console.log(new Date(dataToView.birthDate))
    const birthDate = new Date(dataToView.birthDate)

    document.setFont("Times", "bold" )
    document.setFontSize(12)
    document.text("BIRTHDATE: " ,(pageWidth * 0.28) + 9.5, 215, {maxWidth: (pageWidth * .72) * 0.80 })
    document.setFontSize(15)
    document.setFont("Times", "bold")
    document.text(
        months[birthDate.getMonth()] + " " + birthDate.getDate() + ", " + birthDate.getFullYear(),
        ((pageWidth * 0.28) + 9.5) + (document.getTextWidth("BIRTHDATE: ") - 10), 
        215, 
        {maxWidth: (pageWidth * .72) * 0.80}
    )

    // document.setFont("Times", "normal" )
    document.setFontSize(12)
    document.text("CIVIL STATUS: " ,(pageWidth * 0.28) + 9.5, 230, {maxWidth: (pageWidth * .72) * 0.80 })
    document.setFontSize(15)
    // document.setFont("Times", "bold")
    document.text(
        "Single",
        ((pageWidth * 0.28) + 9.5) + (document.getTextWidth("CIVIL STATUS: ") - 13), 
        230, 
        {maxWidth: (pageWidth * .72) * 0.80}
    )
    // document.setFont("Times", "normal" )
    document.setFontSize(12)
    document.text("CITIZENSHIP: " ,(pageWidth * 0.28) + 9.5, 245, {maxWidth: (pageWidth * .72) * 0.80 })
    document.setFontSize(15)
    // document.setFont("Times", "bold")
    document.text(
        "Filipino",
        ((pageWidth * 0.28) + 9.5) + (document.getTextWidth("CITIZENSHIP: ") - 15), 
        245, 
        {maxWidth: (pageWidth * .72) * 0.80}
    )
    // document.setFont("Times", "normal" )
    document.setFontSize(12)
    document.text("ADDRESS: " ,(pageWidth * 0.28) + 9.5, 260, {maxWidth: (pageWidth * .72) * 0.80 })
    document.setFontSize(15)
    // document.setFont("Times", "bold")
    document.text(
        dataToView.completeAddress,
        ((pageWidth * 0.28) + 9.5) + (document.getTextWidth("ADDRESS: ") - 10), 
        260, 
        {maxWidth: (pageWidth * 0.72) - (document.getTextWidth("ADDRESS: ")+19)}
    )
    // document.rect((pageWidth * 0.28) + 9.5, 79.5, (pageWidth * 0.72) - 19, 36)
    // document.rect(((pageWidth * 0.28))+document.getTextWidth("ADDRESS: "), 200, (pageWidth * 0.72) - (document.getTextWidth("ADDRESS: ")+19), 50)
    const firstStatement = "     Furthermore, as per the record of this office, he/she has not been involved in any kind of unlawful activities in this community, nor he/she has no any derogatory record on our file."
    
    document.setFont("times", "normal")
    document.text(firstStatement, (pageWidth * 0.28) + 9.5, 300, {maxWidth:  (pageWidth * 0.72) - 19, lineHeightFactor: 1.5, align: "justify"})
    document.text("     This certification is hereby is issued upon the request of the above name peron as per " + dataToView.docPurpose.toUpperCase() + " and for whatever legal/lawful purpose/s it may serve him/her",
        (pageWidth * 0.28) + 9.5, 360,
        {maxWidth: (pageWidth * 0.72) - 19, lineHeightFactor: 1.5, align: "justify"} 
    )
    const today = new Date();
    document.setFont("times", "bold")
    document.setFontSize(15)
    document.text("Given this " + today.getDate() + ordinals[today.getDate() % 10] + " day of " + months[today.getMonth()] + ", " + today.getFullYear() + " at United Bayanihan, San Pedro City, Laguna.",  
        (pageWidth * 0.28) + ((pageWidth * 0.72) / 2), 430, {maxWidth: (pageWidth * 0.72) * 0.70, align: "center"}
    )
    // document.rect((pageWidth * 0.28) + ((pageWidth * 0.72) / 2), 430, (pageWidth * 0.72) * 0.80, 0 )
    const officials = officialsList.docs.map((doc)=>({...doc.data()}))
    const chairman = officials.find((item) => item.positionOrder === 1)
    document.setDrawColor("")
    document.line(((pageWidth * 0.315) + 9.5) + 130, 520, 
        (((pageWidth * 0.315) + 9.5) + 130) + document.getTextWidth("HON. " + chairman.name.toUpperCase()) + 7.5, 520
    )
    document.text("HON. " + chairman.name.toUpperCase(), ((pageWidth * 0.315) + 9.5) + 133, 530)
    document.setTextColor("#b91c1c")
    document.text("Barangay Chairman", ((pageWidth * 0.315) + 9.5) + 130 + ((document.getTextWidth("HON. " + chairman.name.toUpperCase()) + 7.5)/2), 540, {align: "center"})

    document.setFontSize(10)
    document.setTextColor("")
    document.text("This document is issued for capstone requirements puposes only and does not represent any actual document issued by the office of Barangay United Bayanihan.", pageWidth/2, pageHeight -13, {maxWidth: (pageWidth - 80), align: "center"})

    document.save((dataToView.lastName.toUpperCase() + ", " + dataToView.firstName.toUpperCase() + " " + dataToView?.middleName??"".toUpperCase()) + "_Residency.pdf")
}