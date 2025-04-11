document.getElementById("formRoupas").addEventListener("submit", async function (e) {
    e.preventDefault();

    const cliente = document.getElementById("cliente").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    if (!cliente || !descricao) {
        alert("Preencha todos os campos!");
        return;
    }

    const roupa = { cliente, descricao };

    try {
        await fetch("http://localhost:5024/api/roupa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(roupa)
        });

        document.getElementById("cliente").value = "";
        document.getElementById("descricao").value = "";

        renderizarRoupas();
    } catch (error) {
        alert("Erro ao salvar roupa!");
        console.error(error);
    }
});

async function renderizarRoupas() {
    const lista = document.getElementById("listaRoupas");
    lista.innerHTML = "";

    try {
        const resposta = await fetch("http://localhost:5024/api/roupa");
        const roupas = await resposta.json();

        roupas.forEach(roupa => {
            const li = document.createElement("li");
            li.textContent = `${roupa.cliente} - ${roupa.descricao} [${roupa.status}]`;
            lista.appendChild(li);
        });
    } catch (error) {
        alert("Erro ao carregar roupas!");
        console.error(error);
    }
}

renderizarRoupas();
