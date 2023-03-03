import { months } from "../stores";
import { jsPDF } from "jspdf"
import "jspdf-autotable";

export function indigency(officialsList, dataToView){
    let indigency = new jsPDF("p", "px", "letter");

    const pageWidth = indigency.internal.pageSize.width;
    const pageHeight = indigency.internal.pageSize.height;
    // const fontList = document.getFontList();

    // document.rect(headerBoxX, headerBoxY, pageWidth, headerBoxHeight);
    indigency.setFont("times", "normal")
    indigency.setFontSize(8)
    indigency.text("REPUBLIC OF THE PHILIPPINES", pageWidth/2 ,10, { maxWidth: pageWidth, align: "center",})

    indigency.text("PROVINCE OF LAGUNA", pageWidth/2 ,18, { maxWidth: pageWidth, align: "center",})

    indigency.text("CITY OF SAN PEDRO", pageWidth/2 ,26, { maxWidth: pageWidth, align: "center",})

    indigency.text("BARANGAY UNITED BAYANIHAN", pageWidth/2 ,34, { maxWidth: pageWidth, align: "center",})

    indigency.setFont("helvetica", "bold")
    indigency.setFontSize(14)
    indigency.setTextColor("#16a34a")
    indigency.text("OFFICE OF THE BARANGAY CHAIRMAN", pageWidth/2 ,48, { maxWidth: pageWidth, align: "center",})

    indigency.setFont("times", "italic")
    indigency.setFontSize(8)
    indigency.setTextColor("")
    indigency.text("Tel No. (02) 961-43-44", pageWidth/2 ,58, { maxWidth: pageWidth, align: "center",})
    indigency.addImage("/brgyLogo.png", 15,5,60,60)
    
    indigency.setLineWidth(1.5)
    indigency.setDrawColor("#2563eb")
    indigency.line( 5, 70, pageWidth-5, 70)
    indigency.line(pageWidth * 0.28, 70, pageWidth * 0.28, pageHeight - 20)

    indigency.setFont("helvetica", "bold")
    indigency.setFontSize(10)
    indigency.setTextColor("#b91c1c")
    indigency.text("Sangguniang Barangay", (pageWidth * 0.28)/2, 80, {maxWidth: (pageWidth * 0.28) * 0.80, align: "center" })

    // console.log(indigency.getFontList())

    let totalOfficialsBoxHeight = 85;

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

    // indigency.rect()
    indigency.setFont("times", "normal")
    indigency.setFontSize(20)
    indigency.text("CERTIFICATE OF INDIGENCY",  (pageWidth * 0.28) + ((pageWidth * 0.72) / 2), 102.5, {maxWidth: (pageWidth * 72) * 0.80, align: "center"})

    indigency.setDrawColor("")
    indigency.setLineWidth(0.5)
    indigency.rect((pageWidth * 0.28) + 9.5, 79.5, (pageWidth * 0.72) - 19, 36)
    indigency.setLineWidth(1.5)
    indigency.rect((pageWidth * 0.28) + 11.5, 81.5, (pageWidth * 0.72) - 23, 32)
    indigency.setLineWidth(0.5)
    indigency.rect((pageWidth * 0.28) + 13.5, 83.5, (pageWidth * 0.72) - 27, 28)

    indigency.addImage( "/brgyWatermark3.png",(pageWidth * 0.28) + 9.5, 125.5, (pageWidth * 0.72) - 19, (pageWidth * 0.72) - 19)


    indigency.save("indigency.pdf")
}