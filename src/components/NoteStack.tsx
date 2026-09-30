import { useEffect, useRef, useState } from "react";
import { Spring, VelocityTracker, prefersReducedMotion } from "../scripts/spring";

interface NoteStackProps {
  notes: { tag: string; text: string }[];
  next: string;
  counter: string;
  dragHint: string;
  doneTitle: string;
  doneText: string;
  doneCta: string;
  restart: string;
  arrowIcon: string;
  downIcon: string;
}

const restingTilt = [-2.2, 1.6, -1.1, 2.4, -1.8];
const exitDuration = 320;

export default function NoteStack({
  notes,
  next,
  counter,
  dragHint,
  doneTitle,
  doneText,
  doneCta,
  restart,
  arrowIcon,
  downIcon,
}: NoteStackProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, pointerId: -1, startX: 0, x: 0, tracker: new VelocityTracker() });
  const spring = useRef(new Spring(0, { response: 0.42, damping: 0.72 }));
  const frame = useRef(0);
  const done = index >= notes.length;

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function paint(x: number) {
    const el = topRef.current;
    if (!el) return;
    const tilt = restingTilt[index % restingTilt.length] + x * 0.05;
    el.style.transform = `translate3d(${x}px, 0, 0) rotate(${tilt}deg)`;
  }

  function dismiss(direction: number, velocity = 0) {
    const el = topRef.current;
    if (!el || leaving) return;
    cancelAnimationFrame(frame.current);
    setLeaving(true);
    const distance = el.offsetWidth * 1.35 * direction;
    const reduced = prefersReducedMotion();
    const duration = reduced ? 0 : Math.max(180, exitDuration - Math.min(Math.abs(velocity) / 20, 140));
    el.style.transition = `transform ${duration}ms cubic-bezier(0.23, 1, 0.32, 1), opacity ${duration}ms ease`;
    el.style.transform = `translate3d(${distance}px, ${direction * -12}px, 0) rotate(${direction * 18}deg)`;
    el.style.opacity = "0";
    window.setTimeout(() => {
      setIndex((current) => current + 1);
      setLeaving(false);
    }, duration);
  }

  function settleBack(velocity: number) {
    const s = spring.current;
    s.value = drag.current.x;
    s.velocity = velocity;
    s.target = 0;
    let last = performance.now();
    const tick = (now: number) => {
      s.step((now - last) / 1000);
      last = now;
      paint(s.value);
      if (!s.settled) frame.current = requestAnimationFrame(tick);
      else paint(0);
    };
    frame.current = requestAnimationFrame(tick);
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (leaving || drag.current.active) return;
    cancelAnimationFrame(frame.current);
    const el = event.currentTarget;
    el.setPointerCapture(event.pointerId);
    el.style.transition = "none";
    drag.current.active = true;
    drag.current.pointerId = event.pointerId;
    drag.current.startX = event.clientX - spring.current.value;
    drag.current.tracker.reset();
    drag.current.tracker.add(event.clientX, 0);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current.active || event.pointerId !== drag.current.pointerId) return;
    drag.current.x = event.clientX - drag.current.startX;
    drag.current.tracker.add(event.clientX, 0);
    paint(drag.current.x);
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current.active || event.pointerId !== drag.current.pointerId) return;
    drag.current.active = false;
    const velocity = drag.current.tracker.velocity().x;
    const x = drag.current.x;
    const width = event.currentTarget.offsetWidth;
    if (Math.abs(x) > width * 0.32 || Math.abs(velocity) > 650) {
      dismiss(Math.sign(x || velocity), velocity);
    } else {
      settleBack(velocity);
    }
    drag.current.x = 0;
  }

  const visible = notes.slice(index, index + 3);
  const counterText = counter
    .replace("{current}", String(Math.min(index + 1, notes.length)))
    .replace("{total}", String(notes.length));

  return (
    <div className="note-stack">
      <div className="pile" aria-live="polite">
        {done ? (
          <div className="note done-note">
            <p className="done-title">{doneTitle}</p>
            <p className="done-text">{doneText}</p>
            <div className="done-actions">
              <a className="button is-primary" href="#solutions">
                {doneCta}
                <span className="button-chip">
                  <span className="icon nudge-down" aria-hidden="true" dangerouslySetInnerHTML={{ __html: downIcon }} />
                </span>
              </a>
              <button type="button" className="button is-plain" onClick={() => setIndex(0)}>
                {restart}
              </button>
            </div>
          </div>
        ) : (
          visible
            .map((note, offset) => {
              const isTop = offset === 0;
              const depthStyle = isTop
                ? undefined
                : {
                    transform: `translate3d(0, ${offset * 12}px, 0) scale(${1 - offset * 0.045}) rotate(${restingTilt[(index + offset) % restingTilt.length]}deg)`,
                  };
              return (
                <div
                  key={`${index + offset}-${note.tag}`}
                  ref={isTop ? topRef : undefined}
                  className={`note${isTop ? " is-top" : ""}`}
                  style={
                    isTop
                      ? { transform: `rotate(${restingTilt[index % restingTilt.length]}deg)`, zIndex: 3 }
                      : { ...depthStyle, zIndex: 3 - offset }
                  }
                  aria-hidden={!isTop}
                  onPointerDown={isTop ? onPointerDown : undefined}
                  onPointerMove={isTop ? onPointerMove : undefined}
                  onPointerUp={isTop ? onPointerUp : undefined}
                  onPointerCancel={isTop ? onPointerUp : undefined}
                >
                  <span className="note-tag">{note.tag}</span>
                  <p className="note-text">{note.text}</p>
                </div>
              );
            })
            .reverse()
        )}
      </div>

      {!done && (
        <div className="controls">
          <span className="mono-label">{counterText}</span>
          <button type="button" className="button" onClick={() => dismiss(-1)} disabled={leaving}>
            {next}
            <span className="button-chip">
              <span className="icon nudge-right" aria-hidden="true" dangerouslySetInnerHTML={{ __html: arrowIcon }} />
            </span>
          </button>
          <span className="sr-only">{dragHint}</span>
        </div>
      )}

      <style>{`
        .note-stack {
          display: grid;
          gap: 1.5rem;
        }

        .note-stack .pile {
          position: relative;
          display: grid;
          min-height: 19rem;
        }

        .note-stack .note {
          grid-area: 1 / 1;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 2rem;
          min-height: 19rem;
          padding: 1.5rem 1.5rem 1.75rem;
          border-radius: var(--radius-frame);
          background-color: var(--color-paper);
          background-image: repeating-linear-gradient(
            to bottom,
            transparent 0,
            transparent 2.1rem,
            color-mix(in srgb, var(--color-ink) 9%, transparent) 2.1rem,
            color-mix(in srgb, var(--color-ink) 9%, transparent) calc(2.1rem + 1px)
          );
          background-position: 0 3.4rem;
          color: var(--color-ink);
          box-shadow:
            0 1px 0 color-mix(in srgb, var(--color-ink) 6%, transparent),
            0 18px 40px -18px rgb(5 10 12 / 0.55);
          transition: transform 420ms cubic-bezier(0.32, 0.72, 0, 1);
          user-select: none;
          -webkit-user-select: none;
        }

        .note-stack .note.is-top {
          cursor: grab;
          touch-action: pan-y;
          will-change: transform;
        }

        .note-stack .note.is-top:active {
          cursor: grabbing;
        }

        .note-stack .note-tag {
          align-self: flex-start;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--color-ink-muted);
          padding: 0.3rem 0.55rem;
          border: 1px solid color-mix(in srgb, var(--color-ink) 18%, transparent);
          border-radius: 0.3rem;
        }

        .note-stack .note-text {
          margin: 0;
          font-size: var(--text-h3);
          line-height: 1.22;
          letter-spacing: -0.02em;
          font-weight: 620;
          max-width: 22ch;
        }

        .note-stack .done-note {
          justify-content: center;
          animation: note-in 0.5s cubic-bezier(0.23, 1, 0.32, 1) both;
        }

        .note-stack .done-title {
          margin: 0;
          font-size: var(--text-h3);
          font-weight: 720;
          letter-spacing: -0.02em;
        }

        .note-stack .done-text {
          margin: -1.25rem 0 0;
          color: var(--color-ink-muted);
          max-width: 36ch;
        }

        .note-stack .done-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .note-stack .done-note .button:not(.is-primary) {
          --button-fg: var(--color-ink);
          --button-border: color-mix(in srgb, var(--color-ink) 30%, transparent);
        }

        .note-stack .controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .note-stack .controls .button:disabled {
          opacity: 0.6;
          cursor: default;
        }

        .note-stack .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
        }

        @keyframes note-in {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
