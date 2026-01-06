import { useEffect, useState } from "react";
import { Plan } from "../types";
import { supabase } from "../lib/supabase";

const AdminPlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [planForm, setPlanForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    const { data } = await supabase.from("plans").select("*");
    setPlans(data || []);
  };

  const handleChange = (e: any) => {
    setPlanForm({ ...planForm, [e.target.name]: e.target.value });
  };

  const savePlan = async () => {
    if (!planForm.name) return;

    if (editingId) {
      await supabase.from("plans").update(planForm).eq("id", editingId);
      setEditingId(null);
    } else {
      await supabase.from("plans").insert([planForm]);
    }

    setPlanForm({ name: "", price: "", description: "" });
    loadPlans();
  };

  const deletePlan = async (id: string) => {
    if (!confirm("Excluir plano?")) return;
    await supabase.from("plans").delete().eq("id", id);
    loadPlans();
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Cadastrar / Editar Plano</h2>

      <div className="max-w-2xl grid gap-4 mb-12">
        <input name="name" value={planForm.name} onChange={handleChange} placeholder="Nome do plano" className="p-3 bg-slate-800 rounded" />
        <input name="price" value={planForm.price} onChange={handleChange} placeholder="Preço" className="p-3 bg-slate-800 rounded" />
        <textarea name="description" value={planForm.description} onChange={handleChange} placeholder="Descrição" className="p-3 bg-slate-800 rounded" />

        <button onClick={savePlan} className="bg-pink-600 py-3 rounded font-bold">
          {editingId ? "Salvar alterações" : "Adicionar plano"}
        </button>
      </div>

      <div className="grid gap-3">
        {plans.map(p => (
          <div key={p.id} className="bg-slate-800 p-4 rounded flex justify-between">
            <div>
              <strong>{p.name}</strong>
              <p className="text-xs text-slate-400">{p.price}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(p.id);
                  setPlanForm({
                    name: p.name,
                    price: p.price,
                    description: p.description,
                  });
                }}
                className="px-3 py-1 text-xs rounded bg-slate-700"
              >
                Editar
              </button>

              <button onClick={() => deletePlan(p.id)} className="px-3 py-1 text-xs rounded bg-red-600">
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminPlans;
