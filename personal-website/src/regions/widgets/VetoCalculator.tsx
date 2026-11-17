"use client";

import { useId, useMemo, useState } from "react";
import { mapPoolLabel, VALORANT_MAP_POOL } from "../config";
import type { VetoWidgetProps } from "../types";
import { finalMaps, greedy, options, solve, stepsFor, type Side } from "./veto";
import styles from "./VetoCalculator.module.css";

const pct = (x: number) => `${(x * 100).toFixed(1)}%`;

const pool = VALORANT_MAP_POOL.maps;
const exampleChances = (example: Record<string, number>) => pool.map((map) => example[map] ?? 50);

export default function VetoCalculator({ example, teams: defaultTeams }: VetoWidgetProps) {
  const uid = useId();
  const [names, setNames] = useState<[string, string]>(defaultTeams);
  const [chances, setChances] = useState<number[]>(() => exampleChances(example));
  const [first, setFirst] = useState<Side>(0);
  const [history, setHistory] = useState<number[]>([]);

  const team = (s: Side) => names[s].trim() || defaultTeams[s];
  const p = useMemo(() => chances.map((c) => c / 100), [chances]);
  const steps = useMemo(() => stepsFor(first), [first]);
  const best = useMemo(() => solve(p, steps, history), [p, steps, history]);
  const opts = useMemo(() => options(p, steps, history), [p, steps, history]);
  const naive = useMemo(() => greedy(p, steps), [p, steps]);
  const opening = useMemo(() => solve(p, steps), [p, steps]);
  const played = finalMaps(pool.length, steps, history);
  const current = history.length < steps.length ? steps[history.length] : null;
  const bestChoice = best.line[0];

  const setChance = (i: number, v: number) => setChances((c) => c.map((x, k) => (k === i ? v : x)));
  const choose = (map: number) => setHistory((h) => [...h, map]);
  const changeFirst = (s: Side) => {
    setFirst(s);
    setHistory([]);
  };

  return (
    <div className={styles.veto}>
      <div className={styles.setup}>
        <div className={styles.teams}>
          {([0, 1] as Side[]).map((s) => (
            <label key={s} className={styles.teamField}>
              <span>{s === 0 ? "First team" : "Second team"}</span>
              <input
                value={names[s]}
                maxLength={20}
                onChange={(e) => setNames((n) => (s === 0 ? [e.target.value, n[1]] : [n[0], e.target.value]))}
              />
            </label>
          ))}
        </div>

        <fieldset className={styles.starts}>
          <legend>Starts the veto</legend>
          {([0, 1] as Side[]).map((s) => (
            <label key={s}>
              <input type="radio" name={`${uid}-first`} checked={first === s} onChange={() => changeFirst(s)} />
              <span>{team(s)}</span>
            </label>
          ))}
        </fieldset>

        <table className={styles.maps}>
          <caption>
            <span>Chance {team(0)} wins each map</span>
            <span className={styles.asOf}>Map pool {mapPoolLabel()}</span>
          </caption>
          <tbody>
            {pool.map((map, i) => {
              const id = `${uid}-map-${i}`;
              return (
                <tr key={map} className={history.includes(i) ? styles.used : undefined}>
                  <th scope="row">
                    <label htmlFor={id}>{map}</label>
                  </th>
                  <td>
                    <input
                      id={id}
                      type="range"
                      min={1}
                      max={99}
                      value={chances[i]}
                      aria-valuetext={`${chances[i]}% for ${team(0)}, ${100 - chances[i]}% for ${team(1)}`}
                      onChange={(e) => setChance(i, Number(e.target.value))}
                      style={{ ["--fill" as string]: `${chances[i]}%` }}
                    />
                  </td>
                  <td className={styles.num}>{chances[i]}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.presets}>
          <button type="button" onClick={() => setChances(exampleChances(example))}>
            Use example numbers
          </button>
          <button type="button" onClick={() => setChances(pool.map(() => 50))}>
            Set every map to 50%
          </button>
        </div>
      </div>

      <div className={styles.board}>
        <ol className={styles.steps}>
          {steps.map((step, k) => {
            const chosen = history[k];
            const isNow = k === history.length;
            return (
              <li key={k} className={`${styles.step} ${isNow ? styles.now : ""} ${chosen === undefined && !isNow ? styles.later : ""}`}>
                <span className={styles.who}>
                  {team(step.side)} {step.action === "ban" ? "bans" : "picks"}
                </span>
                {chosen !== undefined && (
                  <span className={`${styles.chosen} ${step.action === "ban" ? styles.banned : ""}`}>{pool[chosen]}</span>
                )}
                {isNow && (
                  <div className={styles.choices} role="group" aria-label={`${team(step.side)} ${step.action}s a map`}>
                    {opts.map((o) => (
                      <button
                        key={o.map}
                        type="button"
                        className={o.map === bestChoice ? styles.best : undefined}
                        onClick={() => choose(o.map)}
                      >
                        <span className={styles.choiceMap}>{pool[o.map]}</span>
                        <span className={styles.choiceValue}>
                          {team(0)} {pct(o.value)}
                        </span>
                        {o.map === bestChoice && <span className={styles.bestTag}>Best for {team(step.side)}</span>}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
          <li className={`${styles.step} ${played ? "" : styles.later}`}>
            <span className={styles.who}>Decider</span>
            {played && <span className={styles.chosen}>{pool[played[2]]}</span>}
          </li>
        </ol>

        <div className={styles.result} aria-live="polite">
          {played ? (
            <p className={styles.price}>
              {team(0)} wins the series <strong>{pct(best.value)}</strong> of the time on{" "}
              {played.map((m) => `${pool[m]} (${chances[m]}%)`).join(", ")}.
            </p>
          ) : (
            <p className={styles.price}>
              With best play from here, {team(0)} wins the series <strong>{pct(best.value)}</strong> of the time.
            </p>
          )}
          <p className={styles.compare}>
            {Math.abs(naive.value - opening.value) < 5e-4
              ? `Here, best play gives the same price as each team simply banning its worst map and picking its best.`
              : `If each team simply banned its worst map and picked its best, ${team(0)} would win ${pct(naive.value)} instead of ${pct(opening.value)}.`}
          </p>
        </div>

        <div className={styles.actions}>
          {current && (
            <button type="button" onClick={() => setHistory([...history, ...best.line])}>
              Finish with best play
            </button>
          )}
          <button type="button" onClick={() => setHistory((h) => h.slice(0, -1))} disabled={history.length === 0}>
            Undo
          </button>
          <button type="button" onClick={() => setHistory([])} disabled={history.length === 0}>
            Start over
          </button>
        </div>
        <p className={styles.note}>
          Assumes maps are independent. The example numbers are made up; plug in your own or the pricing model&apos;s
          per-map prices.
        </p>
      </div>
    </div>
  );
}
