// Array com os eventos, datas e músicas
const events = [
  { title: "Nesses desde que te vi a primeira vez eu queria te dar um presente único e que será eternizado por toda vida", date: "2022-04-25", image: "", music: "" },
  { title: "Nosso encontro", date: "2022-04-25", image: "fotos/encontro.png", music: "musicas/encontro.mp3" },
  { title: "Nosso primeiro beijo", date: "2022-05-02", image: "fotos/beijo.png", music: "musicas/beijo.mp3" },
  { title: "Nosso recomeço", date: "2023-10-02", image: "fotos/recomeco.png", music: "musicas/recomeco.mp3" },
  { title: "Nosso noivado", date: "2024-10-28", image: "fotos/noivado.png", music: "musicas/noivado.mp3" },
  { title: "Nosso casamento", date: "2026-11-02", image: "fotos/casamento.png", music: "musicas/casamento.mp3" }
  /* SEMPRE COLOCAR UM DIA A MAIS POIS BUGOU NA HORA DA CONVERSÃO DE UTC E NÃO CONSEGUI RESOLVER(ACREDITO QUE MEU EU DO FUTURO IRÁ CONSEGUIR) */
];

let currentIndex = 0;

// Função para aplicar efeito de transição
function applyTransitionEffect(callback) {
  const container = document.getElementById("container");
  container.style.transition = "opacity 0.5s";
  container.style.opacity = 0; // Oculta o fade-out

  setTimeout(() => {
    callback();
    container.style.opacity = 1; // Reexibe o fade-in
  }, 500); // Tempo de duração da transição (em milissegundos)
}

function updateContent() {
  const event = events[currentIndex];
  const startDate = new Date(event.date);
  const now = new Date();

  // Resetar horas, minutos, segundos e milissegundos
  startDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  // Calcula a diferença em dias entre hoje e a data do evento
  const difference = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));

  let titleText = event.title;
  if (currentIndex === 0) {
    titleText = `Nesses ${difference} dias desde que te vi pela primeira vez, tive a certeza de que você é o amor da minha vida e a mulher que pedi a Deus. Quero te dar um presente único, algo que será eternizado por toda a nossa vida.`;
  }

  document.querySelector("h1").innerText = titleText;

  const counterElement = document.getElementById("counter");
  if (currentIndex === 0) {
    counterElement.style.display = "none"; // Esconde o contador no primeiro evento
  } else {
    counterElement.style.display = "block"; // Exibe o contador nos outros eventos
    counterElement.innerText = `${difference} dias`;
  }

  // Atualiza a imagem e a música de fundo
  const mainImage = document.getElementById("main-image");
  mainImage.style.display = event.image ? 'block' : 'none';
  if (event.image) {
    mainImage.src = event.image;
  }

  const audioElement = document.getElementById("background-music");
  if (event.music) {
    audioElement.src = event.music;
    audioElement.play();
  }

  // Exibe ou esconde a data
  const dateElement = document.getElementById("date");
  if (currentIndex === 0) {
    dateElement.style.display = 'none';
  } else {
    dateElement.style.display = 'block';
    const formattedDate = startDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    dateElement.innerText = formattedDate;
  }

  // Mostra ou esconde as setas de navegação
  document.getElementById("prev").style.display = currentIndex === 0 ? "none" : "inline-block";
  document.getElementById("next").style.display = (currentIndex === events.length - 1 || currentIndex === events.length - 2) ? "none" : "inline-block";

  // Esconde a seta de avançar no card de noivado e no evento futuro
  if (currentIndex === 4) {
    document.getElementById("next").classList.add("hide-arrow");
  } else {
    document.getElementById("next").classList.remove("hide-arrow");
  }

  // Mostra ou esconde o botão "Coming Soon..."
  document.getElementById("coming-soon").style.display = currentIndex === 4 ? "inline-block" : "none";
}

// Funções para navegação entre eventos
document.getElementById("prev").addEventListener("click", () => {
  if (currentIndex > 0) {
    applyTransitionEffect(() => {
      currentIndex--;
      updateContent();
    });
  }
});

document.getElementById("next").addEventListener("click", () => {
  if (currentIndex < events.length - 1) {
    applyTransitionEffect(() => {
      currentIndex++;
      updateContent();
    });
  }
});

// Evento "Coming Soon..."
document.getElementById("coming-soon").addEventListener("click", () => {
  applyTransitionEffect(() => {
    currentIndex = events.length - 1;
    updateContent();
  });
});

updateContent();
