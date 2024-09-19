const input = document.querySelector('input');
const button = document.querySelector('button');
const listCompleta = document.querySelector('ul');

// Criando meu array vazio para receber todos os itens da tarefa do usuário
let minhaListaDeItens = [];

// Função para adicionar uma nova tarefa
function adicionarNovaTarefa() {
    const tarefa = input.value.trim(); // Remove espaços em branco no início e no fim

    if (tarefa === '') { // Verifica se o input está vazio
        alert('Você não pode inserir uma tarefa vazia! Por favor, digite uma tarefa para inseri-la!');
        return; // Sai da função sem adicionar a tarefa
    }

    // Adiciona a nova tarefa ao array(vetor) de tarefas
    minhaListaDeItens.push({
        tarefa: tarefa,
        concluida: false,
    });

    input.value = ''; // Limpa o campo de entrada
    mostrarTarefas(); // Atualiza a exibição da lista de tarefas
}

// Função para mostrar as tarefas na lista
function mostrarTarefas() {
    let novaLi = ''; // Inicializa uma string vazia para armazenar o HTML das tarefas
    minhaListaDeItens.forEach((item, posicao) => { // Itera sobre cada item na lista de tarefas
        novaLi += `
            <li class="task ${item.concluida ? 'done' : ''}">
                <span onclick="concluirTarefa(${posicao})">✔️</span>
                <p>${item.tarefa}</p>
                <span onclick="deletarItem(${posicao})">❌</span>
            </li>
        `;
    });

    // Insere o HTML das tarefas na lista
    listCompleta.innerHTML = novaLi;

    // Salva a lista no localStorage do navegador como string
    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}

// Função para concluir tarefa
function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
    mostrarTarefas(); // Atualiza a exibição da lista de tarefas
}

// Função para deletar tarefa
function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1); // Remove a tarefa do array
    mostrarTarefas(); // Atualiza a exibição da lista de tarefas
}

// Carregar tarefas do localStorage ao iniciar
window.onload = function() {
    const listaSalva = localStorage.getItem('lista');
    if (listaSalva) {
        minhaListaDeItens = JSON.parse(listaSalva);
        mostrarTarefas();
    }
    // Foca o input ao carregar a página
    input.focus();
};

// Adiciona o evento de clique no botão
button.onclick = adicionarNovaTarefa;

// Adiciona o evento de pressionar tecla Enter no input
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        adicionarNovaTarefa();
        event.preventDefault(); // Evita o comportamento padrão do Enter (como o envio de formulário)
    }
});