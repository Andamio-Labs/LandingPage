import { useMemo, useState } from "react";

interface BookingDemoProps {
  days: string[];
  dayLabel: string;
  timeLabel: string;
  availableLabel: string;
  availableLabelSingular: string;
  fullLabel: string;
  confirmLabel: string;
  confirmedMessage: string;
  selectPrompt: string;
}

const TIMES = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

function seededCapacity(dayIndex: number, timeIndex: number): number {
  const seed = (dayIndex * 11 + timeIndex * 7 + 3) % 9;
  if (seed === 0 || seed === 4) return 0;
  return (seed % 4) + 1;
}

export default function BookingDemo({
  days,
  dayLabel,
  timeLabel,
  availableLabel,
  availableLabelSingular,
  fullLabel,
  confirmLabel,
  confirmedMessage,
  selectPrompt,
}: BookingDemoProps) {
  const [dayIndex, setDayIndex] = useState(0);
  const [slotIndex, setSlotIndex] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const slots = useMemo(
    () => TIMES.map((time, timeIndex) => ({ time, capacity: seededCapacity(dayIndex, timeIndex) })),
    [dayIndex]
  );

  function selectDay(index: number) {
    setDayIndex(index);
    setSlotIndex(null);
    setConfirmed(false);
  }

  function selectSlot(index: number) {
    setSlotIndex(index);
    setConfirmed(false);
  }

  return (
    <div className="booking-demo">
      <fieldset className="day-picker">
        <legend>{dayLabel}</legend>
        <div className="day-list">
          {days.map((day, index) => (
            <button
              key={day}
              type="button"
              className={`day-chip${index === dayIndex ? " is-active" : ""}`}
              aria-pressed={index === dayIndex}
              onClick={() => selectDay(index)}
            >
              {day}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="slot-picker">
        <legend>{timeLabel}</legend>
        {slotIndex === null && !confirmed ? <p className="hint">{selectPrompt}</p> : null}
        <div className="slot-grid">
          {slots.map((slot, index) => {
            const isFull = slot.capacity === 0;
            const isSelected = index === slotIndex;
            return (
              <button
                key={slot.time}
                type="button"
                className={`slot${isSelected ? " is-selected" : ""}${isFull ? " is-full" : ""}`}
                disabled={isFull}
                aria-pressed={isSelected}
                onClick={() => selectSlot(index)}
              >
                <span className="slot-time">{slot.time}</span>
                <span className="slot-status">
                  {isFull
                    ? fullLabel
                    : `${slot.capacity} ${slot.capacity === 1 ? availableLabelSingular : availableLabel}`}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {slotIndex !== null ? (
        <div className="confirm-row">
          {confirmed ? (
            <p className="confirmed" role="status">
              {confirmedMessage}
            </p>
          ) : (
            <button type="button" className="confirm-button" onClick={() => setConfirmed(true)}>
              {confirmLabel}
            </button>
          )}
        </div>
      ) : null}

      <style>{`
        .booking-demo {
          display: grid;
          gap: 1.5rem;
        }

        fieldset {
          border: none;
          margin: 0;
          padding: 0;
        }

        legend {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--color-foreground-muted);
          margin-bottom: 0.75rem;
          padding: 0;
        }

        .day-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .day-chip {
          padding: 0.55rem 1.1rem;
          border-radius: 9999px;
          border: 1px solid var(--color-border);
          background-color: var(--color-background);
          color: var(--color-foreground);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition:
            border-color 0.15s ease,
            background-color 0.15s ease,
            color 0.15s ease;
        }

        .day-chip:hover {
          border-color: var(--color-accent);
        }

        .day-chip.is-active {
          background-color: var(--color-accent);
          border-color: var(--color-accent);
          color: var(--color-accent-foreground);
        }

        .hint {
          margin: 0 0 0.75rem;
          color: var(--color-foreground-muted);
          font-size: 0.9rem;
        }

        .slot-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr));
          gap: 0.6rem;
        }

        .slot {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.2rem;
          padding: 0.65rem 0.85rem;
          border-radius: 0.75rem;
          border: 1px solid var(--color-border);
          background-color: var(--color-background);
          color: var(--color-foreground);
          cursor: pointer;
          transition:
            border-color 0.15s ease,
            background-color 0.15s ease;
        }

        .slot:hover:not(:disabled) {
          border-color: var(--color-accent);
        }

        .slot.is-selected {
          background-color: var(--color-accent);
          border-color: var(--color-accent);
          color: var(--color-accent-foreground);
        }

        .slot.is-full {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .slot-time {
          font-weight: 600;
          font-size: 0.95rem;
        }

        .slot-status {
          font-size: 0.78rem;
        }

        .confirm-button {
          border-radius: 9999px;
          background-color: var(--color-accent);
          color: var(--color-accent-foreground);
          border: none;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .confirm-button:hover {
          background-color: var(--color-accent-hover);
        }

        .confirmed {
          margin: 0;
          padding: 0.85rem 1.1rem;
          border-radius: 0.75rem;
          background-color: color-mix(in srgb, var(--color-success) 16%, transparent);
          color: var(--color-success);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
