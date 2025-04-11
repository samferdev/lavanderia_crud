async function renderizarAdmin() {
    const lista = document.getElementById("listaAdminRoupas");
    lista.innerHTML = "";

    try {
        const resposta = await fetch("http://localhost:5024/api/roupa");
        const roupas = await resposta.json();

        roupas.forEach(roupa => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${roupa.cliente} - ${roupa.descricao} [${roupa.status}]
                <button onclick="marcarComoLavado(${roupa.id})">Marcar como Lavado</button>
                <button onclick="removerRoupa(${roupa.id})">Remover</button>
            `;
            lista.appendChild(li);
        });
    } catch (error) {
        alert("Erro ao carregar dados do admin!");
        console.error(error);
    }
}

async function marcarComoLavado(id) {
    try {
        await fetch(`http://localhost:5024/api/roupa/${id}/lavar`, {
            method: "PUT"
        });
        renderizarAdmin();
    } catch (error) {
        alert("Erro ao marcar como lavado!");
        console.error(error);
    }
}

async function removerRoupa(id) {
    try {
        await fetch(`http://localhost:5024/api/roupa/${id}`, {
            method: "DELETE"
        });
        renderizarAdmin();
    } catch (error) {
        alert("Erro ao remover roupa!");
        console.error(error);
    }
}

renderizarAdmin();
