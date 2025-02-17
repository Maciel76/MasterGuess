// Variáveis do jogo
let numeroAleatorio = Math.floor(Math.random() * 100) + 1;
let tentativasRestantes = 10;

// Seleção de elementos HTML
const input = document.getElementById('user-input');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');
const resultMessage = document.getElementById('result');
const attemptsMessage = document.getElementById('attempts-left');
const progressBar = document.getElementById('progress-bar');

// Atualizar o contador de tentativas e a barra de progresso
function atualizarInterface() {
  attemptsMessage.textContent = `Tentativas restantes: ${tentativasRestantes}`;
  progressBar.style.width = `${(tentativasRestantes / 10) * 100}%`;
}

// Função para verificar a tentativa do jogador
function verificarTentativa() {
  const palpite = parseInt(input.value);

  // Verificar se a entrada é válida
  if (isNaN(palpite) || palpite < 1 || palpite > 100) {
    resultMessage.textContent = "Por favor, insira um número válido entre 1 e 100.";
    resultMessage.style.color = 'red';
    return;
  }

  // Reduzir o número de tentativas
  tentativasRestantes--;
  atualizarInterface();

  // Verificar se o palpite está correto
  if (palpite === numeroAleatorio) {
    resultMessage.textContent = "🎉 Parabéns, você acertou! 🎉";
    resultMessage.style.color = 'green';
    animarVitoria();
    encerrarJogo();
  } else if (tentativasRestantes === 0) {
    resultMessage.textContent = `😢 Game Over! O número era ${numeroAleatorio}.`;
    resultMessage.style.color = 'red';
    animarDerrota();
    encerrarJogo();
  } else if (palpite < numeroAleatorio) {
    resultMessage.textContent = "🔺 O número é maior!";
    resultMessage.style.color = '#333';
  } else {
    resultMessage.textContent = "🔻 O número é menor!";
    resultMessage.style.color = '#333';
  }
}

// Função para animar a vitória
function animarVitoria() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// Função para animar a derrota
function animarDerrota() {
  const gameContainer = document.getElementById('game-container');
  gameContainer.style.animation = 'shake 0.5s';
  setTimeout(() => {
    gameContainer.style.animation = '';
  }, 500);
}

// Função para encerrar o jogo
function encerrarJogo() {
  input.disabled = true;
  submitBtn.style.display = 'none';
  resetBtn.style.display = 'inline';
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  tentativasRestantes = 10;
  numeroAleatorio = Math.floor(Math.random() * 100) + 1;
  input.disabled = false;
  input.value = '';
  submitBtn.style.display = 'inline';
  resetBtn.style.display = 'none';
  resultMessage.textContent = '';
  resultMessage.style.color = '#030303';
  atualizarInterface();
}

// Eventos de clique
submitBtn.addEventListener('click', verificarTentativa);
resetBtn.addEventListener('click', reiniciarJogo);

// Evento de teclado para o input
input.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    verificarTentativa();
  }
});

// Inicializar a interface
atualizarInterface();
