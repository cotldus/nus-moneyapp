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

const getUserByUID = () => {
  let querryStr = "http://localhost:3000/user/by-uid?user_id=" + uid.value;
  $.getJSON(querryStr, mydata);
};

const getTransactionData = (e) => {
  e.preventDefault();
  let querryStr = "http://localhost:3000/transactions/by-uid?user_id=" + uid.value;
  $.getJSON(querryStr, mydata);
};

TransactionData = null;

// Add transactions to DOM list (show income-expense)
function addTransactionDOM(transaction) {

  if (transaction.transaction_type === "credit") {
    const income_item = document.createElement("li");
    income_item.classList.add("plus");
    income_item.innerHTML = `${transaction.transaction_title}  <span> $ ${Math.abs(
      transaction.amount
    )}</span><button class="delete-btn">x</button> 
    `;
  
    list.appendChild(income_item);
  }
  if (transaction.transaction_type === "debit") {
    const expense_item = document.createElement("li");

    expense_item.classList.add("minus");
    expense_item.innerHTML = `
    ${transaction.merchantName} <span> -$ ${Math.abs(
      transaction.expense
    )}</span><button class="delete-btn">x</button> 
    `;
  
    list.appendChild(expense_item);
  }

}

// Update the balance, income and expense
function updateValues() {
  const allIncome = income_items.map((transaction) => { if (transaction.transaction_type === "credit") return transaction});
  const expenses = expense_items.map((transaction) => { if (transaction.transaction_type === "debit") return transaction});
  const total_income = allIncome
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const total_expense = expenses
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const bal = total_income - total_expense;
  balance.innerText = `$${bal}`;
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
  TransactionData = getTransactionData
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

  const { user_id, username, password } = getUserByUID()
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

//form.addEventListener('submit', filterTransaction);
b1.addEventListener("click", grantPermission);
b2.addEventListener("click", init); //no need to call init. when no event handler it will reload/referesh the page
