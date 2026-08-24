import React, { useEffect, useRef, useState } from 'react';
import { getCleanYoutubeId } from '../data/playlist';

export default function YouTubePlayer({
  youtubeId,
  isPlaying,
  volume = 75,
  isMuted = false,
  onPlay,
  onPause,
  onEnd,
  onError
}) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [isApiReady, setIsApiReady] = useState(false);
  const [playerError, setPlayerError] = useState(null);

  const cleanId = getCleanYoutubeId(youtubeId);

  // 1. Load YouTube IFrame API script dynamically
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setIsApiReady(true);
      return;
    }

    // Check if script element is already added
    const existingScript = document.getElementById('youtube-iframe-api');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'youtube-iframe-api';
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    }

    // Set up global callback
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (previousCallback) previousCallback();
      setIsApiReady(true);
    };

    // Polling fallback check in case callback already fired
    const interval = setInterval(() => {
      if (window.YT && window.YT.Player) {
        setIsApiReady(true);
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // 2. Initialize or Update YT.Player when API is ready and cleanId changes
  useEffect(() => {
    if (!isApiReady || !cleanId || !containerRef.current) return;

    // Reset previous error
    setPlayerError(null);

    if (!playerRef.current) {
      // Create new YT.Player instance
      playerRef.current = new window.YT.Player(containerRef.current, {
        height: '100%',
        width: '100%',
        videoId: cleanId,
        playerVars: {
          autoplay: isPlaying ? 1 : 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(isMuted ? 0 : volume);
            if (isMuted) event.target.mute();
            if (isPlaying) {
              event.target.playVideo();
            }
          },
          onStateChange: (event) => {
            // YT.PlayerState: ENDED (0), PLAYING (1), PAUSED (2), BUFFERING (3)
            if (event.data === window.YT.PlayerState.PLAYING) {
              if (onPlay) onPlay();
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              if (onPause) onPause();
            } else if (event.data === window.YT.PlayerState.ENDED) {
              if (onEnd) onEnd();
            }
          },
          onError: (event) => {
            // Error codes: 2 (invalid param), 5 (HTML5 error), 100 (not found), 101/150 (embedding disabled)
            console.warn('YouTube Player Error code:', event.data);
            setPlayerError('Song unavailable or non-embeddable');
            if (onError) onError(event.data);
          }
        }
      });
    } else {
      // Load new video if player already exists
      try {
        if (typeof playerRef.current.loadVideoById === 'function') {
          playerRef.current.loadVideoById(cleanId);
          if (!isPlaying) {
            playerRef.current.pauseVideo();
          }
        }
      } catch (err) {
        console.warn('YouTube player load error:', err);
      }
    }
  }, [isApiReady, cleanId]);

  // 3. Sync Play / Pause state changes
  useEffect(() => {
    if (!playerRef.current || typeof playerRef.current.playVideo !== 'function') return;

    try {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } catch (e) {
      console.warn('Error syncing play/pause state:', e);
    }
  }, [isPlaying]);

  // 4. Sync Volume & Mute changes
  useEffect(() => {
    if (!playerRef.current || typeof playerRef.current.setVolume !== 'function') return;

    try {
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
        playerRef.current.setVolume(volume);
      }
    } catch (e) {
      console.warn('Error syncing volume:', e);
    }
  }, [volume, isMuted]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '140px',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#0a0704',
        border: '1px solid #3d2817'
      }}
    >
      {/* Target element for YT.Player IFrame */}
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {/* Error Fallback Banner */}
      {playerError && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(24, 15, 10, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            textAlign: 'center',
            zIndex: 10
          }}
        >
          <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>
            ⚠️ {playerError}
          </span>
          <span style={{ color: '#a39580', fontSize: '0.75rem' }}>
            Select Next / Previous to continue listening
          </span>
        </div>
      )}
    </div>
  );
}
