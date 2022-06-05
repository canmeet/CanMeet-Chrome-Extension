$("#loginBtn").on("click", loginClicked);
$("#regBtn").on("click", regClicked);

function loginClicked() {
    window.location.href="https://canmeet.github.io/login/";  
    window.open("https://canmeet.github.io/login/");
}

function regClicked() {
    window.location.href="https://canmeet.github.io/register/register.html";  
    window.open("https://canmeet.github.io/register/register.html");
}