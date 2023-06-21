let dataFrom;
function readData()
{
    let csvFile = document.getElementById("csvFile");
    const input = csvFile.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
       const text = e.target.result;
       dataFrom = text;
       processData()
    };
    reader.readAsText(input);
   
}

function processData(txtInput)
{

}