import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    const app = initializeApp(window.firebaseConfig);
    const database = getDatabase(app);
    const auth = getAuth();
    const signUpButton = document.querySelector('.registerbtn');

    signUpButton.addEventListener('click', (e) => {
        e.preventDefault();

        var email = document.getElementById('email').value;
        var password = document.getElementById('psw').value;
        var repeatPassword = document.getElementById('psw-repeat').value;

        if (password !== repeatPassword) {
            alert('Passwords do not match');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;

                set(ref(database, 'users/' + user.uid), {
                  email: email
              })

                alert('User created!');

                window.location.href = "/index.html";

            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);

            });
    });
});