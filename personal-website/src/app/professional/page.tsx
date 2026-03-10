"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Professional.module.css";
import SocialMediaLinks from "../components/SocialMediaLinks";
import {
  staggerContainer,
  staggerContainerDramatic,
  cardReveal,
  heroReveal,
  slideInLeft,
  slideInRight,
  pillBounce,
} from "../utils/animations";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function Professional() {
  const projects: Project[] = [
    {
      title: "Three-Body Simulation",
      description:
        "An interactive simulation of the three-body problem, showcasing the complex gravitational interactions between celestial bodies in real-time.",
      image: "/images/three-body-simulation-image.png",
      link: "/three-body-simulation",
    },
    {
      title: "HI-LO Quant Trading Game",
      description:
        "A real-time multiplayer trading simulation built with MongoDB, Flask, React Native, and Axios. Features bid-ask spreads, long/short positions, live UI updates, and secure communication via Socket.IO.",
      image: "/images/hilo-image.png",
      link: "https://hilotrader.org",
    },
    {
      title: "DerivaDash",
      description:
        "A full-stack web app for generating and solving calculus problems. Includes user progress tracking and dynamic difficulty levels. Built with React, Flask, and deployed on Vercel.",
      image: "/images/derivadash-image.png",
      link: "https://derivadash.com",
    },
  ];

  const skills: Record<string, string[]> = {
    Languages: ["Python", "TypeScript", "JavaScript", "C++", "Java"],
    Frameworks: ["React", "Next.js", "Node.js"],
    "ML & Data": ["PyTorch", "NumPy", "Pandas", "SQL"],
    Tools: ["Git", "LaTeX", "Figma", "Linux"],
  };

  return (
    <div className={styles.page}>
      {/* ─── HERO ─── */}
      <section className={styles.hero} id="home">
        <div className={styles.heroNoise} />
        <motion.div
          className={styles.heroInner}
          initial="hidden"
          animate="visible"
          variants={staggerContainerDramatic}
        >
          <motion.h1 className={styles.heroTitle} variants={heroReveal}>
            Professional
            <br />
            Pursuits
          </motion.h1>
          <motion.div className={styles.heroDivider} variants={heroReveal} />
          <motion.p className={styles.heroSub} variants={heroReveal}>
            I study <span className={styles.accentText}>Computer Science</span> and{" "}
            <span className={styles.accentSecondaryText}>Mathematics</span> at{" "}
            <span className={styles.accentText}>New York University</span>.
          </motion.p>
          <motion.div className={styles.heroButtons} variants={heroReveal}>
            <button
              className={styles.primaryButton}
              onClick={() => (window.location.href = "mailto:joseph.x.cheng@gmail.com")}
            >
              Contact Me
            </button>
            <a
              href="https://www.linkedin.com/in/joseph-cheng-b03886296/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryButton}
            >
              LinkedIn &rarr;
            </a>
          </motion.div>
          <motion.div variants={heroReveal}>
            <SocialMediaLinks />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── SKILLS ─── */}
      <section className={styles.skills} id="skillsSection">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIndex}>01</span>
            <h2 className={styles.sectionTitle}>Skills</h2>
          </div>
          <motion.div
            className={styles.skillGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {Object.entries(skills).map(([category, items]) => (
              <motion.div key={category} className={styles.skillRow} variants={cardReveal}>
                <span className={styles.skillCategory}>{category}</span>
                <div className={styles.skillTags}>
                  {items.map((skill) => (
                    <motion.span
                      key={skill}
                      className={styles.skillTag}
                      variants={pillBounce}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section className={styles.projects} id="projectsSection">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIndex}>02</span>
            <h2 className={styles.sectionTitle}>Projects</h2>
          </div>

          <div className={styles.projectList}>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className={styles.projectCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
              >
                <div className={styles.projectImage}>
                  {project.link.startsWith("http") ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={360}
                        sizes="(max-width: 768px) 100vw, 55vw"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </a>
                  ) : (
                    <Link href={project.link}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={360}
                        sizes="(max-width: 768px) 100vw, 55vw"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </Link>
                  )}
                </div>
                <div className={styles.projectText}>
                  <span className={styles.projectNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {project.link.startsWith("http") ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectTitleLink}
                    >
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                    </a>
                  ) : (
                    <Link href={project.link} className={styles.projectTitleLink}>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                    </Link>
                  )}
                  <p className={styles.projectDesc}>{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section className={styles.experience} id="experienceSection">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIndex}>03</span>
            <h2 className={styles.sectionTitle}>Experience</h2>
          </div>

          <motion.div
            className={styles.experienceList}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className={styles.experienceCard} variants={cardReveal}>
              <div className={styles.expImage}>
                <a
                  href="https://github.com/ExtraMediumDev/SPY-Prediction-using-LSTM-Neural-Network"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/images/undergraduate-research.png"
                    alt="Undergraduate Research"
                    width={400}
                    height={240}
                    sizes="(max-width: 768px) 100vw, 40vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </a>
              </div>
              <div className={styles.expText}>
                <div className={styles.expMeta}>
                  <span className={styles.expDate}>Feb 2024 - May 2024</span>
                  <span className={styles.expLocation}>New York, NY</span>
                </div>
                <a
                  href="https://github.com/ExtraMediumDev/SPY-Prediction-using-LSTM-Neural-Network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.expTitleLink}
                >
                  <h3 className={styles.expTitle}>Undergraduate Research Assistant</h3>
                </a>
                <p className={styles.expCompany}>NYU Stern Undergraduate Research</p>
                <ul className={styles.expBullets}>
                  <li>
                    Utilized AlphaVantage API, Pandas, and Matplotlib to sample 600,000 stock
                    prices at a minute time interval over 3 years.
                  </li>
                  <li>Analyzed SPY equity data to rigorously backtest a new options trading strategy.</li>
                  <li>
                    Assisted by{" "}
                    <a
                      href="https://www.linkedin.com/in/librianli/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.inlineLink}
                    >
                      Brian Li
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div className={styles.experienceCard} variants={cardReveal}>
              <div className={styles.expImage}>
                <a
                  href="https://www.intoitapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/images/marketing-internship.png"
                    alt="Marketing Internship"
                    width={400}
                    height={240}
                    sizes="(max-width: 768px) 100vw, 40vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </a>
              </div>
              <div className={styles.expText}>
                <div className={styles.expMeta}>
                  <span className={styles.expDate}>Feb 2024 - May 2024</span>
                  <span className={styles.expLocation}>New York, NY</span>
                </div>
                <a
                  href="https://www.intoitapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.expTitleLink}
                >
                  <h3 className={styles.expTitle}>Marketing Intern at Startup</h3>
                </a>
                <a
                  href="https://www.intoitapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.expTitleLink}
                >
                  <p className={styles.expCompany}>Intoit</p>
                </a>
                <ul className={styles.expBullets}>
                  <li>
                    Reached out to venture capitalists which helped raise $100,000 pre-seed
                    funding as verified by Crunchbase.
                  </li>
                  <li>
                    Networked with venues in the New York City area to set up meetings and build
                    partnerships.
                  </li>
                  <li>
                    Produced short films and skits for Intoit&apos;s social media, amassing 175K
                    views and 18.7K likes.
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
