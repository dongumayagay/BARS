import { months, ordinals } from "../stores";
import { jsPDF } from "jspdf"
import "jspdf-autotable";

export function indigency(officialsList, dataToView){
    let indigency = new jsPDF("p", "px", "letter");

    const pageWidth = indigency.internal.pageSize.width;
    const pageHeight = indigency.internal.pageSize.height;
    
    indigency.setFont("times", "normal")
    indigency.setFontSize(8)
    indigency.text("REPUBLIC OF THE PHILIPPINES", pageWidth/2 ,10, { maxWidth: pageWidth, align: "center",})

    indigency.text("PROVINCE OF LAGUNA", pageWidth/2 ,18, { maxWidth: pageWidth, align: "center",})

    indigency.text("CITY OF SAN PEDRO", pageWidth/2 ,26, { maxWidth: pageWidth, align: "center",})

    indigency.text("BARANGAY UNITED BAYANIHAN", pageWidth/2 ,34, { maxWidth: pageWidth, align: "center",})

    indigency.setFont("helvetica", "bold")
    indigency.setFontSize(14)
    indigency.setTextColor("#2563eb")
    indigency.text("OFFICE OF THE BARANGAY CHAIRMAN", pageWidth/2 ,48, { maxWidth: pageWidth, align: "center",})

    indigency.setFont("times", "italic")
    indigency.setFontSize(8)
    indigency.setTextColor("")
    indigency.text("Tel No. (02) 961-43-44", pageWidth/2 ,58, { maxWidth: pageWidth, align: "center",})
    indigency.addImage("/brgyLogo.png", 15,5,60,60)
    indigency.addImage("/PUP_San_Pedro_Logo.png", pageWidth-80,5,60,60)
    
    indigency.setLineWidth(1.5)
    indigency.setDrawColor("#2563eb")
    indigency.line( 5, 70, pageWidth-5, 70)
    indigency.line(pageWidth * 0.28, 70, pageWidth * 0.28, pageHeight - 20)

    indigency.setFont("helvetica", "bold")
    indigency.setFontSize(10)
    indigency.setTextColor("#b91c1c")
    indigency.text("Sangguniang Barangay", (pageWidth * 0.28)/2, 80, {maxWidth: (pageWidth * 0.28) * 0.80, align: "center" })
    

    let totalOfficialsBoxHeight = 85;

    // prints the officials list on the left-side
    officialsList.docs.map((doc, index)=>{
        let rectHeight; 
        if(doc.data().departments === "") {rectHeight = 20} else {rectHeight = 47}
        // indigency.rect( (pageWidth * 0.28) * 0.05, 5 + totalOfficialsBoxHeight, (pageWidth * 0.28)*0.9, rectHeight)

        indigency.setFont("helvetica", "bold")
        indigency.setFontSize(8      )
        indigency.setTextColor("")
        indigency.text((doc.data().positionOrder <= 3 ? "HON. " : "") + doc.data().name.toUpperCase(), (pageWidth * 0.28)/2, 10 + totalOfficialsBoxHeight,  {maxWidth: (pageWidth * 0.28) * 0.90, align: "center" })

        indigency.setFont("helvetica", "normal")
        indigency.setFontSize(8)
        indigency.setTextColor("#b91c1c")
        indigency.text((doc.data().posisyon == "" ? doc.data().position : doc.data().posisyon), (pageWidth * 0.28)/2, 18 + totalOfficialsBoxHeight, {maxWidth: (pageWidth * 0.28) * 0.80, align: "center" })

        indigency.setFontSize(8)
        indigency.setTextColor("")
        indigency.text(doc.data().departments??"", (pageWidth * 0.28)/2, 26 + totalOfficialsBoxHeight, {maxWidth: (pageWidth * 0.28) * 0.80, align: "center" })

        totalOfficialsBoxHeight += 5 + rectHeight;
    })

    indigency.saveGraphicsState();
    indigency.setGState(new indigency.GState({opacity: 0.2}));
    indigency.setFontSize(60)
    indigency.text("SAMPLE ONLY", ((pageWidth * 0.325) + ((pageWidth * 0.598)*0.60)+15), ((((pageHeight - 30) * 0.15) + 60) + (((pageHeight - 30) * 0.70)*0.3)), {align: "center", angle: 315})
    indigency.restoreGraphicsState();


    // indigency.rect()
    indigency.setFont("times", "bold")
    indigency.setFontSize(20)
    indigency.text("CERTIFICATE OF INDIGENCY",  (pageWidth * 0.28) + ((pageWidth * 0.72) / 2), 102.5, {maxWidth: (pageWidth * 72) * 0.80, align: "center"})

    // indigency.setDrawColor("")   
    indigency.setLineWidth(0.5)
    indigency.rect((pageWidth * 0.28) + 9.5, 79.5, (pageWidth * 0.72) - 19, 36)
    indigency.setLineWidth(1.5)
    indigency.rect((pageWidth * 0.28) + 11.5, 81.5, (pageWidth * 0.72) - 23, 32)
    indigency.setLineWidth(0.5)
    indigency.rect((pageWidth * 0.28) + 13.5, 83.5, (pageWidth * 0.72) - 27, 28)

    // indigency.addImage( "/brgyWatermark3.png",(pageWidth * 0.28) + 9.5, 125.5, (pageWidth * 0.72) - 19, (pageWidth * 0.72) - 19)
     //for the header 
    //  indigency.setFont("times", "bold")
    //  indigency.setFontSize(18)
    //  indigency.setTextColor("black")
    //  indigency.text("CERTIFICATE OF INDIGENCY", (pageWidth * 0.63), 90, { maxWidth: pageWidth, align: "center",})
     
     //for the letter
    //  indigency.setFont("times", "bold")

    indigency.setFont("times", "bold")
    indigency.setFontSize(15)
    indigency.text("TO WHOM IT MAY CONCERN: ", (pageWidth * 0.28) + 9.5, 140)
    indigency.text("This certification is hereby granted to:", (pageWidth * 0.28) + 9.5, 170)

    // indigency.setFont("Times.")
    indigency.setFontSize(12)
    indigency.text("NAME: " ,(pageWidth * 0.28) + 9.5, 200, {maxWidth: (pageWidth * .72) * 0.80 })
    indigency.setFontSize(15)
    indigency.setFont("Times", "bold")
    indigency.text(
        dataToView.lastName.toUpperCase() + ", " + dataToView.firstName.toUpperCase() + " " + dataToView?.middleName??"".toUpperCase(),
        ((pageWidth * 0.28) + 9.5) + (indigency.getTextWidth("NAME: ") - 7), 
        200, 
        {maxWidth: (pageWidth * .72) * 0.80}
    )

    // console.log(new Date(dataToView.birthDate))
    const birthDate = new Date(dataToView.birthDate)

    indigency.setFont("Times", "bold" )
    indigency.setFontSize(12)
    indigency.text("BIRTHDATE: " ,(pageWidth * 0.28) + 9.5, 215, {maxWidth: (pageWidth * .72) * 0.80 })
    indigency.setFontSize(15)
    indigency.setFont("Times", "bold")
    indigency.text(
        months[birthDate.getMonth()] + " " + birthDate.getDate() + ", " + birthDate.getFullYear(),
        ((pageWidth * 0.28) + 9.5) + (indigency.getTextWidth("BIRTHDATE: ") - 10), 
        215, 
        {maxWidth: (pageWidth * .72) * 0.80}
    )

    // indigency.setFont("Times", "normal" )
    indigency.setFontSize(12)
    indigency.text("CIVIL STATUS: " ,(pageWidth * 0.28) + 9.5, 230, {maxWidth: (pageWidth * .72) * 0.80 })
    indigency.setFontSize(15)
    // indigency.setFont("Times", "bold")
    indigency.text(
        dataToView.civilStatus??"Single",
        ((pageWidth * 0.28) + 9.5) + (indigency.getTextWidth("CIVIL STATUS: ") - 13), 
        230, 
        {maxWidth: (pageWidth * .72) * 0.80}
    )
    // indigency.setFont("Times", "normal" )
    indigency.setFontSize(12)
    indigency.text("CITIZENSHIP: " ,(pageWidth * 0.28) + 9.5, 245, {maxWidth: (pageWidth * .72) * 0.80 })
    indigency.setFontSize(15)
    // indigency.setFont("Times", "bold")
    indigency.text(
        dataToView.nationality??"Filipino",
        ((pageWidth * 0.28) + 9.5) + (indigency.getTextWidth("CITIZENSHIP: ") - 15), 
        245, 
        {maxWidth: (pageWidth * .72) * 0.80}
    )
    // indigency.setFont("Times", "normal" )
    indigency.setFontSize(12)
    indigency.text("ADDRESS: " ,(pageWidth * 0.28) + 9.5, 260, {maxWidth: (pageWidth * .72) * 0.80 })
    indigency.setFontSize(15)
    // indigency.setFont("Times", "bold")
    indigency.text(
        dataToView.completeAddress,
        ((pageWidth * 0.28) + 9.5) + (indigency.getTextWidth("ADDRESS: ") - 10), 
        260, 
        {maxWidth: (pageWidth * 0.72) - (indigency.getTextWidth("ADDRESS: ")+19)}
    )


    //  indigency.setFontSize(12)
    //  indigency.text("Name nung nag request or guardian", (pageWidth * 0.30), totalHeightOfLetter, {maxWidth: (pageWidth*0.9) })
     
     indigency.setFont("times", "normal")
     indigency.setFontSize(15)
    
     let totalHeightOfLetter = 300;
     let guardianStatement = "";
     let guardianInfo = dataToView.guardianInfo??""
     console.log(guardianInfo)

     if(!!guardianInfo){
        switch(guardianInfo.guardianship){
            case "singleParent":
                // const parentsRelationObject = JSON.parse(guardianInfo.parentsRelation);
                // console.log(parentsRelationObject)
                guardianStatement = guardianInfo.parentsRelation + " " + (guardianInfo.parentsRelation === "mother" ? guardianInfo.mother.toUpperCase() : guardianInfo.father.toUpperCase());
                break;
            case "parents":
                guardianStatement = "parents " + guardianInfo.father.toUpperCase() + " and " + guardianInfo.mother.toUpperCase();
                break;
            case "guardian":
                guardianStatement = "guardian " + guardianInfo.guardian.toUpperCase();
                break;
            default:
                break;
        }
        console.log(guardianStatement)
     }
     $: console.log(guardianInfo.guardianship === "singleParent")

     if(!!guardianStatement){
         indigency.text("    This is to certify that his/her " + guardianStatement + " that also resides at the ABOVE ADDRESS belongs to the low income group and has no permanent source of income", (pageWidth * 0.30), totalHeightOfLetter, {maxWidth: pageWidth*0.68, lineHeightFactor: 1.5, align: "justify"})
         totalHeightOfLetter += 65;
    } else {
        indigency.text("    This is to certify that ABOVE NAMED PERSON belongs to the low income group and has no permanent source of income", (pageWidth * 0.30), totalHeightOfLetter, {maxWidth: pageWidth*0.68, lineHeightFactor: 1.5, align: "justify"})
        totalHeightOfLetter += 45;
            
     }
     
     indigency.text("     This is issued as per request for a/an " + dataToView.docPurpose.toUpperCase() + " requirement for the ABOVE NAMED PERSON", (pageWidth * 0.30), totalHeightOfLetter, {maxWidth: pageWidth*0.68, lineHeightFactor: 1.5})
     totalHeightOfLetter += 130;
    //  indigency.setFont("times", "bold")
    //  indigency.text("Name ng resident", (pageWidth * 0.30), totalHeightOfLetter+75, {maxWidth: pageWidth*0.68})
    //  //name of barangay captain
    //  indigency.text("HON. (name ni kap)", (pageWidth * 0.80), totalHeightOfLetter+125, {maxWidth: pageWidth*0.80, align:"center"})
    //  indigency.setLineWidth(1.5)
    //  indigency.setDrawColor("black")
    //  indigency.line(pageWidth * 0.70, totalHeightOfLetter+130, pageWidth * 0.90, totalHeightOfLetter+130)
    //  indigency.setTextColor("#b91c1c")
    //  indigency.text("Barangay Captain", (pageWidth * 0.80), totalHeightOfLetter+140, {maxWidth: pageWidth*0.80, align:"center"})
    const today = new Date();
    indigency.setFont("times", "bold")
    indigency.setFontSize(15)
    indigency.text("Given this " + today.getDate() + ordinals[today.getDate() % 10] + " day of " + months[today.getMonth()] + ", " + today.getFullYear() + " at United Bayanihan, San Pedro City, Laguna.",  
        (pageWidth * 0.28) + ((pageWidth * 0.72) / 2), 430, {maxWidth: (pageWidth * 0.72) * 0.70, align: "center"}
    )

    const officials = officialsList.docs.map((doc)=>({...doc.data()}))
    const chairman = officials.find((item) => item.positionOrder === 1)
    console.log(chairman)
    indigency.line(((pageWidth * 0.315) + 9.5) + 130, 520, 
        (((pageWidth * 0.315) + 9.5) + 130) + indigency.getTextWidth("HON. " + chairman.name.toUpperCase()) + 7.5, 520
    )
    // indigency.setFont("Times", 'normal')
    indigency.text("HON. " + chairman.name.toUpperCase(), ((pageWidth * 0.315) + 9.5) + 133, 530)
    // indigency.setFontSize(10)
    indigency.setTextColor("#b91c1c")
    indigency.text("Barangay Chairman", ((pageWidth * 0.315) + 9.5) + 130 + ((indigency.getTextWidth("HON. " + chairman.name.toUpperCase()) + 7.5)/2), 540, {align: "center"})

    indigency.setFontSize(10)
    indigency.setTextColor("")
    indigency.text("This document is issued for capstone requirements puposes only and does not represent any actual document issued by the office of Barangay United Bayanihan.", pageWidth/2, pageHeight -13, {maxWidth: (pageWidth - 80), align: "center"})

    indigency.save("indigency.pdf")
}