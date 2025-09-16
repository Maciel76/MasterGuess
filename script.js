// Variáveis do jogo
let numeroAleatorio = Math.floor(Math.random() * 100) + 1;
let tentativasRestantes = 10;

// Seleção de elementos HTML
const input = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const resultMessage = document.getElementById("result");
const attemptsMessage = document.getElementById("attempts-left");
const progressBar = document.getElementById("progress-bar");
const gameContainer = document.getElementById("game-container");
const particlesContainer = document.getElementById("particles");

// Criar partículas de fundo
function createParticles() {
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 10 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.opacity = Math.random() * 0.5;

    particlesContainer.appendChild(particle);
  }
}

// Atualizar o contador de tentativas e a barra de progresso
function atualizarInterface() {
  attemptsMessage.textContent = `Tentativas restantes: ${tentativasRestantes}`;
  attemptsMessage.classList.add("bounce");
  setTimeout(() => attemptsMessage.classList.remove("bounce"), 500);

  progressBar.style.width = `${(tentativasRestantes / 10) * 100}%`;
}

// Função para verificar a tentativa do jogador
function verificarTentativa() {
  const palpite = parseInt(input.value);

  // Verificar se a entrada é válida
  if (isNaN(palpite) || palpite < 1 || palpite > 100) {
    resultMessage.innerHTML =
      "<i class='fas fa-exclamation-circle'></i> Por favor, insira um número válido entre 1 e 100.";
    resultMessage.style.color = "var(--danger)";
    gameContainer.classList.add("shake");
    setTimeout(() => gameContainer.classList.remove("shake"), 600);
    return;
  }

  // Reduzir o número de tentativas
  tentativasRestantes--;
  atualizarInterface();

  // Verificar se o palpite está correto
  if (palpite === numeroAleatorio) {
    resultMessage.innerHTML =
      "<i class='fas fa-trophy'></i> 🎉 Parabéns, você acertou! 🎉";
    resultMessage.style.color = "var(--success)";
    animarVitoria();
    encerrarJogo();
  } else if (tentativasRestantes === 0) {
    resultMessage.innerHTML = `<i class='fas fa-times-circle'></i> 😢 Game Over! O número era ${numeroAleatorio}.`;
    resultMessage.style.color = "var(--danger)";
    animarDerrota();
    encerrarJogo();
  } else if (palpite < numeroAleatorio) {
    resultMessage.innerHTML =
      "<i class='fas fa-arrow-up'></i> 🔺 O número é maior!";
    resultMessage.style.color = "var(--warning)";
  } else {
    resultMessage.innerHTML =
      "<i class='fas fa-arrow-down'></i> 🔻 O número é menor!";
    resultMessage.style.color = "var(--info)";
  }

  // Limpar o campo de entrada
  input.value = "";
  input.focus();
}

// Função para animar a vitória
function animarVitoria() {
  // Efeito de confete
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
  });

  // Efeito de pulso no container
  gameContainer.style.animation = "pulse 0.5s 3";

  // Criar estrelas animadas
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const star = document.createElement("div");
      star.innerHTML =
        '<i class="fas fa-star" style="color: var(--secondary);"></i>';
      star.style.position = "absolute";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.fontSize = `${Math.random() * 20 + 10}px`;
      star.style.opacity = "0";
      star.style.transition = "all 0.5s ease-out";
      gameContainer.appendChild(star);

      setTimeout(() => {
        star.style.opacity = "1";
        star.style.transform = "translateY(-20px)";
      }, 10);

      setTimeout(() => {
        star.style.opacity = "0";
      }, 1000);

      setTimeout(() => {
        gameContainer.removeChild(star);
      }, 1500);
    }, i * 100);
  }
}

// Função para animar a derrota
function animarDerrota() {
  gameContainer.classList.add("shake");
  setTimeout(() => gameContainer.classList.remove("shake"), 600);

  // Efeito de coração quebrado
  const brokenHeart = document.createElement("div");
  brokenHeart.innerHTML =
    '<i class="fas fa-heart-broken" style="color: var(--danger); font-size: 3rem;"></i>';
  brokenHeart.style.position = "absolute";
  brokenHeart.style.left = "50%";
  brokenHeart.style.top = "50%";
  brokenHeart.style.transform = "translate(-50%, -50%)";
  brokenHeart.style.opacity = "0";
  brokenHeart.style.zIndex = "10";
  gameContainer.appendChild(brokenHeart);

  setTimeout(() => {
    brokenHeart.style.opacity = "1";
    brokenHeart.style.transition = "all 0.5s ease";
  }, 10);

  setTimeout(() => {
    brokenHeart.style.opacity = "0";
  }, 1000);

  setTimeout(() => {
    gameContainer.removeChild(brokenHeart);
  }, 1500);
}

// Função para encerrar o jogo
function encerrarJogo() {
  input.disabled = true;
  submitBtn.style.display = "none";
  resetBtn.style.display = "flex";
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  tentativasRestantes = 10;
  numeroAleatorio = Math.floor(Math.random() * 100) + 1;
  input.disabled = false;
  input.value = "";
  input.focus();
  submitBtn.style.display = "flex";
  resetBtn.style.display = "none";
  resultMessage.textContent = "";
  resultMessage.style.color = "var(--light)";
  atualizarInterface();

  // Efeito visual de reinício
  gameContainer.style.animation = "pulse 0.5s";
}

// Eventos de clique
submitBtn.addEventListener("click", verificarTentativa);
resetBtn.addEventListener("click", reiniciarJogo);

// Evento de teclado para o input
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    verificarTentativa();
  }
});

// Inicializar a interface e partículas
window.addEventListener("load", function () {
  atualizarInterface();
  createParticles();
  input.focus();
});
