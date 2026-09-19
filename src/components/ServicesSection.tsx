import React, { useRef, useState, type CSSProperties } from "react";
import {
  Palette,
  Megaphone,
  Rocket,
  Camera,
  Globe,
  Newspaper,
  Check,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

interface ServiceItem {
  name: string;
  icon: LucideIcon;
  features: string[];
}

const SERVICES: ServiceItem[] = [
  {
    name: "Branding",
    icon: Palette,
    features: [
      "Logo & identity systems",
      "Brand guidelines",
      "Visual language",
      "Packaging & collateral",
    ],
  },
  {
    name: "Social Strategy",
    icon: Megaphone,
    features: [
      "Platform-native calendars",
      "Community management",
      "Trend-responsive content",
      "Analytics & reporting",
    ],
  },
  {
    name: "Campaigns",
    icon: Rocket,
    features: [
      "Concept development",
      "Multi-channel rollout",
      "Paid media strategy",
      "Performance tracking",
    ],
  },
  {
    name: "Content Production",
    icon: Camera,
    features: [
      "In-house photography",
      "Video production",
      "Copywriting",
      "Post-production editing",
    ],
  },
  {
    name: "Digital & Web",
    icon: Globe,
    features: [
      "Custom site builds",
      "E-commerce integration",
      "Ongoing maintenance",
      "Performance optimization",
    ],
  },
  {
    name: "PR & Comms",
    icon: Newspaper,
    features: [
      "Press outreach",
      "Crisis communications",
      "Media relationships",
      "Messaging & positioning",
    ],
  },
];

const SWIPE_THRESHOLD = 80;

interface SwipeCardProps {
  service: ServiceItem;
  index: number;
  order: number;
  isFront: boolean;
  onSwiped: (index: number, direction: "left" | "right") => void;
}

function SwipeCard({ service, index, order, isFront, onSwiped }: SwipeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const [dx, setDx] = useState(0);
  const [flyDir, setFlyDir] = useState<"left" | "right" | null>(null);
  const [snapping, setSnapping] = useState(false);

  const stackPos = order; // 0 = front
  const Icon = service.icon;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isFront) return;
    dragging.current = true;
    startX.current = e.clientX;
    setSnapping(false);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    setDx(e.clientX - startX.current);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      const dir: "left" | "right" = dx > 0 ? "right" : "left";
      setFlyDir(dir);
      setSnapping(true);
      setTimeout(() => {
        onSwiped(index, dir);
        setFlyDir(null);
        setSnapping(false);
        setDx(0);
      }, 260);
    } else {
      setSnapping(true);
      setDx(0);
      setTimeout(() => setSnapping(false), 260);
    }
  };

  const restOffset = stackPos === 0 ? 0 : index % 2 ? 6 : -6;
  const rotate = flyDir
    ? flyDir === "right"
      ? 18
      : -18
    : dx / 14 + restOffset * (stackPos === 0 ? 0 : 1);
  const translateX = flyDir
    ? flyDir === "right"
      ? 520
      : -520
    : dx + (stackPos % 3) * 6;
  const translateY = stackPos * 8;
  const scale = 1 - stackPos * 0.04;
  const opacity = flyDir ? 0 : 1 - stackPos * 0.16;

  return (
    <div
      ref={cardRef}
      className={`swipe-card ${isFront ? "is-front" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        zIndex: SERVICES.length - stackPos,
        transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale})`,
        opacity: Math.max(opacity, 0.1),
        transition: snapping
          ? "transform 0.26s cubic-bezier(0.22,1,0.36,1), opacity 0.26s ease"
          : "none",
        cursor: isFront ? (dragging.current ? "grabbing" : "grab") : "default",
        pointerEvents: isFront ? "auto" : "none",
      }}
    >
      <div className="swipe-card-top">
        <span className="swipe-card-icon">
          <Icon size={22} strokeWidth={1.75} />
        </span>
        <span className="swipe-card-index">
          {String(index + 1).padStart(2, "0")} / {SERVICES.length}
        </span>
      </div>
      <h3 className="swipe-card-title">{service.name}</h3>
      <ul className="swipe-card-list">
        {service.features.map((f) => (
          <li key={f}>
            <Check size={15} strokeWidth={2.4} className="swipe-check" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {isFront && <div className="swipe-hint">Drag or swipe to explore</div>}
    </div>
  );
}

export default function ServicesSwipeCards() {
  // order[i] = stack position of SERVICES[i]; 0 = front
  const [order, setOrder] = useState<number[]>(SERVICES.map((_, i) => i));

  const handleSwiped = (swipedIndex: number, _direction: "left" | "right" = "right") => {
    setOrder((prev) => {
      const swipedPos = prev[swipedIndex];
      return prev.map((pos, i) => {
        if (i === swipedIndex) return SERVICES.length - 1;
        if (pos > swipedPos) return pos - 1;
        return pos;
      });
    });
  };

  const handleNext = () => {
    const frontIndex = order.findIndex((pos) => pos === 0);
    if (frontIndex !== -1) {
      handleSwiped(frontIndex, "right");
    }
  };

  const handlePrev = () => {
    setOrder((prev) => {
      const backIndex = prev.findIndex((pos) => pos === SERVICES.length - 1);
      return prev.map((pos, i) => {
        if (i === backIndex) return 0;
        return pos + 1;
      });
    });
  };

  const activeIndex = order.findIndex((pos) => pos === 0);

  return (
    <section id="services" style={styles.outerSection}>
      <style>{`
        .services-card-container {
          position: relative;
          background: radial-gradient(circle at 50% 25%, #7A1616 0%, #4A0D0D 55%, #2A0707 100%);
          border-radius: 36px;
          border: 1px solid rgba(232, 220, 200, 0.14);
          margin: 0 auto;
          max-width: 1280px;
          width: calc(100% - 56px);
          padding: 96px 6vw 110px;
          overflow: hidden;
          box-shadow: 0 24px 64px -12px rgba(0, 0, 0, 0.7), 0 0 80px rgba(122, 22, 22, 0.2);
        }
        .swipe-grid-layer {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(232,220,200,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,220,200,0.08) 1px, transparent 1px);
          background-size: 44px 44px;
          pointer-events: none;
          border-radius: 36px;
        }
        .swipe-bg-layer {
          position: absolute;
          inset: -20px;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.35' numOctaves='3' stitchTiles='stitch' result='noise'/><feColorMatrix in='noise' type='matrix' values='1.4 0 0 0 0  0 0.3 0 0 0  0 0 0.3 0 0  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
          background-size: 220px 220px;
          filter: blur(6px);
          mix-blend-mode: soft-light;
          opacity: 0.85;
          pointer-events: none;
        }
        .swipe-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .swipe-eyebrow {
          font-family: 'Courier New', monospace;
          font-size: 13px;
          letter-spacing: 0.05em;
          color: rgba(232,220,200,0.6);
          text-align: center;
          margin-bottom: 20px;
        }
        .swipe-headline {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: 400;
          font-size: clamp(34px, 5.2vw, 56px);
          line-height: 1.1;
          text-align: center;
          color: #E8DCC8;
          margin: 0 auto 50px auto;
          letter-spacing: -0.01em;
        }
        .swipe-stack {
          position: relative;
          width: 340px;
          height: 460px;
          margin: 0 auto;
          touch-action: none;
        }
        .swipe-card {
          position: absolute;
          inset: 0;
          background: #0A0A0A;
          border: 1px solid rgba(232,220,200,0.14);
          border-radius: 22px;
          padding: 30px 26px 34px;
          user-select: none;
          touch-action: none;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45);
        }
        .swipe-card.is-front {
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(232,220,200,0.18);
        }
        .swipe-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 26px;
        }
        .swipe-card-icon {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: rgba(232,220,200,0.06);
          border: 1px solid rgba(232,220,200,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #E8DCC8;
        }
        .swipe-card-index {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: rgba(232,220,200,0.4);
        }
        .swipe-card-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: 400;
          font-size: 24px;
          color: #E8DCC8;
          margin: 0 0 20px 0;
        }
        .swipe-card-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .swipe-card-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 14px;
          color: rgba(232,220,200,0.65);
          padding: 7px 0;
        }
        .swipe-check { color: #C81D1D; flex-shrink: 0; }
        .swipe-hint {
          position: absolute;
          bottom: 22px;
          left: 0;
          right: 0;
          text-align: center;
          font-family: 'Courier New', monospace;
          font-size: 11px;
          letter-spacing: 0.04em;
          color: rgba(232,220,200,0.35);
        }
        .swipe-controls {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 36px;
        }
        .swipe-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(232, 220, 200, 0.06);
          border: 1px solid rgba(232, 220, 200, 0.16);
          color: #E8DCC8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .swipe-btn:hover {
          background: rgba(232, 220, 200, 0.14);
          border-color: rgba(232, 220, 200, 0.35);
          transform: translateY(-2px);
        }
        .swipe-dots {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .swipe-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(232, 220, 200, 0.2);
          transition: all 0.3s ease;
        }
        .swipe-dot.is-active {
          width: 22px;
          border-radius: 6px;
          background: #C81D1D;
        }
        @media (max-width: 768px) {
          .services-card-container {
            width: calc(100% - 32px);
            border-radius: 28px;
            padding: 60px 4vw 70px;
          }
        }
        @media (max-width: 480px) {
          .services-card-container {
            width: calc(100% - 24px);
            border-radius: 24px;
            padding: 48px 16px 56px;
          }
          .swipe-stack {
            width: 290px;
            height: 440px;
          }
          .swipe-card {
            padding: 24px 20px 28px;
          }
        }
      `}</style>

      <div className="services-card-container">
        <div className="swipe-grid-layer" aria-hidden="true" />
        <div className="swipe-bg-layer" aria-hidden="true" />

        <div className="swipe-content">
          <div className="swipe-eyebrow">{"( 06 services )"}</div>
          <h2 className="swipe-headline">What we do</h2>

          <div className="swipe-stack">
            {SERVICES.map((s, i) => (
              <SwipeCard
                key={s.name}
                service={s}
                index={i}
                order={order[i]}
                isFront={order[i] === 0}
                onSwiped={handleSwiped}
              />
            ))}
          </div>

          {/* Swipe / Navigation controls */}
          <div className="swipe-controls">
            <button
              type="button"
              className="swipe-btn"
              onClick={handlePrev}
              aria-label="Previous service"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="swipe-dots">
              {SERVICES.map((_, i) => (
                <span
                  key={i}
                  className={`swipe-dot ${activeIndex === i ? "is-active" : ""}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="swipe-btn"
              onClick={handleNext}
              aria-label="Next service"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  outerSection: {
    background: "#0A0A0A",
    padding: "40px 0 60px 0",
    position: "relative",
    width: "100%",
  },
};
