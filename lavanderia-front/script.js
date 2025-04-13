document.getElementById("formRoupas").addEventListener("submit", async function (e) {
    e.preventDefault();

    const tipo = document.getElementById("tipo").value.trim();
    const cor = document.getElementById("cor").value.trim();
    const status = document.getElementById("status").value;

    if (!tipo || !cor || !status) {
        alert("Preencha todos os campos!");
        return;
    }

    const roupa = {
        tipo,
        cor,
        status,
        lavada: status.toLowerCase() === "lavado"
    };

    try {
        const resposta = await fetch("http://localhost:5024/api/roupa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(roupa)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao salvar roupa. Verifique os dados e tente novamente.");
        }

        alert("Roupa salva com sucesso!");

        // Limpa os campos do formulário
        document.getElementById("tipo").value = "";
        document.getElementById("cor").value = "";
        document.getElementById("status").value = "Sujo";

        // Atualiza a lista de roupas
        renderizarRoupas();
    } catch (error) {
        alert("Erro ao salvar roupa!");
        console.error(error);
    }
});

async function renderizarRoupas() {
    const lista = document.getElementById("listaRoupas");
    lista.innerHTML = "<li>Carregando...</li>";

    try {
        const resposta = await fetch("http://localhost:5024/api/roupa?lavada=false");

        if (!resposta.ok) {
            throw new Error("Erro ao carregar roupas.");
        }

        const roupas = await resposta.json();

        lista.innerHTML = ""; // Limpa a lista

        if (roupas.length === 0) {
            lista.innerHTML = "<li>Nenhuma roupa cadastrada no momento.</li>";
            return;
        }

        roupas.forEach(roupa => {
            const li = document.createElement("li");
            li.textContent = `${roupa.tipo} - ${roupa.cor} [${roupa.status}]`;
            lista.appendChild(li);
        });
    } catch (error) {
        lista.innerHTML = "<li>Erro ao carregar roupas!</li>";
        console.error(error);
    }
}

async function apagarRoupaLavada() {
    try {
        const resposta = await fetch("http://localhost:5024/api/roupa?lavada=true");

        if (!resposta.ok) {
            throw new Error("Erro ao carregar roupas lavadas.");
        }

        const roupasLavadas = await resposta.json();

        if (roupasLavadas.length === 0) {
            console.log("Nenhuma roupa lavada para apagar.");
            return;
        }

        for (const roupa of roupasLavadas) {
            await fetch(`http://localhost:5024/api/roupa/${roupa.id}`, {
                method: "DELETE"
            });
        }

        console.log("Roupas lavadas apagadas com sucesso!");
        renderizarRoupas(); // Atualiza a lista de roupas
    } catch (error) {
        console.error("Erro ao apagar roupas lavadas:", error);
    }
}

// Carrega as roupas na inicialização
renderizarRoupas();
