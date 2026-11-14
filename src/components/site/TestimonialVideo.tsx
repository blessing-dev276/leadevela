import { useRef, useState } from "react";
import { Play } from "lucide-react";

const SRC = "/testimonial/leadvela-testimonial-gia.mp4";
const POSTER = "/testimonial/leadvela-testimonial-gia-poster.jpg";
const CAPTIONS = "/testimonial/leadvela-testimonial-gia.vtt";

/**
 * Portrait (9:16) client testimonial video.
 * Shows the poster frame until the visitor presses play, then hands over to
 * the native controls. The video is never autoplayed and never muted-by-default,
 * so the first thing a visitor hears is the client's own words.
 */
export function TestimonialVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    void video.play();
  };

  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-80 overflow-hidden rounded-[1.5rem] bg-navy shadow-lift">
      <video
        ref={videoRef}
        className="size-full object-cover"
        src={SRC}
        poster={POSTER}
        controls={started}
        playsInline
        preload="metadata"
        onPlay={() => setStarted(true)}
      >
        <track kind="captions" src={CAPTIONS} srcLang="en" label="English" />
      </video>

      {!started && (
        <button
          type="button"
          onClick={start}
          className="group absolute inset-0 grid place-items-center bg-navy/30 text-navy-foreground transition-colors hover:bg-navy/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span className="grid size-16 place-items-center rounded-full border border-white/30 bg-white/15 backdrop-blur transition-transform group-hover:scale-105 sm:size-20">
            <Play className="ml-1 size-6 fill-current sm:size-8" aria-hidden="true" />
          </span>
          <span className="sr-only">Play Gia&rsquo;s video testimonial</span>
        </button>
      )}
    </div>
  );
}
