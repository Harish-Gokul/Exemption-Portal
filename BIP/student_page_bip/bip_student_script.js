let studentObj;
let selectedValue;
var internShipObjs =[];
var onlineCourseObjs = [];
var studentObjClgData;
var queue=[];
function loadFromLS()
{
    //currentStudentBip
    
    var rawDataClgData = localStorage.getItem("studentsData");
    if(rawDataClgData == null)
    {
      localStorage.setItem("studentsData",JSON.stringify(clgData))
      rawDataClgData = localStorage.getItem("studentsData");
    }
    clgData = JSON.parse(rawDataClgData);

    var rawData = localStorage.getItem("currentStudentBip");
    if(rawData == null)
    { 
        window.open("../request_login Page/index.html","_self")
        return
    }
    studentObj = JSON.parse(rawData);

    var rawQueueData = localStorage.getItem("bipQueueStudentData");
     
    if(rawQueueData == null)
    {
        localStorage.setItem("bipQueueStudentData",JSON.stringify([]))
        rawQueueData =localStorage.getItem("bipQueueStudentData");
    }
    queue =JSON.parse(rawQueueData);
   
    if(isNaN(parseInt(studentObj.internshipCount)) ==true)
    {
        
        internShipObjs = studentObj.internshipCount;
    }
    if(isNaN(parseInt(studentObj.onlineCourseCount))==true)
    {
         
        onlineCourseObjs=studentObj.onlineCourseCount;
    }
    displayStudentDetails()
    getStudent()
    
}
 



function displayStudentDetails()
{
    dispStudentName.innerText = studentObj.name;
    dispStudentRollNo.innerText = studentObj.rollNo;
    dispStudentDepartment.innerText = studentObj.departmentName 
}

function afterSelction(value)
{
    showDiv.style.display ="inline"
    if(value == "onlineCourseCount"){
        dispCourseOrIntenshipHTML.innerText = "Online Course Name"
    }
    else{
        dispCourseOrIntenshipHTML.innerText ="InternShip Name"
    }
    selectedValue= value;
     
}
function submitFun()
{
    let courseName =getCourseName.value;
    let daysAttented = getDays.value;
    let requestingFor = getRequestingFor.value
    let bipIdValue = getBipId.value
    if( (requestingFor.value =="Select the Option")||(courseName=="")||(daysAttented==""))
    return
    if( selectedValue =="onlineCourseCount")
    {
      onlineCourseObjs.push(createOnlineCourseObj(courseName,daysAttented,requestingFor,bipIdValue))
    }
    else if(selectedValue == "InternshipCount")
    {
        internShipObjs.push(createOnlineCourseObj(courseName,daysAttented,requestingFor,bipIdValue))
    }
    studentObj.onlineCourseCount = onlineCourseObjs;
    studentObj.internshipCount = internShipObjs;
    saveData()
    alert("Inserted !!")
    showDiv.style.display ="none";
    let toggle =0;
    for(let i =0;i<queue.length;i++)
    {
       if(queue[i] == studentObj.rollNo) 
       toggle=1;
    }
    if(toggle ==0)
    queue.push(studentObj.rollNo)
    localStorage.setItem("studentsData",JSON.stringify(clgData))
    localStorage.setItem("bipQueueStudentData",JSON.stringify(queue))
    
}


function createInternshipObj(name,days,optingFor,bipId)
{ 
    let internShipObj ={bipId:bipId,internshipName:name,daysAttented:days,optingFor:optingFor,verification:false,iseligiblieForExemption:false}
    return internShipObj;
}

function createOnlineCourseObj(name,days,optingFor,bipId)
{
    let onlineCourseObj ={bipId:bipId,courseName:name,daysAttented:days,verification:false,optingFor:optingFor,iseligiblieForExemption:false}
    return onlineCourseObj
}

function saveData()
{
    studentObjClgData.internshipCount =studentObj.internshipCount;
    studentObjClgData.onlineCourseCount = studentObj.onlineCourseCount;
    localStorage.setItem("studentsData",JSON.stringify(clgData))
}

function getStudent()
{
   let departments = ["AE","AG","AU","BM","BT","CE","CB","CS","CT","EE","EC","EI","FT","FD","IT","SE","ME","MC","TX","AD","AL"]
    var speficDepStudent = pushDepartmentstudent(returnDepFromRollNo(studentObj.rollNo));
    for(let i =0;i<speficDepStudent.length;i++)
    {
      let eachStudentObj = speficDepStudent[i];
 
      if(eachStudentObj.rollNo == studentObj.rollNo)
      {
        studentObjClgData = eachStudentObj;
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
 console.log(depStudentAllBatch)
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