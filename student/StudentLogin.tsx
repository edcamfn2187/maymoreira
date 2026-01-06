import { useState } from "react";
import { supabase } from "../lib/supabase";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");


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

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Preencha email e senha");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("Conta criada! Agora você já pode entrar.");
    setMode("login");
  };


  

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <div className="bg-slate-900 p-10 rounded-2xl w-full max-w-md border border-white/5">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {mode === "login" ? "Área do Aluno" : "Criar Conta"}
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

          <p className="text-sm text-slate-400 text-center">
            Primeiro acesso?{" "}
            <button
              onClick={() => setMode("register")}
              className="text-pink-500 font-bold hover:underline"
            >
              Criar Conta
            </button>
          </p>


          <button
            onClick={mode === "login" ? handleLogin : handleRegister}
            disabled={loading}
            className="bg-pink-600 py-3 rounded font-bold hover:bg-pink-500 transition disabled:opacity-50"
          >
            {loading
              ? "Processando..."
              : mode === "login"
              ? "Entrar"
              : "Criar conta"}
          </button>

          {mode === "register" && (
              <p className="text-sm text-slate-400 text-center">
                Já tem conta?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-pink-500 font-bold hover:underline"
                >
                  Voltar para login
                </button>
              </p>
            )}


        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
