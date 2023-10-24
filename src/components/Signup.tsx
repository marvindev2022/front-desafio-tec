import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./../services/instance";
import { notifyError, notifySucess } from "../utils/toastify";
import { fieldMessages } from "../data/fildsMessages";

interface FieldMessages {
  username: string;
  password: string;
  name: string;
}

export default function Signup() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();
    const fieldValues: any = { username, password, name };

    for (const field in fieldMessages) {
      if (!fieldValues[field as keyof FieldMessages]) {
        return notifyError(fieldMessages[field as keyof FieldMessages]);
      }
    }

    if (password.length < 6) {
      return notifyError("A senha deve ter no mínimo 6 caracteres!");
    }
    try {
      const { data } = await api.post("/register", {
        username,
        password,
        name,
      });
      if (data) {
        setUsername("");
        setPassword("");
        setName("");
        navigate("/signin");
        return notifySucess("Usuário cadastrado com sucesso!");
      }
    } catch (err: any) {
      notifyError(err.message);
    }
  }
  return (
    <section className="w-[100vw] h-[100vh] flex items-center justify-center  ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-[747px] h-[811px] rounded-lg"
      >
        <label className="text-2xl font-bold">Sign Up</label>
        <input
          value={username}
          className="w-1/2 p-2 m-2 border-2 rounded-lg"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          value={name}
          className="w-1/2 p-2 m-2 border-2 rounded-lg"
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          value={password}
          className="w-1/2 p-2 m-2 border-2 rounded-lg"
          type="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-1/2 p-2 m-2 text-white bg-[#00173D] rounded-lg">
          Sign Up
        </button>
        <span className="">
          Já tem cadastro ? <Link to="/signin">Clique aqui!</Link>
        </span>
      </form>
    </section>
  );
}
