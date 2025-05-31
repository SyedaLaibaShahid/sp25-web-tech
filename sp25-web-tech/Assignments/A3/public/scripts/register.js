document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("authForm");
    const name = document.getElementById("regName");
    const email = document.getElementById("regEmail");
    const password = document.getElementById("regPassword");
    const confirmPassword = document.getElementById("regConfirmPassword");
    const errorMsg = document.getElementById("errorMsg");

    function validatePasswords() {
        //  Only run check when both fields are not empty
        if (password.value === "" || confirmPassword.value === "") {
            errorMsg.style.display = "none";
            return false;
        }

        if (password.value !== confirmPassword.value) {
            errorMsg.textContent = "Passwords do not match!";
            errorMsg.style.color = "red";
            errorMsg.style.fontWeight = "bold";
            errorMsg.style.display = "block";
            return false;
        } else {
            errorMsg.style.display = "none";
            return true;
        }
    }

    // Live validation on both fields
    password.addEventListener("input", validatePasswords);
    confirmPassword.addEventListener("input", validatePasswords);

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!validatePasswords()) {
            return;
        }

        alert("Registering...");
        // Proceed with form logic (e.g. send data to server)
    });
});
