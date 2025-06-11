// Récupère les boutons
const startBtn = document.getElementById('start-button');
const buttons = document.querySelectorAll('#choices-panel button');

// Récupère la zone où afficher l'explication
const feedback = document.getElementById('feedback');
const reputationfeedback = document.getElementById('reputation-feedback');

// Récupère les éléments de l'authentification et du contenu principal
const authContainer = document.getElementById('auth-container');
const mainContainer = document.getElementById('main-container');

// Exemple de réponse correcte
const correctChoice = "Signaler au service informatique";

let score = 0; // Score initial
const maxScore = 6; // Score maximum pour le quiz
const scoreBar = document.getElementById('score-bar');

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
      feedback.textContent = "❌ Mauvaise réponse : Ce message semblait légitime, mais contenait un lien suspect. Il valait mieux le signaler.";
      const penalty = score > 0 ? -1 : 0; // Ne pas pénaliser si score déjà à 0
      score += penalty;
      updateScoreBar(penalty);
    }

    buttons.forEach(btn => btn.disabled = true);
  });
});

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
  //authContainer.style.display = "none";
  //mainContainer.style.display = "block";
});
//document.getElementById('main-container').style.display = "block";

// Système de transition après l'authentification
document.getElementById("start-button").addEventListener("click", function () {
  const authSection = document.getElementById("auth-container");
  const quizSection = document.getElementById("main-container");

  // Lancer l'effet de fondu
  authSection.classList.add("fade-out");

  // Après le fondu, cacher l'auth et montrer le quiz
  setTimeout(() => {
    authSection.classList.add("hidden");
    quizSection.classList.remove("hidden");
    quizSection.classList.add("fade-in");
  }, 2000); // correspond à la durée du "transition: opacity"
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