import React, { useEffect, useState } from 'react';
import styles from './TabelaFuncionarios.module.css';

function TabelaFuncionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            carregarFuncionarios();
        }, 300);
    }, []);

    async function carregarFuncionarios() {
        try {
            const resposta = await fetch('http://localhost:5000/funcionario', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!resposta.ok) {
                throw new Error('Erro ao buscar funcionários');
            }

            const consulta = await resposta.json();
            setFuncionarios(consulta);
            setRemoveLoading(true);
        } catch (error) {
            console.log('erro ao buscar funcionários', error);
        }
    }

    return (
        <div className={styles.Funcionarios}>
            <table className={`${styles.TabelaFuncionarios} table-bordered`}>
                <thead >
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>Sexo</th>
                    </tr>
                </thead>
                <tbody>
                    {funcionarios.map((funcionario) => (
                        <tr key={funcionario.id} >
                            <td>{funcionario.nome}</td>
                            <td>{funcionario.cpf}</td>
                            <td>{funcionario.telefone}</td>
                            <td>{funcionario.sexo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {removeLoading && funcionarios.length === 0 && <h1>Não há funcionários disponíveis</h1>}
        </div>
    );
}

export default TabelaFuncionarios;
