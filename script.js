// Troque pelo número do cliente: 55 + DDD + número, só dígitos
const WHATSAPP = "5585900000000";
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
const linkWhats = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

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
