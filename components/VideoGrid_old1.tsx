
import React, { useState } from 'react';
import { VIDEOS } from "../constants";
import { useVideos } from "../context/VideoContext";
import { ExerciseVideo } from '../types';


const VideoGrid: React.FC = () => {
  const [filter, setFilter] = useState<string>('Todos');
  const [selectedVideo, setSelectedVideo] = useState<ExerciseVideo | null>(null);

  const categories = ['Todos', 'Alongamento', 'funcional', 'Mat Pilates'];

  const filteredVideos = filter === 'Todos' 
    ? VIDEOS 
    : VIDEOS.filter(v => v.category === filter);

  return (
    <section id="videos" className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-oswald font-bold mb-8 text-white border-l-4 border-pink-500 pl-4 uppercase">
          Instruções em Vídeo
        </h2>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === cat 
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div 
              key={video.id} 
              className="bg-slate-800/40 backdrop-blur-sm rounded-2xl overflow-hidden group cursor-pointer transition-transform duration-300 hover:-translate-y-2 border border-white/5 hover:border-pink-500/50"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative aspect-video">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center text-white shadow-xl">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                   </div>
                </div>
                <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded font-mono border border-white/10">
                  {video.duration}
                </span>
              </div>
              <div className="p-6">
                <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest bg-pink-500/10 px-2 py-1 rounded">{video.category}</span>
                <h3 className="text-xl font-bold mt-3 text-white">{video.title}</h3>
                <p className="text-slate-400 mt-2 text-sm line-clamp-2 leading-relaxed">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Player */}
        {selectedVideo && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-black/50 hover:bg-pink-600 text-white rounded-full transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <iframe 
                className="w-full h-full" 
                src={selectedVideo.videoUrl} 
                title={selectedVideo.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
              <div className="p-6 bg-slate-900 absolute bottom-0 left-0 right-0 border-t border-white/10">
                <h4 className="text-2xl font-bold text-white">{selectedVideo.title}</h4>
                <p className="text-slate-400 mt-1">{selectedVideo.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoGrid;
