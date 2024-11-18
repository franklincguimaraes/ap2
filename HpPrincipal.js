const url = "https://hp-api.onrender.com/api/characters"

async function BuscarPersonagem(evento) {
    evento.preventDefault();
    const input = document.getElementById("name-character");
    const nome = input.value;

    const url = "https://hp-api.onrender.com/api/characters";

    const resposta = await fetch(url);
    const dados = await resposta.json();

    const info = dados.find((f) => f.name.toLowerCase() === nome.toLowerCase());

    if (info) {
        const dadosPersonagem = [{ image: info.image, name: info.name }];
        criacard(dadosPersonagem, info);
    } else {
        alert("Personagem não encontrado!");
    }
}

function criacard(dadosPersonagem, d) {
    const container = document.getElementById("container");

    dadosPersonagem.forEach(personagem => {
        const card = document.createElement("div");
        card.classList.add("card");

        const imagem = document.createElement("img");
        imagem.className = "foto"
        imagem.src = personagem.image;

        const nome = document.createElement("p");
        nome.textContent = personagem.name;


        card.appendChild(imagem);
        card.appendChild(nome);

        const levarNome = new URLSearchParams({ nome: personagem.name });
        console.log(levarNome.toString());

        localStorage.setItem(`dados-${personagem.name.replace(' ', '-')}`, JSON.stringify(d));

        // card.addEventListener("dblclick", () => {
        //     window.location.href = "Personagens.html" //+ "?" + levarDados.toString();
        // });

        const anchor = document.createElement("a")
        anchor.appendChild(card)
        anchor.href = "/Personagens.html" + "?" + levarNome.toString();
        container.appendChild(anchor);
    });
}

function infototal(dados) {
    const bio = document.getElementById("bio");

    dados.forEach(personagem => {
        const biografia = document.createElement("div");

        biografia.classList.add("biografia");

        biografia.textContent = personagem.name;

        bio.appendChild(biografia);
    });
}

const btnBuscar = document.getElementById("buscar-character");
const inputName = document.getElementById("name-character");
btnBuscar.addEventListener("click", BuscarPersonagem);
inputName.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        BuscarPersonagem(evento);
    }
});