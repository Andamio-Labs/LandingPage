import { useLayoutEffect, useMemo, useRef, useState } from "react";
import type { SolutionId, SolutionPreviews } from "../i18n/types";
import { boxGeometry, logoBoxes, markBounds } from "../data/logo";

interface SolutionItem {
  id: SolutionId;
  title: string;
  benefit: string;
  icon: string;
}

interface SolutionExplorerProps {
  tabsLabel: string;
  items: SolutionItem[];
  previews: SolutionPreviews;
  glyphs: { plus: string; minus: string; check: string; mapPin: string; chat: string };
}

function Glyph({ svg, className = "" }: { svg: string; className?: string }) {
  return <span className={`icon ${className}`} aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />;
}

function MiniMark() {
  return (
    <svg viewBox={`${markBounds.x} ${markBounds.y} ${markBounds.width} ${markBounds.height}`} aria-hidden="true">
      {logoBoxes.filter((box) => box.id === "top" || box.id === "left" || box.id === "right").map((box) => {
        const geometry = boxGeometry(box);
        const stroke = box.tone === "teal" ? "var(--logo-teal)" : "var(--logo-navy)";
        if (box.frameOnly) {
          return (
            <g key={box.id} fill="none" strokeWidth={40} strokeLinejoin="round" strokeLinecap="round">
              <polyline points={geometry.frameLeft} stroke="var(--logo-teal)" />
              <polyline points={geometry.frameRight} stroke="var(--logo-navy)" />
            </g>
          );
        }
        return (
          <g key={box.id} fill="none" stroke={stroke} strokeWidth={40} strokeLinejoin="round" strokeLinecap="round">
            <polygon points={geometry.silhouette} fill={box.solid ? "var(--logo-fill)" : "none"} />
            <polyline points={geometry.inner} />
            <polyline points={geometry.spine} />
          </g>
        );
      })}
    </svg>
  );
}

function slugify(value: string) {
  const slug = value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 24);
  return `${slug || "tunegocio"}.com`;
}

function WebPreview({ copy, glyphs }: { copy: SolutionPreviews["web"]; glyphs: SolutionExplorerProps["glyphs"] }) {
  const [name, setName] = useState(copy.defaultName);
  return (
    <div className="preview-stack">
      <label className="field">
        <span className="field-label">{copy.inputLabel}</span>
        <input value={name} maxLength={40} onChange={(event) => setName(event.target.value)} />
      </label>
      <div className="result">
        <span className="result-url">{slugify(name)}</span>
        <span className="result-name">{name.trim() || copy.defaultName}</span>
        <span className="result-status">
          <span className="status-dot" aria-hidden="true"></span>
          {copy.status}
        </span>
        <div className="result-actions">
          <span className="chip-static">
            <Glyph svg={glyphs.mapPin} />
            {copy.directions}
          </span>
          <span className="chip-static">
            <Glyph svg={glyphs.chat} />
            {copy.message}
          </span>
        </div>
      </div>
      <p className="preview-caption">{copy.caption}</p>
    </div>
  );
}

const bookingTimes = ["9:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

function seededSpots(day: number, time: number) {
  const seed = (day * 7 + time * 5 + 2) % 8;
  if (seed === 0 || seed === 5) return 0;
  return (seed % 4) + 1;
}

function BookingPreview({ copy, glyphs }: { copy: SolutionPreviews["booking"]; glyphs: SolutionExplorerProps["glyphs"] }) {
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const spots = useMemo(() => bookingTimes.map((_, time) => seededSpots(day, time)), [day]);

  return (
    <div className="preview-stack">
      <fieldset className="group">
        <legend className="field-label">{copy.dayLabel}</legend>
        <div className="chip-row">
          {copy.days.map((label, index) => (
            <button
              key={label}
              type="button"
              className="chip"
              aria-pressed={index === day}
              onClick={() => {
                setDay(index);
                setSlot(null);
                setConfirmed(false);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="group">
        <legend className="field-label">{copy.timeLabel}</legend>
        <div className="slot-grid">
          {bookingTimes.map((time, index) => {
            const count = spots[index];
            const full = count === 0;
            return (
              <button
                key={`${day}-${time}`}
                type="button"
                className="slot"
                disabled={full}
                aria-pressed={index === slot}
                onClick={() => {
                  setSlot(index);
                  setConfirmed(false);
                }}
              >
                <span className="slot-time">{time}</span>
                <span className="slot-meta">{full ? copy.full : `${count} ${count === 1 ? copy.slotsOne : copy.slotsMany}`}</span>
              </button>
            );
          })}
        </div>
      </fieldset>
      <div className="preview-footer">
        {confirmed ? (
          <p className="success" role="status">
            <Glyph svg={glyphs.check} />
            {copy.confirmed}
          </p>
        ) : (
          <button type="button" className="button is-primary is-plain" disabled={slot === null} onClick={() => setConfirmed(true)}>
            {copy.confirm}
          </button>
        )}
      </div>
    </div>
  );
}

function AppointmentsPreview({ copy, glyphs }: { copy: SolutionPreviews["appointments"]; glyphs: SolutionExplorerProps["glyphs"] }) {
  const [service, setService] = useState(0);
  const [booked, setBooked] = useState(false);
  const current = copy.services[service];

  return (
    <div className="preview-stack">
      <fieldset className="group">
        <legend className="field-label">{copy.servicesLabel}</legend>
        <div className="segmented">
          {copy.services.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-pressed={index === service}
              onClick={() => {
                setService(index);
                setBooked(false);
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </fieldset>
      <dl className="facts">
        <div>
          <dt className="field-label">{copy.nextLabel}</dt>
          <dd key={`next-${service}`} className="fact-value swap">
            {current.next}
          </dd>
        </div>
        <div>
          <dt className="field-label">{copy.durationLabel}</dt>
          <dd key={`duration-${service}`} className="fact-value swap">
            {current.minutes} {copy.minutesUnit}
          </dd>
        </div>
      </dl>
      <div className="preview-footer">
        {booked ? (
          <p className="success" role="status">
            <Glyph svg={glyphs.check} />
            {copy.booked}
          </p>
        ) : (
          <button type="button" className="button is-primary is-plain" onClick={() => setBooked(true)}>
            {copy.book}
          </button>
        )}
      </div>
    </div>
  );
}

function OrdersPreview({ copy, glyphs }: { copy: SolutionPreviews["orders"]; glyphs: SolutionExplorerProps["glyphs"] }) {
  const [quantities, setQuantities] = useState<number[]>(() => copy.items.map((_, index) => (index === 0 ? 1 : 0)));
  const [sent, setSent] = useState(false);
  const total = quantities.reduce((sum, value) => sum + value, 0);

  function change(index: number, delta: number) {
    setSent(false);
    setQuantities((current) => current.map((value, i) => (i === index ? Math.max(0, Math.min(9, value + delta)) : value)));
  }

  return (
    <div className="preview-stack">
      <ul className="rows">
        {copy.items.map((item, index) => (
          <li key={item} className="row">
            <span className="row-name">{item}</span>
            <span className="stepper">
              <button type="button" aria-label={`${copy.remove} ${item}`} disabled={quantities[index] === 0} onClick={() => change(index, -1)}>
                <Glyph svg={glyphs.minus} />
              </button>
              <span key={`${index}-${quantities[index]}`} className="stepper-value pop" aria-live="polite">
                {quantities[index]}
              </span>
              <button type="button" aria-label={`${copy.add} ${item}`} onClick={() => change(index, 1)}>
                <Glyph svg={glyphs.plus} />
              </button>
            </span>
          </li>
        ))}
      </ul>
      <div className="preview-footer split">
        <span className="field-label">
          {total === 0 ? copy.empty : total === 1 ? copy.countOne : copy.countMany.replace("{n}", String(total))}
        </span>
        {sent ? (
          <p className="success" role="status">
            <Glyph svg={glyphs.check} />
            {copy.sent}
          </p>
        ) : (
          <button type="button" className="button is-primary is-plain" disabled={total === 0} onClick={() => setSent(true)}>
            {copy.send}
          </button>
        )}
      </div>
    </div>
  );
}

function InventoryPreview({ copy, glyphs }: { copy: SolutionPreviews["inventory"]; glyphs: SolutionExplorerProps["glyphs"] }) {
  const initial = copy.products.map((product) => product.stock);
  const [stock, setStock] = useState(initial);
  const max = Math.max(...initial);

  return (
    <div className="preview-stack">
      <ul className="rows">
        {copy.products.map((product, index) => {
          const count = stock[index];
          const status = count === 0 ? copy.out : count <= 2 ? copy.low : null;
          return (
            <li key={product.name} className="row inventory-row">
              <div className="row-main">
                <span className="row-name">{product.name}</span>
                <span className="row-meta">
                  <span key={count} className="pop">{count}</span> {copy.unit}
                </span>
                <span className="level" style={{ transform: `scaleX(${count / max})` }} aria-hidden="true"></span>
                {status && <span className={`row-status${count === 0 ? " is-out" : ""}`}>{status}</span>}
              </div>
              {count === 0 ? (
                <button
                  type="button"
                  className="mini-button"
                  onClick={() => setStock((current) => current.map((value, i) => (i === index ? initial[index] : value)))}
                >
                  {copy.restock}
                </button>
              ) : (
                <button
                  type="button"
                  className="mini-button"
                  onClick={() => setStock((current) => current.map((value, i) => (i === index ? value - 1 : value)))}
                >
                  <Glyph svg={glyphs.minus} />
                  {copy.sell}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PwaPreview({ copy, glyphs }: { copy: SolutionPreviews["pwa"]; glyphs: SolutionExplorerProps["glyphs"] }) {
  const [installed, setInstalled] = useState(false);
  return (
    <div className="pwa">
      <div className="phone" aria-hidden="true">
        <div className="phone-grid">
          <span className={`app-slot${installed ? " is-installed" : ""}`}>
            {installed && (
              <span className="app-icon">
                <MiniMark />
              </span>
            )}
            {installed && <span className="app-name">{copy.appName}</span>}
          </span>
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} className="app-slot is-ghost"></span>
          ))}
        </div>
      </div>
      <div className="pwa-copy">
        {installed ? (
          <>
            <p className="success" role="status">
              <Glyph svg={glyphs.check} />
              {copy.installed}
            </p>
            <button type="button" className="button is-plain" onClick={() => setInstalled(false)}>
              {copy.reset}
            </button>
          </>
        ) : (
          <button type="button" className="button is-primary is-plain" onClick={() => setInstalled(true)}>
            {copy.install}
          </button>
        )}
      </div>
    </div>
  );
}

export default function SolutionExplorer({ tabsLabel, items, previews, glyphs }: SolutionExplorerProps) {
  const [active, setActive] = useState<SolutionId>(items[0].id);
  const listRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const activeItem = items.find((item) => item.id === active) ?? items[0];

  useLayoutEffect(() => {
    const tab = tabRefs.current[active];
    const indicator = indicatorRef.current;
    const list = listRef.current;
    if (!tab || !indicator || !list) return;
    const place = () => {
      indicator.style.width = `${tab.offsetWidth}px`;
      indicator.style.height = `${tab.offsetHeight}px`;
      indicator.style.transform = `translate(${tab.offsetLeft}px, ${tab.offsetTop}px)`;
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const index = items.findIndex((item) => item.id === active);
    let nextIndex = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % items.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (index - 1 + items.length) % items.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = items.length - 1;
    const nextId = items[nextIndex].id;
    setActive(nextId);
    tabRefs.current[nextId]?.focus();
    tabRefs.current[nextId]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  return (
    <div className="explorer">
      <div className="tabs" role="tablist" aria-label={tabsLabel} ref={listRef} onKeyDown={onKeyDown}>
        <span className="tab-indicator" ref={indicatorRef} aria-hidden="true"></span>
        {items.map((item) => (
          <button
            key={item.id}
            ref={(el) => {
              tabRefs.current[item.id] = el;
            }}
            id={`tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={item.id === active}
            aria-controls={`panel-${item.id}`}
            tabIndex={item.id === active ? 0 : -1}
            className="tab"
            onClick={() => setActive(item.id)}
          >
            <Glyph svg={item.icon} className="tab-icon" />
            <span className="tab-title">{item.title}</span>
          </button>
        ))}
      </div>

      <div className="panel" role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}>
        <div key={active} className="panel-inner">
          <p className="benefit">{activeItem.benefit}</p>
          <div className="frame">
            {active === "web" && <WebPreview copy={previews.web} glyphs={glyphs} />}
            {active === "booking" && <BookingPreview copy={previews.booking} glyphs={glyphs} />}
            {active === "appointments" && <AppointmentsPreview copy={previews.appointments} glyphs={glyphs} />}
            {active === "orders" && <OrdersPreview copy={previews.orders} glyphs={glyphs} />}
            {active === "inventory" && <InventoryPreview copy={previews.inventory} glyphs={glyphs} />}
            {active === "pwa" && <PwaPreview copy={previews.pwa} glyphs={glyphs} />}
          </div>
        </div>
      </div>

      <style>{explorerStyles}</style>
    </div>
  );
}

const explorerStyles = `
.explorer {
  display: grid;
  gap: 1.5rem;
}

.explorer > * {
  min-width: 0;
}

.explorer .tabs {
  position: relative;
  display: flex;
  gap: 0.25rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  margin-inline: calc(var(--spacing-gutter) * -1);
  padding: 0.25rem var(--spacing-gutter);
}

.explorer .tabs::-webkit-scrollbar {
  display: none;
}

.explorer .tab-indicator {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: var(--radius-base);
  background-color: var(--color-surface-high);
  border: 1px solid var(--color-line);
  transition:
    transform 320ms var(--ease-out),
    width 320ms var(--ease-out),
    height 320ms var(--ease-out);
  pointer-events: none;
}

.explorer .tab {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
  scroll-snap-align: start;
  padding: 0.7rem 0.95rem;
  border: 0;
  border-radius: var(--radius-base);
  background: transparent;
  color: var(--color-foreground-muted);
  font: inherit;
  font-size: 0.975rem;
  font-weight: 560;
  text-align: left;
  cursor: pointer;
  transition: color var(--duration-ui) ease, transform var(--duration-press) var(--ease-out);
}

.explorer .tab:active {
  transform: scale(0.98);
}

.explorer .tab[aria-selected="true"] {
  color: var(--color-foreground);
}

.explorer .tab-icon {
  width: 1.2rem;
  height: 1.2rem;
}

.explorer .tab[aria-selected="true"] .tab-icon {
  color: var(--color-accent);
}

.explorer .panel-inner {
  display: grid;
  gap: 1.25rem;
  animation: panel-in 380ms var(--ease-out) both;
}

.explorer .benefit {
  margin: 0;
  font-size: var(--text-lead);
  line-height: 1.4;
  max-width: 40ch;
}

.explorer .frame {
  border-radius: var(--radius-frame);
  border: 1px solid var(--color-line);
  background-color: var(--color-surface);
  padding: clamp(1.1rem, 0.8rem + 1.5vw, 1.75rem);
  min-height: 21rem;
}

.explorer .preview-stack {
  display: grid;
  gap: 1.25rem;
}

.explorer .field {
  display: grid;
  gap: 0.5rem;
}

.explorer .field-label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--color-foreground-muted);
  padding: 0;
}

.explorer .field input {
  font: inherit;
  font-size: 1rem;
  color: var(--color-foreground);
  background-color: var(--color-background);
  border: 1px solid var(--color-line-strong);
  border-radius: var(--radius-base);
  padding: 0.75rem 0.9rem;
  width: 100%;
  transition: border-color var(--duration-ui) ease;
}

.explorer .field input:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 1px;
  border-color: var(--color-accent);
}

.explorer .result {
  display: grid;
  gap: 0.35rem;
  padding: 1.1rem 1.2rem;
  border-radius: var(--radius-base);
  background-color: var(--color-background);
  border: 1px solid var(--color-line);
}

.explorer .result-url {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--color-foreground-muted);
}

.explorer .result-name {
  font-size: 1.35rem;
  font-weight: 680;
  letter-spacing: -0.02em;
  color: var(--color-accent);
  overflow-wrap: anywhere;
}

.explorer .result-status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.9rem;
  color: var(--color-foreground-muted);
}

.explorer .status-dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 9999px;
  background-color: var(--color-success);
}

.explorer .result-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.explorer .chip-static {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 560;
  padding: 0.45rem 0.8rem;
  border-radius: 9999px;
  border: 1px solid var(--color-line-strong);
}

.explorer .preview-caption {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-foreground-muted);
}

.explorer .group {
  border: 0;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.6rem;
}

.explorer .chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.explorer .chip,
.explorer .segmented button,
.explorer .slot,
.explorer .mini-button,
.explorer .stepper button {
  font: inherit;
  color: var(--color-foreground);
  background-color: var(--color-background);
  border: 1px solid var(--color-line);
  cursor: pointer;
  transition:
    background-color var(--duration-ui) ease,
    border-color var(--duration-ui) ease,
    color var(--duration-ui) ease,
    transform var(--duration-press) var(--ease-out);
}

.explorer .chip:active,
.explorer .segmented button:active,
.explorer .slot:active,
.explorer .mini-button:active,
.explorer .stepper button:active {
  transform: scale(0.96);
}

.explorer .chip {
  padding: 0.45rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 560;
}

.explorer .chip[aria-pressed="true"],
.explorer .segmented button[aria-pressed="true"],
.explorer .slot[aria-pressed="true"] {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-accent-foreground);
}

.explorer .slot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(6.25rem, 1fr));
  gap: 0.45rem;
}

.explorer .slot {
  display: grid;
  justify-items: start;
  gap: 0.1rem;
  padding: 0.6rem 0.75rem;
  border-radius: var(--radius-base);
  text-align: left;
}

.explorer .slot:disabled {
  cursor: not-allowed;
  color: var(--color-foreground-muted);
  background-color: transparent;
  border-style: dashed;
}

.explorer .slot-time {
  font-weight: 650;
  font-variant-numeric: tabular-nums;
}

.explorer .slot-meta {
  font-size: 0.75rem;
  opacity: 0.85;
}

.explorer .preview-footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  min-height: 3rem;
}

.explorer .preview-footer.split {
  justify-content: space-between;
}

.explorer .button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
}

.explorer .success {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  color: var(--color-success);
  font-weight: 560;
  animation: panel-in 320ms var(--ease-out) both;
}

.explorer .success .icon {
  width: 1.1rem;
  height: 1.1rem;
}

.explorer .segmented {
  display: inline-grid;
  grid-auto-flow: column;
  gap: 0.25rem;
  padding: 0.25rem;
  border-radius: 0.6rem;
  border: 1px solid var(--color-line);
  background-color: var(--color-background);
  width: max-content;
  max-width: 100%;
  overflow-x: auto;
}

.explorer .segmented button {
  border-color: transparent;
  background: transparent;
  border-radius: 0.4rem;
  padding: 0.5rem 0.8rem;
  font-size: 0.875rem;
  font-weight: 560;
  white-space: nowrap;
}

.explorer .facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin: 0;
}

.explorer .facts div {
  display: grid;
  gap: 0.35rem;
  padding: 1rem;
  border-radius: var(--radius-base);
  background-color: var(--color-background);
  border: 1px solid var(--color-line);
}

.explorer .facts dd {
  margin: 0;
}

.explorer .fact-value {
  font-size: 1.35rem;
  font-weight: 680;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.explorer .swap {
  animation: swap-in 300ms var(--ease-out) both;
}

.explorer .rows {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
}

.explorer .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 0;
}

.explorer .row + .row {
  border-top: 1px solid var(--color-line);
}

.explorer .row-name {
  font-weight: 580;
}

.explorer .stepper {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.explorer .stepper button {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--radius-base);
}

.explorer .stepper button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.explorer .stepper-value {
  min-width: 1.25rem;
  text-align: center;
  font-weight: 680;
  font-variant-numeric: tabular-nums;
}

.explorer .pop {
  display: inline-block;
  animation: pop 260ms var(--ease-out) both;
}

.explorer .inventory-row {
  align-items: flex-end;
}

.explorer .row-main {
  display: grid;
  gap: 0.3rem;
  flex: 1;
  min-width: 0;
}

.explorer .row-meta {
  font-size: 0.85rem;
  color: var(--color-foreground-muted);
  font-variant-numeric: tabular-nums;
}

.explorer .level {
  display: block;
  height: 3px;
  width: 100%;
  max-width: 12rem;
  border-radius: 9999px;
  background-color: var(--color-accent);
  transform-origin: left;
  transition: transform 420ms var(--ease-out);
}

.explorer .row-status {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-error);
}

.explorer .mini-button {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  flex-shrink: 0;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-base);
  font-size: 0.85rem;
  font-weight: 580;
}

.explorer .pwa {
  display: grid;
  gap: 1.75rem;
  align-items: center;
  justify-items: center;
  min-height: 18rem;
}

.explorer .phone {
  position: relative;
  width: 11rem;
  aspect-ratio: 9 / 17;
  border-radius: 1.9rem;
  border: 1px solid var(--color-line-strong);
  background-color: var(--color-background);
  padding: 2.4rem 1rem 1rem;
  overflow: hidden;
  box-shadow: 0 24px 48px -28px rgb(3 8 10 / 0.7);
}

.explorer .phone::before {
  content: "";
  position: absolute;
  top: 0.7rem;
  left: 50%;
  width: 3.2rem;
  height: 0.55rem;
  translate: -50% 0;
  border-radius: 9999px;
  background-color: var(--color-surface-high);
}

.explorer .phone-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.35rem 0.7rem;
}

.explorer .app-slot {
  position: relative;
  aspect-ratio: 1;
  border-radius: 0.75rem;
}

.explorer .app-slot.is-ghost {
  background-color: var(--color-surface-high);
  opacity: 0.6;
}

.explorer .app-slot.is-installed {
  opacity: 1;
}

.explorer .app-icon {
  --logo-teal: #166462;
  --logo-navy: #28313b;
  --logo-fill: #fbfcfc;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  background-color: #fbfcfc;
  animation: install 520ms var(--ease-out) both;
}

.explorer .app-icon svg {
  width: 74%;
}

.explorer .app-name {
  position: absolute;
  left: 50%;
  top: calc(100% + 0.25rem);
  translate: -50% 0;
  max-width: 130%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.56rem;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  animation: panel-in 300ms var(--ease-out) 240ms both;
}

.explorer .pwa-copy {
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 0.9rem;
  text-align: center;
  max-width: 22rem;
}

.explorer .pwa-copy .success {
  text-align: left;
  align-items: flex-start;
}

.explorer .pwa-copy .success .icon {
  margin-top: 0.2rem;
}

@keyframes panel-in {
  from {
    opacity: 0;
    transform: translateY(8px);
    filter: blur(3px);
  }
  to {
    opacity: 1;
    transform: none;
    filter: none;
  }
}

@keyframes swap-in {
  from {
    opacity: 0;
    transform: translateY(40%);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes pop {
  from {
    transform: scale(0.7);
    opacity: 0.4;
  }
  to {
    transform: none;
    opacity: 1;
  }
}

@keyframes install {
  from {
    transform: translateY(2.5rem) scale(0.6);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}

@media (min-width: 60rem) {
  .explorer {
    grid-template-columns: minmax(14rem, 0.8fr) minmax(0, 1.6fr);
    gap: 3rem;
    align-items: start;
  }

  .explorer .tabs {
    flex-direction: column;
    overflow: visible;
    margin: 0;
    padding: 0;
  }

  .explorer .tab {
    padding: 0.9rem 1rem;
    font-size: 1.05rem;
  }

  .explorer .pwa {
    grid-template-columns: auto minmax(0, 1fr);
    justify-items: start;
    gap: 3rem;
    padding-inline: 1rem;
  }

  .explorer .pwa-copy {
    justify-items: start;
    text-align: left;
  }
}

@media (prefers-reduced-motion: reduce) {
  .explorer .panel-inner,
  .explorer .swap,
  .explorer .pop,
  .explorer .success,
  .explorer .app-icon,
  .explorer .app-name {
    animation: none;
  }
}
`;
