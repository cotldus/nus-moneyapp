// There is an error in this file, ajax unable to send data to server
/*Syntax: */
frm = document.getElementById("myform");
const income = $("#income").is(":checked");
const expense = $("#expense").is(":checked");
const transaction_title = document.getElementById('merchantName').value;
const amount = document.getElementById('amount').value;
const frmError = document.getElementById('frmError');

function postToServer(e){
  e.preventDefault();  //to prevent form from submitting and refreshing the page
  if ((!income | !expense) && transaction_title && amount) {
    frmError.style.display = "block";
    return
  }
  postData = { 
    transaction_type: (income ? "credit" : "debit"),
    user_id: user_id,  
    transaction_title: transaction_title,
    amount: amount,
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