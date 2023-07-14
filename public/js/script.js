var token_array;
var token;
if (document.cookie) {
    token_array = document.cookie.split("accesstoken=")[1]
    token = token_array.split(";")[0];
}

if (window.location.pathname === "/") {
    if (token) {
        window.location.href = "/dashboard"
    } else {
        let link = document.getElementById("login-link").classList;
        link.add("active");
    }
}

if (window.location.pathname === "/register") {
    if (token) {
        window.location.href = "/dashboard"
    } else {
        let link = document.getElementById("register-link").classList;
        link.add("active");
    }
}

if (window.location.pathname === "/dashboard" || document.referrer.split("/").slice(-1)[0] === "dashboard") {
    if (token) {
        let link = document.getElementById("dashboard-link").classList;
        link.add("active");
    } else {
        window.location.href = "/"
    }
}

if (window.location.pathname === "/new-car") {
    if (!token) {
        window.location.href = "/"
    } else {
        let link = document.getElementById("new-car-link").classList;
        link.add("active");
    }
}

if (window.location.pathname === "/sign-out") {
    window.location.href = "/"
}

var registerForm = document.getElementById("register_form");
if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        let fullName = document.getElementById("register-fullname").value;
        let username = document.getElementById("register-username").value;
        let password = document.getElementById("register-password").value;
        let confirm_password = document.getElementById("register-confirm_password").value;
        if (password === confirm_password) {
            let registerURL = "/api/v1/register"
            let data = { fullName, username, password }

            let response = await fetch(registerURL, {
                method: "POST",
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (response.status === 200) {
                window.location.href = "/"
            } else {
                alert("This username already exist!")
            }
        } else {
            alert("Password and Confirm password are not match!")
        }
    });
}


var loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        let username = document.getElementById("login-username").value;
        let password = document.getElementById("login-password").value;
        let loginURL = "/api/v1/login"
        let data = { username, password }

        let response = await fetch(loginURL, {
            method: "POST",
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (response.status === 200) {
            window.location.href = "/dashboard"
        } else {
            alert("Username or password incorrect!")
        }
    });
}

var newCarForm = document.getElementById("new-car-form");
if (newCarForm) {
    newCarForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        let manufacturer = document.getElementById("car-manufacturer").value;
        let model = document.getElementById("car-model").value;
        let year = document.getElementById("car-year").value;
        let price = document.getElementById("car-price").value;
        let slug = document.getElementById("car-slug").value;
        let carsURL = "/api/v1/cars"
        let data = { manufacturer, model, year, price, slug }

        let response = await fetch(carsURL, {
            method: "POST",
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data),
        })

        if (response.status === 201) {
            window.location.href = "/dashboard"
        } else {
            alert("This car not exist!")
        }
    });
}

var updateCarForm = document.getElementById("update-car-form");
if (updateCarForm) {
    updateCarForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        let id = document.getElementById("car-id").value;
        let manufacturer = document.getElementById("car-manufacturer").value;
        let model = document.getElementById("car-model").value;
        let year = document.getElementById("car-year").value;
        let price = document.getElementById("car-price").value;
        let slug = document.getElementById("car-slug").value;
        let carsURL = "/api/v1/cars/" + id
        let data = { manufacturer, model, year, price, slug }

        let response = await fetch(carsURL, {
            method: "PUT",
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data),
        })

        if (response.status === 200) {
            window.location.href = "/dashboard"
        } else {
            alert("This car not exist!")
        }
    });
}

const updateCar = async (e) => {
    window.location.href = "/cars/" + e
}

const deleteCar = async (e) => {
    let carsURL = "/api/v1/cars/" + e
    let response = await fetch(carsURL, {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    })

    if (response.status === 200) {
        window.location.href = "/dashboard"
    } else {
        alert("This car not exist!")
    }
}

function logout() {
    window.location.href = "/"
    var Cookies = document.cookie.split(';');
    // set past expiry to all cookies
    for (var i = 0; i < Cookies.length; i++) {
        document.cookie = Cookies[i] + "=; expires=" + new Date(0).toUTCString();
    }

}


