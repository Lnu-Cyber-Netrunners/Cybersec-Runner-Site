import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auth = getAuth();
    
    const signInButton = document.querySelector('.loginbtn');
    signInButton.addEventListener('click', (e) => {
        e.preventDefault();

        var email = document.getElementById('email').value;
        var password = document.getElementById('psw').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;

                const dt = new Date();
                update(ref(database, 'users/' + user.uid), {
                    last_login: dt
                })

                alert('User logged in!');

                window.location.href = "/index.html";

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                alert(errorMessage);
            });
    });

    // const forgotPasswordButton = document.querySelector('.forgotpasswordbtn');
    // forgotPasswordButton.addEventListener('click', (e) => {
    //     e.preventDefault();

    //     var email = document.getElementById('email').value;

    //     sendPasswordResetEmail(auth, email)
    //         .then(() => {
    //             alert("Посилання для зміни пароля було надіслано на вашу електронну пошту");
    //         })

    //         .catch((error) => {
    //             console.log(error.code);
    //             console.log(error.message);
    //         });
    // });
});
