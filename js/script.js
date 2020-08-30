// Create event listener on submit button

const submit = document.getElementById('submit')

submit.addEventListener('click', (e) => {
    calculate(e)
    submit.innerHTML = 'Re-Calculate Value'
})

function calculate(e) {
    e.preventDefault()

    let labels = []
    let balances = []

    let startingBalance = parseInt(document.querySelector('#startingBalance').value)
    const expectedReturn = parseInt(document.querySelector('#expectedReturn').value) / 100
    const monthlyDeposit = parseInt(document.querySelector('#monthlyDeposit').value)
    const duration = parseInt(document.querySelector('#duration').value)
    const monthlyReturn = expectedReturn / 12

    if (!startingBalance || !expectedReturn || !monthlyDeposit || !duration) {
        return
    }

    showGrowthDiv(startingBalance, duration, labels, balances)
    removePreviousNumbers()
    buildValues(labels, balances, duration, startingBalance, monthlyReturn, monthlyDeposit)
    createChart(labels, balances)
}

// Show content
function showGrowthDiv(startingBalance, duration) {
    document.querySelector('#report-section').style.opacity = 1
    document.querySelector('#report-section').style.height = 'inherit'
    document.querySelector('#yearBreakdow').style.opacity = 1
    document.querySelector('#yearBreakdow').style.height = 'inherit'
}

// remove previous values
function removePreviousNumbers() {
    document.querySelectorAll('#breakdow p').forEach(
        (elem) => {
            elem.remove()
        }
    )
}

// Loop through items to update starting balance and build 
function buildValues(labels, balances, duration, startingBalance, monthlyReturn, monthlyDeposit) {
    for (let i = 0; i <= duration * 12; i++) {

        startingBalance = startingBalance * (1 + monthlyReturn) + monthlyDeposit
        const newDiv = document.createElement('p');
        newDiv.classList = 'col-md-2'

        if (i % 12 === 0) {
            const year = i / 12
            balances.push(startingBalance.toFixed(2))
            labels.push(`Year ${year}`)

            balanceEnd = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
            }).format(startingBalance)
            
            newDiv.innerHTML = `Year ${year} <span> ${balanceEnd} </span>`
            breakdow.appendChild(newDiv)
        }
    }
    getEndBalance(balanceEnd, duration)
}

function getEndBalance(balanceEnd, duration) {
    document.querySelector('#totalValue').innerHTML =
        `Total Value after ${duration} years: <span>${balanceEnd}</span>`
}

// Create chart
function createChart(labels, balances) {
    // Destroy previous canvas
    document.getElementById('myChart').remove()

    // Create new canvas
    let canvas = document.createElement('canvas')
    canvas.setAttribute('id', 'myChart')
    document.querySelector('#chartContainer').appendChild(canvas)

    // Fill canvas with chart
    var ctx = document.getElementById('myChart').getContext('2d')
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Growth',
                data: balances,
                borderColor: 'rgb(50, 200, 0)',
                backgroundColor: 'rgba(50, 200, 0, .3)',
                borderWidth: 2,
                pointRadius: 4,
                hoverRadius: 4,
                hoverBorderWidth: 2,
                hitRadius: 2,
                pointStyle: 'circle',
                pointBackgroundColor: 'rgb(50, 200, 0)'
            },],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        fontColor: 'rgb(50, 200, 0)',
                        beginAtZero: true
                    },
                },],
                xAxes: [{
                    ticks: {
                        beginAtZero: false,
                        fontColor: 'rgb(50, 200, 0)',

                    },
                },],
            },
            legend: {
                display: false,
            },
        },
    })
}