import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import db from '../conexao.js';

export async function createUsuario(req, res) {
  const { login, senha, id_funcionario } = req.body;

  try {
    // Verificar se o funcionário existe
    const [funcionario] = await pool.query('SELECT * FROM funcionarios WHERE id_funcionario = ?', [id_funcionario]);

    if (funcionario.length === 0) {
      return res.status(400).json({ error: "Funcionário não encontrado." });
    }

    // Hash da senha antes de inserir
    const hashSenha = await bcrypt.hash(senha, 10);

    // Inserir o novo usuário
    const [resultado] = await pool.query(
      'INSERT INTO usuarios (login, senha, id_funcionario) VALUES (?, ?, ?)',
      [login, hashSenha, id_funcionario]
    );

    return res.status(201).json({ message: "Usuário criado com sucesso!", id: resultado.insertId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar usuário", details: error.message });
  }
}

export async function readUsuario(req, res) {
  console.log('UsuarioController : readUsuario');
  const conexao = mysql.createPool(db);
  const sql = 'SELECT * FROM usuarios';

  try {
    const [resposta] = await conexao.query(sql);
    return res.status(200).json(resposta);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro ao Exibir Usuários', details: error.message });
  }
}

export async function showOneUsuario(req, res) {
  console.log('UsuarioController :: showOneUsuario');
  const conexao = mysql.createPool(db);
  const sql = 'SELECT * FROM usuarios WHERE id_usuario = ?';
  const params = [req.params.id_usuario];

  try {
    const [resposta] = await conexao.query(sql, params);
    if (resposta.length < 1) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    } else {
      return res.status(200).json(resposta[0]);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro ao exibir usuário', details: error.message });
  }
}

export async function updateUsuario(req, res) {
  console.log('UsuarioController :: updateUsuario');
  const { login, senha } = req.body;
  const { id_usuario } = req.params;

  try {
    // Hash da senha antes de atualizar
    const hashSenha = await bcrypt.hash(senha, 10);

    const conexao = mysql.createPool(db);
    const sql = 'UPDATE usuarios SET login = ?, senha = ? WHERE id_usuario = ?';
    const params = [login, hashSenha, id_usuario];

    const [resposta] = await conexao.query(sql, params);
    if (resposta.affectedRows < 1) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    } else {
      return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro ao editar usuário', details: error.message });
  }
}

export async function deleteUsuario(req, res) {
  console.log('UsuarioController :: deleteUsuario');
  const { id_usuario } = req.params;

  try {
    const conexao = mysql.createPool(db);
    const sql = 'DELETE FROM usuarios WHERE id_usuario = ?';
    const params = [id_usuario];

    const [resposta] = await conexao.query(sql, params);
    if (resposta.affectedRows < 1) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    } else {
      return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro ao deletar usuário', details: error.message });
  }
}

export async function getUserByLoginPassword(req, res) {
  console.log('UsuarioController :: getUserByLoginPassword');
  const { login, senha } = req.body;

  try {
    const conexao = mysql.createPool(db);
    const sql = 'SELECT id_usuario, senha FROM usuarios WHERE login = ?';
    const params = [login];

    const [resposta] = await conexao.query(sql, params);

    if (resposta.length < 1) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Verificar a senha com o bcrypt
    const match = await bcrypt.compare(senha, resposta[0].senha);

    if (!match) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    return res.status(200).json({ id_usuario: resposta[0].id_usuario });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro ao realizar login', details: error.message });
  }
}
