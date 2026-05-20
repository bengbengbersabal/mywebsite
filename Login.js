document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); 

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

  
    const validUsername = "admin";
    const validPassword = "12345";

    if (username === validUsername && password === validPassword) {
        
        window.location.href = "Home.html"; 
    } else {
        alert("Invalid username or password!");
    }
});
