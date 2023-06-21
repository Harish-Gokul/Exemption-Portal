//currentStudentExe
let studentObj;
let credit_count=0;
let requestAccepted =0;
let requestRejected =0;


function loadDataLS()
{
    var rawData = localStorage.getItem("currentStudentExe");
    if(rawData == null)
    { 
        alert("Invalid Login")
        window.open("../exemption_login/exe_login_index.html","_self")
        return
    }
    studentObj = JSON.parse(rawData);
 

    renderStudentData()
    displayStudentDetails(credit_count,requestAccepted,requestRejected,studentObj.name)
}
function displayStudentDetails(creditCount,requestAccepted,requestRejected,dispName)
{
    dispStudentName.innerText =studentObj.name;
    dispRollNo.innerText = studentObj.rollNo;
    dispDepartment.innerText = studentObj.departmentName;
    dispCreditEarned.innerText = creditCount;
    dispAcceptedCount.innerText = requestAccepted;
    dispRejectedCount.innerText = requestRejected;
    dispHeaderName.innerText = dispName
}



function renderStudentData()
{
    getTbody.innerHTML =""
    let internshipCount =0;
    let onlineCourseCount=0;
    if(isNaN(parseInt(studentObj.internshipCount)) ==true){
        internshipCount =studentObj.internshipCount.length;
        
   }
   if(isNaN(parseInt(studentObj.onlineCourseCount))==true){
        onlineCourseCount = studentObj.onlineCourseCount.length
     
   }
   for(let ic=0;ic<studentObj.internshipCount.length;ic++)
   {
    
    let eachIntenData =studentObj.internshipCount[ic];
 
    let weeks = Math.floor(eachIntenData.daysAttented/7);
    let credits=0;
    if(weeks <=2)
    credits =1;
    else if ((weeks >2)&&(weeks<=4))
    credits =2;
    else{
        credits =3;
    }
    let eligibility = "Yes";
    if(eachIntenData.iseligiblieForExemption ==false){
    requestRejected++;
    credits=0;
    eligibility ="No"
    }
    else{
        requestAccepted++;
    }
    credit_count+=credits;
    console.group()
    console.log("object - ",eachIntenData);
    console.log(weeks)
    console.log(credits);
    console.log(eligibility)
    console.groupEnd()
    buildHTML(eachIntenData.bipId,"Intenship",eachIntenData.courseName,weeks,credits,eligibility)
   }

   for(let oc=0;oc<studentObj.onlineCourseCount.length;oc++)
   {
    
    let eachOnlineData =studentObj.onlineCourseCount[oc];
    let weeks = Math.floor(eachOnlineData.daysAttented/7);
    let credits=0;
    if(weeks <=2)
    credits =1;
    else if ((weeks >2)&&(weeks<=4))
    credits =2;
    else{
        credits =3;
    }
    let eligibility = "Yes";
    if(eachOnlineData.iseligiblieForExemption ==false){
    credits=0;
    requestRejected++;
    eligibility ="No"
    }
    else{
        requestAccepted++;
    }
    credit_count+=credits;
    buildHTML(eachOnlineData.bipId,"online Course",eachOnlineData.courseName,weeks,credits,eligibility)
   }

}


function buildHTML(bipId,Category,courseName,weeksAttented,creditsEarned,isValidForExemption)
{
    let tr = document.createElement("tr")
    let tdBipId = document.createElement("td")
    tdBipId.innerText = bipId;
    tr.appendChild(tdBipId);
    let tdCategory = document.createElement("td");
    tdCategory.innerText = Category;
    tr.appendChild(tdCategory)
    let tdCourseName = document.createElement("td");
    tdCourseName.innerText = courseName;
    tr.appendChild(tdCourseName)
    let tdWeeks = document.createElement("td")
    tdWeeks.innerText = weeksAttented;
    tr.appendChild(tdWeeks)
    let tdCredits =document.createElement("td");
    tdCredits.innerText =  creditsEarned;
    tr.appendChild(tdCredits)
    let tdVerify = document.createElement("td")
    tdVerify.innerText = isValidForExemption;
    tr.appendChild(tdVerify)
    if(isValidForExemption == "Yes")
    {
        tr.style.backgroundColor ="rgba(103, 234, 103, 0.256)";
    }
    else{
        tr.style.backgroundColor ="rgba(234, 103, 103, 0.24)";
    }
    getTbody.appendChild(tr)

}