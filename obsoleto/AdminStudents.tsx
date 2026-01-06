import { useState } from "react";
import { Student } from "../types";

const AdminStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.name || !form.email) return;

    setStudents([
      ...students,
      {
        id: crypto.randomUUID(),
        ...form,
      },
    ]);

    setForm({
      name: "",
      email: "",
      phone: "",
      plan: "",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-8">Cadastro de Alunos</h1>

      {/* FORM */}
      <div className="max-w-2xl grid gap-4 mb-12">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nome do aluno"
          className="p-3 bg-slate-800 rounded"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="E-mail"
          className="p-3 bg-slate-800 rounded"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Telefone / WhatsApp"
          className="p-3 bg-slate-800 rounded"
        />

        <input
          name="plan"
          value={form.plan}
          onChange={handleChange}
          placeholder="Plano (Ex: Online, Presencial, VIP)"
          className="p-3 bg-slate-800 rounded"
        />

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Observações"
          className="p-3 bg-slate-800 rounded"
        />

        <button
          onClick={handleAdd}
          className="bg-pink-600 py-3 rounded font-bold hover:bg-pink-500"
        >
          Cadastrar Aluno
        </button>
      </div>

      {/* LISTA */}
      {students.length === 0 ? (
        <p className="text-slate-400">Nenhum aluno cadastrado ainda.</p>
      ) : (
        <div className="grid gap-4">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-slate-800 p-4 rounded flex flex-col gap-1"
            >
              <strong className="text-lg">{student.name}</strong>
              <span className="text-sm text-slate-400">{student.email}</span>
              <span className="text-sm text-slate-400">{student.phone}</span>
              <span className="text-sm text-pink-500 font-bold">
                {student.plan}
              </span>
              {student.notes && (
                <p className="text-xs text-slate-400 mt-1">
                  {student.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
