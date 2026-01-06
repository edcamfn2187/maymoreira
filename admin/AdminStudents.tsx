import { useEffect, useState } from "react";
import { Student, Plan } from "../types";
import { supabase } from "../lib/supabase";

const AdminStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [studentForm, setStudentForm] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    notes: "",
  });

  useEffect(() => {
    loadStudents();
    loadPlans();
  }, []);

  const loadStudents = async () => {
    const { data } = await supabase.from("students").select("*");
    setStudents(data || []);
  };

  const loadPlans = async () => {
    const { data } = await supabase.from("plans").select("*");
    setPlans(data || []);
  };

  const handleChange = (e: any) => {
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  };

  const saveStudent = async () => {
    if (!studentForm.name || !studentForm.email) return;

    if (editingId) {
      await supabase.from("students").update(studentForm).eq("id", editingId);
      setEditingId(null);
    } else {
      await supabase.from("students").insert([studentForm]);
    }

    setStudentForm({ name: "", email: "", phone: "", plan: "", notes: "" });
    loadStudents();
  };

  const deleteStudent = async (id: string) => {
    if (!confirm("Excluir aluno?")) return;
    await supabase.from("students").delete().eq("id", id);
    loadStudents();
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Cadastrar / Editar Aluno</h2>

      <div className="max-w-2xl grid gap-4 mb-12">
        <input name="name" value={studentForm.name} onChange={handleChange} placeholder="Nome" className="p-3 bg-slate-800 rounded" />
        <input name="email" value={studentForm.email} onChange={handleChange} placeholder="Email" className="p-3 bg-slate-800 rounded" />
        <input name="phone" value={studentForm.phone} onChange={handleChange} placeholder="Telefone" className="p-3 bg-slate-800 rounded" />

        <select name="plan" value={studentForm.plan} onChange={handleChange} className="p-3 bg-slate-800 rounded">
          <option value="">Selecione um plano</option>
          {plans.map(p => (
            <option key={p.id} value={p.name}>{p.name}</option>
          ))}
        </select>

        <textarea name="notes" value={studentForm.notes} onChange={handleChange} placeholder="Observações" className="p-3 bg-slate-800 rounded" />

        <button onClick={saveStudent} className="bg-pink-600 py-3 rounded font-bold">
          {editingId ? "Salvar alterações" : "Cadastrar aluno"}
        </button>
      </div>

      <div className="grid gap-3">
        {students.map(s => (
          <div key={s.id} className="bg-slate-800 p-4 rounded flex justify-between">
            <div>
              <strong>{s.name}</strong>
              <p className="text-xs text-slate-400">{s.email}</p>
              <p className="text-xs text-pink-400">{s.plan}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(s.id);
                  setStudentForm({
                    name: s.name,
                    email: s.email,
                    phone: s.phone,
                    plan: s.plan,
                    notes: s.notes,
                  });
                }}
                className="px-3 py-1 text-xs rounded bg-slate-700"
              >
                Editar
              </button>

              <button onClick={() => deleteStudent(s.id)} className="px-3 py-1 text-xs rounded bg-red-600">
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminStudents;
