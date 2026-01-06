import { useState } from "react";
import { supabase } from "../lib/supabase";

const AnamneseForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.objective) {
      alert("Preencha pelo menos nome, email e objetivo");
      return;
    }

    setLoading(true);

    const payload = {
      name: form.name,
      email: form.email,
      age: form.age || null,
      height: form.height || null,
      weight: form.weight || null,
      objective: form.objective || null,
      experience: form.experience || null,
      injuries: form.injuries || null,
      limitations: form.limitations || null,
      availability: form.availability || null,
    };

    const { error } = await supabase.from("anamneses").insert([payload]);

    setLoading(false);

    if (error) {
      console.error("ERRO AO SALVAR ANAMNESE 👉", error);
      alert("Erro ao enviar anamnese. Tente novamente.");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-slate-900 p-10 rounded-2xl text-center text-white">
        <h2 className="text-2xl font-bold mb-4 text-pink-500">
          Anamnese enviada com sucesso!
        </h2>
        <p className="text-slate-400">
          Em breve entraremos em contato para montar seu plano ideal 💪
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 p-8 rounded-2xl text-white max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">
        Teste de <span className="text-pink-500">Anamnese</span>
      </h2>

      <div className="grid gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nome completo"
          className="p-3 bg-slate-800 rounded"
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="E-mail"
          className="p-3 bg-slate-800 rounded"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Idade"
            className="p-3 bg-slate-800 rounded"
          />
          <input
            name="height"
            value={form.height}
            onChange={handleChange}
            placeholder="Altura (cm)"
            className="p-3 bg-slate-800 rounded"
          />
        </div>

        <input
          name="weight"
          value={form.weight}
          onChange={handleChange}
          placeholder="Peso (kg)"
          className="p-3 bg-slate-800 rounded"
        />

        <select
          name="objective"
          value={form.objective}
          onChange={handleChange}
          className="p-3 bg-slate-800 rounded text-white"
        >
          <option value="">Objetivo principal</option>
          <option value="Emagrecimento">Emagrecimento</option>
          <option value="Hipertrofia">Hipertrofia</option>
          <option value="Condicionamento">Condicionamento</option>
          <option value="Mobilidade">Mobilidade</option>
        </select>

        <textarea
          name="experience"
          value={form.experience}
          onChange={handleChange}
          placeholder="Já pratica atividade física?"
          className="p-3 bg-slate-800 rounded"
        />

        <textarea
          name="injuries"
          value={form.injuries}
          onChange={handleChange}
          placeholder="Possui lesões ou dores?"
          className="p-3 bg-slate-800 rounded"
        />

        <textarea
          name="limitations"
          value={form.limitations}
          onChange={handleChange}
          placeholder="Limitações físicas ou médicas?"
          className="p-3 bg-slate-800 rounded"
        />

        <textarea
          name="availability"
          value={form.availability}
          onChange={handleChange}
          placeholder="Disponibilidade semanal para treinar"
          className="p-3 bg-slate-800 rounded"
        />

        <button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-pink-600 py-3 rounded font-bold hover:bg-pink-500 transition disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar Anamnese"}
        </button>
      </div>
    </div>
  );
};

export default AnamneseForm;
