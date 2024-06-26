import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const app = initializeApp(window.firebaseConfig);
const auth = getAuth();

const currentUser = auth.currentUser;

console.log(currentUser);

if (currentUser) {
    window.user = currentUser.uid;
} else {
    window.user = null;
}

onAuthStateChanged(auth, (user) => {
    const activeLink = document.querySelector('.lang .link.active');
    if (user) {
        console.log(window.user, user.uid);
        if (window.user != user.uid) {
            window.user = user.uid;
            // window.location.href = "/index.html";    
            console.log("user is logged in");
            if (activeLink && activeLink.textContent.trim() === 'UA') {
                document.getElementById('menu__item-results').href = '../../pages/ukr/results.html';
            } else {
                document.getElementById('menu__item-results').href = '../../pages/eng/results.eng.html';
            }
        }
    } else {
        if (window.user !== null) {
            window.user = null;
        }
        console.log("user is logged in");
        if (activeLink && activeLink.textContent.trim() === 'UA') {
            document.getElementById('menu__item-results').href = '../../pages/ukr/results_not_registered.html';
        } else {
            document.getElementById('menu__item-results').href = '../../pages/eng/results_not_registered.html';
        }
    }
    showAuthControls();
});

function showAuthControls() {
    if (window.user) {
        document.querySelectorAll('.unauthorized').forEach(function(element) {
            element.classList.add('hidden');
        });
        document.querySelectorAll('.authorized').forEach(function(element) {
            element.classList.remove('hidden');
        });
    } else {
        document.querySelectorAll('.unauthorized').forEach(function(element) {
            element.classList.remove('hidden');
        });
        document.querySelectorAll('.authorized').forEach(function(element) {
            element.classList.add('hidden');
        });
    }
}

document.getElementById('sign-out').addEventListener('click', () => {
    auth.signOut().then(function() {
        console.log('User signed out');
      }).catch(function(error) {
        console.log('Error signing out');
      });
});



showAuthControls();