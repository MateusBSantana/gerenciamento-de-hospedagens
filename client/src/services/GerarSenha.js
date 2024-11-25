import React, { useState } from "react";

function GeradorSenha() {
  const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numeros = "1234567890";
  const caracteres = alfabeto + numeros;

  const [tamanho, setTamanho] = useState(8); // Valor inicial padrão
  const [senha, setSenha] = useState("");

  const handleChange = (e) => {
    setTamanho(e.target.value);
  };

  const gerarSenha = (tamanho) => {
    let senhaGerada = "";

    for (let i = 0; i < tamanho; i++) {
      let randomIndex = Math.floor(Math.random() * caracteres.length);
      senhaGerada += caracteres[randomIndex];
    }

    return senhaGerada;
  };

  const handleClick = () => {
    setSenha(gerarSenha(tamanho));
  };

  return (
    <div>
      <h5>Quantidade: {tamanho}</h5>
      <input 
        type="number" 
        value={tamanho} 
        onChange={handleChange} 
        min="1"
      />
      <button onClick={handleClick}>Gerar Senha</button>
      <span>{senha}</span>
    </div>
  );
}

export default GeradorSenha;
