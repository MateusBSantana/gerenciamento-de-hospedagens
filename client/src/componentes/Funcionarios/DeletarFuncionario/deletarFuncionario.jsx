export async function deletarFuncionario(id) {
    try {
        const resposta = await fetch(`http://localhost:5000/funcionario/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!resposta.ok) {
            throw new Error('Erro ao deletar funcionário');
        }

        return true; // Retorna true se a exclusão foi bem-sucedida
    } catch (error) {
        console.error('Erro ao deletar funcionário', error);
        return false; // Retorna false em caso de erro
    }
}