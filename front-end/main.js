const url = "http://localhost:8800/"

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', options).replace(/\//g, '/'); // Formata a data como DD/MM/YYYY
};

const loadLivros = async () => {
    try {
        const response = await axios.get(url);
        const livros = response.data;
        const livrosList = document.getElementById('livrosList');

        livrosList.innerHTML = ''; // Limpa a lista antes de preencher

        livros.forEach(livro => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="py-2 px-4 border-b text-center">${livro.livro}</td>
                <td class="py-2 px-4 border-b text-center">${livro.autor}</td>
                <td class="py-2 px-4 border-b text-center">${formatDate(livro.data)}</td>
                <td class="py-2 px-4 border-b text-center">
                    <input type="checkbox" onchange="updateStatus(${livro.id}, this.checked)" ${livro.status ? 'checked' : ''}>
                </td>
                <td class="py-2 px-4 border-b text-center">
                    <button onclick="editLivro(${livro.id}, '${livro.livro}', '${livro.autor}', '${livro.data}')" class="bg-yellow-500 text-white rounded p-1">Editar</button>
                    <button onclick="deleteLivro(${livro.id})" class="bg-red-500 text-white rounded p-1 ml-2">Excluir</button>
                </td>
            `;
            livrosList.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
    }
};


const updateStatus = async (id, status) => {
    try {
        await axios.put(`${url}${id}/status`, { status });
        loadLivros();
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
    }
};


document.getElementById('livroForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const livro = document.getElementById('livro').value;
    const autor = document.getElementById('autor').value;
    const data = document.getElementById('data').value;
    const status = document.getElementById('status').checked ? 1 : 0;

    try {
        await axios.post(url, { livro, autor, data, status });
        loadLivros(); 
        e.target.reset(); 
    } catch (error) {
        console.error('Erro ao adicionar livro:', error);
    }
});


const editLivro = (id, livro, autor, data) => {
    const livrosList = document.getElementById('livrosList');
    const rows = livrosList.getElementsByTagName('tr');

    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        if (cells[0].innerText === livro) { 

            cells[0].innerHTML = `<input type="text" value="${livro}" class="border rounded p-1">`;
            cells[1].innerHTML = `<input type="text" value="${autor}" class="border rounded p-1">`;
            cells[2].innerHTML = `<input type="date" value="${data.split('T')[0]}" class="border rounded p-1">`;
            cells[3].innerHTML = `<input type="checkbox" onchange="updateStatus(${id}, this.checked)" ${livro.status ? 'checked' : ''}>`;
            cells[4].innerHTML = `<button onclick="saveLivro(${id}, this.parentElement.parentElement)" class="bg-green-500 text-white rounded p-1">Salvar</button>`;
            break;
        }
    }
};


const saveLivro = async (id, row) => {
    const inputs = row.getElementsByTagName('input');
    const livro = inputs[0].value;
    const autor = inputs[1].value;
    const data = inputs[2].value;
    const status = inputs[3].checked ? 1 : 0;

    try {
        await axios.put(`${url}${id}`, { livro, autor, data, status });
        loadLivros(); 
    } catch (error) {
        console.error('Erro ao salvar livro:', error);
    }
};


const deleteLivro = async (id) => {
    if (confirm('Tem certeza de que deseja excluir este livro?')) {
        try {
            await axios.delete(`${url}${id}`); 
            loadLivros(); 
        } catch (error) {
            console.error('Erro ao excluir livro:', error);
        }
    }
};


const filtrarLivros = async () => {
    const nomeFiltro = document.getElementById('filtroNome').value.toLowerCase();
    const statusFiltro = document.getElementById('filtroStatus').value;

    try {
        const response = await axios.get(url);
        let livros = response.data;

        if (nomeFiltro) {
            livros = livros.filter(livro => livro.livro.toLowerCase().includes(nomeFiltro));
        }

        if (statusFiltro !== "todos") {
            const status = statusFiltro === "lidos" ? 1 : 0;
            livros = livros.filter(livro => livro.status === status);
        }

        renderLivros(livros);
    } catch (error) {
        console.error('Erro ao filtrar livros:', error);
    }
};


const limparFiltros = async () => {
    document.getElementById('filtroNome').value = "";
    document.getElementById('filtroStatus').value = "todos";
    loadLivros();
};


const renderLivros = (livros) => {
    const livrosList = document.getElementById('livrosList');
    livrosList.innerHTML = ''; // Limpa a lista

    livros.forEach(livro => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="py-2 px-4 border-b text-center">${livro.livro}</td>
            <td class="py-2 px-4 border-b text-center">${livro.autor}</td>
            <td class="py-2 px-4 border-b text-center">${formatDate(livro.data)}</td>
            <td class="py-2 px-4 border-b text-center">
                <input type="checkbox" onchange="updateStatus(${livro.id}, this.checked)" ${livro.status ? 'checked' : ''}>
            </td>
            <td class="py-2 px-4 border-b text-center">
                <button onclick="editLivro(${livro.id}, '${livro.livro}', '${livro.autor}', '${livro.data}')" class="bg-yellow-500 text-white rounded p-1">Editar</button>
                <button onclick="deleteLivro(${livro.id})" class="bg-red-500 text-white rounded p-1 ml-2">Excluir</button>
            </td>
        `;
        livrosList.appendChild(tr);
    });
};

loadLivros();