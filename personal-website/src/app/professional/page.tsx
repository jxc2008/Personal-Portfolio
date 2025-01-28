// src/app/professional/page.tsx

"use client";

import { useEffect, useState, useRef, createContext, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Professional.module.css";
import Navigation from "../components/Navigation";
import ThreeBodySimulation from "../components/ThreeBodySimulation";
import SocialMediaLinks from "../components/SocialMediaLinks";

// Create a Context for Navbar theme
interface NavbarContextType {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

const NavbarContext = createContext<NavbarContextType>({
  isDark: true,
  setIsDark: () => {},
});

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function Professional() {
  // State to handle navigation visibility
  const [showNav, setShowNav] = useState(false);
  const [isDark, setIsDark] = useState(true); // Navbar theme state

  const projectsSectionRef = useRef<HTMLElement | null>(null);
  const experienceSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!projectsSectionRef.current || !experienceSectionRef.current) return;

      const projectsTop = projectsSectionRef.current.getBoundingClientRect().top;
      const experienceTop = experienceSectionRef.current.getBoundingClientRect().top;

      // Show navigation when the top of Projects section is within 50% of viewport height
      if (projectsTop <= window.innerHeight * 0.5) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }

      // Change Navbar theme based on Experience section
      if (experienceTop <= window.innerHeight * 0.5) {
        setIsDark(false); // Light theme
      } else {
        setIsDark(true); // Dark theme
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to scroll to a specific section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Reordered Projects Array (Three-Body Simulation first)
  const projects: Project[] = [
    {
      title: "Three-Body Simulation",
      description:
        "An interactive simulation of the three-body problem, showcasing the complex gravitational interactions between celestial bodies in real-time.",
      image: "/images/three-body-simulation-image.png", // Ensure this image exists in public/images
      link: "/three-body-simulation", // Internal link to the simulation page
    },
    {
      title: "HI-LO Quant Trading Game",
      description:
        "A real-time multiplayer trading simulation built with MongoDB, Flask, React Native, and Axios. Features bid-ask spreads, long/short positions, live UI updates, and secure communication via Socket.IO. Developed using Expo Go for seamless cross-platform deployment.",
      image: "/images/hilo-image.png",
      link: "https://hilotrader.org", // External URL to the project website
    },
    {
      title: "DerivaDash - Interactive Calculus Practice Platform",
      description:
        "A full-stack web app created with React, Flask, and Axios for generating and solving calculus problems. Includes user progress tracking and dynamic difficulty levels. Deployed on Vercel and Render for scalability and high availability.",
      image: "/images/derivadash-image.png",
      link: "https://derivadash.com", // External URL to the project website
    },
    // Add more projects as needed
  ];

  return (
    <NavbarContext.Provider value={{ isDark, setIsDark }}>
      {/* Canvas Background */}
      <ThreeBodySimulation
        isInteractive={false} // Not interactive in the background
        initialG={9.8} // Fixed gravitational constant
        // initialPlanetMasses is undefined to allow randomization
      />

      {/* Back to Home Link Styled as Button */}
      <Link href="/" aria-label="Back to Home" className={styles.backToHome}>
        Back to Home
      </Link>

      {/* Vertical Navigation on the Right */}
      <Navigation navColor={isDark ? "#ffffff" : "#000000"} showNav={showNav} />

      {/* Landing Page */}
      <section className={styles.container} id="home">
        <div>
          <h1 className={`${styles.header} fade-in-name`}>Professional Pursuits</h1>
          <p className={`${styles.content} fade-in`}>
            I study{" "}
            <span className={styles.blueText}>Computer Science</span> and{" "}
            <span className={styles.redText}>Mathematics</span> at{" "}
            <span className={styles.purpleText}>New York University</span>. Here you'll find my projects, experience, and other professional achievements.
          </p>
          <button
            className={styles.contactButton}
            onClick={() => window.location.href = "mailto:joseph.x.cheng@gmail.com"}
            aria-label="Contact Me"
          >
            Contact Me
          </button>
          <SocialMediaLinks /> {/* Social Media Links */}
        </div>

        {/* Scroll Down Arrow */}
        <div
          className={styles.scrollDown}
          onClick={() => scrollToSection("projectsSection")}
          aria-label="Scroll Down to Projects"
        >
          <p>Scroll Down</p>
          <i>↓</i>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projectsSection"
        className={styles.professionalProjectsSection}
        ref={projectsSectionRef}
      >
        {/* Project Content */}
        <div className={styles.projectContent}>
          <h1 className={`${styles.projectsTitle} fade-in`}>My Projects</h1>
          <p className={`${styles.projectsSubtitle} fade-in`}>
            Explore my innovative projects below.
          </p>

          {/* Project Cards */}
          <div className={styles.projectCardsContainer}>
            {projects.map((project, index) => (
              <div key={index} className={styles.projectCard}>
                <div className={styles.projectImageContainer}>
                  {project.link.startsWith("http") ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.title} website`}
                      className={styles.externalLink}
                    >
                      <Image
                        src={project.image}
                        alt={`Screenshot of ${project.title}`}
                        className={styles.projectImage}
                        width={500} // Adjust as needed
                        height={300} // Adjust as needed
                        layout="responsive" // Ensures responsiveness
                      />
                    </a>
                  ) : (
                    <Link
                      href={project.link}
                      aria-label={`Visit ${project.title} page`}
                      className={styles.internalLink}
                    >
                      <Image
                        src={project.image}
                        alt={`Screenshot of ${project.title}`}
                        className={styles.projectImage}
                        width={500}
                        height={300}
                        layout="responsive"
                      />
                    </Link>
                  )}
                </div>
                <div className={styles.projectTextContainer}>
                  {project.link.startsWith("http") ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.title} website`}
                      className={styles.projectTitleLink}
                    >
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                    </a>
                  ) : (
                    <Link
                      href={project.link}
                      aria-label={`Visit ${project.title} page`}
                      className={styles.projectTitleLink}
                    >
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                    </Link>
                  )}
                  <p className={styles.projectDescription}>
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experienceSection" className={styles.experienceSection} ref={experienceSectionRef}>
        <h1 className={styles.experienceTitle}>Experience</h1>
        <div className={styles.experienceCardsContainer}>
          {/* Undergraduate Research */}
          <div className={styles.experienceCard}>
            <div className={styles.experienceImageContainer}>
              <a
                href="https://github.com/ExtraMediumDev/SPY-Prediction-using-LSTM-Neural-Network"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Undergraduate Research Project"
              >
                <Image
                  src="/images/undergraduate-research.png" // Ensure this image exists in public/images
                  alt="Undergraduate Research"
                  className={styles.experienceImage}
                  width={500}
                  height={300}
                  layout="responsive"
                />
              </a>
            </div>
            <div className={styles.experienceTextContainer}>
              <h3 className={styles.experienceTitleText}>
                Undergraduate Research Assistant
              </h3>
              <p className={styles.experienceCompany}>
                NYU Stern Undergraduate Research
              </p>
              <p className={styles.experienceDetails}>
                New York, New York | Feb 2024 – May 2024
              </p>
              {/* Converted Description to Bullet Points */}
              <ul className={styles.experienceDescription}>
                <li>
                  Utilized AlphaVantage API, Pandas, and Matplotlib to sample 600,000 stock prices at a minute time interval over 3 years.
                </li>
                <li>
                  Analyzed SPY equity data to rigorously backtest a new options trading strategy.
                </li>
                <li>
                  Assisted by{" "}
                  <a
                    href="https://www.linkedin.com/in/librianli/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.assistLink}
                  >
                    Brian Li
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Marketing Internship */}
          <div className={styles.experienceCard}>
            <div className={styles.experienceImageContainer}>
              <a
                href="https://www.intoitapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Intoit Website"
              >
                <Image
                  src="/images/marketing-internship.png" // Ensure this image exists in public/images
                  alt="Marketing Internship"
                  className={styles.experienceImage}
                  width={500}
                  height={300}
                  layout="responsive"
                />
              </a>
            </div>
            <div className={styles.experienceTextContainer}>
              <h3 className={styles.experienceTitleText}>
                Marketing Intern at Startup
              </h3>
              <p className={styles.experienceCompany}>
                Intoit
              </p>
              <p className={styles.experienceDetails}>
                New York, New York | Feb 2024 – May 2024
              </p>
              {/* Converted Description to Bullet Points */}
              <ul className={styles.experienceDescription}>
                <li>
                  Reached out to venture capitalists which helped raise $100,000 pre-seed funding as verified by Crunchbase.
                </li>
                <li>
                  Networked with venues in the New York City area to set up meetings and build partnerships.
                </li>
                <li>
                  Produced short films and skits for Intoit's social media, amassing 175K views and 18.7K likes.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer has been removed */}
    </NavbarContext.Provider>
  );
}
