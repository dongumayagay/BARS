import { data } from "autoprefixer";
import { months } from "../stores";
import { jsPDF } from "jspdf"
import "jspdf-autotable";
import { doc } from "firebase/firestore";

export function clearance(officialsList, dataToView){
    let document = new jsPDF("p", "px", "letter");

    const pageWidth = document.internal.pageSize.width;
    const pageHeight = document.internal.pageSize.height;

    document.setDrawColor("#2563eb")
    document.setLineWidth(2)
    document.rect(25, 25, (pageWidth - 50), (pageHeight -50)) 
    document.rect(30, 30, (pageWidth - 60), (pageHeight - 60)) 

    document.setFont("times", "normal")
    document.setFontSize(8)
    document.text("REPUBLIC OF THE PHILIPPINES", pageWidth/2 , 40, { maxWidth: pageWidth, align: "center",})

    document.text("PROVINCE OF LAGUNA", pageWidth/2 ,48, { maxWidth: pageWidth, align: "center",})

    document.text("CITY OF SAN PEDRO", pageWidth/2 ,56, { maxWidth: pageWidth, align: "center",})

    document.text("BARANGAY UNITED BAYANIHAN", pageWidth/2 ,64, { maxWidth: pageWidth, align: "center",})

    document.setFont("helvetica", "bold")
    document.setFontSize(14)
    document.setTextColor("#2563eb")
    document.text("OFFICE OF THE BARANGAY CHAIRMAN", pageWidth/2 ,78, { maxWidth: pageWidth, align: "center",})

    document.setFont("times", "italic")
    document.setFontSize(8)
    document.setTextColor("")
    document.text("Tel No. (02) 961-43-44", pageWidth/2, 88, { maxWidth: pageWidth, align: "center",})
    document.addImage("/brgyLogo.png", 45,35,60,60)
    document.addImage("/PUP_San_Pedro_Logo.png", (pageWidth - 105),35,60,60)
    
    document.setLineWidth(1.5)
    // document.setDrawColor("#2563eb")
    document.line( 30, 100, pageWidth-30, 100)
    document.line((pageWidth * 0.32), 100, (pageWidth * 0.315), pageHeight - 30)

    document.setFont("helvetica", "bold")
    document.setFontSize(10)
    document.setTextColor("#b91c1c")
    document.text("Sangguniang Barangay", (pageWidth * 0.382)/2, 110, {maxWidth: (pageWidth * 0.382) * 0.80, align: "center" })

    let totalOfficialsBoxHeight = 112.5;

    officialsList.docs.map((doc, index)=>{
        let rectHeight; 
        let rectWidth;
        if(doc.data().departments === "") {rectHeight = 20} else {rectHeight = 40}
        (doc.data().name.length < 23 ? rectWidth = ((pageWidth * 0.382)-30) * 0.80:  ((pageWidth * 0.382)-30) * 0.75)

        document.setFont("helvetica", "bold")
        document.setFontSize(8      )
        document.setTextColor("")
        document.text((doc.data().positionOrder <= 3 ? "HON. " : "") + doc.data().name.toUpperCase(), (pageWidth * 0.382)/2, 10 + totalOfficialsBoxHeight,  {maxWidth: rectWidth, align: "center" })

        document.setFont("helvetica", "normal")
        document.setFontSize(8)
        document.setTextColor("#b91c1c")
        document.text((doc.data().posisyon == "" ? doc.data().position : doc.data().posisyon), (pageWidth * 0.382)/2, 18 + totalOfficialsBoxHeight, {maxWidth: ((pageWidth * 0.382)-30) * 0.80, align: "center" })

        document.setFontSize(8)
        document.setTextColor("")
        document.text(doc.data().departments??"", (pageWidth * 0.382)/2, 26 + totalOfficialsBoxHeight, {maxWidth: ((pageWidth * 0.382)-30)*.75, align: "center"})

        totalOfficialsBoxHeight += 5 + rectHeight;
    })

    // document.addImage( "/brgyWatermark3.png",(pageWidth * 0.325), ((pageHeight - 30) * 0.15) + 60, (pageWidth * 0.598), (pageHeight - 30) * 0.70)
    document.saveGraphicsState();
    document.setGState(new document.GState({opacity: 0.2}));
    document.setFontSize(50)
    // document.text(text, x, y, {align: 'center', baseline: 'middle'})
    document.text("SAMPLE ONLY", ((pageWidth * 0.325) + ((pageWidth * 0.598)*0.60)), ((((pageHeight - 30) * 0.15) + 60) + (((pageHeight - 30) * 0.70)*0.3)), {align: "center", angle: 315})
    document.restoreGraphicsState();

    document.setFont("times", "normal")
    document.setFontSize(20)
    document.text("CLEARANCE CERTIFICATE",  (pageWidth * 0.315) + ((pageWidth * 0.618) / 2), 126.5, {maxWidth: (pageWidth * .635) * 0.80, align: "center"})

    // document.setDrawColor("")
    document.setLineWidth(0.5)
    document.rect((pageWidth * 0.315) + 9.5, 104.5, (pageWidth * 0.685) - 49, 36)
    document.setLineWidth(1.5)
    document.rect((pageWidth * 0.315) + 11.5, 106.5, (pageWidth * 0.685) - 53, 32)
    document.setLineWidth(0.5)
    document.rect((pageWidth * 0.315) + 13.5, 108.5, (pageWidth * 0.685) - 57, 28)

    document.setFont("Times", "bold")
    document.setFontSize(12)
    document.text("TO WHOM IT MAY CONCERN:",(pageWidth * 0.315) + 9.5, 160)
    document.text("Clearance is hereby granted to person whose name, signature thumb mark appears below.", (pageWidth * 0.315) + 9.5, 180, {maxWidth: (pageWidth * .72) * 0.80 })
    
    document.text("NAME: " ,(pageWidth * 0.315) + 9.5, 210, {maxWidth: (pageWidth * .72) * 0.80 })
    document.setFontSize(15)
    document.setFont("Times", "bold")
    document.text(
        dataToView.lastName.toUpperCase() + ", " + dataToView.firstName.toUpperCase() + " " + dataToView?.middleName??"".toUpperCase(),
        ((pageWidth * 0.315) + 9.5) + (document.getTextWidth("NAME: ") - 7), 
        210, 
        {maxWidth: (pageWidth * .72) * 0.80}
    )

    // console.log(new Date(dataToView.birthDate))
    const birthDate = new Date(dataToView.birthDate)

    // document.setFont("Times", "normal" )
    document.setFontSize(12)
    document.text("BIRTHDATE: " ,(pageWidth * 0.315) + 9.5, 225, {maxWidth: (pageWidth * .72) * 0.80 })
    document.setFontSize(15)
    // document.setFont("Times", "bold")
    document.text(
        months[birthDate.getMonth()] + " " + birthDate.getDate() + ", " + birthDate.getFullYear(),
        ((pageWidth * 0.315) + 9.5) + (document.getTextWidth("BIRTHDATE: ") - 12), 
        225, 
        {maxWidth: (pageWidth * .72) * 0.80}
    )

    // document.setFont("Times", "normal" )
    document.setFontSize(12)
    document.text("CIVIL STATUS: " ,(pageWidth * 0.315) + 9.5, 240, {maxWidth: (pageWidth * .72) * 0.80 })
    document.setFontSize(15)
    // document.setFont("Times", "bold")
    document.text(
        "Single",
        ((pageWidth * 0.315) + 9.5) + (document.getTextWidth("CIVIL STATUS: ") - 15), 
        240, 
        {maxWidth: (pageWidth * .72) * 0.80}
    )
    // document.setFont("Times", "normal" )
    document.setFontSize(12)
    document.text("CITIZENSHIP: " ,(pageWidth * 0.315) + 9.5, 255, {maxWidth: (pageWidth * .72) * 0.80 })
    document.setFontSize(15)
    // document.setFont("Times", "bold")
    document.text(
        "Filipino",
        ((pageWidth * 0.315) + 9.5) + (document.getTextWidth("CITIZENSHIP: ") - 17), 
        255, 
        {maxWidth: (pageWidth * .72) * 0.80}
    )
    // document.setFont("Times", "normal" )
    document.setFontSize(12)
    document.text("ADDRESS: " ,(pageWidth * 0.315) + 9.5, 270, {maxWidth: (pageWidth * .72) * 0.80 })
    document.setFontSize(15)
    // document.setFont("Times", "bold")
    document.text(
        dataToView.completeAddress,
        ((pageWidth * 0.315) + 9.5) + (document.getTextWidth("ADDRESS: ") - 12), 
        270, 
        {maxWidth: ((pageWidth * .72) * 0.80) - (document.getTextWidth("ADDRESS: "))}
    )

    // document.setFont("Times", "bold" )
    document.setFontSize(12)
    document.text("REMARKS: NO RECORD ON FILE", ((pageWidth * 0.315) + 9.5), 320,)

    document.setDrawColor("")
    document.setLineWidth(1.25)
    document.line( (
        (pageWidth * 0.315) + 9.5) + document.getTextWidth("REMARKS: "), 
        322     , 
        ((pageWidth * 0.315) + 9.5) + document.getTextWidth("REMARKS: ") + (document.getTextWidth("NO RECORD ON FILE")), 
        322     
    )

    // document.setDrawColor("#16a34a")
    document.setLineWidth(1.5)
    document.setFillColor("#ffffff")
    // document.fillRect()
    document.rect(((pageWidth * 0.315) + 9.5), 335, 130, 65, "F")
    document.rect(((pageWidth * 0.315) + 9.5), 335, 130, 65)
    document.line(((pageWidth * 0.315) + 9.5)+65, 335, ((pageWidth * 0.315) + 9.5)+65, 400)
    
    document.setFont("Times", 'normal')
    document.text("Left", ((pageWidth * 0.315) + 9.5) + 32.5, 415, {align: "center"})
    document.text("Right", ((pageWidth * 0.315) + 9.5) + 97.5, 415, {align: "center"})
    document.setFont("Times", 'bold')
    document.text("Thumb Marks", ((pageWidth * 0.315) + 9.5) + 65, 435, {align: "center"})

    document.setDrawColor("")
    document.line(((pageWidth * 0.315) + 9.5) + 130, 430, 
        (((pageWidth * 0.315) + 9.5) + 130) + document.getTextWidth("Signature of Requesting Individual"), 430
    )
    document.setFont("Times", 'normal')
    document.text("Signature of Requesting Individual", ((pageWidth * 0.315) + 9.5) + 133, 440)
    
    document.setFont("Times", "bold")
    document.text("THIS CLEARANCE IS HEREBY ISSUED FOR THE PURPOSES OF:",  ((pageWidth * 0.315) + 9.5), 455, {maxWidth: ((pageWidth * 0.70)-19)/2})
    
    document.setFont("Times", "normal")
    document.text("For: " + dataToView.docPurpose.toUpperCase(), ((pageWidth * 0.315) + 9.5), 480)
    document.text("Date Clearance Issued: " + months[new Date().getMonth()] + " " + new Date().getDate() + ", " + new Date().getFullYear(), 
        ((pageWidth * 0.315) + 9.5), 490
    )
    
    const officials = officialsList.docs.map((doc)=>({...doc.data()}))
    const chairman = officials.find((item) => item.positionOrder === 1)
    console.log(chairman)
    document.line(((pageWidth * 0.315) + 9.5) + 130, 520, 
        (((pageWidth * 0.315) + 9.5) + 130) + document.getTextWidth("HON. " + chairman.name.toUpperCase()) + 7.5, 520
    )
    // document.setFont("Times", 'normal')
    document.text("HON. " + chairman.name.toUpperCase(), ((pageWidth * 0.315) + 9.5) + 133, 530)
    // document.setFontSize(10)
    document.setTextColor("#b91c1c")
    document.text("Barangay Chairman", ((pageWidth * 0.315) + 9.5) + 130 + ((document.getTextWidth("HON. " + chairman.name.toUpperCase()) + 7.5)/2), 540, {align: "center"})

    document.setFontSize(10)
    document.setTextColor("")
    document.text("This document is issued for research puposes only and does not represent any actual document issued by the office of Barangay United Bayanihan.", pageWidth/2, pageHeight -17, {maxWidth: (pageWidth - 80), align: "center"})

    document.save((dataToView.lastName + ", " + dataToView.firstName + " " + dataToView?.middleName??"") + "_Clearance.pdf")
}