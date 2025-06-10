// Récupère les boutons
//const startBtn = document.getElementById('start-button');
const buttons = document.querySelectorAll('#choices-panel button');

// Récupère la zone où afficher l'explication
const feedback = document.getElementById('feedback');
const reputationfeedback = document.getElementById('reputation-feedback');

// Récupère les éléments de l'authentification et du contenu principal
//const authContainer = document.getElementById('auth-container');
//const mainContainer = document.getElementById('main-container');

// Exemple de réponse correcte
const correctChoice = "Signaler au service informatique";

let score = 0;
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
    } else {
      feedback.className = "feedback bad";
      feedback.textContent = "❌ Mauvaise réponse : Ce message semblait légitime, mais contenait un lien suspect. Il valait mieux le signaler.";
      score -= 1;
      updateScoreBar();
    }

    buttons.forEach(btn => btn.disabled = true);
  });
});

// Authentification de l'utilisateur
/*startBtn.addEventListener('click', () => {
  const name = document.getElementById('username').value.trim();
  const email = document.getElementById('useremail').value.trim();

  if (name === "" || email === "") {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  // Stockage temporaire en mémoire (optionnel)
  localStorage.setItem('username', name);
  localStorage.setItem('useremail', email);

  // Cacher auth, afficher le quiz
  authContainer.style.display = "none";
  mainContainer.style.display = "block";
}); */
document.getElementById('main-container').style.display = "block";

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