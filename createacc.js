function updatefilename() {
	const fileInput = document.getElementById("profile_picture");
    const selectedFile = document.getElementById("selectedFile");

    if (fileInput.files.length > 0) {
        selectedFile.textContent = fileInput.files[0].name;
    } else {
        selectedFile.textContent = "No file chosen";
    }
}
// Initialize Firebase with your Firebase project configuration
const firebaseConfig = {
	apiKey: "AIzaSyBEmc7q-XsXxSTPEo9reQtrUr0Q9UOtnQA",
	authDomain: "mahawar-vaishya-vansh.firebaseapp.com",
	projectId: "mahawar-vaishya-vansh",
	storageBucket: "mahawar-vaishya-vansh.appspot.com",
	messagingSenderId: "421253025412",
	appId: "1:421253025412:web:aaf010926a8db56a3dfcd1"
};

firebase.initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = firebase.storage();

// Set database variable
const database = firebase.database();
const auth = firebase.auth();

function save() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
    var say_something = document.getElementById('say_something').value;
    var height = document.getElementById('height').value;
    var weight = document.getElementById('weight').value;
    
    // To save file in firebase storage
    var file = document.getElementById('profile_picture').files[0];
    var storageRef = firebase.storage().ref('profile_pictures/' + username);
    var uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', 
        function(snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, 
        function(error) {
            // Handle unsuccessful uploads
            console.error('Error uploading file:', error);
        }, 
        function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                
                // Save message to firebase database
                saveMessage(downloadURL, email, password, username, say_something, height, weight);
            });
        }
    );
}

// Save message to firebase database
function saveMessage(url, email, password, username, say_something, height, weight) {
    var usersRef = firebase.database().ref('users/' + username);
    usersRef.set({
        email: email,
        password: password,
        username: username,
        say_something: say_something,
        height: height,
        weight: weight,
        imageUrl: url // Assuming you want to store the image URL in the database
    })
    .then(function() {
        // Data saved successfully
        console.log('Data saved successfully');
        // Add email to authentication list
        return firebase.auth().createUserWithEmailAndPassword(email,password);
    })
    .then(function() {
        // User created successfully
        console.log('User created successfully');
        alert('Saved');
    })
    .catch(function(error) {
        console.error('Error saving data:', error.message);
        // Handle error
        alert('Failed to save data. Please try again.');
    });
}
