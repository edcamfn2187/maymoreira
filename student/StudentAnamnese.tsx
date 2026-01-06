import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const StudentAnamnese = ({ email }: { email: string }) => {
  const [anam, setAnam] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnamnese();
  }, []);

  const loadAnamnese = async () => {
    const { data, error } = await supabase
      .from("anamneses")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!error) setAnam(data);
    setLoading(false);
  };

  if (loading) return <p className="text-slate-400">Carregando anamnese...</p>;

  if (!anam)
    return (
      <div className="bg-slate-900 p-6 rounded-xl border border-white/5">
        <p className="text-yellow-400 font-bold">
          Você ainda não enviou sua anamnese.
        </p>
      </div>
    );

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-white/5">
      <h3 className="text-lg font-bold mb-4 text-pink-500">Minha Anamnese</h3>

      <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
        <p><strong>Objetivo:</strong> {anam.objective}</p>
        <p><strong>Idade:</strong> {anam.age}</p>
        <p><strong>Altura:</strong> {anam.height}</p>
        <p><strong>Peso:</strong> {anam.weight}</p>
        <p><strong>Experiência:</strong> {anam.experience}</p>
        <p><strong>Lesões:</strong> {anam.injuries}</p>
        <p><strong>Limitações:</strong> {anam.limitations}</p>
        <p><strong>Disponibilidade:</strong> {anam.availability}</p>
      </div>
    </div>
  );
};

export default StudentAnamnese;
