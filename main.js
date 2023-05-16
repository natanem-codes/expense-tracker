
const form = document.querySelector("form")
const historyContainer = document.querySelector(".history__container")
const totalIncome = document.querySelector(".total__income")
const totalExpense = document.querySelector(".total__expense")
const currentStatus = document.querySelector(".current__status")
const moneyLeft = document.querySelector(".money__left")


let data = null

const renderData = data => {
   historyContainer.innerHTML = ""
   if(data.incomes.length) {
    const incomes = document.createElement("div")
    incomes.className = "incomes"
    incomes.innerHTML = `<h4>Incomes</h4>`
    for(let income of data.incomes) {
        incomes.innerHTML += `<section class="card income">
            <h4>${income.description}</h4>
            <p>${income.amount}</p>
        </section>`
    }

    
    historyContainer.append(incomes)
   }

   if(data.expenses.length) {
    const expenses = document.createElement("div")
    expenses.className = "expenses"
    expenses.innerHTML = `<h4>Expenses</h4>`
    for(let expense of data.expenses) {
        console.log(expense)
        expenses.innerHTML += `<section class="card expense">
            <h4>${expense.description}</h4>
            <p>${expense.amount}</p>
        </section>`
    }
    historyContainer.append(expenses)
   }



   totalIncome.textContent = data.totalIncome
   totalExpense.textContent = data.totalExpense
   currentStatus.textContent = data.status
   moneyLeft.textContent = data.moneyLeft

}

const saveData = (data) => {
    localStorage.setItem("data", JSON.stringify(data))
}

const getData = () => {
    return JSON.parse(localStorage.getItem("data"))
}

window.addEventListener("load", () => {
    data = getData() || {
        expenses: [],
        incomes: [],
        totalIncome: 0,
        totalExpense: 0,
        status: null,
        moneyLeft: 0
    }

    if(data.totalExpense < data.totalIncome) {
        data.status = "on track"
        currentStatus.classList.add("on__track")
        currentStatus.classList.remove("in__debt")
    }
    else {
        data.status = "in debt"
        currentStatus.classList.remove("on__track")
        currentStatus.classList.add("in__debt")
    }

    data.moneyLeft = data.totalIncome - data.totalExpense
    console.log(data)
    renderData(data)
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const type = form.querySelector("#type")
    const description = form.querySelector("#description")
    const amount = form.querySelector("#amount")

    if(description.value === "" || amount.value === "") {
        console.log("leaving")
        return
    }

    if(type.value === "income") {
        console.log("type is ", type.value)
        
        data.incomes.push(
            {
                description : description.value,
                amount: parseInt(amount.value),
                createdAt: Date.now()
            }
            )
            data.totalIncome += parseInt(amount.value)
        }
        
        if(type.value === "expense") {
        console.log("type is ", type.value)
      
        data.expenses.push(
            {
                description : description.value,
                amount : parseInt(amount.value),
                createdAt: Date.now()
            }
        )
        data.totalExpense += parseInt(amount.value)
    }

    

    saveData(data)
    renderData(data)
    description.value = ""
    amount.value = ""
})

