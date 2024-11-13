const url = "http://localhost:8800/users/";

// Carrega a lista de usuários
const loadUsuarios = async () => {
    try {
        const response = await axios.get(url);
        const usuarios = response.data;
        const usuariosList = document.getElementById('usuariosList');
        usuariosList.innerHTML = ''; // Limpa a lista antes de preencher

        usuarios.forEach(usuario => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="py-2 px-4 border-b text-center">${usuario.nome}</td>
                <td class="py-2 px-4 border-b text-center">${usuario.email}</td>
                <td class="py-2 px-4 border-b text-center">${usuario.papel}</td>
                <td class="py-2 px-4 border-b text-center">
                    <button onclick="editUsuario(${usuario.id}, '${usuario.nome}', '${usuario.email}', '${usuario.papel}')" class="bg-yellow-500 text-white rounded p-1">Editar</button>
                    <button onclick="deleteUsuario(${usuario.id})" class="bg-red-500 text-white rounded p-1 ml-2">Excluir</button>
                </td>
            `;
            usuariosList.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
    }
};

// Adiciona novo usuário
document.getElementById('usuarioForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const papel = document.getElementById('papel').value;

    try {
        await axios.post(url, { nome, email, papel });
        loadUsuarios(); 
        e.target.reset(); 
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
    }
});

// Edita usuário
const editUsuario = (id, nome, email, papel) => {
    const usuariosList = document.getElementById('usuariosList');
    const rows = usuariosList.getElementsByTagName('tr');

    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        if (cells[0].innerText === nome) { 
            cells[0].innerHTML = `<input type="text" value="${nome}" class="border rounded p-1">`;
            cells[1].innerHTML = `<input type="text" value="${email}" class="border rounded p-1">`;
            cells[2].innerHTML = `<input type="text" value="${papel}" class="border rounded p-1">`;
            cells[3].innerHTML = `<button onclick="saveUsuario(${id}, this.parentElement.parentElement)" class="bg-green-500 text-white rounded p-1">Salvar</button>`;
            break;
        }
    }
};

// Salva edição de usuário
const saveUsuario = async (id, row) => {
    const inputs = row.getElementsByTagName('input');
    const nome = inputs[0].value;
    const email = inputs[1].value;
    const papel = inputs[2].value;

    try {
        await axios.put(`${url}${id}`, { nome, email, papel });
        loadUsuarios(); 
    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
    }
};

// Exclui usuário
const deleteUsuario = async (id) => {
    if (confirm('Tem certeza de que deseja excluir este usuário?')) {
        try {
            await axios.delete(`${url}${id}`); 
            loadUsuarios(); 
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        }
    }
};

loadUsuarios(); // Carrega os usuários ao iniciar
