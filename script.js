class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="bg-dark text-white text-center p-3">
                <h1>Trabalhos de Interface Web</h1>
            </header>
        `;
    }
}

class MyNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="bg-light p-2 text-center">
                <a href="index.html" class="mx-2">Apresentação</a>
                <a href="editor.html" class="mx-2">Trabalho 1</a>
                <a href="prova.html" class="mx-2">Trabalho 2</a>
                <a href="api.html" class="mx-2">Trabalho 3</a>
            </nav>
        `;
    }
}

class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="bg-dark text-white text-center p-3">
                <p>© 2026 - Cauã</p>
            </footer>
        `;
    }
}

customElements.define("my-header", MyHeader);
customElements.define("my-nav", MyNav);
customElements.define("my-footer", MyFooter);



const texto = document.getElementById("texto");
const bgColor = document.getElementById("bgColor");
const textColor = document.getElementById("textColor");
const fontSize = document.getElementById("fontSize");
const imagem = document.getElementById("imagem");

const cartao = document.getElementById("cartao");
const textoCartao = document.getElementById("textoCartao");
const imgCartao = document.getElementById("imgCartao");


if (texto) {

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

}

class MyProva extends HTMLElement {

    async connectedCallback() {

        const shadow = this.attachShadow({ mode: "open" });

     let questoes = [];

    try {

    const resposta = await fetch("questoes.json");

    if (!resposta.ok) {
        throw new Error("Não foi possível carregar a prova.");
    }

    questoes = await resposta.json();

} catch (erro) {

    shadow.innerHTML = `
        <h2>Erro</h2>
       <p>${erro.message}</p>
<p>Tente recarregar a página.</p>
    `;

    return;
}

        let html = `
            <style>
                .card {
                    font-family: Arial, sans-serif;
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.2);
                }

                button {
                    padding: 10px;
                    margin-top: 15px;
                    cursor: pointer;
                    border: none;
                    border-radius: 5px;
                    background: #0d6efd;
                    color: white;
                }

                .resultado {
                    margin-top: 20px;
                }
            </style>

            <div class="card">

                <h2>Prova Online</h2>

                <form id="formProva">
        `;

        questoes.forEach((q, i) => {

            html += `
                <div>

                    <p><strong>${q.pergunta}</strong></p>
            `;

            q.alternativas.forEach((alt) => {

                html += `
                    <label>
                        <input type="radio" name="q${i}" value="${alt}" required>
                        ${alt}
                    </label>

                    <br>
                `;
            });

            html += `</div><br>`;
        });

        html += `
                    <button type="submit">
                        Corrigir
                    </button>

                    <button type="reset">
                        Refazer
                    </button>

                    <div class="resultado" id="resultado"></div>

                </form>

            </div>
        `;

        shadow.innerHTML = html;

const form = shadow.querySelector("#formProva");
const resultado = shadow.querySelector("#resultado");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    let nota = 0;

    let respostas = "";

    questoes.forEach((q, i) => {

        const resposta = form[`q${i}`].value;

        if (resposta === q.correta) {
            nota++;
        }

        respostas += `
            <p>
                <strong>${q.pergunta}</strong><br>

                Sua resposta: ${resposta}<br>

                Correta: ${q.correta}
            </p>
        `;
    });

    resultado.innerHTML = `
        <h3>Nota: ${nota}/${questoes.length}</h3>

        ${respostas}
    `;
});

const botaoRefazer = shadow.querySelector("button[type='reset']");

botaoRefazer.addEventListener("click", () => {

    resultado.innerHTML = "";

});

}

}

customElements.define("my-prova", MyProva);

buscarCEP();

function buscarCEP() {

    const form = document.getElementById("formCep");

    if (!form) return;

    const resultado = document.getElementById("resultadoCep");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const cep = document.getElementById("cep").value;

        try {

            const resposta = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);

            if (!resposta.ok) {
                throw new Error("CEP não encontrado.");
            }

            const dados = await resposta.json();

            resultado.innerHTML = `
                <h4>Resultado</h4>

                <p><strong>Rua:</strong> ${dados.street}</p>

                <p><strong>Bairro:</strong> ${dados.neighborhood}</p>

                <p><strong>Cidade:</strong> ${dados.city}</p>

                <p><strong>Estado:</strong> ${dados.state}</p>
            `;

        } catch (erro) {

            resultado.innerHTML = `
                <p class="text-danger">${erro.message}</p>
            `;

        }

    });

}

carregarAPIs();

async function carregarAPIs() {

    const resultado = document.getElementById("resultadoApis");

    if (!resultado) return;

    try {

        const respostas = await Promise.all([

            fetch("https://jsonplaceholder.typicode.com/users/1"),

            fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL"),

            fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=1")

        ]);

        respostas.forEach(resposta => {

            if (!resposta.ok) {
                throw new Error("Erro ao acessar uma das APIs.");
            }

        });

        const pais = await respostas[0].json();
        const moeda = await respostas[1].json();
        const noticia = await respostas[2].json();

        resultado.innerHTML = `

            <div class="card p-3 mb-3">

                <h3>👤 Usuário</h3>
                <p><strong>Nome:</strong> ${pais.name}</p>

                <p><strong>Email:</strong> ${pais.email}</p>

                <p><strong>Cidade:</strong> ${pais.address.city}</p>

            </div>

            <div class="card p-3 mb-3">

                <h3>💵 Cotação do Dólar</h3>

                <p><strong>Compra:</strong> R$ ${moeda.USDBRL.bid}</p>

                <p><strong>Venda:</strong> R$ ${moeda.USDBRL.ask}</p>

            </div>

            <div class="card p-3">

                <h3>🚀 Última notícia espacial</h3>

                <p><strong>${noticia.results[0].title}</strong></p>

                <p>${noticia.results[0].summary}</p>

            </div>

        `;

    }

    catch (erro) {

        resultado.innerHTML = `
            <p class="text-danger">
                ${erro.message}
            </p>
        `;

    }

}