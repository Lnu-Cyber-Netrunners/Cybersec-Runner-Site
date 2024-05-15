import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js"

function StoreTest(id, result) {
    const app = initializeApp(window.firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth();

    const user = window.user;
    if (!user) {
        console.log('User is not logged in');
        return;
    }

    const testResult = {
        testId: id,
        result: result,
        userID: user,
        date: new Date().toISOString()
    }
    const resultsCollection = collection(db, 'Test_Results');
    addDoc(resultsCollection, testResult)
        .then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
        });
}

function checkAnswers(testID) {
    const totalQuestions = 5;

    let correctAnswers = 0;

    for (let i = 1; i <= totalQuestions; i++) {
        const selectedAnswer = document.querySelector('input[name="q' + i + '"]:checked');

        if (selectedAnswer) {
            const correctOption = 'a';

            if (selectedAnswer.value === correctOption) {
                correctAnswers++;
                selectedAnswer.parentElement.classList.add('correct');
                selectedAnswer.parentElement.classList.remove('incorrect');
            } else {
                selectedAnswer.parentElement.classList.add('incorrect');
                selectedAnswer.parentElement.classList.remove('correct');
            }
        }
    }

    const resultMessage = `Ви відповіли правильно на ${correctAnswers} з ${totalQuestions} питань.`;
    document.getElementById('resultMessage').innerHTML = resultMessage;
    StoreTest(testID, correctAnswers);
}

document.addEventListener('DOMContentLoaded', () => {
    const checkResultsButton = document.getElementById('check-results');
    checkResultsButton.addEventListener('click', function (e) {
        e.preventDefault();
        const testID = e.target.getAttribute('data-testid');
        checkAnswers(testID);
    });
});