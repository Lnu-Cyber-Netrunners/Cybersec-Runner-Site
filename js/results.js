import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js"

const app = initializeApp(window.firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

async function GetResults(userID) {
    
    const testResultsCollection = collection(db, 'Test_Results');
    const q = query(testResultsCollection, where('userID', '==', userID));
    const results = [];

    try {
        // Get the documents that match the query
        const querySnapshot = await getDocs(q);
        
        // Iterate over the documents and log them to the console
        querySnapshot.forEach((doc) => {
            const tResult = doc.data();
            if (!results[tResult.testId]) {
                results[tResult.testId] = tResult;
            } else {
                if (results[tResult.testId].date < tResult.date) {
                    results[tResult.testId] = tResult;
                }
            }
        });
    } catch (error) {
        console.error("Error getting test results:", error);
    }
    return results;
}

document.addEventListener('DOMContentLoaded', async () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const results = await GetResults(user.uid);
            results.forEach((result) => {
                const resultElement = document.getElementById('test'+ result.testId);
                resultElement.innerHTML = result.result;
            });
            console.log(results);
        } else {
            window.location.href = "/index.html";
        }
        
    });
});
