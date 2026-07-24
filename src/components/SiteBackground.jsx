"use client";

import { useEffect } from "react";

/*
 * One background for the entire site.
 *
 * Every section used to paint its own surface — five different dark values and
 * four separate copies of the same orange grid — so scrolling crossed a series
 * of seams. This renders the surface once, fixed behind everything, and the
 * sections are transparent on top of it.
 *
 * The motif is a line follower: a small robot tracing a PCB, which is Track 02
 * of the syllabus in utils/constants.js. Built up like a real board — a fine
 * 8px etch grid under a 40px one, bundles of parallel traces breaking away at
 * 45° the way fan-out actually routes, via rings, branch stubs — and on the top
 * layer the course the robot follows, sensor first, leaving a warm trail.
 *
 * Nothing here is allowed to compete with the page:
 *   - it is `fixed`, so it never moves relative to the viewport while scrolling
 *   - all motion pauses the moment a scroll starts and resumes once you settle
 *   - the ambient wash animates transform-only, so it stays on the compositor
 *     and never repaints
 *   - a soft centre vignette pulls detail out of the column where text sits
 *
 * Two variants because a landscape loop scaled into a phone leaves an 8px
 * robot. Both use `meet`, so the whole board is always on screen and never
 * cropped, at any aspect ratio from 320x568 to an ultrawide desktop.
 */

/*
 * A bundle of parallel traces: straight run, 45° break, straight run again.
 * Because every trace shares the bend angle they stay evenly spaced through it,
 * which is what makes real fan-out read as a ribbon rather than a set of lines.
 * sx/sy point the bundle into whichever margin it belongs to.
 */
const bus = ({ x, y, run1, diag, run2, count, gap, sx, sy }) =>
  Array.from({ length: count }, (_, i) => {
    const y0 = y + sy * i * gap;
    const x1 = x + sx * run1;
    const x2 = x1 + sx * diag;
    const y2 = y0 + sy * diag;
    const x3 = x2 + sx * run2;
    return `M ${x} ${y0} H ${x1} L ${x2} ${y2} H ${x3}`;
  });

/* Corners are quadratics with a 32-unit radius, and every run is axis-aligned
   so the robot's heading snaps cleanly through each turn. */
const LANDSCAPE = {
  viewBox: "0 0 1200 800",
  track:
    "M 200 160 H 728 Q 760 160 760 192 V 288 Q 760 320 792 320 H 968 " +
    "Q 1000 320 1000 352 V 608 Q 1000 640 968 640 H 392 Q 360 640 360 608 " +
    "V 512 Q 360 480 328 480 H 232 Q 200 480 200 448 Z",
  pads: [
    [460, 160],
    [880, 320],
    [1000, 480],
    [676, 640],
    [296, 480],
    [200, 300],
  ],
  /* Kept to the margins the loop leaves free, so they frame it instead of
     crowding it: above y=160 and below y=640. */
  under: [
    ...bus({ x: 0, y: 26, run1: 300, diag: 62, run2: 480, count: 5, gap: 15, sx: 1, sy: 1 }),
    ...bus({ x: 1200, y: 774, run1: 250, diag: 62, run2: 400, count: 5, gap: 15, sx: -1, sy: -1 }),
  ],
  stubs: [
    { d: "M 620 160 V 106", via: [620, 106] },
    { d: "M 900 320 V 262", via: [900, 262] },
    { d: "M 1000 546 H 1062", via: [1062, 546] },
    { d: "M 520 640 V 698", via: [520, 698] },
    { d: "M 200 396 H 138", via: [138, 396] },
    { d: "M 360 552 H 298", via: [298, 552] },
  ],
  vias: [
    [860, 96],
    [860, 141],
    [470, 706],
    [470, 661],
    [1132, 432],
    [66, 372],
    [1140, 118],
    [58, 664],
  ],
  botScale: 1,
  duration: "62s",
};

const PORTRAIT = {
  viewBox: "0 0 420 900",
  track:
    "M 92 110 H 296 Q 328 110 328 142 V 318 Q 328 350 296 350 H 188 " +
    "Q 156 350 156 382 V 522 Q 156 554 188 554 H 296 Q 328 554 328 586 " +
    "V 758 Q 328 790 296 790 H 92 Q 60 790 60 758 V 142 Q 60 110 92 110 Z",
  pads: [
    [200, 110],
    [328, 230],
    [156, 450],
    [328, 670],
    [200, 790],
    [60, 450],
  ],
  under: [
    ...bus({ x: 0, y: 18, run1: 110, diag: 46, run2: 200, count: 4, gap: 13, sx: 1, sy: 1 }),
    ...bus({ x: 420, y: 884, run1: 100, diag: 46, run2: 190, count: 4, gap: 13, sx: -1, sy: -1 }),
  ],
  stubs: [
    { d: "M 240 110 V 62", via: [240, 62] },
    { d: "M 328 268 H 384", via: [384, 268] },
    { d: "M 60 494 H 16", via: [16, 494] },
    { d: "M 240 790 V 838", via: [240, 838] },
  ],
  vias: [
    [370, 78],
    [370, 100],
    [64, 848],
    [64, 826],
    [402, 452],
    [18, 336],
  ],
  botScale: 1.15,
  duration: "52s",
};

function Circuit({ id, viewBox, track, pads, under, stubs, vias, botScale, duration, className }) {
  /* The robot rides the exact same `d` the track is drawn from, so the two can
     never drift apart. offset-rotate:auto turns it through the corners. */
  const ride = { offsetPath: `path("${track}")`, animationDuration: duration };

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`${id}-halo`}>
          <stop offset="0%" stopColor="rgb(249 115 22)" stopOpacity="0.4" />
          <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.09" />
          <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Inner copper layer — solid, unlit, sitting under everything else */}
      <g className="bgfx-under">
        {under.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      {/* Via rings, drilled through to the layer below */}
      <g className="bgfx-via">
        {vias.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4.5" />
        ))}
      </g>

      {/* Branch stubs leaving the main course, each terminated in its own via */}
      <g className="bgfx-stub">
        {stubs.map(({ d, via: [vx, vy] }) => (
          <g key={d}>
            <path d={d} />
            <circle cx={vx} cy={vy} r="4" />
          </g>
        ))}
      </g>

      {/* The course — dashed, the way tape gets laid down for a lab exercise */}
      <path d={track} className="bgfx-track" />

      {/* Solder pads at the junctions, breathing out of phase with each other */}
      {pads.map(([cx, cy], i) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="4"
          className="bgfx-pad"
          style={{ animationDelay: `${i * 0.7}s` }}
        />
      ))}

      {/* Trail: a wide soft pass under a bright core, both dashed to the same
          phase as the robot so the glow reads as heat left on the track. */}
      <path d={track} pathLength="1000" className="bgfx-trail bgfx-trail--glow" style={{ animationDuration: duration }} />
      <path d={track} pathLength="1000" className="bgfx-trail" style={{ animationDuration: duration }} />

      {/* A signal running the loop ahead of the robot */}
      <circle r="3" className="bgfx-pulse" style={{ ...ride, animationDelay: `-${parseInt(duration, 10) * 0.34}s` }} />

      {/* The line follower itself, drawn nose-first along +X */}
      <g className="bgfx-bot" style={ride}>
        <g transform={`scale(${botScale})`}>
          <circle r="22" fill={`url(#${id}-halo)`} />
          {/* sensor throw onto the track ahead */}
          <path d="M 12 -6 L 34 -12 L 34 12 L 12 6 Z" className="bgfx-beam" />
          <rect x="-7" y="-13.5" width="12" height="5" rx="2.5" className="bgfx-wheel" />
          <rect x="-7" y="8.5" width="12" height="5" rx="2.5" className="bgfx-wheel" />
          <rect x="-11" y="-9" width="24" height="18" rx="5.5" className="bgfx-body" />
          <circle cx="8" cy="0" r="2.6" className="bgfx-eye" />
          <rect x="-6.5" y="-3.5" width="3" height="7" rx="1.5" className="bgfx-vent" />
        </g>
      </g>
    </svg>
  );
}

export default function SiteBackground() {
  /*
   * Hold every animation still while the page is moving. Scrolling is already
   * motion; ambient drift on top of it is what makes a background feel like it
   * is in the way. This also hands the whole frame budget to the scroll itself
   * on weaker phones, which is where dropped frames actually show up.
   */
  useEffect(() => {
    const root = document.documentElement;
    let idle;

    const onScroll = () => {
      root.classList.add("bgfx-still");
      clearTimeout(idle);
      idle = setTimeout(() => root.classList.remove("bgfx-still"), 260);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idle);
      root.classList.remove("bgfx-still");
    };
  }, []);

  return (
    <div className="bgfx" aria-hidden="true">
      {/* Ambient wash. Transform-only animation on plain radial gradients —
          no blur filters, so there is nothing to re-rasterise per frame. */}
      <div className="bgfx-orb bgfx-orb--a" />
      <div className="bgfx-orb bgfx-orb--b" />
      <div className="bgfx-orb bgfx-orb--c" />

      <div className="bgfx-grid" />

      <div className="bgfx-board">
        <Circuit id="bgfx-lg" {...LANDSCAPE} className="bgfx-svg hidden lg:block" />
        <Circuit id="bgfx-sm" {...PORTRAIT} className="bgfx-svg lg:hidden" />
      </div>

      <div className="bgfx-noise" />
    </div>
  );
}
