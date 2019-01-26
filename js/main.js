var btnStart = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],


    expensesItem = document.getElementsByClassName('expenses-item'),
    btnExpenses = document.getElementsByTagName('button'),
    btnExpensesItem = btnExpenses[0],
    btnCountBudget = btnExpenses[2],
    btnOptionalExpenses = btnExpenses[1],
    inputOptionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    inputChooseIncome = document.querySelector('.choose-income'),
    inputSavings = document.querySelector('#savings'),
    inputSum = document.querySelector('#sum'),
    inputPercent = document.querySelector('#percent'),
    inputYear = document.querySelector('.year-value'),
    inputMonth = document.querySelector('.month-value'),
    inputDay = document.querySelector('.day-value');


    

var money, time;

btnStart.addEventListener('click', function(event) {
    money = +prompt("Ваш бюджет на месяц?");
    time = prompt("Введите дату в формате YYYY-MM-DD");

    while (isNaN(money) || money == '' || money == null) {
        money = prompt('Ваш бюджет?', '');
    }

    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    inputYear.value = new Date(Date.parse(time)).getFullYear();
    inputMonth.value = new Date(Date.parse(time)).getMonth() + 1;
    inputDay.value = new Date(Date.parse(time)).getDate();

});

btnExpensesItem.addEventListener('click', function(event) {
    var sum = 0;
    for (var i = 0; i < expensesItem.length; i++) {
        var a = expensesItem[i].value,
            b = expensesItem[++i].value;
    
        if ((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50) {
           appData.expenses[a] = b;
           sum += +b;
        } else {
               i = i - 1;
        }
        expensesValue.textContent = sum;
    }
});

btnOptionalExpenses.addEventListener('click', function(event) {
    for (var i = 0; i < inputOptionalExpensesItem.length; i++) {
        var opt = inputOptionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' '; 
    }
});

btnCountBudget.addEventListener('click', function(event) {

    if (appData.budget != undefined) {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = 'Средний уровень достатка';
        } else if ( appData.moneyPerDay > 2000) {
            levelValue.textContent = 'Высокий уровень достатка';
        } else {
            levelValue.textContent = 'Error';
        }

    } else {
        daybudgetValue.textContent = 'Error';
    }
    
});

inputChooseIncome.addEventListener('input', function(event) {
    var items = inputChooseIncome.value;
        appData.income = items.split(',');
        incomeValue.textContent = appData.income;
});

inputSavings.addEventListener('click', function() {

    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }

});

inputSum.addEventListener('input', function() {
    if (appData.savings == true) {
        var sum = +inputSum.value;
            percent = +inputPercent.value;
        
        appData.inputMonth = sum/100/12*percent;
        appData.inputYear = sum/100*percent;

        monthsavingsValue.textContent = appData.inputMonth.toFixed(1);
        yearsavingsValue.textContent = appData.inputYear.toFixed(1);
    }
});

inputPercent.addEventListener('input', function() {
    if (appData.savings == true) {
        var sum = +inputSum.value;
            percent = +inputPercent.value;
    
        appData.inputMonth = sum/100/12*percent;
        appData.inputYear = sum/100*percent;

         monthsavingsValue.textContent = appData.inputMonth.toFixed(1);
        yearsavingsValue.textContent = appData.inputYear.toFixed(1);
    }
});

var appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};


