import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import StudentVideos from "./StudentVideos";

type Student = {
  id: string;
  name: string;
  email: string;
  plan: string | null;
};

const StudentArea = () => {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;

    const { data } = await supabase
      .from("students")
      .select("*")
      .eq("email", auth.user.email)
      .single();

    setStudent(data);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto p-8">

        {/* TOPO */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">
              Olá, <span className="text-pink-500">{student?.name}</span>
            </h1>
            <p className="text-sm text-slate-400">
              Plano: {student?.plan || "Sem plano"}
            </p>
          </div>

          <button
            onClick={async () => await supabase.auth.signOut()}
            className="bg-pink-600 px-5 py-2 rounded-full text-sm font-bold hover:bg-pink-500"
          >
            Sair
          </button>
        </div>

        <StudentVideos student={student} />
      </div>
    </div>
  );
};

export default StudentArea;
