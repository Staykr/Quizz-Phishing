/* ====== INITIALISATION ====== */

// Récupère les boutons
const startBtn = document.getElementById('start-button');
const nextbutton = document.getElementById('next-button');
const buttons = document.querySelectorAll('#choices-panel button');
const buttons2 = document.querySelectorAll('#choices-panel-2 button');

// Récupère la zone où afficher l'explication
const feedback = document.getElementById('feedback');
const feedback2 = document.getElementById('feedback-2');
const reputationfeedback = document.getElementById('reputation-feedback');

// Récupère les éléments de l'authentification et du contenu principal
const authContainer = document.getElementById('auth-container');
const mainContainer = document.getElementById('main-container');
const Q1Block = document.getElementById('Question-1');
const Q2Block = document.getElementById('Question-2');

// Exemple de réponse correcte
const correctChoice = "Supprimer le message";
const correctChoice2 = "Signaler au service informatique";

let score = 0; // Score initial
const maxScore = 6; // Score maximum pour le quiz
const scoreBar = document.getElementById('score-bar');


/* ---- Toutes les fonctions ---- */

// Authentification de l'utilisateur
startBtn.addEventListener('click', () => {
  const name = document.getElementById('username').value.trim();
  const email = document.getElementById('useremail').value.trim();

  if (name === "" || email === "") {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  // Stockage temporaire en mémoire (optionnel)
  //localStorage.setItem('username', name);
  //localStorage.setItem('useremail', email);

  // Cacher auth, afficher le quiz
  authContainer.style.display = "none";
  mainContainer.style.display = "block";
  Q2Block.style.display = "block";

});

nextbutton.addEventListener('click', () => {
  // Cacher la première question et afficher la deuxième
    Q1Block.style.display = "none";
    Q2Block.style.display = "block";

    // Réinitialiser le feedback de la première question
    feedback.textContent = "";
    feedback.className = "";

    // Réinitialiser les boutons de la première question
    buttons.forEach(button => {
        button.disabled = false;
    });


})

/*  ---- QUESTION 1 ---- */
// Détection du clic sur chaque bouton
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const chosen = button.textContent;

    if (chosen === correctChoice) {
      feedback.className = "feedback good";
      feedback.textContent = "✅ Bonne réponse : Ce message présente plusieurs signes de phishing (adresse douteuse, lien non officiel).";
      score += 1;
      updateScoreBar();
      showScoreChange(1);
    } else {
      feedback.className = "feedback bad";
      feedback.textContent = "❌ Mauvaise réponse : Ce message semblait légitime, mais contenait un lien suspect. " +
          "Vôtre entreprise ne vous fera jamais cliqué sur un lien pour télécharger des ressources" + "Il valait mieux supprimer le mail." + ".";
      const penalty = score > 0 ? -1 : 0; // Ne pas pénaliser si score déjà à 0
      score += penalty;
      updateScoreBar(penalty);
    }

    buttons.forEach(btn => btn.disabled = true);
    nextbutton.style.display = 'inline-block';
  });
});

/*  ---- QUESTION 2 ---- */
buttons2.forEach(button => {
  button.addEventListener('click', () => {
    const chosen = button.textContent;

    if (chosen === correctChoice2) {
      feedback2.className = "feedback good";
      feedback2.textContent = "✅ Bien joué ! Le lien de la pièce jointe pointe vers un site suspect. Ce message devait être signalé.";
      score += 1;
      updateScoreBar();
      showScoreChange(1);
    } else {
      feedback2.className = "feedback bad";
      feedback2.textContent = "❌ Mauvaise réponse : Toujours vérifier où mène une pièce jointe en survolant son lien.";
      const penalty = score > 0 ? -1 : 0;
      score += penalty;
      updateScoreBar();
      showScoreChange(penalty)
    }

    buttons2.forEach(btn => btn.disabled = true);
  });
});

// Update de la barre de score
function updateScoreBar() {
  const pourcentage = Math.min((score / maxScore) * 100, 100);
  scoreBar.style.width = `${pourcentage}%`;
  updatereputation();
}

// Mise à jour de la réputation en fonction du score
function updatereputation() {
  if (score <= 1) {
    reputationfeedback.textContent = "🔰 Débutant en cybersécurité : vous commencez à repérer les pièges.";
    reputationfeedback.className = "feedback-reputation";
  } else if (score <= 3) {
    reputationfeedback.textContent = "🛡️ Vigilant : vous savez repérer les principaux signes de phishing.";
    reputationfeedback.className = "feedback good";
  } else {
    reputationfeedback.textContent = "🚨 Expert : vous avez une excellente vigilance numérique !";
    reputationfeedback.className = "feedback good";
  }
}

// Affichage du score Gagné ou Perdu
function showScoreChange(value) {
  const scoreFeedback = document.getElementById("score-feedback");

  // Générer des positions aléatoires dans les limites de la fenêtre
  const randomTop = Math.floor(Math.random() * (window.innerHeight - 100)) + 20;
  const randomLeft = Math.floor(Math.random() * (window.innerWidth - 100)) + 20;

  // Appliquer les positions aléatoires
  scoreFeedback.style.top = `${randomTop}px`;
  scoreFeedback.style.left = `${randomLeft}px`;

  // Définir le texte
  const prefix = value > 0 ? "+" : "";
  scoreFeedback.textContent = `${prefix}${value}`;

  // Appliquer les bonnes classes
  scoreFeedback.className = "score-change show"; // reset
  if (value > 0) {
    scoreFeedback.classList.add("score-positive");
  } else if (value === 0) {
    scoreFeedback.classList.add("score-neutral");
  } else {
    scoreFeedback.classList.add("score-negative");
  }

  // Masquer après 2 secondes
  setTimeout(() => {
    scoreFeedback.classList.remove("show");
  }, 2000);
}