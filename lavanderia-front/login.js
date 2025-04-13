document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('usuario').value;
    const password = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:5024/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message || "Erro ao fazer login");
            return;
        }

        const data = await response.json();
        console.log("Login bem-sucedido:", data);

        // Salva o token (opcional)
        localStorage.setItem("token", data.token);

        // Redireciona
        window.location.href = 'admin.html';
    } catch (error) {
        console.error("Erro no login:", error);
        alert("Erro de rede ou servidor offline.");
    }
});
