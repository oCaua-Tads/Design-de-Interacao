const texto = document.getElementById("texto");
const bgColor = document.getElementById("bgColor");
const textColor = document.getElementById("textColor");
const fontSize = document.getElementById("fontSize");
const imagem = document.getElementById("imagem");

const cartao = document.getElementById("cartao");
const textoCartao = document.getElementById("textoCartao");
const imgCartao = document.getElementById("imgCartao");

texto.addEventListener("input", () => {
    textoCartao.textContent = texto.value || "Seu texto aqui";
});

bgColor.addEventListener("input", () => {
    cartao.style.backgroundColor = bgColor.value;
});

textColor.addEventListener("input", () => {
    textoCartao.style.color = textColor.value;
});

fontSize.addEventListener("input", () => {
    textoCartao.style.fontSize = fontSize.value + "px";
});

imagem.addEventListener("input", () => {
    if (imagem.value) {
        imgCartao.src = imagem.value;
        imgCartao.style.display = "block";
    } else {
        imgCartao.style.display = "none";
    }
});