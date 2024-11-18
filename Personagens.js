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

    // Cria e adiciona um elemento ao body
    function adicionarElemento(tag, conteudo) {
      const elemento = document.createElement(tag);
      elemento.innerHTML = conteudo;
      document.body.appendChild(elemento);
    }

    // Cria e exibe os elementos de dados do personagem na página
    if (dados.image) {
      const imagem = document.createElement("img");
      imagem.src = dados.image;
      imagem.alt = `${dados.name} - imagem`;
      document.body.appendChild(imagem);
    }

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
  };
}
