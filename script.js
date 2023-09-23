const currentMoneyInputEl = document.querySelector("#money");
const dayForecastEl = document.querySelector("#days")
const billEl = document.querySelector("#bills")
const currentMoneyEl = document.querySelector("#currentMoney");
const dateEl = document.querySelector("#date");
const btn = document.querySelector("#submit");
let currentMoney = 0;
let dayForecast = 0;
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


//set todays date as default value
let currentDate = new Date();
const calanderEl = document.querySelector('input[type="date"]');
calanderEl.setAttribute("value", currentDate.toLocaleDateString("af-ZA"))

//bill amounts
const internetLoan = -250;
const carLoan = -372;
const phoneBill = -100;
const schoolLoan = -492;
const insurance = -126;
const payCheck = 550;
const grocGas = -85;

//updates all 3 columns with bills, money after bill, and the day the action happens
const updateCol = (bill, money, date) => {
    if(bill > 0){
        billEl.innerHTML += "+" + bill + "<br/>";
    }else{
        billEl.innerHTML += bill + "<br/>";
    }


    currentMoneyEl.innerHTML += money + "<br/>";


    if(date.getDate() === 1){
        dateEl.innerHTML += date.getDate() + "&nbsp &nbsp" + monthNames[date.getMonth()] + "<br/>";
    }else{
        dateEl.innerHTML += date.getDate() + "<br/>";
    }
    
}

//checks if the current day has a bill or paycheck 
const checkForBill = (date) => {
    const todaysDay = date.getDate();

    //check for payday every friday
    if(date.getDay() === 5){
        currentMoney = currentMoney + payCheck; 
        updateCol(payCheck, currentMoney, date);
    }

    //check for grocery/gas budget every monday
    if(date.getDay() === 1){
        currentMoney = currentMoney + grocGas; 
        updateCol(grocGas, currentMoney, date);
    }

    switch (todaysDay){
        //All bill cases
        case 1:
            currentMoney = currentMoney + internetLoan; 
            updateCol(internetLoan, currentMoney, date);
            break;
        case 12:
            currentMoney = currentMoney + schoolLoan; 
            updateCol(schoolLoan, currentMoney, date);
            break;
        case 14:
            currentMoney = currentMoney + phoneBill; 
            updateCol(phoneBill, currentMoney, date);
            break;
        case 23:
            currentMoney = currentMoney + insurance; 
            updateCol(insurance, currentMoney, date);
            break;
        case 27:
            currentMoney = currentMoney + carLoan; 
            updateCol(carLoan, currentMoney, date);
            break;
    }
}

//updates the dateObj to whatever was selected in the calender

const updateDate = (newDate) => {
    var updatedDate = newDate.split(/\D/);
    currentDate = new Date(updatedDate[0], --updatedDate[1], updatedDate[2]);

    /*https://stackoverflow.com/questions/23641525/javascript-date-object-from-input-type-date
    Code ripped from here for most efficient method */
}

//takes in the user input to start running the bill calculations based on the day
const calculateMoney = () => {
    currentMoney = Number(currentMoneyInputEl.value);
    dayForecast = Number(dayForecastEl.value);

    //update the date for calculations based on user selected date
    updateDate(calanderEl.value);

    billEl.innerHTML ="Bills <br/>";
    currentMoneyEl.innerHTML =  "Current Cash <br/>";
    dateEl.innerHTML = "Date <br/>";


    //advances current day by one checking for bills up to whatever the i limit is
    for(i = 0; i <= dayForecast; i++){
        checkForBill(currentDate)
        currentDate.setDate(currentDate.getDate() + 1);
    }
}

btn.addEventListener("click", calculateMoney);
