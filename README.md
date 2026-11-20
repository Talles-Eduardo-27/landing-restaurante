# 🌊 Maré Cheia · Landing page de restaurante

Site de uma página para um restaurante regional (fictício) em Fortaleza, pensado para pequenos negócios que ainda não têm site ou só usam o Instagram.

🔗 **Ver ao vivo:** https://talles-eduardo-27.github.io/landing-restaurante/

> Feito com IA (Claude) e revisado por mim. Uso este site como modelo para mostrar a clientes; o restaurante, o endereço e os preços são fictícios.

## O problema

Muitos restaurantes locais perdem pedidos porque o cliente não acha cardápio, horário nem um jeito rápido de reservar.

## A solução

- **Cardápio com filtro** (do mar, do sertão, bebidas) gerado a partir de uma lista em JavaScript, fácil de editar
- **Botão "Pedir" em cada prato** que abre o WhatsApp já com a mensagem pronta
- **"Aberto agora / Fechado"** calculado pelo horário de Fortaleza
- **Layout responsivo** com menu próprio para celular
- Ilustração feita só com CSS (sem imagens pesadas), carregamento rápido

## Tecnologias

HTML5 · CSS3 (Grid, Flexbox, animações) · JavaScript puro

## Como adaptar para um cliente

1. Em `script.js`, troque `WHATSAPP`, os horários e a lista `pratos`
2. Em `index.html`, troque nome, endereço e textos
3. Em `style.css`, troque as cores nas variáveis do `:root`

## O que este projeto pratica

- Gerar conteúdo dinâmico a partir de dados com `map` e `filter`
- Montar links do WhatsApp com `encodeURIComponent`
- Trabalhar com fuso horário usando `toLocaleString`
- Organizar CSS com variáveis e media queries

---

Projeto de portfólio de [Talles Eduardo](https://github.com/Talles-Eduardo-27).

## Prévia para um negócio de verdade

Acrescente `?n=Nome do negócio&b=Bairro` ao link (exemplo: `?n=Studio%20Exemplo&b=Messejana`). A página mostra o nome e o bairro, avisa no topo que é uma prévia e troca a história, os números e o endereço do exemplo por avisos; serviços, preços e fotos continuam sendo exemplos. O teste pelo WhatsApp chega no número do Talles, marcado como teste. Na versão de um cliente, troque `WHATSAPP` pelo número dele.
