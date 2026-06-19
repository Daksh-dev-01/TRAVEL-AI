// ===========================
// TOAST MESSAGE
// ===========================

function showToast(message, isError = false){

    const toast = document.createElement("div");

    toast.className = isError
        ? "toast error"
        : "toast";

    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ===========================
// SIGNUP
// ===========================

const signupForm =
document.getElementById("signupForm");

if(signupForm){

    signupForm.addEventListener(
        "submit",
        function(e){

            e.preventDefault();

            const name =
            document.getElementById("signupName")
            .value.trim();

            const email =
            document.getElementById("signupEmail")
            .value.trim();

            const password =
            document.getElementById("signupPassword")
            .value;

            const confirmPassword =
            document.getElementById("confirmPassword")
            .value;

            if(name.length < 3){

                showToast(
                    "Name must be at least 3 characters",
                    true
                );

                return;
            }

            if(!email.includes("@")){

                showToast(
                    "Please enter a valid email",
                    true
                );

                return;
            }

            if(password.length < 6){

                showToast(
                    "Password must be at least 6 characters",
                    true
                );

                return;
            }

            if(password !== confirmPassword){

                showToast(
                    "Passwords do not match",
                    true
                );

                return;
            }

            const users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];

            const existingUser =
            users.find(
                user => user.email === email
            );

            if(existingUser){

                showToast(
                    "Email already registered",
                    true
                );

                return;
            }

            const newUser = {

                id: Date.now(),

                name,

                email,

                password
            };

            users.push(newUser);

            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );

            showToast(
                "Account created successfully"
            );

            setTimeout(() => {

                window.location.href =
                "login.html";

            }, 1500);
        }
    );
}

// ===========================
// LOGIN
// ===========================

const loginForm =
document.getElementById("loginForm");

if(loginForm){

    const rememberedEmail =
    localStorage.getItem(
        "rememberedEmail"
    );

    if(rememberedEmail){

        document.getElementById(
            "loginEmail"
        ).value = rememberedEmail;

        document.getElementById(
            "rememberMe"
        ).checked = true;
    }

    loginForm.addEventListener(
        "submit",
        function(e){

            e.preventDefault();

            const email =
            document.getElementById(
                "loginEmail"
            ).value.trim();

            const password =
            document.getElementById(
                "loginPassword"
            ).value;

            const remember =
            document.getElementById(
                "rememberMe"
            ).checked;

            const users =
            JSON.parse(
                localStorage.getItem(
                    "users"
                )
            ) || [];

            const user =
            users.find(
                user =>
                user.email === email &&
                user.password === password
            );

            if(!user){

                showToast(
                    "Invalid credentials",
                    true
                );

                return;
            }

            if(remember){

                localStorage.setItem(
                    "rememberedEmail",
                    email
                );

            }else{

                localStorage.removeItem(
                    "rememberedEmail"
                );
            }

            localStorage.setItem(
                "loggedIn",
                "true"
            );

            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );

            showToast(
                "Login Successful"
            );

            setTimeout(() => {

                window.location.href =
                "dashboard.html";

            }, 1000);
        }
    );
}

// ===========================
// GOOGLE LOGIN (DUMMY)
// ===========================

const googleLogin =
document.getElementById(
    "googleLogin"
);

if(googleLogin){

    googleLogin.addEventListener(
        "click",
        () => {

            const demoUser = {

                id: Date.now(),

                name: "Google User",

                email:
                "googleuser@gmail.com"
            };

            localStorage.setItem(
                "loggedIn",
                "true"
            );

            localStorage.setItem(
                "currentUser",
                JSON.stringify(demoUser)
            );

            showToast(
                "Google Login Successful"
            );

            setTimeout(() => {

                window.location.href =
                "dashboard.html";

            }, 1000);
        }
    );
}

// ===========================
// GOOGLE SIGNUP (DUMMY)
// ===========================

const googleSignup =
document.getElementById(
    "googleSignup"
);

if(googleSignup){

    googleSignup.addEventListener(
        "click",
        () => {

            const users =
            JSON.parse(
                localStorage.getItem(
                    "users"
                )
            ) || [];

            const email =
            "googleuser@gmail.com";

            const exists =
            users.find(
                user =>
                user.email === email
            );

            if(!exists){

                users.push({

                    id: Date.now(),

                    name: "Google User",

                    email,

                    password: "google"
                });

                localStorage.setItem(
                    "users",
                    JSON.stringify(users)
                );
            }

            showToast(
                "Google Signup Successful"
            );

            setTimeout(() => {

                window.location.href =
                "login.html";

            }, 1000);
        }
    );
}