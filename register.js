// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  collection,
  addDoc,
  getFirestore,
  query,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuWU0FdgDYUnBEFUAoAeCXbGPccuqhAw4",
  authDomain: "new-project-19ce9.firebaseapp.com",
  projectId: "new-project-19ce9",
  storageBucket: "new-project-19ce9.appspot.com",
  messagingSenderId: "980863699914",
  appId: "1:980863699914:web:e61eda1b66b0de758c1d33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


//************* Validation Email**************
const validEmail = function (inputEmail) {
  //la création de la RegExp pour validation email
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );

  //récupération de la balise small
  let small = document.getElementById("checkEmail");

  //on teste l'expression réguliére
  if (emailRegExp.test(inputEmail.value)) {
    small.innerHTML = "Adresse valide";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = "Adresse non valide";
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};

//************* Validation Password**************
//Affichage
//récupération de la balise small
let small = document.getElementById("checkPW");

const validPassword = function (inputPassword) {
  let msg;
  let valid = false;
  //au moins 3 caractéres
  if (inputPassword.value.length < 3) {
    msg = "Le mot de passe doit contenir au moins 3 caractéres";
  }
  //au moins 1 majiscule
  else if (!/[A-Z]/.test(inputPassword.value)) {
    msg = "Le mot de passe doit contenir au moins 1 majiscule";
  }
  //au moins 1 minuscule
  else if (!/[a-z]/.test(inputPassword.value)) {
    msg = "Le mot de passe doit contenir au moins 1 minuscule";
  }
  //au moins 1 chiffre
  else if (!/[0-9]/.test(inputPassword.value)) {
    msg = "Le mot de passe doit contenir au moins 1 chiffre";
  }
  //mot de passe valide
  else {
    msg = "Le mot de passe est valide";
    valid = true;
  }

  //on teste l'expression réguliére
  if (valid) {
    small.innerHTML = "Mot de passe valide";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = msg;
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};

//AJOUT DANS LA BASE DE DONNÈE

let addData = document.querySelector("#sign-up");
if(addData) {
  addData.addEventListener("click", async function () {
    let prenom = document.querySelector("#prenom").value;
    let nom = document.querySelector("#nom").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let confirmPW = document.querySelector("#confirmPW").value;
    let statut = document.querySelector("#statut").value;
  
    //remplissage des inputs avant envoie dans la base de donnée
    if (
      prenom != "" &&
      nom != "" &&
      email != "" &&
      password != "" &&
      confirmPW != "" &&
      statut != ""
    ) {
      await addDoc(collection(db, "users"), {
        prenom: prenom,
        nom: nom,
        email: email,
        password: password,
        confirmPW: confirmPW,
        statut: statut,
      });
      window.location.href = "index.html";
      alert("Inscription réussie !");
    } else {
      alert("Veillez remplir tous les champs ");
    }
  });

}

const user = [];
const q = query(collection(db, "users"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    user.push(doc.data());
  });
});

export default user;
