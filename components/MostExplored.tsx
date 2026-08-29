"use client";

import { useEffect, useState } from "react";

type Row = {
  character_id: string;
  character_name: string;
  views: number;
};

const REFRESH_MS = 8_000;

export default function MostExplored() {
  const [items, setItems] = useState<Row[]>([]);
  const [configured, setConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch("/api/views", { cache: "no-store" });
        if (!response.ok) throw new Error("Unable to load leaderboard");

        const data = await response.json();
        if (!active) return;

        setItems(data.items || []);
        setConfigured(Boolean(data.configured));
      } catch {
        if (active) setConfigured(false);
      }
    };

    load();
    const interval = window.setInterval(load, REFRESH_MS);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Live discovery</div>
            <h2>Most explored wizards</h2>
          </div>
          {configured && <span className="muted">Refreshes every 8 seconds</span>}
        </div>

        {items.length ? (
          <div className="grid-3">
            {items.map((item, index) => (
              <div className="card card-pad" key={item.character_id}>
                <div className="tag">#{index + 1}</div>
                <h3>{item.character_name}</h3>
                <p className="muted">{item.views} profile views</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="card card-pad">
            <h3>{configured ? "No views yet" : "Realtime leaderboard ready"}</h3>
            <p className="muted">
              {configured
                ? "Open a character profile to generate the first live statistic."
                : "Connect Supabase using the documented server-side environment variables to activate the live leaderboard. The rest of the app remains fully functional without it."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
