document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('http://localhost:3000/api/v1/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        // checking the user object is present in the response
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("id", JSON.stringify(data.user.id));
            window.location.href = "index.html";
        } else {
            throw new Error('User data is not available in the response');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});