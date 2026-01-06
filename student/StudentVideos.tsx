import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Props = {
  student: any;
};

const StudentVideos = ({ student }: Props) => {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    if (student) loadVideos();
  }, [student]);

  const loadVideos = async () => {
    const { data } = await supabase.from("videos").select("*");

    if (!student?.plan) {
      setVideos(data || []);
      return;
    }

    const filtered = (data || []).filter(
      (v) =>
        !v.allowed_plans ||
        v.allowed_plans.length === 0 ||
        v.allowed_plans.includes(student.plan)
    );

    setVideos(filtered);
    console.log("Vídeos liberados:", filtered.length);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Seus treinos</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((v) => (
          <div
            key={v.id}
            className="bg-slate-900 p-4 rounded-xl border border-white/5"
          >
            <iframe
              src={v.video_url}
              className="w-full aspect-video rounded mb-3"
              allowFullScreen
            />

            <strong>{v.title}</strong>
            <p className="text-xs text-slate-400">{v.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentVideos;
