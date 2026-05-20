const form = document.getElementById("registerForm");
const doneBtn = document.getElementById("doneBtn");

doneBtn.addEventListener("click", () => {
    
    const inputs = form.querySelectorAll("input[required]");
    let allFilled = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            allFilled = false;
        }
    });

    
    const password = document.getElementById("password").value;
    const retype = document.getElementById("retypepassword").value;

    if (!allFilled) {
        alert("Please fill in all fields!");
        return;
    }

    if (password !== retype) {
        alert("Passwords do not match!");
        return;
    }

  
    alert("Account successfully created!");
    form.reset();
    window.location.href = "Login.html"; 
});
