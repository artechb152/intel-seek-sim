import { useEffect, useMemo, useState } from "react";
import "./Dashboard.css";

const START_HOUR = 9;
const END_HOUR = 17;

/**
 * Main Flow dashboard screen.
 * Demonstrates energy-first scheduling with timeline blocks and a lesson CTA.
 */
export default function Dashboard() {
  // Battery starts at 80% to mirror the product concept.
  const [energyLevel, setEnergyLevel] = useState(80);

  // Build a list of hour labels once for rendering the vertical timeline.
  const timelineHours = useMemo(
    () =>
      Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, index) => {
        const hour = START_HOUR + index;
        return `${hour.toString().padStart(2, "0")}:00`;
      }),
    []
  );

  // Clamp battery value in case dynamic updates are added later.
  useEffect(() => {
    setEnergyLevel((prev) => Math.max(0, Math.min(100, prev)));
  }, []);

  return (
    <main className="flow-dashboard" aria-label="Flow dashboard">
      <header className="flow-header">
        <div>
          <p className="flow-logo-kicker">Energy Planner</p>
          <h1 className="flow-logo">Flow</h1>
        </div>

        <section className="battery-card" aria-label="Daily energy battery">
          <div className="battery-meta">
            <h2>Energy Battery</h2>
            <span>{energyLevel}%</span>
          </div>
          <div
            className="battery-track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={energyLevel}
            aria-label="Current energy"
          >
            <div className="battery-fill" style={{ width: `${energyLevel}%` }} />
          </div>
        </section>
      </header>

      <section className="timeline-card" aria-label="Daily timeline">
        {timelineHours.map((hour) => (
          <div key={hour} className="timeline-row">
            <span className="timeline-hour">{hour}</span>
            <div className="timeline-slot" />
          </div>
        ))}

        {/* Sample draggable-style blocks: absolute position hints at drag-and-drop scheduling. */}
        <article className="task-block task-block--deep-work" style={{ top: "18%" }}>
          <h3>Deep Work</h3>
          <p>90 min focus sprint</p>
        </article>

        <article className="task-block task-block--email" style={{ top: "55%" }}>
          <h3>Email Triage</h3>
          <p>Inbox cleanup</p>
        </article>
      </section>

      <button className="daily-lesson-fab" type="button" aria-label="Open daily lesson">
        Daily Lesson
      </button>
    </main>
  );
}
