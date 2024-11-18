// Obtém o parâmetro "nome" da URL
const url = new URL(window.location.href);
const nome = url.searchParams.get("nome");

if (!nome) {
  console.error("Parâmetro 'nome' não encontrado na URL.");
} else {
  console.log({ nome });

  // Chave de armazenamento para dados do personagem
  const storageKey = `dados-${nome.replace(/\s+/g, "-")}`;
  const dadosTxt = localStorage.getItem(storageKey);

  let dados;
  try {
    dados = JSON.parse(dadosTxt);
    if (!dados) throw new Error();
  } catch (error) {
    console.error("Erro ao recuperar os dados do personagem.");
    dados = null;
  }

  // Função que cria os elementos do personagem na página
  window.onload = function criaPersonagem() {
    if (!dados) return;

    // Cria o contêiner principal para os dados do personagem
    const characterInfoDiv = document.createElement("div");
    characterInfoDiv.className = "character-info"; // Adiciona a classe para estilização

    // Cria e adiciona um elemento ao contêiner character-info
    function adicionarElemento(tag, conteudo) {
      const elemento = document.createElement(tag);
      elemento.innerHTML = conteudo;
      characterInfoDiv.appendChild(elemento);
    }

    // Adiciona a imagem do personagem, se disponível
    if (dados.image) {
      const imagem = document.createElement("img");
      imagem.src = dados.image;
      imagem.alt = `${dados.name} - imagem`;
      imagem.className = "character-picture"; // Classe para estilização da imagem
      characterInfoDiv.appendChild(imagem);
    }

    // Adiciona os detalhes do personagem
    adicionarElemento(
      "p",
      `<strong>Nome:</strong> ${dados.name || "Desconhecido"}`
    );
    adicionarElemento(
      "p",
      `<strong>Data de Nascimento:</strong> ${
        dados.dateOfBirth || "Desconhecida"
      }`
    );
    adicionarElemento(
      "p",
      `<strong>Ancestralidade:</strong> ${dados.ancestry || "Desconhecida"}`
    );
    adicionarElemento(
      "p",
      `<strong>Cor dos Olhos:</strong> ${dados.eyeColour || "Desconhecida"}`
    );
    adicionarElemento(
      "p",
      `<strong>Cor do Cabelo:</strong> ${dados.hairColour || "Desconhecida"}`
    );
    adicionarElemento(
      "p",
      `<strong>Núcleo da Varinha:</strong> ${
        dados.wand?.core || "Desconhecido"
      }`
    );
    adicionarElemento(
      "p",
      `<strong>Patronus:</strong> ${dados.patronus || "Desconhecido"}`
    );

    // Adiciona o contêiner character-info ao elemento pai na página
    document.getElementById("bio").appendChild(characterInfoDiv);
  };
}
