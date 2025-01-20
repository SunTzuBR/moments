// Array com os eventos, datas e detalhes adicionais
const events = [
  {
    title: "Nesses desde que te vi a primeira vez eu queria te dar um presente único e que será eternizado por toda vida",
    date: "2022-04-25",
    image: "",
    music: "",
    details: "" // Sem detalhes para o primeiro evento
  },
  {
    title: "Nosso encontro",
    date: "2022-04-25",
    image: "fotos/encontro.png",
    music: "musicas/encontro.mp3",
    details: "No primeiro dia que te vi, foi como se eu estivesse vendo um relance do paraíso. E mesmo sem te dar nem um beijo, foi você quem eu procurei por tanto tempo. Agradeço a Deus todos os dias por ter te encontrado"
  },
  {
    title: "Nosso primeiro beijo",
    date: "2022-05-02",
    image: "fotos/beijo.png",
    music: "musicas/beijo.mp3",
    details: "Nosso primeiro beijo foi como uma supernova, algo tão intenso e único que parecia explodir dentro de mim. E a chuva, que caiu na hora certa, só deixou tudo ainda mais emocionante, como se o mundo tivesse parado só para a gente. Voltei pra casa me sentindo o homem mais feliz do mundo, com o coração cheio de amor, tive certeza que era ao seu lado que eu queria estar."
  },
  {
    title: "Nosso recomeço",
    date: "2023-10-02",
    image: "fotos/recomeco.png",
    music: "musicas/recomeco.mp3",
    details: "Percebi a cada dia que sem você eu não poderia viver. Estar longe de você é como estar sem um pedaço de mim. Se não for você, nunca será ninguém. Te encontrar naquele dia foi mágico, porque você estava tão linda, como sempre, e deslumbrante, com toda a sua luz."
  },
  {
    title: "Nosso noivado",
    date: "2024-10-28",
    image: "fotos/noivado.png",
    music: "musicas/noivado.mp3",
    details: "Nosso noivado foi maravilhoso, desde o pedido, tão inusitado e atrapalhado, com minhas palavras presas pelo nervosismo, até a festa, que foi incrível. Ter você lá comigo, como minha noiva, foi o momento mais feliz da minha vida, um sentimento que só será superado quando eu tiver você como minha esposa."
  },
  {
    title: "Nosso casamento",
    date: "2026-11-28",
    image: "fotos/casamento.png",
    music: "musicas/casamento.mp3",
    details: "Esse é o momento mais esperado por mim. Quero ter você como minha esposa, acordar todos os dias ao seu lado, cuidar de você, te proteger, construir nossa família e viver momentos únicos a cada dia, como se fosse o primeiro. Eu te amo"
  }
];

let currentIndex = 0;

// Função para criar o efeito de transição
function applyTransitionEffect() {
  const container = document.getElementById("container");
  container.style.opacity = 0; // Inicia com opacidade zero
  setTimeout(() => {
    updateContent(); // Atualiza o conteúdo do card
    container.style.opacity = 1; // Retorna a opacidade
  }, 500); // Tempo da transição (em milissegundos)
}

// Atualiza o conteúdo do card com efeito de fade
function updateContent() {
  // Adiciona a classe de fade-out
  const container = document.querySelector("#container");
  container.classList.add("fade-out");

  // Espera o tempo do fade-out antes de atualizar o conteúdo
  setTimeout(() => {
    const event = events[currentIndex];
    const startDate = new Date(event.date);
    const now = new Date();

    startDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const difference = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    let titleText = event.title;

    if (currentIndex === 0) {
      titleText = `Nestes ${difference} dias desde que te vi, você sempre foi e sempre será a mulher da minha vida, a mulher que pedi a Deus para minha vida. Te amo hoje, amanhã e sempre, e que aqui fiquem eternizados todos os nossos momentos juntos.`;
    }

    document.querySelector("h1").innerText = titleText;

    // Mostra ou esconde o contador de dias e a data
    const counter = document.getElementById("counter");
    const date = document.getElementById("date");

    if (currentIndex === 0) {
      counter.style.display = "none";
      date.style.display = "none";
      const card = document.getElementById("card");
      card.style.display = "none"; // Remove o card no primeiro evento
    } else {
      counter.style.display = "block";
      date.style.display = "block";
      counter.innerText = `${difference} dias`;
      const formattedDate = startDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      date.innerText = ` ${formattedDate}`;
      const card = document.getElementById("card");
      card.style.display = "block"; // Exibe o card para os demais eventos
    }

    // Atualiza a imagem do evento
    const mainImage = document.getElementById("main-image");
    if (currentIndex === 0 || !event.image) {
      mainImage.style.display = "none"; // Oculta a imagem no primeiro evento
    } else {
      mainImage.style.display = "block";
      mainImage.src = event.image;
    }

    // Atualiza a música de fundo
    const audioElement = document.getElementById("background-music");
    if (event.music) {
      audioElement.src = event.music;
      audioElement.play();
    }

    // Atualiza o texto dos detalhes no card
    const backText = document.getElementById("back-text");

    if (currentIndex === 0) {
      backText.innerText = "";
    } else {
      backText.innerText = event.details || "Detalhes não disponíveis.";
    }

    // Mostrar ou esconder o botão "Em breve"
    const comingSoonBtn = document.getElementById("coming-soon");
    comingSoonBtn.style.display = (currentIndex === events.length - 2) ? "block" : "none";

    // Mostrar ou esconder as setas de navegação
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    // Se estiver no primeiro evento, esconder a seta de voltar
    if (currentIndex === 0) {
      prevBtn.style.display = "none"; // Esconde a seta de voltar no primeiro evento
    } else {
      prevBtn.style.display = "block"; // Mostra a seta de voltar para os outros eventos
    }

    // Se estiver no penúltimo ou no último evento, esconder a seta de avançar
    if (currentIndex === events.length - 2 || currentIndex === events.length - 1) {
      nextBtn.style.display = "none"; // Esconde a seta de avançar
    } else {
      nextBtn.style.display = "block"; // Mostra a seta de avançar
    }

    // Após a atualização do conteúdo, aplica o efeito fade-in
    container.classList.remove("fade-out");
    container.classList.add("fade-in");

  }, 500); // Tempo de espera igual à duração da transição fade-out
}

// Efeito de flip ao clicar no card
document.getElementById("card").addEventListener("click", () => {
  const card = document.getElementById("card");
  if (!card.classList.contains("no-flip")) {
    card.classList.toggle("flipped");
  }
});

// Navegação entre eventos
document.getElementById("prev").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    resetCard(); // Reseta o card para a face frontal
    applyTransitionEffect();
    updateContent();
  }
});

document.getElementById("next").addEventListener("click", () => {
  if (currentIndex < events.length - 1) {
    currentIndex++;
    resetCard(); // Reseta o card para a face frontal
    applyTransitionEffect();
    updateContent();
  }
});

// Botão "Em breve" avança para o próximo evento
document.getElementById("coming-soon").addEventListener("click", () => {
  if (currentIndex < events.length - 1) {
    currentIndex++;
    resetCard(); // Reseta o card para a face frontal
    updateContent();
  }
});

// Função para resetar o card para a frente
function resetCard() {
  const card = document.getElementById("card");
  if (card.classList.contains("flipped")) {
    card.classList.remove("flipped");
  }
}

// Inicializa o conteúdo
updateContent();
