console.log('\'Allo \'Allo!');
var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      document.getElementById("home").onclick = function (params) {
        enterContent(JSON.parse(xmlhttp.responseText));
       // enterContent(myArr);   
      }
    }
  };
  xmlhttp.open("GET", "json.json", true);
  xmlhttp.send();

function enterContent(xhttp) {    
    console.log(xhttp[1].src);
    document.getElementById("profileImg").setAttribute("src", xhttp[1].src);
}