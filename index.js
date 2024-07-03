// Check if Firebase app has already been initialized
if (!firebase.apps.length) {
	// Your web app's Firebase configuration
	const firebaseConfig = {
		apiKey: "AIzaSyBEmc7q-XsXxSTPEo9reQtrUr0Q9UOtnQA",
		authDomain: "mahawar-vaishya-vansh.firebaseapp.com",
		projectId: "mahawar-vaishya-vansh",
		storageBucket: "mahawar-vaishya-vansh.appspot.com",
		messagingSenderId: "421253025412",
		appId: "1:421253025412:web:aaf010926a8db56a3dfcd1"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
}

// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Define the submit function
function submit() {
	const email = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	firebase.auth().signInWithEmailAndPassword(email, password)
		.then((userCredential) => {
			// Redirect to dashboard upon successful login
			const user = userCredential.user;
			console.log("User:", user);
			window.location.href = 'dashboard.html';
		})
		.catch((error) => {
			// Handle login errors
			alert(error.message);
		});
}

