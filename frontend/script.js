const API_URL = 'http://localhost:3000/tarefas';
let todasAsTarefas = []; 

// 1. BUSCA
async function buscarTarefas() {
    try {
        const resposta = await fetch(API_URL);
        todasAsTarefas = await resposta.json();
        renderizarTarefas(todasAsTarefas);
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
}

// 2. RENDERIZAÇÃO
function renderizarTarefas(listaParaExibir) {
    const lista = document.getElementById('taskList');
    if (!lista) return; 
    lista.innerHTML = ''; 

    listaParaExibir.forEach(tarefa => {
        const item = document.createElement('li');

        // O título entra como texto (textContent), nunca como HTML: evita XSS
        // e não quebra com aspas ou apóstrofos no nome da missão
        const titulo = document.createElement('span');
        titulo.className = 'titulo' + (tarefa.status === 'concluido' ? ' concluida' : '');
        titulo.textContent = tarefa.titulo;
        titulo.addEventListener('click', () => alternarStatus(tarefa.id));

        const acoes = document.createElement('div');
        acoes.className = 'actions';

        const btnEditar = document.createElement('button');
        btnEditar.className = 'btn-edit';
        btnEditar.textContent = '📝';
        btnEditar.setAttribute('aria-label', 'Editar missão');
        btnEditar.addEventListener('click', () => editarTarefa(tarefa.id, tarefa.titulo));

        const btnDeletar = document.createElement('button');
        btnDeletar.className = 'btn-delete';
        btnDeletar.textContent = '❌';
        btnDeletar.setAttribute('aria-label', 'Excluir missão');
        btnDeletar.addEventListener('click', () => deletarTarefa(tarefa.id));

        acoes.append(btnEditar, btnDeletar);
        item.append(titulo, acoes);
        lista.appendChild(item);
    });
}

// 3. FILTROS
function filtrarTarefas(status) {
    if (status === 'todas') {
        renderizarTarefas(todasAsTarefas);
    } else {
        const filtradas = todasAsTarefas.filter(t => t.status === status);
        renderizarTarefas(filtradas);
    }
}

// 4. ADICIONAR
async function adicionarTarefa() {
    const input = document.getElementById('taskInput');
    if (!input || !input.value) return alert('Digite algo!');

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ titulo: input.value })
        });
        input.value = ''; 
        await buscarTarefas(); 
    } catch (error) {
        console.error("Erro ao adicionar:", error);
    }
}

// 5. DELETAR
async function deletarTarefa(id) {
    if (!confirm("Deseja realmente excluir?")) return;
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        await buscarTarefas();
    } catch (error) {
        console.error("Erro ao deletar:", error);
    }
}

// 6. ALTERNAR STATUS
async function alternarStatus(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'PATCH' });
        await buscarTarefas();
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
    }
}

// 7. EDITAR TAREFA
async function editarTarefa(id, tituloAtual) {
    const novoTitulo = prompt("Edite o nome da Quest:", tituloAtual);

    if (novoTitulo === null || novoTitulo.trim() === "" || novoTitulo === tituloAtual) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo: novoTitulo })
        });

        if (response.ok) {
            await buscarTarefas(); 
        } else {
            alert("Erro ao salvar no servidor. Verifique o backend.");
        }
    } catch (error) {
        console.error("Erro ao editar:", error);
    }
}

// Inicialização (Movida para o final para garantir que todas as funções existam)
buscarTarefas();