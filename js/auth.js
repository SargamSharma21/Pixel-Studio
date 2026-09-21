const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const registerBtn = document.getElementById("register-btn");
const loginBtn = document.getElementById("login-btn");

const authMsg = document.getElementById("auth-msg");


// Register
registerBtn.addEventListener("click", () => {

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {

        authMsg.style.color = "red";
        authMsg.innerText = "Please fill in all fields.";

        return;
    }

    let users =
        JSON.parse(localStorage.getItem("pixel_users")) || {};

    if (users[username]) {

        authMsg.style.color = "red";
        authMsg.innerText = "Username already exists.";

        return;
    }

    users[username] = password;

    localStorage.setItem(
        "pixel_users",
        JSON.stringify(users)
    );

    authMsg.style.color = "green";
    authMsg.innerText =
        "Account created! You can now login.";
});


// Login
loginBtn.addEventListener("click", () => {

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    let users =
        JSON.parse(localStorage.getItem("pixel_users")) || {};

    if (
        users[username] &&
        users[username] === password
    ) {

        localStorage.setItem(
            "logged_in_user",
            username
        );

        window.location.href = "./index.html";

    } else {

        authMsg.style.color = "red";
        authMsg.innerText = "Invalid credentials.";
    }
});