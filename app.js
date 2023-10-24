let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

// Ajout de l'élément de date
const currentDate = new Date(); // Obtenez la date actuelle
const dateElement = document.getElementById("current-date");

//Partie pour Définir le Budget
totalAmountButton.addEventListener("click", () => {
  tempAmount = totalAmount.value;
  // Vérification de l'entrée vide ou négative
  if (tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    // Définir le Budget
    amount.innerHTML = tempAmount;
    // Définir le Solde
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    // Effacer la zone de saisie
    totalAmount.value = "";
  }
  dateElement.innerText = `Date : ${currentDate.toLocaleDateString()}`;
});

// Fonction pour désactiver les boutons Modifier et Supprimer
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

// Fonction pour modifier les éléments de la liste
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = balanceValue.innerText;
  let currentExpense = expenditureValue.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }
  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();
};

// Fonction pour créer la liste
const listCreator = (nomDepense, montantDepense) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class="product">${nomDepense}</p><p class="amount">${montantDepense}</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublistContent);
};

// Fonction pour ajouter des dépenses
checkAmountButton.addEventListener("click", () => {
  // Vérification des entrées vides
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }
  // Activation des boutons
  disableButtons(false);
  // Montant de la dépense
  let montantDepense = parseInt(userAmount.value);
  // Total des dépenses (existante + nouvelle)
  let somme = parseInt(expenditureValue.innerText) + montantDepense;
  expenditureValue.innerText = somme;
  // Solde total (budget - total des dépenses)
  const soldeTotal = tempAmount - somme;
  balanceValue.innerText = soldeTotal;
  // Création de la liste
  listCreator(productTitle.value, montantDepense);
  // Vider les zones de saisie
  productTitle.value = "";
  userAmount.value = "";
});
