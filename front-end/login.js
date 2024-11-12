<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h2 class="text-center">Login</h2>
        <form id="loginForm">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Senha</label>
                <input type="password" class="form-control" id="password" required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Entrar</button>
        </form>
    </div>

    <!-- JavaScript para o formulário de login -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
        document.getElementById("loginForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Não recarregar a página

            // Pegar os valores do formulário
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Fazer requisição para a API usando Axios
            axios.post('http://localhost:3000/api/login', {
                email: email,
                password: password
            })
            .then(function(response) {
                if(response.data.success) {
                    alert("Login bem-sucedido!");
                    window.location.href = 'admin.html'; // Redireciona para a página administrativa
                } else {
                    alert("Credenciais inválidas.");
                }
            })
            .catch(function(error) {
                console.error("Erro no login:", error);
                alert("Erro ao tentar fazer login.");
            });
        });
    </script>
</body>
</html>
