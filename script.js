let capitulos = [];

// Carregar capítulos do JSON
fetch("capitulos.json")
    .then(res => res.json())
    .then(data => {
        capitulos = data;
        carregarIndice();
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
