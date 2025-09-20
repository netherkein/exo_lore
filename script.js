let capitulos = [];

// Carregar capítulos do JSON
fetch("capitulos.json")
  .then(res => {
    if (!res.ok) throw new Error('Fetch failed: ' + res.status);
    return res.json();
  })
  .then(data => {
    capitulos = data;
    carregarIndice();
  })
  .catch(err => console.error('Error loading chapters:', err));

// Função para reproduzir som de clique
function playClickSound(isVoltar) {
  const sound = isVoltar ? document.getElementById('botao2Sound') : document.getElementById('botao1Sound');
  sound.currentTime = 0; // Reinicia o áudio
  sound.play().catch(err => console.error('Erro ao reproduzir som:', err));
}

// Adiciona evento de clique a todos os botões e links
document.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON' || event.target.tagName === 'A') {
    const isVoltar = event.target.classList.contains('voltar');
    playClickSound(isVoltar);
  }
});

function mostrarIndice() {
  document.getElementById('inicio').classList.add('hidden');
  document.getElementById('indice').classList.remove('hidden');
  document.getElementById('capitulo').classList.add('hidden');
}

function carregarIndice() {
  const lista = document.getElementById("listaCapitulos");
  lista.innerHTML = "";
  capitulos.forEach((cap, i) => {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = cap.titulo;
    link.onclick = () => mostrarCapitulo(i);
    lista.appendChild(link);
    lista.appendChild(document.createElement("br"));
  });
}

function mostrarCapitulo(index) {
  const cap = capitulos[index];
  document.getElementById('indice').classList.add('hidden');
  document.getElementById('capitulo').classList.remove('hidden');
  document.getElementById('tituloCapitulo').textContent = cap.titulo;
  document.getElementById('conteudoCapitulo').innerHTML = cap.texto;
}

function voltarIndice() {
  document.getElementById('capitulo').classList.add('hidden');
  document.getElementById('indice').classList.remove('hidden');
}

function voltarInicio() {
  document.getElementById('indice').classList.add('hidden');
  document.getElementById('capitulo').classList.add('hidden');
  document.getElementById('inicio').classList.remove('hidden');
}