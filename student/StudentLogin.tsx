import { useState } from "react";
import { supabase } from "../lib/supabase";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("Preencha email e senha");

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert("Login inválido");
      console.error(error);
    }
  };

  

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <div className="bg-slate-900 p-10 rounded-2xl w-full max-w-md border border-white/5">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Área do <span className="text-pink-500">Aluno</span>
        </h1>

        <div className="grid gap-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 bg-slate-800 rounded"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 bg-slate-800 rounded"
          />

          

          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-pink-600 py-3 rounded font-bold hover:bg-pink-500 transition disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
