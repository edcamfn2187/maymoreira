import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import StudentLogin from "./StudentLogin";
import StudentArea from "./StudentArea";

const StudentGate = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Carregando...
      </div>
    );
  }

  return session ? <StudentArea /> : <StudentLogin />;
};

export default StudentGate;
