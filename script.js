// Número para o teste: o pedido de demonstração chega no WhatsApp do Talles, marcado como teste.
// Fica invertido no código para robôs que varrem o GitHub não colherem o número.
// Na versão de um cliente, troque pelo número dele: 55 + DDD + número, só dígitos.
const WHATSAPP = "0419812995855".split("").reverse().join("");

// Prévia para um negócio de verdade: acrescente ?n=Nome%20do%20negócio&b=Bairro ao link.
// A página mostra o nome, avisa no topo que é uma prévia e troca a história, os números
// e o endereço do exemplo por avisos. Serviços, preços e fotos continuam sendo exemplos.
const DEMO_P = new URLSearchParams(location.search);
const DEMO_NOME = (DEMO_P.get("n") || "").replace(/\s+/g, " ").trim().slice(0, 60);
const DEMO_BAIRRO = (DEMO_P.get("b") || "").replace(/\s+/g, " ").trim().slice(0, 40);
(function () {
  const rod = document.querySelector(".rodape p");
  if (!DEMO_NOME) {
    if (rod) rod.append(" Os testes pelo WhatsApp chegam no número do Talles, marcados como teste.");
    return;
  }
  const marca = document.querySelector(".marca");
  if (marca) {
    const i = DEMO_NOME.lastIndexOf(" ");
    marca.textContent = i > 0 ? DEMO_NOME.slice(0, i) + " " : "";
    const s = document.createElement("span");
    s.textContent = i > 0 ? DEMO_NOME.slice(i + 1) : DEMO_NOME;
    marca.appendChild(s);
  }
  const resto = document.title.split(" · ").slice(1).join(" · ");
  document.title = DEMO_NOME + (resto ? " · " + resto : "");
  document.querySelectorAll("#sobre h2 ~ p").forEach((p, k) => {
    p.textContent = k === 0
      ? "Aqui entra a história de vocês: como começou, o que fazem de diferente e quem atende."
      : "Fotos, textos e preços de vocês entram no lugar destes exemplos.";
  });
  document.querySelectorAll("#sobre .numeros").forEach((el) => { el.style.display = "none"; });
  document.querySelectorAll("#visite p").forEach((p) => {
    if (/Endereço/.test(p.textContent)) p.innerHTML = "<strong>Endereço:</strong> o de vocês, com mapa e rota até a porta.";
    else if (/Horário/.test(p.textContent)) p.innerHTML = "<strong>Horário:</strong> o de vocês, com aviso de aberto ou fechado na hora.";
  });
  if (rod) rod.textContent = "Prévia feita para " + DEMO_NOME + " por Talles Eduardo, só para mostrar a ideia. Serviços, preços e fotos são exemplos. Os testes pelo WhatsApp chegam no número do Talles, marcados como teste.";
  const selo = document.querySelector(".selo");
  if (selo) selo.textContent = DEMO_BAIRRO ? DEMO_BAIRRO + " · Fortaleza" : "Fortaleza";
  let aviso = document.querySelector(".aviso");
  if (!aviso) { aviso = document.createElement("div"); aviso.className = "aviso"; document.body.prepend(aviso); }
  aviso.textContent = "Prévia feita para " + DEMO_NOME + " · exemplo para mostrar a ideia";
})();
const ABRE = 11;  // hora de abertura
const FECHA = 23; // hora de fechamento

const pratos = [
  { cat: "mar", emoji: "🐟", nome: "Peixada cearense", desc: "Peixe do dia no caldo com legumes, pirão e arroz.", preco: 89 },
  { cat: "mar", emoji: "🦐", nome: "Camarão na moranga", desc: "Camarão cremoso servido dentro da abóbora assada.", preco: 112 },
  { cat: "mar", emoji: "🦀", nome: "Caranguejada", desc: "Seis caranguejos no caldo temperado, com farofa.", preco: 78 },
  { cat: "sertao", emoji: "🍛", nome: "Baião de dois", desc: "Arroz, feijão-de-corda, queijo coalho e nata.", preco: 54 },
  { cat: "sertao", emoji: "🥩", nome: "Carne de sol na brasa", desc: "Com macaxeira frita, paçoca e manteiga da terra.", preco: 92 },
  { cat: "sertao", emoji: "🧀", nome: "Escondidinho de charque", desc: "Purê de macaxeira gratinado com queijo coalho.", preco: 48 },
  { cat: "bebidas", emoji: "🥥", nome: "Água de coco", desc: "Gelada, direto do coco. Individual.", preco: 9 },
  { cat: "bebidas", emoji: "🍹", nome: "Suco de cajá", desc: "Fruta da estação batida na hora. 500 ml.", preco: 12 },
];

const real = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const linkWhats = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent((DEMO_NOME ? "[Teste da prévia de " + DEMO_NOME + "] " : "[Teste do site de demonstração] ") + msg)}`;

// Cardápio com filtro
const lista = document.getElementById("pratos");
function mostrar(cat) {
  lista.innerHTML = pratos
    .filter((p) => cat === "todos" || p.cat === cat)
    .map((p) => `
      <article class="prato">
        <span class="emoji">${p.emoji}</span>
        <h3>${p.nome}</h3>
        <p>${p.desc}</p>
        <div class="linha">
          <span class="preco">${real(p.preco)}</span>
          <button data-nome="${p.nome}">Pedir</button>
        </div>
      </article>`)
    .join("");
}
mostrar("todos");

document.querySelectorAll(".filtro").forEach((b) =>
  b.addEventListener("click", () => {
    document.querySelector(".filtro.ativo").classList.remove("ativo");
    b.classList.add("ativo");
    mostrar(b.dataset.cat);
  })
);

// Botão "Pedir" abre o WhatsApp já com o nome do prato
lista.addEventListener("click", (e) => {
  const nome = e.target.dataset.nome;
  if (nome) window.open(linkWhats(`Olá! Quero pedir: ${nome}`), "_blank");
});

// Todos os botões de WhatsApp da página
document.querySelectorAll(".js-whats").forEach((a) => {
  a.href = linkWhats("Olá! Vim pelo site e quero fazer uma reserva.");
  a.target = "_blank";
  a.rel = "noopener";
});

// Aberto agora? (horário de Fortaleza)
const hora = Number(new Date().toLocaleString("en-US", { timeZone: "America/Fortaleza", hour: "numeric", hour12: false }));
const status = document.getElementById("status");
const aberto = hora >= ABRE && hora < FECHA;
status.textContent = aberto ? "● Aberto agora" : `● Fechado agora · abre às ${ABRE}h`;
status.classList.add(aberto ? "aberto" : "fechado");

// Menu no celular
const btn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
btn.addEventListener("click", () => {
  const abriu = menu.classList.toggle("aberto");
  btn.setAttribute("aria-expanded", abriu);
});
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") menu.classList.remove("aberto");
});
