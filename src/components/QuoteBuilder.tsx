import { useId, useMemo, useRef, useState } from "react";
import type { SiteContent } from "../i18n/types";

interface QuoteBuilderProps {
  copy: SiteContent["quote"];
  businessOptions: string[];
  needsOptions: string[];
  whatsappNumber: string;
  email: string;
  glyphs: { whatsapp: string; envelope: string; check: string };
}

function Glyph({ svg }: { svg: string }) {
  return <span className="icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />;
}

export default function QuoteBuilder({ copy, businessOptions, needsOptions, whatsappNumber, email, glyphs }: QuoteBuilderProps) {
  const [business, setBusiness] = useState<string | null>(null);
  const [otherBusiness, setOtherBusiness] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [timing, setTiming] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [showError, setShowError] = useState(false);
  const needsRef = useRef<HTMLFieldSetElement>(null);
  const baseId = useId();
  const errorId = `${baseId}-error`;

  const businessValue = business === copy.otherOption ? otherBusiness.trim() || copy.otherOption : business;

  const lines = useMemo(() => {
    const result: { label: string; value: string; filled: boolean }[] = [
      { label: copy.businessLine, value: businessValue ?? copy.pending, filled: Boolean(businessValue) },
      { label: copy.needsLine, value: needs.length ? needs.join(", ") : copy.pending, filled: needs.length > 0 },
      { label: copy.timingLine, value: timing ?? copy.pending, filled: Boolean(timing) },
    ];
    if (name.trim()) result.push({ label: copy.nameLine, value: name.trim(), filled: true });
    if (details.trim()) result.push({ label: copy.detailsLine, value: details.trim(), filled: true });
    return result;
  }, [businessValue, needs, timing, name, details, copy]);

  const message = [copy.greeting, "", ...lines.map((line) => `${line.label}: ${line.value}`)].join("\n");
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const mailHref = `mailto:${email}?subject=${encodeURIComponent(copy.emailSubject)}&body=${encodeURIComponent(message)}`;

  function toggleNeed(option: string) {
    setShowError(false);
    setNeeds((current) => (current.includes(option) ? current.filter((item) => item !== option) : [...current, option]));
  }

  function guard(event: React.MouseEvent<HTMLAnchorElement>) {
    if (needs.length > 0) return;
    event.preventDefault();
    setShowError(true);
    needsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    needsRef.current?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
  }

  return (
    <div className="quote">
      <form className="quote-form" onSubmit={(event) => event.preventDefault()}>
        <fieldset className="q-group">
          <legend className="q-label">{copy.businessLabel}</legend>
          <div className="q-chips">
            {[...businessOptions, copy.otherOption].map((option) => (
              <button
                key={option}
                type="button"
                className="q-chip"
                aria-pressed={business === option}
                onClick={() => setBusiness(business === option ? null : option)}
              >
                {option}
              </button>
            ))}
          </div>
          {business === copy.otherOption && (
            <label className="q-field q-reveal">
              <span className="q-label">{copy.otherLabel}</span>
              <input value={otherBusiness} maxLength={60} onChange={(event) => setOtherBusiness(event.target.value)} autoFocus />
            </label>
          )}
        </fieldset>

        <fieldset
          className={`q-group${showError ? " has-error" : ""}`}
          ref={needsRef}
          aria-describedby={showError ? errorId : undefined}
        >
          <legend className="q-label">
            {copy.needsLabel} <span className="q-help">{copy.needsHelp}</span>
          </legend>
          <div className="q-chips">
            {needsOptions.map((option) => {
              const selected = needs.includes(option);
              return (
                <button key={option} type="button" className="q-chip is-multi" aria-pressed={selected} onClick={() => toggleNeed(option)}>
                  <span className="q-check" aria-hidden="true">
                    {selected && <Glyph svg={glyphs.check} />}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
          {showError && (
            <p className="q-error" id={errorId} role="alert">
              {copy.error}
            </p>
          )}
        </fieldset>

        <fieldset className="q-group">
          <legend className="q-label">{copy.timingLabel}</legend>
          <div className="q-chips">
            {copy.timingOptions.map((option) => (
              <button
                key={option}
                type="button"
                className="q-chip"
                aria-pressed={timing === option}
                onClick={() => setTiming(timing === option ? null : option)}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="q-pair">
          <label className="q-field">
            <span className="q-label">
              {copy.nameLabel} <span className="q-help">{copy.optional}</span>
            </span>
            <input value={name} maxLength={60} autoComplete="name" onChange={(event) => setName(event.target.value)} />
          </label>
          <label className="q-field">
            <span className="q-label">
              {copy.detailsLabel} <span className="q-help">{copy.optional}</span>
            </span>
            <textarea value={details} maxLength={400} rows={3} onChange={(event) => setDetails(event.target.value)} />
          </label>
        </div>
      </form>

      <aside className="quote-preview" aria-label={copy.previewLabel}>
        <div className="bubble">
          <span className="q-label">{copy.previewLabel}</span>
          <p className="bubble-greeting">{copy.greeting}</p>
          <dl className="bubble-lines">
            {lines.map((line) => (
              <div key={line.label} className={`bubble-line${line.filled ? " is-filled" : ""}`}>
                <dt>{line.label}</dt>
                <dd key={line.value} className="bubble-value">
                  {line.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="quote-actions">
          <a className="button is-primary" href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={guard}>
            {copy.sendWhatsapp}
            <span className="button-chip">
              <Glyph svg={glyphs.whatsapp} />
            </span>
          </a>
          <a className="button" href={mailHref} onClick={guard}>
            {copy.sendEmail}
            <span className="button-chip">
              <Glyph svg={glyphs.envelope} />
            </span>
          </a>
        </div>
      </aside>

      <style>{quoteStyles}</style>
    </div>
  );
}

const quoteStyles = `
.quote {
  display: grid;
  gap: 2.5rem;
}

.quote-form {
  display: grid;
  gap: 2rem;
}

.q-group {
  border: 0;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.85rem;
  min-width: 0;
}

.q-label {
  font-size: 1.05rem;
  font-weight: 620;
  padding: 0;
  color: var(--color-foreground);
}

.q-help {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 400;
  color: var(--color-foreground-muted);
  margin-left: 0.35rem;
}

.q-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.q-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font: inherit;
  font-size: 0.925rem;
  font-weight: 540;
  color: var(--color-foreground);
  background-color: var(--color-background);
  border: 1px solid var(--color-line);
  border-radius: 9999px;
  padding: 0.55rem 0.95rem;
  cursor: pointer;
  transition:
    background-color var(--duration-ui) ease,
    border-color var(--duration-ui) ease,
    color var(--duration-ui) ease,
    transform var(--duration-press) var(--ease-out);
}

.q-chip:active {
  transform: scale(0.96);
}

@media (hover: hover) and (pointer: fine) {
  .q-chip:hover {
    border-color: var(--color-line-strong);
  }
}

.q-chip[aria-pressed="true"] {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-accent-foreground);
}

.q-check {
  display: grid;
  place-items: center;
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  border: 1px solid currentColor;
  opacity: 0.8;
}

.q-check .icon {
  width: 0.75rem;
  height: 0.75rem;
  animation: q-pop 220ms var(--ease-out) both;
}

.has-error .q-chip:not([aria-pressed="true"]) {
  border-color: var(--color-error);
}

.q-error {
  margin: 0;
  color: var(--color-error);
  font-size: 0.9rem;
  font-weight: 560;
}

.q-pair {
  display: grid;
  gap: 1.25rem;
}

.q-field {
  display: grid;
  gap: 0.5rem;
}

.q-field input,
.q-field textarea {
  font: inherit;
  font-size: 1rem;
  color: var(--color-foreground);
  background-color: var(--color-background);
  border: 1px solid var(--color-line-strong);
  border-radius: var(--radius-base);
  padding: 0.75rem 0.9rem;
  width: 100%;
  resize: vertical;
}

.q-field input:focus-visible,
.q-field textarea:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 1px;
  border-color: var(--color-accent);
}

.q-reveal {
  animation: q-in 280ms var(--ease-out) both;
}

.quote-preview {
  display: grid;
  gap: 1rem;
  align-content: start;
}

.bubble {
  display: grid;
  gap: 0.9rem;
  padding: 1.35rem 1.4rem 1.5rem;
  border-radius: var(--radius-frame) var(--radius-frame) var(--radius-frame) 0.2rem;
  background-color: var(--color-paper);
  color: var(--color-ink);
  box-shadow: 0 24px 50px -28px rgb(4 10 12 / 0.6);
}

.bubble .q-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--color-ink-muted);
}

.bubble-greeting {
  margin: 0;
  font-weight: 620;
}

.bubble-lines {
  display: grid;
  gap: 0.55rem;
  margin: 0;
}

.bubble-line {
  display: grid;
  grid-template-columns: 5.5rem 1fr;
  gap: 0.75rem;
  font-size: 0.95rem;
}

.bubble-line dt {
  color: var(--color-ink-muted);
}

.bubble-line dd {
  margin: 0;
  color: var(--color-ink-muted);
  font-style: italic;
  overflow-wrap: anywhere;
}

.bubble-line.is-filled dd {
  color: var(--color-ink);
  font-style: normal;
  font-weight: 560;
}

.bubble-value {
  animation: q-type 360ms var(--ease-out) both;
}

.quote-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

@keyframes q-in {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes q-pop {
  from {
    transform: scale(0.4);
  }
  to {
    transform: none;
  }
}

@keyframes q-type {
  from {
    opacity: 0;
    filter: blur(3px);
    clip-path: inset(0 100% 0 0);
  }
  to {
    opacity: 1;
    filter: none;
    clip-path: inset(0 0 0 0);
  }
}

@media (min-width: 40rem) {
  .q-pair {
    grid-template-columns: 1fr 1.4fr;
  }
}

@media (min-width: 64rem) {
  .quote {
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.85fr);
    gap: 4rem;
    align-items: start;
  }

  .quote-preview {
    position: sticky;
    top: 6rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .q-reveal,
  .q-check .icon,
  .bubble-value {
    animation: none;
  }
}
`;
