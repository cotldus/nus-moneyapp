// There is an error in this file, ajax unable to send data to server
/*Syntax: */
frm = document.getElementById("myform");
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const transaction_title = document.getElementById('merchantName');
const amount = document.getElementById('amount');
const frmError = document.getElementById('frmError');

function postToServer(e){
  e.preventDefault();  //to prevent form from submitting and refreshing the page
  if ((!income | !expense) && transaction_title && amount) {
    frmError.style.display = "block";
    return
  }
  postData = { 
    transaction_type: (income.value ? "credit" : "debit"),
    user_id: uid.value,  
    transaction_title: transaction_title.value,
    amount: amount.value,
  };

  console.log(postData);
  //convert js object to json
  postDataJSON = JSON.stringify(postData);
  console.log(postDataJSON);
  addData(postDataJSON);
}  

//url: "https://varlabs.comp.nus.edu.sg/fintech/itemsapi.php"


function addData(postData){// pass your data in method
     console.log(postData);
     $.ajax({
             type: "POST",
             url: "http://localhost:3000/transactions/add",
             data: postData,// now data come in this function
             contentType: "application/json",
             crossDomain: true,
             dataType: "text", 

             success: function (data, status, jqXHR) {
               //  alert("success");// write success in " "
                 alert(status);
                 document.getElementById("output").innerText = data;
             },

             error: function (jqXHR, status) {
                 // error handler
                 //console.log(jqXHR);
                 alert('fail ' + status.code);   
             }
          });

    }

     


frm.addEventListener("submit", postToServer); 