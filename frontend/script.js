// Récupère les boutons
const buttons = document.querySelectorAll('#choices-panel button');

// Récupère la zone où afficher l'explication
const feedback = document.getElementById('feedback');

// Exemple de réponse correcte
const correctChoice = "Signaler au service informatique";

// Détection du clic sur chaque bouton
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const chosen = button.textContent;

    if (chosen === correctChoice) {
      feedback.className = "feedback good";
      feedback.textContent = "✅ Bonne réponse : Ce message présente plusieurs signes de phishing (adresse douteuse, lien non officiel).";
    } else {
      feedback.className = "feedback bad";
      feedback.textContent = "❌ Mauvaise réponse : Ce message semblait légitime, mais contenait un lien suspect. Il valait mieux le signaler.";
    }

    buttons.forEach(btn => btn.disabled = true);
  });
});
