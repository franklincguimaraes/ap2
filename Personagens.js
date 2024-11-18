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

    // Contêiner principal para os dados do personagem
    const characterInfoDiv = document.createElement("div");
    characterInfoDiv.className = "character-info-container"; // Classe para estilização

    // Contêiner para a imagem do personagem
    const characterImageDiv = document.createElement("div");
    characterImageDiv.className = "character-image";

    if (dados.image) {
      const imagem = document.createElement("img");
      imagem.src = dados.image;
      imagem.alt = `${dados.name} - imagem`;
      imagem.className = "character-img";
      characterImageDiv.appendChild(imagem);
    } else {
      characterImageDiv.innerHTML = "<p>Imagem não disponível</p>";
    }

    // Contêiner para os detalhes do personagem
    const characterDetailsDiv = document.createElement("div");
    characterDetailsDiv.className = "character-details";

    function adicionarElemento(label, valor) {
      const elemento = document.createElement("p");
      elemento.innerHTML = `<strong>${label}:</strong> ${
        valor || "Desconhecido"
      }`;
      characterDetailsDiv.appendChild(elemento);
    }

    adicionarElemento("Nome", dados.name);
    adicionarElemento("Data de Nascimento", dados.dateOfBirth);
    adicionarElemento("Ancestralidade", dados.ancestry);
    adicionarElemento("Cor dos Olhos", dados.eyeColour);
    adicionarElemento("Cor do Cabelo", dados.hairColour);
    adicionarElemento("Núcleo da Varinha", dados.wand?.core);
    adicionarElemento("Patronus", dados.patronus);

    // Adiciona os contêineres de imagem e detalhes ao contêiner principal
    characterInfoDiv.appendChild(characterImageDiv);
    characterInfoDiv.appendChild(characterDetailsDiv);

    // Adiciona o contêiner principal ao elemento pai na página
    document.getElementById("bio").appendChild(characterInfoDiv);
  };
}
