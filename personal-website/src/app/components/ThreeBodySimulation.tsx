// src/components/ThreeBodySimulation.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ThreeBodySimulation.module.css";

interface Planet {
  x: number;
  y: number;
  r: number;
  color: string;
  dx: number;
  dy: number;
  mass: number;
  trail: { x: number; y: number }[];
}

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  speed: number;
}

interface ThreeBodySimulationProps {
  isInteractive?: boolean; // Determines if the simulation is interactive
  initialG?: number; // Initial gravitational constant
  initialPlanetMasses?: number[]; // Initial masses for the planets
}

const ThreeBodySimulation: React.FC<ThreeBodySimulationProps> = ({
  isInteractive = false,
  initialG = 9.8,
  initialPlanetMasses,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [G] = useState(initialG);
  const [planetMasses] = useState<number[]>(
    initialPlanetMasses || []
  );

  // Refs to store planets and stars to persist across renders
  const planetsRef = useRef<Planet[]>([]);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const reboundFactor = 0.5; // Rebound factor for collisions with canvas edges
    const factorStrength = 0.1; // Strength factor when planets go off the screen

    const randomSize = () => Math.random() * 15 + 10; // Sizes between 10 and 25

    // Define a larger space
    const spaceWidth = canvas.width * 5;
    const spaceHeight = canvas.height * 5;

    const offsetX = (spaceWidth - canvas.width) / 2;
    const offsetY = (spaceHeight - canvas.height) / 2;

    // Initialize planet masses
    const defaultMasses = planetMasses.length
      ? planetMasses
      : [randomSize() * 2, randomSize() * 2, randomSize() * 2];

    // Initialize planets only once if not interactive
    if (!isInteractive && planetsRef.current.length === 0) {
      planetsRef.current = [
        {
          x: offsetX + canvas.width / 3,
          y: offsetY + canvas.height / 2,
          r: randomSize(),
          color: "#ff6f61",
          dx: 0,
          dy: -0.5,
          mass: defaultMasses[0],
          trail: [],
        },
        {
          x: offsetX + canvas.width / 2,
          y: offsetY + canvas.height / 4,
          r: randomSize(),
          color: "#61ff6f",
          dx: 0.5,
          dy: 0.5,
          mass: defaultMasses[1],
          trail: [],
        },
        {
          x: (2 * canvas.width) / 3 + offsetX,
          y: (2 * canvas.height) / 3 + offsetY,
          r: randomSize(),
          color: "#61a6ff",
          dx: -0.5,
          dy: 0,
          mass: defaultMasses[2],
          trail: [],
        },
      ];
    }

    // If interactive, initialize planets based on planetMasses
    if (isInteractive && planetsRef.current.length === 0) {
      planetsRef.current = [
        {
          x: offsetX + canvas.width / 3,
          y: offsetY + canvas.height / 2,
          r: randomSize(),
          color: "#ff6f61",
          dx: 0,
          dy: -0.5,
          mass: defaultMasses[0],
          trail: [],
        },
        {
          x: offsetX + canvas.width / 2,
          y: offsetY + canvas.height / 4,
          r: randomSize(),
          color: "#61ff6f",
          dx: 0.5,
          dy: 0.5,
          mass: defaultMasses[1],
          trail: [],
        },
        {
          x: (2 * canvas.width) / 3 + offsetX,
          y: (2 * canvas.height) / 3 + offsetY,
          r: randomSize(),
          color: "#61a6ff",
          dx: -0.5,
          dy: 0,
          mass: defaultMasses[2],
          trail: [],
        },
      ];
    }

    const maxTrailLength = 30000 / 16; // Approx. 5 minutes at 60 FPS

    // Function to generate stars
    const generateStars = (count: number): Star[] => {
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * spaceWidth,
          y: Math.random() * spaceHeight,
          size: Math.random() * 2 + 1, // Sizes between 1 and 3
          brightness: Math.random(), // Initial brightness
          speed: Math.random() * 0.01 + 0.005, // Flashing speed
        });
      }
      return stars;
    };

    // Initialize stars only once
    if (starsRef.current.length === 0) {
      starsRef.current = generateStars(200); // Generate 200 stars
    }

    const handleCollision = (planet1: Planet, planet2: Planet) => {
      const dx = planet2.x - planet1.x;
      const dy = planet2.y - planet1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < planet1.r + planet2.r) {
        // Elastic collision formula
        const angle = Math.atan2(dy, dx);
        const speed1 = Math.sqrt(planet1.dx ** 2 + planet1.dy ** 2);
        const speed2 = Math.sqrt(planet2.dx ** 2 + planet2.dy ** 2);
        const direction1 = Math.atan2(planet1.dy, planet1.dx);
        const direction2 = Math.atan2(planet2.dy, planet2.dx);

        const velocityX1 = speed1 * Math.cos(direction1 - angle);
        const velocityY1 = speed1 * Math.sin(direction1 - angle);
        const velocityX2 = speed2 * Math.cos(direction2 - angle);
        const velocityY2 = speed2 * Math.sin(direction2 - angle);

        const finalVelocityX1 =
          ((planet1.mass - planet2.mass) * velocityX1 +
            2 * planet2.mass * velocityX2) /
          (planet1.mass + planet2.mass);
        const finalVelocityX2 =
          ((planet2.mass - planet1.mass) * velocityX2 +
            2 * planet1.mass * velocityX1) /
          (planet1.mass + planet2.mass);

        planet1.dx =
          Math.cos(angle) * finalVelocityX1 +
          Math.cos(angle + Math.PI / 2) * velocityY1;
        planet1.dy =
          Math.sin(angle) * finalVelocityX1 +
          Math.sin(angle + Math.PI / 2) * velocityY1;
        planet2.dx =
          Math.cos(angle) * finalVelocityX2 +
          Math.cos(angle + Math.PI / 2) * velocityY2;
        planet2.dy =
          Math.sin(angle) * finalVelocityX2 +
          Math.sin(angle + Math.PI / 2) * velocityY2;

        // Separate the planets to prevent sticking
        const overlap = planet1.r + planet2.r - distance;
        planet1.x -= (overlap / 2) * Math.cos(angle);
        planet1.y -= (overlap / 2) * Math.sin(angle);
        planet2.x += (overlap / 2) * Math.cos(angle);
        planet2.y += (overlap / 2) * Math.sin(angle);
      }
    };

    const update = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Fade trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      starsRef.current.forEach((star) => {
        star.brightness += star.speed;
        if (star.brightness > 1) {
          star.brightness = 0;
        }
        const alpha = Math.abs(Math.sin(star.brightness * Math.PI));
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(
          star.x - offsetX,
          star.y - offsetY,
          star.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      // Apply gravitational forces and handle collisions
      planetsRef.current.forEach((planet, i) => {
        planetsRef.current.forEach((otherPlanet, j) => {
          if (i !== j) {
            const dx = otherPlanet.x - planet.x;
            const dy = otherPlanet.y - planet.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Clamp the minimum distance to prevent excessive force
            const minDistance = 50; // Adjust as needed
            const clampedDistance = Math.max(distance, minDistance);

            const force =
              (G * planet.mass * otherPlanet.mass) /
              (clampedDistance * clampedDistance);

            // Normalize the direction vector and apply the force
            const fx = (force * dx) / clampedDistance;
            const fy = (force * dy) / clampedDistance;
            planet.dx += fx / planet.mass;
            planet.dy += fy / planet.mass;

            // Handle collisions
            handleCollision(planet, otherPlanet);
          }
        });
      });

      // Update planet positions and manage trails
      planetsRef.current.forEach((planet) => {
        planet.x += planet.dx;
        planet.y += planet.dy;

        // Apply factor strength if planet is trying to go off-screen
        const renderX = planet.x - offsetX;
        const renderY = planet.y - offsetY;

        // Check horizontal boundaries
        if (renderX - planet.r < 0) {
          planet.dx += factorStrength;
        } else if (renderX + planet.r > canvas.width) {
          planet.dx -= factorStrength;
        }

        // Check vertical boundaries
        if (renderY - planet.r < 0) {
          planet.dy += factorStrength;
        } else if (renderY + planet.r > canvas.height) {
          planet.dy -= factorStrength;
        }

        // Add current position to trail
        planet.trail.push({ x: planet.x, y: planet.y });

        // Limit trail length
        if (planet.trail.length > maxTrailLength) {
          planet.trail.shift();
        }

        // Handle rebound when hitting canvas edges
        if (renderX - planet.r < 0) {
          planet.x = offsetX + planet.r; // Reset position to prevent sticking
          planet.dx = Math.abs(planet.dx) * reboundFactor;
        } else if (renderX + planet.r > spaceWidth) {
          planet.x = spaceWidth - offsetX - planet.r; // Reset position to prevent sticking
          planet.dx = -Math.abs(planet.dx) * reboundFactor;
        }

        if (renderY - planet.r < 0) {
          planet.y = offsetY + planet.r; // Reset position to prevent sticking
          planet.dy = Math.abs(planet.dy) * reboundFactor;
        } else if (renderY + planet.r > spaceHeight) {
          planet.y = spaceHeight - offsetY - planet.r; // Reset position to prevent sticking
          planet.dy = -Math.abs(planet.dy) * reboundFactor;
        }
      });

      // Draw trails
      planetsRef.current.forEach((planet) => {
        ctx.beginPath();
        ctx.strokeStyle = planet.color;
        for (let i = 0; i < planet.trail.length - 1; i++) {
          const trailX1 = planet.trail[i].x - offsetX;
          const trailY1 = planet.trail[i].y - offsetY;
          const trailX2 = planet.trail[i + 1].x - offsetX;
          const trailY2 = planet.trail[i + 1].y - offsetY;

          // Only draw trail segments within the visible canvas
          if (
            (trailX1 > 0 &&
              trailX1 < canvas.width &&
              trailY1 > 0 &&
              trailY1 < canvas.height) ||
            (trailX2 > 0 &&
              trailX2 < canvas.width &&
              trailY2 > 0 &&
              trailY2 < canvas.height)
          ) {
            ctx.moveTo(trailX1, trailY1);
            ctx.lineTo(trailX2, trailY2);
          }
        }
        ctx.stroke();
      });

      // Draw planets
      planetsRef.current.forEach((planet) => {
        const renderX = planet.x - offsetX;
        const renderY = planet.y - offsetY;

        if (
          renderX + planet.r > 0 &&
          renderX - planet.r < canvas.width &&
          renderY + planet.r > 0 &&
          renderY - planet.r < canvas.height
        ) {
          ctx.beginPath();
          ctx.arc(renderX, renderY, planet.r, 0, Math.PI * 2);
          ctx.fillStyle = planet.color;
          ctx.fill();
        }
      });

      requestAnimationFrame(update);
    };

    const animationFrameId = requestAnimationFrame(update);

    // Cleanup on unmount or when showCanvas changes
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId); // Cancel the animation frame
    };
  }, [G, planetMasses, isInteractive]);

  return <canvas ref={canvasRef} className={styles.canvas}></canvas>;
};

export default ThreeBodySimulation;
