import { useState } from "react";
import { supabase } from "../lib/supabase";

const CadastroAluno = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    objective: "",
    experience: "",
    injuries: "",
    limitations: "",
    availability: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password || !form.objective) {
      alert("Preencha nome, email, senha e objetivo");
      return;
    }

    if (form.password.length < 6) {
      alert("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    setLoading(true);

    // 1. Criar conta no Auth
    const { data: auth, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (authError || !auth.user) {
      console.error(authError);
      alert(authError?.message || "Erro ao criar conta");
      setLoading(false);
      return;
    }

    // 2. Criar aluno
    const { data: student, error: studentError } = await supabase
      .from("students")
      .insert([
        {
          name: form.name,
          email: form.email,
          user_id: auth.user.id,
        },
      ])
      .select()
      .single();

    if (studentError) {
      console.error(studentError);
      alert("Erro ao salvar aluno");
      setLoading(false);
      return;
    }

    // 3. Criar anamnese
    const { error: anamError } = await supabase.from("anamneses").insert([
      {
        student_id: student.id,
        name: form.name,
        email: form.email,
        age: form.age,
        height: form.height,
        weight: form.weight,
        objective: form.objective,
        experience: form.experience,
        injuries: form.injuries,
        limitations: form.limitations,
        availability: form.availability,
      },
    ]);

    if (anamError) {
      console.error(anamError);
      alert("Erro ao salvar anamnese");
      setLoading(false);
      return;
    }

    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="bg-slate-900 p-10 rounded-2xl text-center text-white max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-pink-500">
          Cadastro realizado com sucesso!
        </h2>
        <p className="text-slate-400">
          Sua conta foi criada. Acesse Seu e-mail e confirme seu cadastro 💪
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 p-8 rounded-2xl text-white max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">
        Cadastro e <span className="text-pink-500">Anamnese</span>
      </h2>

      <div className="grid gap-4">
        <input name="name" placeholder="Nome completo" onChange={handleChange} className="p-3 bg-slate-800 rounded" />
        <input name="email" placeholder="E-mail" onChange={handleChange} className="p-3 bg-slate-800 rounded" />
        <input name="password" type="password" placeholder="Criar senha" onChange={handleChange} className="p-3 bg-slate-800 rounded" />

        <div className="grid grid-cols-2 gap-4">
          <input name="age" placeholder="Idade" onChange={handleChange} className="p-3 bg-slate-800 rounded" />
          <input name="height" placeholder="Altura (cm)" onChange={handleChange} className="p-3 bg-slate-800 rounded" />
        </div>

        <input name="weight" placeholder="Peso (kg)" onChange={handleChange} className="p-3 bg-slate-800 rounded" />

        <select name="objective" onChange={handleChange} className="p-3 bg-slate-800 rounded text-white">
          <option value="">Objetivo principal</option>
          <option value="Emagrecimento">Emagrecimento</option>
          <option value="Hipertrofia">Hipertrofia</option>
          <option value="Condicionamento">Condicionamento</option>
          <option value="Mobilidade">Mobilidade</option>
        </select>

        <textarea name="experience" placeholder="Já pratica atividade física?" onChange={handleChange} className="p-3 bg-slate-800 rounded" />
        <textarea name="injuries" placeholder="Possui lesões ou dores?" onChange={handleChange} className="p-3 bg-slate-800 rounded" />
        <textarea name="limitations" placeholder="Limitações físicas ou médicas?" onChange={handleChange} className="p-3 bg-slate-800 rounded" />
        <textarea name="availability" placeholder="Disponibilidade semanal" onChange={handleChange} className="p-3 bg-slate-800 rounded" />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-pink-600 py-3 rounded font-bold hover:bg-pink-500 transition disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Finalizar cadastro"}
        </button>
      </div>
    </div>
  );
};

export default CadastroAluno;
