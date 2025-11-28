const form = document.getElementById('calculatorForm');
const priceInput = document.getElementById('originalPrice');
const discountInput = document.getElementById('discountPercent');
const priceError = document.getElementById('priceError');
const discountError = document.getElementById('discountError');
const resultSection = document.getElementById('resultSection');

// Validate price
function validatePrice(value) {
    if (value > 0) {
        priceError.style.display = 'none';
        priceInput.style.borderColor = '#e0e0e0';
        return true;
    }
    priceError.style.display = 'block';
    priceInput.style.borderColor = '#ff6b6b';
    return false;
}

// Validate percentage
function validateDiscount(value) {
    if (value >= 0 && value <= 100) {
        discountError.style.display = 'none';
        discountInput.style.borderColor = '#e0e0e0';
        return true;
    }
    discountError.style.display = 'block';
    discountInput.style.borderColor = '#ff6b6b';
    return false;
}

// Calculate discount
function calculateDiscount(originalPrice, discountPercent) {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);

    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;

    return {
        originalPrice: price.toFixed(2),
        discountPercent: discount.toFixed(2),
        discountAmount: discountAmount.toFixed(2),
        finalPrice: finalPrice.toFixed(2)
    };
}

// Display results with ₹ currency
function displayResults(results) {
    document.getElementById('displayOriginalPrice').textContent = `₹${results.originalPrice}`;
    document.getElementById('displayDiscount').textContent = `${results.discountPercent}%`;
    document.getElementById('displaySavings').textContent = `₹${results.discountAmount}`;
    document.getElementById('displayFinalPrice').textContent = `₹${results.finalPrice}`;

    resultSection.classList.add('show');
}

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const priceValue = priceInput.value;
    const discountValue = discountInput.value;

    const isPriceValid = validatePrice(priceValue);
    const isDiscountValid = validateDiscount(discountValue);

    if (isPriceValid && isDiscountValid) {
        const results = calculateDiscount(priceValue, discountValue);
        displayResults(results);
    }
});

// Reset calculator
function resetCalculator() {
    form.reset();
    resultSection.classList.remove('show');
    priceError.style.display = 'none';
    discountError.style.display = 'none';
    priceInput.style.borderColor = '#e0e0e0';
    discountInput.style.borderColor = '#e0e0e0';
}

