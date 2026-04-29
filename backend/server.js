const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

// 1. CONFIGURAÇÕES (Middlewares)
app.use(cors());
app.use(express.json());

// 2. ROTAS



// Listar tarefas
app.get('/tarefas', async (req, res) => {
    try {
        const tarefas = await prisma.tarefas.findMany({ orderBy: { id: 'desc' } });
        res.json(tarefas);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar tarefas" });
    }
});

// Criar tarefa
app.post('/tarefas', async (req, res) => {
    try {
        const { titulo } = req.body;
        if (!titulo) return res.status(400).json({ erro: "Título obrigatório" });

        const nova = await prisma.tarefas.create({
            data: { titulo, status: 'pendente' }
        });
        res.status(201).json(nova);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar tarefa" });
    }
});

// Deletar tarefa
app.delete('/tarefas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.tarefas.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ erro: "Tarefa não encontrada" });
    }
});

// ATUALIZAR STATUS E TÍTULO (Corrigido)
app.patch('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo } = req.body; 

    try {
        // CORREÇÃO 1: Mudamos de 'tarefa' para 'tarefas' (Plural)
        const tarefaExistente = await prisma.tarefas.findUnique({
            where: { id: Number(id) }
        });

        if (!tarefaExistente) {
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        }

        // LÓGICA DE ATUALIZAÇÃO
        const dadosNovos = titulo 
            ? { titulo: titulo } 
            : { status: tarefaExistente.status === 'pendente' ? 'concluido' : 'pendente' };

        // CORREÇÃO 2: Mudamos de 'tarefa' para 'tarefas' (Plural) aqui também
        const tarefaAtualizada = await prisma.tarefas.update({
            where: { id: Number(id) },
            data: dadosNovos
        });

        res.json(tarefaAtualizada);
    } catch (error) {
        console.error("Erro no Prisma:", error);
        res.status(500).json({ error: "Erro ao atualizar no banco de dados" });
    }
});

// 3. INICIALIZAÇÃO
app.listen(PORT, () => {
    console.log(`\n=========================================`);
    console.log(`  🚀 Servidor ON: http://localhost:${PORT}`);
    console.log(`=========================================\n`);
});