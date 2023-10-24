import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/instance";
import { notifyError } from "../utils/toastify";
export default function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!username || !password) {
      return alert("Preencha todos os campos");
    }
    try {
      const { data } = await api.post("/login", {
        username,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          username: data.username,
          name: data.name,
        })
      );
      navigate("/home");
    } catch (error: any) {
      notifyError("Failed login: " + error.message);
    }
  }

  return (
    <section className="w-[100vw] h-[100vh] flex items-center justify-center border ">
      <form
        onSubmit={handleSignIn}
        className="flex flex-col items-center justify-center w-[747px] h-[811px]
            rounded-lg"
      >
        <label className="text-2xl font-bold">Sign In</label>
        <input
          name="username"
          value={username}
          className="w-1/2 p-2 m-2 border-2 rounded-lg"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          name="password"
          value={password}
          className="w-1/2 p-2 m-2 border-2 rounded-lg"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-1/2 p-2 m-2 text-white bg-[#00173D] rounded-lg">
          Sign In
        </button>
        <span className="">
          Não tem cadastro ? <Link to="/signup">Clique aqui!</Link>
        </span>
      </form>
    </section>
  );
}
