let listCount;
function loadDataLS()
{
    var rawData = localStorage.getItem("listCount");
    if(rawData == null)
    {
      localStorage.setItem("listCount",0)
      rawData = localStorage.getItem("listCount");
    }
    listCount = rawData;
    document.getElementById("data").innerText = listCount
}