//listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    //Hide results
    document.getElementById('results').style.display = 'none';
    //show loader
    document.getElementById('loading').style.display = 'block';
    //display result after 2 seconds
    setTimeout(calculateResults, 2000);
    e.preventDefault();
});

//Calculate results
function calculateResults() {
    console.log('Calculating....')
    //UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //computing monthly payments    
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        //show result
        document.getElementById('results').style.display = 'block';
        //hide loader
        document.getElementById('loading').style.display = 'none';
    } else {
        //console.log('Please check your input values...');
        showError('Please Check Your input values');
    }


    //e.preventDefault();
}
//show error message
function showError(error) {
    //Hide result
    document.getElementById('results').style.display = 'none';
    //hide loader
    document.getElementById('loading').style.display = 'none';
    // create a div 
    const errorDiv = document.createElement('div');
    //get elements  
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    // add class 
    errorDiv.className = 'alert alert-danger';
    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading 
    card.insertBefore(errorDiv, heading);
    //clear error in 3 seconds
    setTimeout(clearError, 3000);
}
// clear error
function clearError() {
    document.querySelector('.alert').remove();
}