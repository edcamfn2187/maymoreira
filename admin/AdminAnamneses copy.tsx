import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Anamnese = {
  id: string;
  name: string;
  age: string | null;
  height: string | null;
  weight: string | null;
  objective: string | null;
  experience: string | null;
  injuries: string | null;
  limitations: string | null;
  availability: string | null;
  created_at: string;
};

const AdminAnamneses = () => {
  const [anamneses, setAnamneses] = useState<Anamnese[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnamneses();
  }, []);

  const loadAnamneses = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("anamneses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar anamneses:", error);
      alert("Erro ao carregar anamneses");
    } else {
      setAnamneses(data || []);
    }

    setLoading(false);
  };

  const deleteAnamnese = async (id: string) => {
    if (!confirm("Deseja excluir esta anamnese?")) return;

    const { error } = await supabase.from("anamneses").delete().eq("id", id);

    if (error) {
      console.error("Erro ao excluir:", error);
      alert("Erro ao excluir anamnese");
    } else {
      loadAnamneses();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Anamneses Recebidas</h2>

      {loading && <p className="text-slate-400">Carregando...</p>}

      {!loading && anamneses.length === 0 && (
        <p className="text-slate-400">Nenhuma anamnese enviada ainda.</p>
      )}

      <div className="grid gap-4">
        {anamneses.map((a) => (
          <div
            key={a.id}
            className="bg-slate-800 p-4 rounded border border-white/5"
          >
            <div className="flex justify-between items-center mb-2">
              <strong className="text-pink-500">{a.name}</strong>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">
                  {new Date(a.created_at).toLocaleDateString()}
                </span>
                <button
                  onClick={() => deleteAnamnese(a.id)}
                  className="text-xs px-2 py-1 rounded bg-red-600 hover:bg-red-500"
                >
                  Excluir
                </button>
              </div>
            </div>

            <p className="text-sm text-slate-300">
              <strong>Objetivo:</strong> {a.objective}
            </p>

            <div className="mt-2 text-xs text-slate-400 space-y-1">
              <p>Idade: {a.age}</p>
              <p>Altura: {a.height}</p>
              <p>Peso: {a.weight}</p>
              <p>Experiência: {a.experience}</p>
              <p>Lesões: {a.injuries}</p>
              <p>Limitações: {a.limitations}</p>
              <p>Disponibilidade: {a.availability}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnamneses;
