import { useEffect, useState } from "react";

type Anamnese = {
  id: string;
  name: string;
  age: string;
  height: string;
  weight: string;
  objective: string;
  experience: string;
  injuries: string;
  limitations: string;
  availability: string;
  createdAt: string;
};

const AdminAnamneses = () => {
  const [anamneses, setAnamneses] = useState<Anamnese[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("anamneses");
    if (stored) {
      try {
        setAnamneses(JSON.parse(stored));
      } catch {
        setAnamneses([]);
      }
    }
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Anamneses Recebidas</h2>

      {anamneses.length === 0 ? (
        <p className="text-slate-400">Nenhuma anamnese enviada ainda.</p>
      ) : (
        <div className="grid gap-4">
          {anamneses.map((a) => (
            <div
              key={a.id}
              className="bg-slate-800 p-4 rounded border border-white/5"
            >
              <div className="flex justify-between items-center mb-2">
                <strong className="text-pink-500">{a.name}</strong>
                <span className="text-xs text-slate-400">
                  {new Date(a.createdAt).toLocaleDateString()}
                </span>
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
      )}
    </div>
  );
};

export default AdminAnamneses;
