// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBEmc7q-XsXxSTPEo9reQtrUr0Q9UOtnQA",
    authDomain: "mahawar-vaishya-vansh.firebaseapp.com",
    projectId: "mahawar-vaishya-vansh",
    storageBucket: "mahawar-vaishya-vansh.appspot.com",
    messagingSenderId: "421253025412",
    appId: "1:421253025412:web:aaf010926a8db56a3dfcd1"
};
firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Get the current user's data and populate the form fields
auth.onAuthStateChanged((user) => {
    if (user) {
        const userRef = database.ref('users/' + user.uid);
        userRef.once('value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    document.getElementById('name').value = userData.name;
                    document.getElementById('email').value = userData.email;
                    document.getElementById('say_something').value = userData.say_something;
                    document.getElementById('height').value = userData.height;
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    } else {
        console.log("No user is signed in.");
    }
});

// Update user data in the database
const editForm = document.getElementById('edit-form');
editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = editForm['name'].value;
    const email = editForm['email'].value;
    const say_something = editForm['say_something'].value;
    const height = editForm['height'].value;

    auth.onAuthStateChanged((user) => {
        if (user) {
            const userRef = database.ref('users/' + name);
            userRef.update({
                name: name,
                email: email,
                say_something: say_something,
                height: height
            })
            .then(() => {
                console.log("User data updated successfully");
                // Redirect to dashboard or any other page
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                console.error("Error updating user data:", error);
            });
        } else {
            console.log("No user is signed in.");
        }
    });
});
