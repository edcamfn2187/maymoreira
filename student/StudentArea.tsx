import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import StudentVideos from "./StudentVideos";
import StudentAnamnese from "./StudentAnamnese";

type Student = {
  id: string;
  name: string;
  email: string;
  plan: string | null;
};

const StudentArea = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [hasAnamnese, setHasAnamnese] = useState(false);
  const [videosCount, setVideosCount] = useState(0);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;

    const { data: studentData } = await supabase
      .from("students")
      .select("*")
      .eq("email", auth.user.email)
      .single();

    setStudent(studentData);

    if (studentData) {
      // verifica se já enviou anamnese
      const { data: anam } = await supabase
        .from("anamneses")
        .select("id")
        .eq("email", studentData.email)
        .limit(1);

      setHasAnamnese((anam?.length || 0) > 0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto p-8">

        {/* TOPO */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold">
              Olá, <span className="text-pink-500">{student?.name}</span>
            </h1>
            <p className="text-sm text-slate-400">
              Plano: {student?.plan || "Em análise"}
            </p>
          </div>

          <button
            onClick={async () => await supabase.auth.signOut()}
            className="bg-pink-600 px-5 py-2 rounded-full text-sm font-bold hover:bg-pink-500"
          >
            Sair
          </button>
        </div>

        {/* DASHBOARD */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">

          {/* CARD 1 */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-white/5">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
              Status da anamnese
            </p>

            {hasAnamnese ? (
              <p className="text-green-400 font-bold text-lg">✔ Enviada</p>
            ) : (
              <p className="text-yellow-400 font-bold text-lg">
                ⏳ Pendente
              </p>
            )}
          </div>

          {/* CARD 2 */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-white/5">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
              Seu plano
            </p>

            <p className="text-pink-500 font-bold text-lg">
              {student?.plan || "Em definição"}
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-white/5">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
              Acesso liberado
            </p>

            <p className="text-white font-bold text-lg">
              Treinos disponíveis abaixo 👇
            </p>
          </div>
        </div>

        {student && (
          <div className="mb-12">
            <StudentAnamnese email={student.email} />
          </div>
        )}

        {/* ÁREA DE TREINOS */}
        <StudentVideos student={student} />
      </div>
    </div>
  );
};

export default StudentArea;
