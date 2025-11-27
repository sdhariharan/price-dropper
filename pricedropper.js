
        const form = document.getElementById('calculatorForm');
        const resultSection = document.getElementById('resultSection');
        const priceInput = document.getElementById('originalPrice');
        const discountInput = document.getElementById('discountPercent');
        const priceError = document.getElementById('priceError');
        const discountError = document.getElementById('discountError');

        // Validate input on change
        priceInput.addEventListener('input', function() {
            validatePrice(this.value);
        });

        discountInput.addEventListener('input', function() {
            validateDiscount(this.value);
        });

        // Validate price input
        function validatePrice(value) {
            const price = parseFloat(value);
            if (isNaN(price) || price <= 0) {
                priceError.style.display = 'block';
                priceInput.style.borderColor = '#ff6b6b';
                return false;
            } else {
                priceError.style.display = 'none';
                priceInput.style.borderColor = '#e0e0e0';
                return true;
            }
        }

        // Validate discount input
        function validateDiscount(value) {
            const discount = parseFloat(value);
            if (isNaN(discount) || discount < 0 || discount > 100) {
                discountError.style.display = 'block';
                discountInput.style.borderColor = '#ff6b6b';
                return false;
            } else {
                discountError.style.display = 'none';
                discountInput.style.borderColor = '#e0e0e0';
                return true;
            }
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

        // Display results
        function displayResults(results) {
            document.getElementById('displayOriginalPrice').textContent = `$${results.originalPrice}`;
            document.getElementById('displayDiscount').textContent = `${results.discountPercent}%`;
            document.getElementById('displaySavings').textContent = `$${results.discountAmount}`;
            document.getElementById('displayFinalPrice').textContent = `$${results.finalPrice}`;
            
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
  