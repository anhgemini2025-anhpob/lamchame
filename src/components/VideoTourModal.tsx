import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, SkipBack, SkipForward, ExternalLink, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { AppItem, VideoScene } from '../data/appsData';
import { openExternalApp } from '../utils/navigation';

interface VideoTourModalProps {
  app: AppItem | null;
  onClose: () => void;
  onSelectApp: (app: AppItem) => void;
  allApps: AppItem[];
}

let globalTourAudio: HTMLAudioElement | null = null;

function getGlobalTourAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (!globalTourAudio) {
    globalTourAudio = new Audio();
    globalTourAudio.preload = 'auto';
  }
  return globalTourAudio;
}

export const VideoTourModal: React.FC<VideoTourModalProps> = ({
  app,
  onClose,
  onSelectApp,
  allApps
}) => {
  const [selectedSceneIdx, setSelectedSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [videoSpeed, setVideoSpeed] = useState<number>(1.25);
  const [progress, setProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Reset when app changes
  useEffect(() => {
    setSelectedSceneIdx(0);
    setProgress(0);
    setIsPlaying(true);
    setIsAudioPlaying(false);
  }, [app?.id]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Audio Voiceover Synchronization
  useEffect(() => {
    if (!app) {
      const audio = getGlobalTourAudio();
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setIsAudioPlaying(false);
      return;
    }

    const audio = getGlobalTourAudio();
    if (!audio) return;

    const audioUrl = `/apps/${app.id}/audio-scene-${selectedSceneIdx + 1}.mp3?v=20261001`;

    if (!audio.src.includes(audioUrl)) {
      audio.pause();
      audio.src = audioUrl;
      audio.load();
    }

    audio.playbackRate = videoSpeed;
    audio.muted = isMuted;
    audio.volume = 1.0;

    let isSubscribed = true;

    const onPlay = () => {
      if (isSubscribed) setIsAudioPlaying(true);
    };
    const onPause = () => {
      if (isSubscribed) setIsAudioPlaying(false);
    };
    const onError = () => {
      if (isSubscribed) setIsAudioPlaying(false);
    };

    const onTimeUpdate = () => {
      if (isSubscribed && audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
        const pct = (audio.currentTime / audio.duration) * 100;
        setProgress(Math.min(100, Math.max(0, pct)));
      }
    };

    const onEnded = () => {
      if (!isSubscribed) return;
      setIsAudioPlaying(false);
      const totalScenes = app.videoScenes.length;
      if (selectedSceneIdx < totalScenes - 1) {
        setSelectedSceneIdx((prev) => prev + 1);
        setProgress(0);
      } else {
        setSelectedSceneIdx(0);
        setProgress(0);
        setIsPlaying(false);
      }
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    if (isPlaying && !isMuted) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (isSubscribed) setIsAudioPlaying(true);
          })
          .catch(() => {
            if (isSubscribed) setIsAudioPlaying(false);
          });
      }
    } else {
      audio.pause();
    }

    return () => {
      isSubscribed = false;
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [app, selectedSceneIdx, isPlaying, isMuted, videoSpeed]);

  if (!app) return null;

  const currentScene: VideoScene = app.videoScenes[selectedSceneIdx] || app.videoScenes[0];
  const currentImage = app.detailImages[selectedSceneIdx] || app.coverImage;

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevScene = () => {
    if (selectedSceneIdx > 0) {
      setSelectedSceneIdx(selectedSceneIdx - 1);
      setProgress(0);
    }
  };

  const handleNextScene = () => {
    if (selectedSceneIdx < app.videoScenes.length - 1) {
      setSelectedSceneIdx(selectedSceneIdx + 1);
      setProgress(0);
    }
  };

  const handleRestart = () => {
    setSelectedSceneIdx(0);
    setProgress(0);
    setIsPlaying(true);
    const audio = getGlobalTourAudio();
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  };

  const currentAppIdx = allApps.findIndex((a) => a.id === app.id);
  const prevApp = currentAppIdx > 0 ? allApps[currentAppIdx - 1] : allApps[allApps.length - 1];
  const nextApp = currentAppIdx < allApps.length - 1 ? allApps[currentAppIdx + 1] : allApps[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-5xl bg-[#081321] border border-amber-400/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0A192F] border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-900 border border-amber-400/40 p-1 shrink-0">
              <img src={app.logoUrl} alt={app.name} className="w-full h-full object-contain rounded" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono uppercase font-black px-1.5 py-0.2 rounded border ${app.theme.badgeBg} ${app.theme.badgeText} ${app.theme.badgeBorder}`}>
                  App {app.number} • {app.ageRange}
                </span>
                <span className="text-xs sm:text-sm font-black text-white truncate max-w-[200px] sm:max-w-md">
                  {app.name}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next App Switcher */}
            <div className="hidden sm:flex items-center gap-1 bg-[#07111E] rounded-xl p-0.5 border border-slate-700">
              <button
                onClick={() => onSelectApp(prevApp)}
                className="px-2 py-1 text-xs text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
                title={`Chuyển sang ${prevApp.name}`}
              >
                App {prevApp.number}
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => onSelectApp(nextApp)}
                className="px-2 py-1 text-xs text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
                title={`Chuyển sang ${nextApp.name}`}
              >
                App {nextApp.number}
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Main Stage */}
        <div className="relative flex-1 bg-black flex flex-col justify-center items-center overflow-hidden min-h-[300px] sm:min-h-[420px]">
          
          {/* Main Visual Image for Current Scene */}
          <div className="relative w-full h-full max-h-[55vh] flex items-center justify-center p-2">
            <img
              src={currentImage}
              alt={currentScene.title}
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl border border-slate-800"
            />

            {/* Top Bar on Image */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-mono font-bold">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-amber-400 animate-ping' : 'bg-slate-500'}`} />
                <span>CẢNH {selectedSceneIdx + 1} / {app.videoScenes.length}</span>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-slate-700 text-slate-300 text-xs font-mono">
                {currentScene.time}
              </div>
            </div>
          </div>

          {/* Subtitles Overlay Box */}
          <div className="w-full bg-[#07111E]/95 border-t border-slate-800 px-4 py-3 sm:px-6">
            <div className="max-w-4xl mx-auto space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-amber-400/20 text-amber-300 text-[11px] font-mono font-bold flex items-center justify-center">
                  {selectedSceneIdx + 1}
                </span>
                <h4 className="text-xs sm:text-sm font-black text-amber-300">
                  {currentScene.title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                {currentScene.description}
              </p>
            </div>
          </div>

        </div>

        {/* Video Player Progress & Control Bar */}
        <div className="bg-[#0A192F] border-t border-slate-800 p-3 sm:p-4 space-y-3">
          
          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-slate-800 rounded-full overflow-hidden cursor-pointer">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 transition-all duration-150 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            
            {/* Left Playback Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleTogglePlay}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-amber-400 hover:bg-yellow-300 text-slate-950 font-black flex items-center gap-1.5 transition-all shadow-md shadow-amber-400/30 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
                <span className="hidden sm:inline">{isPlaying ? 'Tạm dừng' : 'Tiếp tục'}</span>
              </button>

              <button
                onClick={handlePrevScene}
                disabled={selectedSceneIdx === 0}
                className="p-2 rounded-xl bg-[#07111E] border border-slate-700 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                title="Cảnh trước"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={handleNextScene}
                disabled={selectedSceneIdx === app.videoScenes.length - 1}
                className="p-2 rounded-xl bg-[#07111E] border border-slate-700 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                title="Cảnh tiếp theo"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                onClick={handleRestart}
                className="p-2 rounded-xl bg-[#07111E] border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Phát lại từ đầu"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Middle Audio & Speed Controls */}
            <div className="flex items-center gap-2">
              {/* Mute toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-xl border transition-colors flex items-center gap-1 cursor-pointer ${
                  isMuted
                    ? 'bg-rose-500/10 border-rose-500/40 text-rose-300'
                    : 'bg-[#07111E] border-slate-700 text-amber-300'
                }`}
                title={isMuted ? 'Bật thuyết minh' : 'Tắt thuyết minh'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="text-[11px] hidden md:inline">{isMuted ? 'Đã tắt tiếng' : 'Thuyết minh'}</span>
              </button>

              {/* Speed pills */}
              <div className="flex items-center bg-[#07111E] rounded-xl border border-slate-700 p-0.5 text-[11px] font-mono">
                {[1.0, 1.25, 1.5].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setVideoSpeed(spd)}
                    className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                      videoSpeed === spd
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            {/* Right Action: Open App Directly */}
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => openExternalApp(app.url, e)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs hover:opacity-95 cursor-pointer shadow-md"
            >
              <span>Trải nghiệm App {app.number}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
            </a>

          </div>

          {/* Quick Scene Selector Dots / Pills */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {app.videoScenes.map((scene, sIdx) => (
              <button
                key={sIdx}
                onClick={() => {
                  setSelectedSceneIdx(sIdx);
                  setProgress(0);
                  setIsPlaying(true);
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                  selectedSceneIdx === sIdx
                    ? 'bg-amber-400 text-slate-950 font-extrabold shadow-sm'
                    : 'bg-[#07111E] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Cảnh {sIdx + 1}
              </button>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
