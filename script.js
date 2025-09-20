<<<<<<< HEAD
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
=======
body {
    margin: 0;
    background: url("imgs/capa.jpg") no-repeat center center;
    min-height: 100vh;
    width: 100vw;
    background-size: cover; /* Preenche toda a tela sem distorcer, adaptando a 9:16 ou 16:9 */
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
}

/* Media query para dispositivos móveis em orientação paisagem, se precisar de ajustes finos */
@media (orientation: landscape) and (max-width: 768px) {
    body {
        background-position: center center;
        background-size: cover; /* Reforça o cover em paisagem móvel */
    }
}

.container {
    max-width: 900px;
    width: 95%;
    padding: 20px;
    text-align: center;
    background-color: rgba(0,0,0,0.6);
    border-radius: 12px;
    color: white;
    height: 90vh;
    overflow-y: auto;
}

button, a {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block;
    margin: 10px;
    transition: 0.3s;
}

button:hover, a:hover {
    color: magenta;
    background-color: #00FFFF;
}

.hidden {
    display: none;
}

.chapter {
    text-align: left;
    margin: 20px auto;
    font-size: 1.1rem;
    line-height: 1.6;
}

/* Fundo da tela inicial */
#inicio.container {
    background-color: transparent;
    color: white;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
}
>>>>>>> 924ada2246d1217b827fba9b7065333690b3dd6c
