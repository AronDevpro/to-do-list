document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
});

function checkAuth() {
    const user = localStorage.getItem("user");

    //if user not logged in redirect to login page
    if (!user) {
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}
