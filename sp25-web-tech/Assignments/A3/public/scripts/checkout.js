function validateForm() {
    let isValid = true;

    // Clear previous errors
    document
        .querySelectorAll(".error")
        .forEach((error) => (error.textContent = ""));

    // Full Name validation
    const fullName = document.getElementById("fullName");
    if (!fullName.value.match(/^[A-Za-z\s]+$/)) {
        document.getElementById("fullNameError").textContent =
            "Name should only contain alphabets.";
        isValid = false;
    }

    // Email validation
    const email = document.getElementById("email");
    if (!email.value.includes("@")) {
        document.getElementById("emailError").textContent =
            "Enter a valid email.";
        isValid = false;
    }

    // Phone validation
    const phone = document.getElementById("phone");
    if (!phone.value.match(/^\d{10}$/)) {
        document.getElementById("phoneError").textContent =
            "Phone must be 10 digits.";
        isValid = false;
    }

    // Address validation
    const address = document.getElementById("address");
    if (address.value.trim() === "") {
        document.getElementById("addressError").textContent =
            "Address is required.";
        isValid = false;
    }

    // Credit Card validation
    const creditCard = document.getElementById("creditCard");
    if (!creditCard.value.match(/^\d{16}$/)) {
        document.getElementById("creditCardError").textContent =
            "Card number must be 16 digits.";
        isValid = false;
    }

    // Expiry Date validation
    const expiryDate = document.getElementById("expiryDate");
    const today = new Date().toISOString().split("T")[0];
    if (expiryDate.value < today) {
        document.getElementById("expiryDateError").textContent =
            "Expiry date must be in the future.";
        isValid = false;
    }

    // CVV validation
    const cvv = document.getElementById("cvv");
    if (!cvv.value.match(/^\d{3}$/)) {
        document.getElementById("cvvError").textContent =
            "CVV must be 3 digits.";
        isValid = false;
    }

    return isValid;
}
