import {
  createUsuario,
  readUsuario,
  showOneUsuario,
  updateUsuario,
  deleteUsuario,
  getUserByLoginPassword,
} from "../models/usuarioModel.js";

export async function criarUsuario(req, res) {
  console.log("UsuarioController :: criarUsuario");
  const { login, senha } = req.body;

  if (!login || !senha) {
    res.status(400).json({ message: "Login e senha devem ser informados" });
  } else {
    try {
      const [status, resposta] = await createUsuario(login, senha);
      res.status(status).json(resposta);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao criar usuário" });
    }
  }
}

export async function mostrarUsuario(req, res) {
  console.log("UsuarioController :: mostrarUsuario");

  try {
    const [status, resposta] = await readUsuario();
    res.status(status).json(resposta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao exibir usuários" });
  }
}

export async function mostrarUmUsuario(req, res) {
  console.log("UsuarioController :: mostrarUmUsuario");
  const { id_usuario } = req.params;

  if (!id_usuario) {
    res.status(400).json({ message: "ID do usuário deve ser informado" });
  } else {
    try {
      const [status, resposta] = await showOneUsuario(id_usuario);
      res.status(status).json(resposta);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao exibir o usuário" });
    }
  }
}

export async function atualizarUsuario(req, res) {
  console.log("UsuarioController :: atualizarUsuario");
  const { login, senha } = req.body;
  const { id_usuario } = req.params;

  if (!login || !senha || !id_usuario) {
    res.status(400).json({ message: "Login, senha e ID do usuário devem ser informados" });
  } else {
    try {
      const [status, resposta] = await updateUsuario(login, senha, id_usuario);
      res.status(status).json(resposta);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  }
}

export async function deletarUsuario(req, res) {
  console.log("UsuarioController :: deletarUsuario");
  const { id_usuario } = req.params;

  if (!id_usuario) {
    res.status(400).json({ message: "ID do usuário deve ser informado" });
  } else {
    try {
      const [status, resposta] = await deleteUsuario(id_usuario);
      res.status(status).json(resposta);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao deletar usuário" });
    }
  }
}

export async function logarUsuario(req, res) {
  console.log("UsuarioController :: logarUsuario");
  const { login, senha } = req.body;

  if (!login || !senha) {
    res.status(400).json({ message: "Login e senha devem ser informados" });
  } else {
    try {
      const [status, resposta] = await getUserByLoginPassword(login, senha);
      res.status(status).json(resposta);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao realizar login" });
    }
  }
}
