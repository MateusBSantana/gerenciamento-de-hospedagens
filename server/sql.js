// DROP DATABASE IF EXISTS hospedagem; 
// CREATE DATABASE hospedagem;

// USE hospedagem;

// CREATE TABLE hospedes (
//     id_hospede INT AUTO_INCREMENT UNIQUE,
//     nome_hospede VARCHAR(40),
//     cpf VARCHAR(11) UNIQUE,
//     rg VARCHAR(10),
//     data_nascimento DATE,
//     sexo VARCHAR(20),
//     profissao VARCHAR(50), 
//     observacoes VARCHAR(255),
//     rua VARCHAR(50),
//     numero VARCHAR(10), 
//     cidade VARCHAR(30),
//     estado VARCHAR(30),
//     cep VARCHAR(9),
//     bairro VARCHAR(30),
//     complemento VARCHAR(50),
//     observacoes_endereco VARCHAR(255),
//     email VARCHAR(40),
//     celular VARCHAR(13),
//     PRIMARY KEY (id_hospede)
// );

// SELECT * FROM hospedes;

// CREATE TABLE funcionarios (
//     id_funcionario INT AUTO_INCREMENT UNIQUE,
//     nome_funcionario VARCHAR(40),
//     rg VARCHAR(10),
//     cpf VARCHAR(11) UNIQUE,
//     data_nascimento DATE,
//     sexo VARCHAR(20),
//     email VARCHAR(40),
//     telefone VARCHAR(13),
//     observacoes VARCHAR(500),
//     cep VARCHAR(9),
//     estado VARCHAR(50),
//     cidade VARCHAR(50),
//     bairro VARCHAR(50),
//     logradouro VARCHAR(50),
//     numero VARCHAR(10),  
//     complemento VARCHAR(50),
//     observacoes_endereco VARCHAR(500),
//     cargo VARCHAR(20),
//     data_admissao DATE,
//     data_emissao_carteira DATE,
//     banco VARCHAR(40),
//     agencia VARCHAR(10), 
//     conta VARCHAR(20),   
//     status_funcionario VARCHAR(20), 
//     observacoes_adicionais VARCHAR(500),  
//     PRIMARY KEY (id_funcionario)
// );

// INSERT INTO funcionarios (nome_funcionario, rg, cpf, data_nascimento, sexo, email, telefone, observacoes, cep, estado, cidade, bairro, logradouro, numero, complemento, observacoes_endereco, cargo, data_admissao, data_emissao_carteira, banco, agencia, conta, status_funcionario, observacoes_adicionais)
// VALUES 
// ('Mateus', '123456789', '11111111111', '1990-01-01', 'Masculino', 'mateus@example.com', '1111111111', 'Observação para Mateus', '29000000', 'ES', 'Vitória', 'Centro', 'Rua A', '123', 'Apto 1', 'Sem observações', 'Desenvolvedor', '2023-01-01', '2023-01-02', 'Banco A', '0001', '123456', 'Ativo', 'Sem observações adicionais'),

// ('Victor', '234567890', '22222222222', '1985-02-02', 'Masculino', 'victor@example.com', '2222222222', 'Observação para Victor', '29000001', 'ES', 'Vila Velha', 'Praia', 'Rua B', '456', 'Apto 2', 'Sem observações', 'Analista', '2022-02-01', '2022-02-02', 'Banco B', '0002', '234567', 'Ativo', 'Sem observações adicionais'),

// ('Valdineide', '345678901', '33333333333', '1980-03-03', 'Feminino', 'valdineide@example.com', '3333333333', 'Observação para Valdineide', '29000002', 'ES', 'Serra', 'Parque', 'Rua C', '789', 'Apto 3', 'Sem observações', 'Gestora', '2021-03-01', '2021-03-02', 'Banco C', '0003', '345678', 'Ativo', 'Sem observações adicionais');

// SELECT * FROM funcionarios;

// -- Tabela 'acomodacoes' com 'tipo' como ENUM
// CREATE TABLE acomodacoes (
//     id INT AUTO_INCREMENT PRIMARY KEY,  
//     nome VARCHAR(100) NOT NULL,
//     capacidade INT NOT NULL CHECK (capacidade > 0),
//     tipo ENUM('Simples', 'Luxo', 'Suíte') NOT NULL,
//     observacoes TEXT,
//     status ENUM('Disponível', 'Indisponível') DEFAULT 'Disponível'
// );

// SELECT * FROM acomodacoes;

// CREATE TABLE usuarios (
//     id_usuario INT AUTO_INCREMENT UNIQUE,
//     login VARCHAR(11) UNIQUE,
//     senha VARCHAR(6),
//     PRIMARY KEY (id_usuario),
//     FOREIGN KEY (id_usuario) REFERENCES funcionarios(id_funcionario),
//     FOREIGN KEY (login) REFERENCES funcionarios(cpf)
// );

// INSERT INTO usuarios (login, senha) VALUES ('11111111111', 'senha1');
// INSERT INTO usuarios (login, senha) VALUES ('22222222222', 'senha2');
// INSERT INTO usuarios (login, senha) VALUES ('33333333333', 'senha3');