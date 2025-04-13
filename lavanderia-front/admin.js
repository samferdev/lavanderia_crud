async function carregarRoupas() {
    const lista = document.getElementById("listaAdmin");
    lista.innerHTML = "";

    try {
        const resposta = await fetch("http://localhost:5024/api/roupa");
        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status} - ${resposta.statusText}`);
        }

        const roupas = await resposta.json();

        roupas.forEach(roupa => {
            const li = document.createElement("li");
            li.textContent = `${roupa.tipo} - ${roupa.cor} [${roupa.status}]`;

            if (roupa.status && roupa.status.toLowerCase() !== "lavado") {
                const botaoLavar = document.createElement("button");
                botaoLavar.textContent = "Marcar como Lavado";
                botaoLavar.onclick = async () => await marcarComoLavado(roupa.id);
                li.appendChild(botaoLavar);
            } else if (roupa.status && roupa.status.toLowerCase() === "lavado") {
                const botaoApagar = document.createElement("button");
                botaoApagar.textContent = "Apagar";
                botaoApagar.onclick = async () => await apagarRoupa(roupa.id);
                li.appendChild(botaoApagar);
            }

            lista.appendChild(li);
        });
    } catch (error) {
        alert("Erro ao carregar roupas! Verifique o console para mais detalhes.");
        console.error("Erro ao carregar roupas:", error);
    }
}

async function marcarComoLavado(id) {
    try {
        const resposta = await fetch(`http://localhost:5024/api/roupa/${id}/lavar`, {
            method: "PUT"
        });

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status} - ${resposta.statusText}`);
        }

        // Recarrega a lista após marcar como lavado
        await carregarRoupas();
    } catch (error) {
        alert("Erro ao atualizar roupa! Verifique o console para mais detalhes.");
        console.error("Erro ao atualizar roupa:", error);
    }
}

async function apagarRoupa(id) {
    try {
        const resposta = await fetch(`http://localhost:5024/api/roupa/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status} - ${resposta.statusText}`);
        }

        // Recarrega a lista após apagar a roupa
        await carregarRoupas();
    } catch (error) {
        alert("Erro ao apagar roupa! Verifique o console para mais detalhes.");
        console.error("Erro ao apagar roupa:", error);
    }
}

// Inicializa a lista de roupas ao carregar a página
carregarRoupas();
