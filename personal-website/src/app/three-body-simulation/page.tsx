// src/app/three-body-simulation/page.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./ThreeBodySimulationPage.module.css";
import ThreeBodySimulation from "./../components/ThreeBodySimulation";
import Navigation from "./../components/Navigation";

const ThreeBodySimulationPage: React.FC = () => {
  // State to handle navigation font color based on section
  const [navColor, setNavColor] = useState("#ffffff"); // White for dark background

  // State for simulation controls visibility
  const [controlsVisible, setControlsVisible] = useState(true);

  // State for simulation parameters
  const [G, setG] = useState(9.8);
  const [planetMasses, setPlanetMasses] = useState<number[]>([20, 20, 20]);

  // State for pop-up visibility and animation
  const [popupVisible, setPopupVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Customize if needed
      setNavColor("#ffffff"); // Keep navigation white for consistency
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handlers for simulation controls
  const handleMassChange = (index: number, value: number) => {
    const newMasses = [...planetMasses];
    newMasses[index] = value;
    setPlanetMasses(newMasses);
  };

  const handleGChange = (value: number) => {
    setG(value);
  };

  const handleReset = () => {
    setG(9.8);
    setPlanetMasses([20, 20, 20]);
  };

  // Handlers for controls visibility
  const toggleControls = () => {
    setControlsVisible(!controlsVisible);
  };

  // Handlers for pop-up
  const dismissPopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setPopupVisible(false);
    }, 500); // Duration matches the CSS animation duration
  };

  return (
    <>
      {/* Canvas Background */}
      <ThreeBodySimulation />

      {/* Back to Professional Page Button */}
      <Link href="/professional">
        <button className={styles.backButton} aria-label="Back to Professional Page">
          Back to Professional
        </button>
      </Link>

      {/* Vertical Navigation on the Right */}
      <Navigation navColor={navColor} /> {/* Pass navColor as prop */}

      {/* Simulation Container */}
      <section className={styles.simulationContainer}>
        {/* Simulation Pop-Up */}
        {popupVisible && (
          <div
            className={`${styles.popup} ${isClosing ? styles.fadeOut : ""}`}
          >
            <div className={`${styles.popupContent} ${isClosing ? styles.slideOut : ""}`}>
              <h1 className={styles.popupTitle}>Three-Body Simulation</h1>
              <p className={styles.popupDescription}>
                Explore the dynamics of the three-body problem with my interactive simulation.
              </p>
              <button
                className={styles.popupCloseButton}
                onClick={dismissPopup}
                aria-label="Close Simulation Info"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {/* Simulation Controls */}
        <div className={`${styles.controls} ${controlsVisible ? styles.visible : styles.hidden}`}>
          <h2>Simulation Controls</h2>
          <div className={styles.controlGroup}>
            <label htmlFor="gravity">Gravitational Constant (G): {G.toFixed(2)}</label>
            <input
              type="range"
              id="gravity"
              min="1"
              max="20"
              step="0.1"
              value={G}
              onChange={(e) => handleGChange(parseFloat(e.target.value))}
            />
          </div>
          {planetMasses.map((mass, index) => (
            <div className={styles.controlGroup} key={index}>
              <label htmlFor={`mass-${index}`}>Planet {index + 1} Mass: {mass.toFixed(2)}</label>
              <input
                type="range"
                id={`mass-${index}`}
                min="5"
                max="50"
                step="1"
                value={mass}
                onChange={(e) => handleMassChange(index, parseFloat(e.target.value))}
              />
            </div>
          ))}
          <button className={styles.resetButton} onClick={handleReset} aria-label="Reset Simulation">
            Reset to Default
          </button>
        </div>

        {/* Toggle Controls Button */}
        <button className={styles.toggleControlsButton} onClick={toggleControls} aria-label="Toggle Simulation Controls">
          {controlsVisible ? "Hide Controls" : "Show Controls"}
        </button>

        {/* Three-Body Simulation */}
        <ThreeBodySimulation
          isInteractive={true}
          initialG={G}
          initialPlanetMasses={planetMasses}
        />
      </section>
    </>
  );
};

export default ThreeBodySimulationPage;
