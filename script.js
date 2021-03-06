const balance = document.getElementById("balance");
const money_plus = document.getElementById("income");
const money_minus = document.getElementById("expense");
const list = document.getElementById("list");
const hello = document.getElementById("hello");

const form = document.getElementById("form");
const uid = document.getElementById("custname");
const custpwd = document.getElementById("custpwd");

const reco = document.getElementById("reco");
const b1 = document.getElementById("b1");
const b2 = document.getElementById("b2");

const authorization = document.getElementById("authorization");
const logout = document.getElementById("logout");
const login = document.getElementById("login");
const card = document.getElementById("card");
let user_id= ""

// function getUserByUID(){
//   let querryStr = "https://nus-moneyapp-backend.herokuapp.com/user/by-uid?user_id=" + uid.value;
//   $.getJSON(querryStr, function(data){
//     console.log(data);
//     return  x = data;
//   });
// };


function getUserByName(){
  let querryStr = "https://nus-moneyapp-backend.herokuapp.com/user/by-username?username=" + uid.value;

  $.ajax({
    url: querryStr,
    dataType: 'json',
    async: false,
    success: function(data) {
    myuserdata = data;
    return myuserdata
    }
  });
  return myuserdata;
};

const getTransactionData = () => {
  // e.preventDefault();
  console.log(myuserdata[0].user_id);
  let querryStr = "https://nus-moneyapp-backend.herokuapp.com/transactions/by-uid?user_id=" + myuserdata[0].user_id;
  // $.getJSON(querryStr, mydata);
  $.ajax({
    url: querryStr,
    dataType: 'json',
    async: false,
    success: function(data) {
    mytransactiondata = data;
    return mytransactiondata
    }
  });
  // console.log(mytransactiondata[0]);
  return mytransactiondata;
};

const deleteTransactionByTID = (tid) => {
  let querryStr = "https://nus-moneyapp-backend.herokuapp.com/transactions/delete/by-tid?transaction_id=" + tid;
  console.log(tid)
  $.ajax({
    url: querryStr,
    dataType: 'json',
    async: false,
    success: function() {
    console.log("Delete request was successful")
    },
    error: function (errorMessage) {
      console.log(errorMessage)
    }
  });
}

const deleteTransaction = (e) => {
  let tid = e.target.id
  deleteTransactionByTID(tid);
  filterTransaction();

}


let TransactionData = null;

// Add transactions to DOM list (show income-expense)
function addTransactionDOM(transaction) {

  if (transaction.transaction_type === "credit") {
    const income_item = document.createElement("li");
    income_item.classList.add("plus");
    income_item.innerHTML = `${transaction.transaction_title}  <span> $ ${Math.abs(
      transaction.amount
    )}`;
  
    const button = document.createElement("button");
    button.classList.add("delete-btn");
    button.innerHTML = "x";
    button.id = `${transaction.transaction_id}`
    button.addEventListener("click", deleteTransaction);
    income_item.appendChild(button)
  
    list.appendChild(income_item);
  }
  if (transaction.transaction_type === "debit") {
    const expense_item = document.createElement("li");
    expense_item.classList.add("minus");
    expense_item.innerHTML = `
    ${transaction.transaction_title} <span> -$ ${Math.abs(
      transaction.amount
    )}`;

    const button = document.createElement("button");
    button.classList.add("delete-btn");
    button.innerHTML = "x";
    button.id = `${transaction.transaction_id}`
    button.addEventListener("click", deleteTransaction);
    expense_item.appendChild(button)
  
    list.appendChild(expense_item);
  }

}

// Update the balance, income and expense
function updateValues() {
  let total_income = 0
  let total_expense = 0
  TransactionData.forEach((transaction) => { if (transaction.transaction_type === "credit") {total_income += transaction.amount}else {total_expense += transaction.amount}});
  // const total_income = allIncome
  //   .reduce((acc, item) => (acc += item), 0)
  //   .toFixed(2);
  // const total_expense = expenses
  //   .reduce((acc, item) => (acc += item), 0)
  //   .toFixed(2);
  const bal = total_income - total_expense;
  balance.innerText = `$${bal.toFixed(2)}`;
  money_plus.innerText = `$${total_income}`;
  money_minus.innerText = `$${total_expense}`;
  reco.innerText =
    bal >= 0
      ? "You Have Sound Financial Health"
      : "You Have Spent More Than You Earned";

  // Draw pie chart
  // set the dimensions and margins of the graph
  var width = 300;
  height = 300;
  margin = 30;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin;

  // append the svg object to the div called 'my_dataviz'
  var svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  var data = { Income: total_income, Expenses: total_expense };

  // set the color scale
  var color = d3.scaleOrdinal().domain(data).range(d3.schemeSet2);

  // Compute the position of each group on the pie:
  var pie = d3.pie().value(function (d) {
    return d.value;
  });
  var data_ready = pie(d3.entries(data));
  // Now I know that group A goes from 0 degrees to x degrees and so on.

  // shape helper to build arcs:
  var arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll("mySlices")
    .data(data_ready)
    .enter()
    .append("path")
    .attr("d", arcGenerator)
    .attr("fill", function (d) {
      return color(d.data.key);
    })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7);

  // Now add the annotation. Use the centroid method to get the best coordinates
  svg
    .selectAll("mySlices")
    .data(data_ready)
    .enter()
    .append("text")
    .text(function (d) {
      return d.data.key;
    })
    .attr("transform", function (d) {
      return "translate(" + arcGenerator.centroid(d) + ")";
    })
    .style("text-anchor", "middle")
    .style("font-size", 17);
}

// refresh
function init() {
  // Clear piechart
  // document.getElementById("my_dataviz").innerHTML = '';
  // // Clear data
  // list.innerHTML = '';
  // reco.innerHTML = '';
  // TransactionData = [];

  init = location.reload();
}

function filterTransaction(e) {
  // e.preventDefault();  // not required anymore as we moved it to grantPermission
  document.getElementById("my_dataviz").innerHTML = "";
  list.innerHTML = "";
  reco.innerHTML = "";
  getTransactionData();
  TransactionData = mytransactiondata;
  TransactionData.forEach(addTransactionDOM);
  // addAccessLogs(custname.value.toUpperCase());
  updateValues();
}

function showAuthorized(user) {
  authorization.style.display = "block";
  logout.style.display = "block";
  login.style.display = "none";
  hello.innerHTML = `Good Afternoon, ${user}!`;
}
function loginRequired() {
  authorization.style.display = "none";
  logout.style.display = "none";
  login.style.display = "block";
}

function grantPermission(e) {
  e.preventDefault(); //to prevent form from submitting and refreshing the page
  getUserByName();
  console.log(myuserdata[0].user_id);
  user_id = myuserdata[0].user_id;
  const username = myuserdata[0].username;
  const password = myuserdata[0].password;

  
  
  // const { user_id, username, password } = getUserByName()
  // if customer not found
  if (!user_id) {
    reco.innerText = "Customer does not exist!";
    loginRequired();
  }
  // if customer found and password correct, filter transaction for user
  else if (custpwd.value === password) {
    showAuthorized(username);
    filterTransaction();
  } else {
    reco.innerText = "Invalid credentials!";
    loginRequired();
  }
}

function addTransaction() {
  if (card.style.display === "none") {
    card.style.display = "block";
  } else {
    card.style.display = "none";
  }
}


/*** 
Metamask connect 
***/


// Connecting Metamask account and show Wallet Address
const connectButton = document.querySelector('#metamaskButton');
const showAccount = document.querySelector('#showAccount');

// Showing balance of ERC-20 Token
const balanceButton = document.querySelector('#balanceButton');
const showBalance = document.querySelector('#showBalance');


let currentAccount = null;

// Connect to Metamask Button
connectButton.addEventListener('click', () => {
  connect();
});

// User submit Token Address input
// function getAddress() {
//   const tokenAddress = "0xcad680287ee517cfae13c6956f035f07294d975d";
//   document.getElementById('display').innerHTML  = tokenAddress;
//   console.log("Token address: " + tokenAddress);
// }

// Show Token Balance button
balanceButton.addEventListener('click', () => {
    getBalance(currentAccount);
    getToken();
})


// Connecting to Metamask Wallet & display wallet address

function detectMetaMask() {
  if (typeof window.ethereum !== 'undefined') {                
      return true
  } else {                
      return false
  }
}

function connect() {
  console.log('Calling connect()');
  ethereum
  .request({ method: 'eth_requestAccounts' })
  .then(handleAccountsChanged)
  .catch((err) => {
  if (err.code === 4001) {
      // EIP-1193 userRejectedRequest error
      // If this happens, the user rejected the connection request.
      console.log('Please connect to MetaMask.');
      console.log('You refused to connect Metamask');
  } else {
      console.error(err);
  }
  });
}

function handleAccountsChanged(accounts) {
  console.log('Calling HandleChanged');

  if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
      
  } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      $('#showAccount').html(currentAccount)
      
      if(currentAccount != null) {
          // Set the button label
          $('#showAccount').html(currentAccount)
      }
  }
  console.log('WalletAddress in HandleAccountChanged ='+currentAccount)
}

// Web3

window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
      console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)
      web3 = new Web3(window.ethereum);
  } else {
      console.log('No Web3 Detected...')
  }
})

// try {            
//     web3 = new Web3(window.ethereum);
// } 
// catch (error) {
//     console.log(error);
// }


// ABI to get ERC20 Token balance

const minABI = [  
  // balanceOf
  {    
    constant: true,

    inputs: [{ name: "_owner", type: "address" }],

    name: "balanceOf",

    outputs: [{ name: "balance", type: "uint256" }],

    type: "function",
  },
];

// Wallet address is stored in currentAccount variable
// Token address from user input field tokenAddress

// console.log(web3);
// console.log(web3.eth);


async function getBalance(currentAccount) {
  const tokenAddress = "0xcad680287ee517cfae13c6956f035f07294d975d";
  console.log(tokenAddress);
  const contract = new web3.eth.Contract(minABI, tokenAddress); 
  const result = await contract.methods.balanceOf(currentAccount).call(); 
  // convert wei
  const tokenAmount = web3.utils.fromWei(result); 
  console.log(tokenAmount);
  // const symbol = await contract.methods.symbol().call();
  // console.log(symbol);

  $('#showBalance').html(tokenAmount)
}

// .symbol() error?
async function getToken() {
  const tokenAddress = "0xcad680287ee517cfae13c6956f035f07294d975d";
  const contract = new web3.eth.Contract(minABI, tokenAddress);
  tokenSymbol = await contract.methods.symbol().call();
  console.log("output = " + tokenSymbol);
}




//form.addEventListener('submit', filterTransaction);
b1.addEventListener("click", grantPermission);
b2.addEventListener("click", init); //no need to call init. when no event handler it will reload/referesh the page

