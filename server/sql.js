/*

DROP DATABASE IF EXISTS hospedagem; 
CREATE DATABASE hospedagem;

USE hospedagem;

CREATE TABLE hospedes (
    id_hospede INT AUTO_INCREMENT UNIQUE,
    nome_hospede VARCHAR(40),
    cpf VARCHAR(11) UNIQUE,
    rg VARCHAR(10),
    data_nascimento DATE,
    sexo VARCHAR(20),
    Profissao VARCHAR(50), 
    observacoes VARCHAR(500),
    rua VARCHAR(50),
    numero VARCHAR(10), 
    cidade VARCHAR(30),
    estado VARCHAR(30),
    cep VARCHAR(9),
    bairro VARCHAR(30),
    complemento VARCHAR(50),
    observacoes_endereco VARCHAR(500),
    email VARCHAR(40),
    celular VARCHAR(13),
    PRIMARY KEY (id_hospede)
);

SELECT * FROM hospedes;

CREATE TABLE funcionarios (
    id_funcionario INT AUTO_INCREMENT UNIQUE,
    nome_funcionario VARCHAR(40),
    rg VARCHAR(10),
    cpf VARCHAR(11) UNIQUE,
    data_nascimento DATE,
    sexo VARCHAR(20),
    email VARCHAR(40),
    telefone VARCHAR(13),
    observacoes VARCHAR(500),
    cep VARCHAR(9),
    estado VARCHAR(50),
    cidade VARCHAR(50),
    bairro VARCHAR(50),
    logradouro VARCHAR(50),
    numero VARCHAR(10),  
    complemento VARCHAR(50),
    observacoes_endereco VARCHAR(500),
    cargo VARCHAR(20),
    data_admissao DATE,
    data_emissao_carteira DATE,
    banco VARCHAR(40),
    agencia VARCHAR(10), 
    conta VARCHAR(20),   
    status_funcionario VARCHAR(20), 
    observacoes_adicionais VARCHAR(500),  
    PRIMARY KEY (id_funcionario)
);
SELECT * FROM funcionarios;

*/