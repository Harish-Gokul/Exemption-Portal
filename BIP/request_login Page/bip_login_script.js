console.log(clgData)
function loadLocalData()
{
    var rawData = localStorage.getItem("studentsData");
    if(rawData == null)
    {
      localStorage.setItem("studentsData",JSON.stringify(clgData))
      rawData = localStorage.getItem("studentsData");
    }
    clgData = JSON.parse(rawData);
    console.log(clgData)
}
var currentStudent;

var department_students=[];
function getStudent()
{
   let departments = ["AE","AG","AU","BM","BT","CE","CB","CS","CT","EE","EC","EI","FT","FD","IT","SE","ME","MC","TX","AD","AL"]
  if(rollNoHTML.value == 'staff')
  {
    window.open("../staff_page/bip_staff_index.html","_self")
    
  }
  else if(rollNoHTML.value =='admin')
  {
    window.open("../admin_page/admin.html","_self")
  }
  else{
    var studentDep = returnDepFromRollNo(rollNoHTML.value)
    var speficDepStudent = pushDepartmentstudent(studentDep);
    var studentRoll;
    var studentName;
     console.log(speficDepStudent)
    for(let i =0;i<speficDepStudent.length;i++)
    {
      let eachStudentObj = speficDepStudent[i];
 
      if(eachStudentObj.rollNo == (rollNoHTML.value.toUpperCase()))
      {
        console.log("hi")
        studentRoll = eachStudentObj.rollNo;
        studentName = eachStudentObj.name.split(" ");
        studentObj = eachStudentObj;
      }
    }
    if((studentRoll == undefined)||(studentName == undefined)){
      alert("Invalid Student RollNo")
    return;
  }
  
  
  if(studentName[0]==passwordHTML.value.toUpperCase())
  {
    localStorage.setItem("currentStudentBip",JSON.stringify(studentObj))
    window.open("../student_page_bip/bip_student_index.html","_self")
  }
  else{
    alert("Wrong Password")
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