//syntax: $.getJSON(url, [data],[callback]);
//AJAX library
const uid = document.getElementById('userid');
const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2');

function getFromServer(e){
  e.preventDefault();       //?
  // var querryStr =  "https://nusbackendstub.herokuapp.com/user/by-uid?user_id=" + uid.value;
  var querryStr =  "http://localhost:3000/user/by-uid?user_id=" + uid.value;
  $.getJSON(querryStr, mydata );
  }


function mydata(data){
  var text ="<ul>";
  data.forEach(function(item){    
  text = text + `<li> Account: ${item.user_id}, ${item.first_name} ${item.last_name}  <br> 
              Email: ${item.email} </li>`
  
  });
  text += "</ul>"
  $(".mypanel").html(text);
}


b1.addEventListener('click',getFromServer);



   