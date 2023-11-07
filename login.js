import user from "./register.js";

const inputEmail = document.getElementById("email")
const inputPassword = document.getElementById("password");
const login = document.getElementById("login");



  login.addEventListener("click", (e)=>{
    e.preventDefault()
    if (inputEmail.value != "" && inputPassword.value != "") {
      e.preventDefault();
      const result = user.find((el) => el.email === inputEmail.value && el.password === inputPassword.value)
      console.log(result);
      if (result) {
      if (result.statut === "Admin") {
        alert(
          "Il n'y a pas d'enregistrement d'utilisateur correspondant à cet identifiant. L'utilisateur a peut-être été supprimé."
        );
      } else{
        window.location.href = "admin.html";
        alert("Connexion réussie !");
      } 
    } else {
      window.location.href = "register.html";
      alert("Aucun compte trouvé pour cet identifiant. Veuillez vous inscrire.");
    } 
    } else {
      alert("Veullez remplir tous les champs");
    }
  });

  

