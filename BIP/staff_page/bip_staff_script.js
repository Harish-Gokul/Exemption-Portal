var rollNoQueue = [];
var studentObjs = [];

function loadFromLS()
{
var rawDataClgData = localStorage.getItem("studentsData");
    if(rawDataClgData == null)
    {
      localStorage.setItem("studentsData",JSON.stringify(clgData))
      rawDataClgData = localStorage.getItem("studentsData");
    }
    clgData = JSON.parse(rawDataClgData);

    var rawQueueData = localStorage.getItem("bipQueueStudentData");
     
    if(rawQueueData == null)
    {
        localStorage.setItem("bipQueueStudentData",JSON.stringify([]))
        rawQueueData =localStorage.getItem("bipQueueStudentData");
    }
    rollNoQueue =JSON.parse(rawQueueData);

    for(let i =0;i<rollNoQueue.length;i++)
    {
        getStudent(rollNoQueue[i])
    }
     
    renderStudentDetails(studentObjs)
}

function searchStudent()
{
    let filterStudent =[];
    let studetnRollNo = searchInput.value.toUpperCase()
    for(let i =0;i<studentObjs.length;i++)
    {
        if(studentObjs[i].rollNo == studetnRollNo)
        {
            filterStudent.push(studentObjs[i]);
            break;
        }
    }
 
    if(filterStudent.length !=0)
   renderStudentDetails(filterStudent)
   else{
    renderStudentDetails(studentObjs)
   }
   
}
function renderStudentDetails(studentObjs)
{
    let listCount =0;
    tableBodyHTML.innerHTML ="";
    for(let i =0;i<studentObjs.length;i++)
    {
        
        let internshipCount =0;
        let onlineCourseCount=0;
        //console.log(studentObjs[i])
        if(isNaN(parseInt(studentObjs[i].internshipCount)) ==true){
            internshipCount =studentObjs[i].internshipCount.length;
       }
       if(isNaN(parseInt(studentObjs.onlineCourseCount))==true){
            onlineCourseCount = studentObjs[i].onlineCourseCount.length
       }
       for(let ic=0;ic<internshipCount;ic++)
       {
        let url = `https://bip.bitsathy.ac.in/nova/resources/student-action-plan-internships?student-action-plan-internships_page=1&student-action-plan-internships_search=${studentObjs[i].internshipCount[ic].bipId}`
        
        if(studentObjs[i].internshipCount[ic].verification== false){
            listCount++;
        buildHtml(studentObjs[i].rollNo,studentObjs[i].name,studentObjs[i].departmentName,"Internship",studentObjs[i].internshipCount[ic].courseName,studentObjs[i].internshipCount[ic].daysAttented,studentObjs[i].internshipCount[ic].optingFor,JSON.stringify(studentObjs[i].internshipCount[ic]),url,studentObjs[i].internshipCount[ic].bipId)
    }

       }
       for(let oc=0;oc<onlineCourseCount;oc++)
       {
        let url = `https://bip.bitsathy.ac.in/nova/resources/student-action-plan-online-courses?student-action-plan-online-courses_page=1&student-action-plan-online-courses_search=${studentObjs[i].onlineCourseCount[oc].bipId}`
        if(studentObjs[i].onlineCourseCount[oc].verification == false){
            listCount++;
        buildHtml(studentObjs[i].rollNo,studentObjs[i].name,studentObjs[i].departmentName,"Online Course",studentObjs[i].onlineCourseCount[oc].courseName,studentObjs[i].onlineCourseCount[oc].daysAttented,studentObjs[i].onlineCourseCount[oc].optingFor,JSON.stringify(studentObjs[i].onlineCourseCount[oc]),url,studentObjs[i].onlineCourseCount[oc].bipId)
    }

       }

      // console.log(internshipCount)
      // console.log(onlineCourseCount)
      localStorage.setItem("listCount",listCount);
    }

}

function buildHtml(rollNo,name,department,courseOrInternship,daysAttented,courseName,optingFor,id,url,bipId)
{
    let tr = document.createElement("tr")
    tr.id = id;
    let tdRoll = document.createElement("td")
    tdRoll.innerText = rollNo;
    tr.appendChild(tdRoll);
    let tdName = document.createElement("td")
    tdName.innerText =name;
    tr.appendChild(tdName)
    let tdDepartment =document.createElement("td")
    tdDepartment.innerText = department;
    tr.appendChild(tdDepartment)
    let tdCourse = document.createElement("td")
    tdCourse.innerText = courseOrInternship;
    tr.appendChild(tdCourse)
    let tdDays = document.createElement("td")
    tdDays.innerText = daysAttented;
    tr.appendChild(tdDays)

    let tdCourseName = document.createElement("td")
    tdCourseName.innerText = courseName
    tr.appendChild(tdCourseName)

    let tdOpting = document.createElement("td")
    tdOpting.innerText = optingFor;
    tr.appendChild(tdOpting)
    let tdBip = document.createElement("td")
    let aTag = document.createElement("a")
    aTag.href = url;
    aTag.target = "_blank"
    aTag.innerText = bipId
    tdBip.appendChild(aTag)
    tr.appendChild(tdBip)
    let tdButtons = document.createElement("td")
    let createApproveBtn = document.createElement("button")
    createApproveBtn.innerText ="Approve"
    createApproveBtn.className = "btn btn-info";
     
    let attributeApproveBtn = document.createAttribute("onclick")
    attributeApproveBtn.value=`approveBtn(this)`;
    createApproveBtn.setAttributeNode(attributeApproveBtn)

    tdButtons.appendChild(createApproveBtn)
    let createRejectBtn = document.createElement("button")
    createRejectBtn.innerText ="Reject"
    createRejectBtn.className = "btn btn-danger"
    createRejectBtn.style = "margin-left: 10px"

    let attributeRejectBtn = document.createAttribute("onclick")
    attributeRejectBtn.value=`rejectBtn(this)`;
    createRejectBtn.setAttributeNode(attributeRejectBtn)

    tdButtons.appendChild(createRejectBtn)
    tr.appendChild(tdButtons)
    tableBodyHTML.appendChild(tr)

}


function approveBtn(objValue)
{
     let trData =objValue.parentElement.parentElement
     let rollNoFromTable = trData.children[0].innerText;
     let onlineCourseOrInternship = trData.children[3].innerText;
     let bipIdFromTable = trData.children[7].innerText;
     let studentObj;
    
     for(let i =0;i<studentObjs.length;i++)
     {
        let eachObj = studentObjs[i]
        if(eachObj.rollNo == rollNoFromTable)
        studentObj = eachObj;
     }
     
     if(onlineCourseOrInternship == "Internship")
     {
        let internshipArr =studentObj.internshipCount;
        let internshipObj;
        for(let i =0;i<internshipArr.length;i++)
        {
            let eachObject = internshipArr[i];
            if(eachObject.bipId == bipIdFromTable)
            {
                internshipObj =eachObject;
            }
        }
 
        internshipObj.iseligiblieForExemption = true;
        internshipObj.verification= true;
     }

     else if(onlineCourseOrInternship == "Online Course")
     {
        let onlineCouseArr = studentObj.onlineCourseCount;
        let onlineCourseObj;
        for(let i =0;i<onlineCouseArr.length;i++)
        {
            let eachCourseObj = onlineCouseArr[i]
            if(eachCourseObj.bipId == bipIdFromTable)
            {
                onlineCourseObj =eachCourseObj
            }
        }
        onlineCourseObj.iseligiblieForExemption = true;
        onlineCourseObj.verification= true;
     }
     localStorage.setItem("studentsData",JSON.stringify(clgData));
     renderStudentDetails(studentObjs)
 
     
}


function rejectBtn(objValue)
{
  
    let trData =objValue.parentElement.parentElement
    let rollNoFromTable = trData.children[0].innerText;
    let onlineCourseOrInternship = trData.children[3].innerText;
    let bipIdFromTable = trData.children[7].innerText;
    let studentObj;
   
    for(let i =0;i<studentObjs.length;i++)
    {
       let eachObj = studentObjs[i]
       if(eachObj.rollNo == rollNoFromTable)
       studentObj = eachObj;
    }
    
    if(onlineCourseOrInternship == "Internship")
    {
       let internshipArr =studentObj.internshipCount;
       let internshipObj;
       for(let i =0;i<internshipArr.length;i++)
       {
           let eachObject = internshipArr[i];
           if(eachObject.bipId == bipIdFromTable)
           {
               internshipObj =eachObject;
           }
       }

       internshipObj.iseligiblieForExemption = false;
       internshipObj.verification= true;
    }

    else if(onlineCourseOrInternship == "Online Course")
    {
       let onlineCouseArr = studentObj.onlineCourseCount;
       let onlineCourseObj;
       for(let i =0;i<onlineCouseArr.length;i++)
       {
           let eachCourseObj = onlineCouseArr[i]
           if(eachCourseObj.bipId == bipIdFromTable)
           {
               onlineCourseObj =eachCourseObj
           }
       }
       onlineCourseObj.iseligiblieForExemption = false;
       onlineCourseObj.verification= true;
    }
    localStorage.setItem("studentsData",JSON.stringify(clgData));
    renderStudentDetails(studentObjs);
    
}



function getStudent(rollNumber)
{
   let departments = ["AE","AG","AU","BM","BT","CE","CB","CS","CT","EE","EC","EI","FT","FD","IT","SE","ME","MC","TX","AD","AL"]
    var speficDepStudent = pushDepartmentstudent(returnDepFromRollNo(rollNumber));
    for(let i =0;i<speficDepStudent.length;i++)
    {
      let eachStudentObj = speficDepStudent[i];
 
      if(eachStudentObj.rollNo == rollNumber)
      {
        studentObjs.push(eachStudentObj);
      }
    }
}

function returnDepFromRollNo(string)
{
  var departmentString =""
  for(let i =0;i<string.length;i++)
  {
    if((string[i]>=0)&&(string[i]<=9)){}
    else
    departmentString += string[i].toUpperCase()
  }
  return departmentString;
}



function pushDepartmentstudent(depFromRoll)
{
  var depStudentAllBatch =[];
 if(depFromRoll =="AE")
 {
  depStudentAllBatch.push(clgData["batch2024"]["aero"])
  depStudentAllBatch.push(clgData["batch2025"]["aero"])
  depStudentAllBatch.push(clgData["batch2026"]["aero"])
 } 
 else if(depFromRoll =="AG")
 {
  depStudentAllBatch.push(clgData["batch2024"]["agri"])
  depStudentAllBatch.push(clgData["batch2025"]["agri"])
  depStudentAllBatch.push(clgData["batch2026"]["agri"])
 }
 else if (depFromRoll =="AU")
 {
  depStudentAllBatch.push(clgData["batch2024"]["auto"])
  depStudentAllBatch.push(clgData["batch2025"]["auto"])
  depStudentAllBatch.push(clgData["batch2026"]["auto"])
 }
 else if (depFromRoll =="BM")
 {
  depStudentAllBatch.push(clgData["batch2024"]["biomedical"])
  depStudentAllBatch.push(clgData["batch2025"]["biomedical"])
  depStudentAllBatch.push(clgData["batch2026"]["biomedical"])
 }
 else if (depFromRoll=="BT")
 {
  depStudentAllBatch.push(clgData["batch2024"]["bt"])
  depStudentAllBatch.push(clgData["batch2025"]["bt"])
  depStudentAllBatch.push(clgData["batch2026"]["bt"])
 }
 else if(depFromRoll =="CE")
 {
    depStudentAllBatch.push(clgData["batch2024"]["civil"])
    depStudentAllBatch.push(clgData["batch2025"]["civil"])
    depStudentAllBatch.push(clgData["batch2026"]["civil"])
 }
 else if(depFromRoll =="CB")
 {
  depStudentAllBatch.push(clgData["batch2024"]["csbs"])
  depStudentAllBatch.push(clgData["batch2025"]["csbs"])
  depStudentAllBatch.push(clgData["batch2026"]["csbs"])
 }
 else if(depFromRoll =="CS")
 {
  depStudentAllBatch.push(clgData["batch2024"]["cse"])
  depStudentAllBatch.push(clgData["batch2025"]["cse"])
  depStudentAllBatch.push(clgData["batch2026"]["cse"])
 }
 else if(depFromRoll =="CT")
 {
  depStudentAllBatch.push(clgData["batch2024"]["ct"])
  depStudentAllBatch.push(clgData["batch2025"]["ct"])
  depStudentAllBatch.push(clgData["batch2026"]["ct"])
 }
 else if(depFromRoll=="EE")
 {
  depStudentAllBatch.push(clgData["batch2024"]["eee"])
  depStudentAllBatch.push(clgData["batch2025"]["eee"])
  depStudentAllBatch.push(clgData["batch2026"]["eee"])
 }
 else if(depFromRoll=="EC")
 {
  depStudentAllBatch.push(clgData["batch2024"]["ece"])
  depStudentAllBatch.push(clgData["batch2025"]["ece"])
  depStudentAllBatch.push(clgData["batch2026"]["ece"])
 }
 else if(depFromRoll=="EI")
 {
  depStudentAllBatch.push(clgData["batch2024"]["eie"])
  depStudentAllBatch.push(clgData["batch2025"]["eie"])
  depStudentAllBatch.push(clgData["batch2026"]["eie"])
 }
 else if(depFromRoll=="FT")
 {
  depStudentAllBatch.push(clgData["batch2024"]["ft"])
  depStudentAllBatch.push(clgData["batch2025"]["ft"])
  depStudentAllBatch.push(clgData["batch2026"]["ft"])
 }
 else if(depFromRoll=="FD")
 {
  depStudentAllBatch.push(clgData["batch2024"]["fd"])
  depStudentAllBatch.push(clgData["batch2025"]["fd"])
  depStudentAllBatch.push(clgData["batch2026"]["fd"])
 }
 else if(depFromRoll=="IT")
 {
  depStudentAllBatch.push(clgData["batch2024"]["it"])
  depStudentAllBatch.push(clgData["batch2025"]["it"])
  depStudentAllBatch.push(clgData["batch2026"]["it"])
 }
 else if(depFromRoll=="SE")
 {
  depStudentAllBatch.push(clgData["batch2024"]["ise"])
  depStudentAllBatch.push(clgData["batch2025"]["ise"])
  depStudentAllBatch.push(clgData["batch2026"]["ise"])
 }
 else if(depFromRoll =="ME")
 {
  depStudentAllBatch.push(clgData["batch2024"]["mech"])
  depStudentAllBatch.push(clgData["batch2025"]["mech"])
  depStudentAllBatch.push(clgData["batch2026"]["mech"])
 }
 else if(depFromRoll =="MC")
 {
  depStudentAllBatch.push(clgData["batch2024"]["mtrs"])
  depStudentAllBatch.push(clgData["batch2025"]["mtrs"])
  depStudentAllBatch.push(clgData["batch2026"]["mtrs"])
 }
 else if(depFromRoll =="TX")
 {
  depStudentAllBatch.push(clgData["batch2024"]["txt"])
  depStudentAllBatch.push(clgData["batch2025"]["txt"])
  depStudentAllBatch.push(clgData["batch2026"]["txt"])
 }
 var allStudents = []
 
 for(let i=0;i<depStudentAllBatch.length;i++)
 {
  var eachObj =depStudentAllBatch[i];
   if(eachObj != undefined){
  for(let j=0;j<eachObj.length;j++)
  {
    allStudents.push(eachObj[j])
  }
}
 }
 return allStudents
}