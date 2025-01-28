(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_d78cc1._.js", {

"[project]/src/app/professional/Professional.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__({
  "assistLink": "Professional-module__lC8ZKq__assistLink",
  "backToHome": "Professional-module__lC8ZKq__backToHome",
  "blueText": "Professional-module__lC8ZKq__blueText",
  "bounce": "Professional-module__lC8ZKq__bounce",
  "canvasBackground": "Professional-module__lC8ZKq__canvasBackground",
  "contactButton": "Professional-module__lC8ZKq__contactButton",
  "container": "Professional-module__lC8ZKq__container",
  "content": "Professional-module__lC8ZKq__content",
  "experienceCard": "Professional-module__lC8ZKq__experienceCard",
  "experienceCardsContainer": "Professional-module__lC8ZKq__experienceCardsContainer",
  "experienceCompany": "Professional-module__lC8ZKq__experienceCompany",
  "experienceDescription": "Professional-module__lC8ZKq__experienceDescription",
  "experienceDetails": "Professional-module__lC8ZKq__experienceDetails",
  "experienceImage": "Professional-module__lC8ZKq__experienceImage",
  "experienceImageContainer": "Professional-module__lC8ZKq__experienceImageContainer",
  "experienceSection": "Professional-module__lC8ZKq__experienceSection",
  "experienceTextContainer": "Professional-module__lC8ZKq__experienceTextContainer",
  "experienceTitle": "Professional-module__lC8ZKq__experienceTitle",
  "experienceTitleText": "Professional-module__lC8ZKq__experienceTitleText",
  "externalLink": "Professional-module__lC8ZKq__externalLink",
  "header": "Professional-module__lC8ZKq__header",
  "internalLink": "Professional-module__lC8ZKq__internalLink",
  "professionalProjectsSection": "Professional-module__lC8ZKq__professionalProjectsSection",
  "projectCard": "Professional-module__lC8ZKq__projectCard",
  "projectCardsContainer": "Professional-module__lC8ZKq__projectCardsContainer",
  "projectContent": "Professional-module__lC8ZKq__projectContent",
  "projectDescription": "Professional-module__lC8ZKq__projectDescription",
  "projectImage": "Professional-module__lC8ZKq__projectImage",
  "projectImageContainer": "Professional-module__lC8ZKq__projectImageContainer",
  "projectTextContainer": "Professional-module__lC8ZKq__projectTextContainer",
  "projectTitle": "Professional-module__lC8ZKq__projectTitle",
  "projectsSubtitle": "Professional-module__lC8ZKq__projectsSubtitle",
  "projectsTitle": "Professional-module__lC8ZKq__projectsTitle",
  "purpleText": "Professional-module__lC8ZKq__purpleText",
  "redText": "Professional-module__lC8ZKq__redText",
  "scrollDown": "Professional-module__lC8ZKq__scrollDown",
  "socialLink": "Professional-module__lC8ZKq__socialLink",
  "socialMediaContainer": "Professional-module__lC8ZKq__socialMediaContainer",
});
}}),
"[project]/src/app/components/Navigation.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__({
  "hidden": "Navigation-module__VVOzFG__hidden",
  "navLink": "Navigation-module__VVOzFG__navLink",
  "navLinks": "Navigation-module__VVOzFG__navLinks",
  "navbar": "Navigation-module__VVOzFG__navbar",
  "visible": "Navigation-module__VVOzFG__visible",
});
}}),
"[project]/src/app/components/Navigation.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// src/app/components/Navigation.tsx
__turbopack_esm__({
    "default": (()=>Navigation)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$Navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/src/app/components/Navigation.module.css [app-client] (css module)");
"use client";
;
;
function Navigation({ navColor, showNav = true }) {
    const handleClick = (e, sectionId)=>{
        e.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: "smooth"
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$Navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navbar} ${showNav ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$Navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].visible : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$Navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hidden}`,
        "aria-label": "Main Navigation",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$Navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navLinks,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#home",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$Navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navLink,
                        style: {
                            color: navColor
                        },
                        onClick: (e)=>handleClick(e, "home"),
                        children: "Top"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/Navigation.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/components/Navigation.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#projectsSection",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$Navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navLink,
                        style: {
                            color: navColor
                        },
                        onClick: (e)=>handleClick(e, "projectsSection"),
                        children: "Projects"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/Navigation.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/components/Navigation.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#experienceSection",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$Navigation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navLink,
                        style: {
                            color: navColor
                        },
                        onClick: (e)=>handleClick(e, "experienceSection"),
                        children: "Experience"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/Navigation.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/components/Navigation.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/Navigation.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/components/Navigation.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = Navigation;
var _c;
__turbopack_refresh__.register(_c, "Navigation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/ThreeBodySimulation.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// src/components/ThreeBodySimulation.tsx
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../ThreeBodySimulation.module.css'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
const ThreeBodySimulation = ({ isInteractive = false, initialG = 9.8, initialPlanetMasses })=>{
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [G] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialG);
    const [planetMasses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialPlanetMasses || []);
    // Refs to store planets and stars to persist across renders
    const planetsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const starsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThreeBodySimulation.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const resizeCanvas = {
                "ThreeBodySimulation.useEffect.resizeCanvas": ()=>{
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                }
            }["ThreeBodySimulation.useEffect.resizeCanvas"];
            resizeCanvas();
            window.addEventListener("resize", resizeCanvas);
            const reboundFactor = 0.5; // Rebound factor for collisions with canvas edges
            const factorStrength = 0.1; // Strength factor when planets go off the screen
            const randomSize = {
                "ThreeBodySimulation.useEffect.randomSize": ()=>Math.random() * 15 + 10
            }["ThreeBodySimulation.useEffect.randomSize"]; // Sizes between 10 and 25
            // Define a larger space
            const spaceWidth = canvas.width * 5;
            const spaceHeight = canvas.height * 5;
            const offsetX = (spaceWidth - canvas.width) / 2;
            const offsetY = (spaceHeight - canvas.height) / 2;
            // Initialize planet masses
            const defaultMasses = planetMasses.length ? planetMasses : [
                randomSize() * 2,
                randomSize() * 2,
                randomSize() * 2
            ];
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
                        trail: []
                    },
                    {
                        x: offsetX + canvas.width / 2,
                        y: offsetY + canvas.height / 4,
                        r: randomSize(),
                        color: "#61ff6f",
                        dx: 0.5,
                        dy: 0.5,
                        mass: defaultMasses[1],
                        trail: []
                    },
                    {
                        x: 2 * canvas.width / 3 + offsetX,
                        y: 2 * canvas.height / 3 + offsetY,
                        r: randomSize(),
                        color: "#61a6ff",
                        dx: -0.5,
                        dy: 0,
                        mass: defaultMasses[2],
                        trail: []
                    }
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
                        trail: []
                    },
                    {
                        x: offsetX + canvas.width / 2,
                        y: offsetY + canvas.height / 4,
                        r: randomSize(),
                        color: "#61ff6f",
                        dx: 0.5,
                        dy: 0.5,
                        mass: defaultMasses[1],
                        trail: []
                    },
                    {
                        x: 2 * canvas.width / 3 + offsetX,
                        y: 2 * canvas.height / 3 + offsetY,
                        r: randomSize(),
                        color: "#61a6ff",
                        dx: -0.5,
                        dy: 0,
                        mass: defaultMasses[2],
                        trail: []
                    }
                ];
            }
            const maxTrailLength = 30000 / 16; // Approx. 5 minutes at 60 FPS
            // Function to generate stars
            const generateStars = {
                "ThreeBodySimulation.useEffect.generateStars": (count)=>{
                    const stars = [];
                    for(let i = 0; i < count; i++){
                        stars.push({
                            x: Math.random() * spaceWidth,
                            y: Math.random() * spaceHeight,
                            size: Math.random() * 2 + 1,
                            brightness: Math.random(),
                            speed: Math.random() * 0.01 + 0.005
                        });
                    }
                    return stars;
                }
            }["ThreeBodySimulation.useEffect.generateStars"];
            // Initialize stars only once
            if (starsRef.current.length === 0) {
                starsRef.current = generateStars(200); // Generate 200 stars
            }
            const handleCollision = {
                "ThreeBodySimulation.useEffect.handleCollision": (planet1, planet2)=>{
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
                        const finalVelocityX1 = ((planet1.mass - planet2.mass) * velocityX1 + 2 * planet2.mass * velocityX2) / (planet1.mass + planet2.mass);
                        const finalVelocityX2 = ((planet2.mass - planet1.mass) * velocityX2 + 2 * planet1.mass * velocityX1) / (planet1.mass + planet2.mass);
                        planet1.dx = Math.cos(angle) * finalVelocityX1 + Math.cos(angle + Math.PI / 2) * velocityY1;
                        planet1.dy = Math.sin(angle) * finalVelocityX1 + Math.sin(angle + Math.PI / 2) * velocityY1;
                        planet2.dx = Math.cos(angle) * finalVelocityX2 + Math.cos(angle + Math.PI / 2) * velocityY2;
                        planet2.dy = Math.sin(angle) * finalVelocityX2 + Math.sin(angle + Math.PI / 2) * velocityY2;
                        // Separate the planets to prevent sticking
                        const overlap = planet1.r + planet2.r - distance;
                        planet1.x -= overlap / 2 * Math.cos(angle);
                        planet1.y -= overlap / 2 * Math.sin(angle);
                        planet2.x += overlap / 2 * Math.cos(angle);
                        planet2.y += overlap / 2 * Math.sin(angle);
                    }
                }
            }["ThreeBodySimulation.useEffect.handleCollision"];
            const update = {
                "ThreeBodySimulation.useEffect.update": ()=>{
                    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Fade trails
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    // Draw stars
                    starsRef.current.forEach({
                        "ThreeBodySimulation.useEffect.update": (star)=>{
                            star.brightness += star.speed;
                            if (star.brightness > 1) {
                                star.brightness = 0;
                            }
                            const alpha = Math.abs(Math.sin(star.brightness * Math.PI));
                            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                            ctx.beginPath();
                            ctx.arc(star.x - offsetX, star.y - offsetY, star.size, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }["ThreeBodySimulation.useEffect.update"]);
                    // Apply gravitational forces and handle collisions
                    planetsRef.current.forEach({
                        "ThreeBodySimulation.useEffect.update": (planet, i)=>{
                            planetsRef.current.forEach({
                                "ThreeBodySimulation.useEffect.update": (otherPlanet, j)=>{
                                    if (i !== j) {
                                        const dx = otherPlanet.x - planet.x;
                                        const dy = otherPlanet.y - planet.y;
                                        const distance = Math.sqrt(dx * dx + dy * dy);
                                        // Clamp the minimum distance to prevent excessive force
                                        const minDistance = 50; // Adjust as needed
                                        const clampedDistance = Math.max(distance, minDistance);
                                        const force = G * planet.mass * otherPlanet.mass / (clampedDistance * clampedDistance);
                                        // Normalize the direction vector and apply the force
                                        const fx = force * dx / clampedDistance;
                                        const fy = force * dy / clampedDistance;
                                        planet.dx += fx / planet.mass;
                                        planet.dy += fy / planet.mass;
                                        // Handle collisions
                                        handleCollision(planet, otherPlanet);
                                    }
                                }
                            }["ThreeBodySimulation.useEffect.update"]);
                        }
                    }["ThreeBodySimulation.useEffect.update"]);
                    // Update planet positions and manage trails
                    planetsRef.current.forEach({
                        "ThreeBodySimulation.useEffect.update": (planet)=>{
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
                            planet.trail.push({
                                x: planet.x,
                                y: planet.y
                            });
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
                        }
                    }["ThreeBodySimulation.useEffect.update"]);
                    // Draw trails
                    planetsRef.current.forEach({
                        "ThreeBodySimulation.useEffect.update": (planet)=>{
                            ctx.beginPath();
                            ctx.strokeStyle = planet.color;
                            for(let i = 0; i < planet.trail.length - 1; i++){
                                const trailX1 = planet.trail[i].x - offsetX;
                                const trailY1 = planet.trail[i].y - offsetY;
                                const trailX2 = planet.trail[i + 1].x - offsetX;
                                const trailY2 = planet.trail[i + 1].y - offsetY;
                                // Only draw trail segments within the visible canvas
                                if (trailX1 > 0 && trailX1 < canvas.width && trailY1 > 0 && trailY1 < canvas.height || trailX2 > 0 && trailX2 < canvas.width && trailY2 > 0 && trailY2 < canvas.height) {
                                    ctx.moveTo(trailX1, trailY1);
                                    ctx.lineTo(trailX2, trailY2);
                                }
                            }
                            ctx.stroke();
                        }
                    }["ThreeBodySimulation.useEffect.update"]);
                    // Draw planets
                    planetsRef.current.forEach({
                        "ThreeBodySimulation.useEffect.update": (planet)=>{
                            const renderX = planet.x - offsetX;
                            const renderY = planet.y - offsetY;
                            if (renderX + planet.r > 0 && renderX - planet.r < canvas.width && renderY + planet.r > 0 && renderY - planet.r < canvas.height) {
                                ctx.beginPath();
                                ctx.arc(renderX, renderY, planet.r, 0, Math.PI * 2);
                                ctx.fillStyle = planet.color;
                                ctx.fill();
                            }
                        }
                    }["ThreeBodySimulation.useEffect.update"]);
                    requestAnimationFrame(update);
                }
            }["ThreeBodySimulation.useEffect.update"];
            const animationFrameId = requestAnimationFrame(update);
            // Cleanup on unmount or when showCanvas changes
            return ({
                "ThreeBodySimulation.useEffect": ()=>{
                    window.removeEventListener("resize", resizeCanvas);
                    cancelAnimationFrame(animationFrameId); // Cancel the animation frame
                }
            })["ThreeBodySimulation.useEffect"];
        }
    }["ThreeBodySimulation.useEffect"], [
        G,
        planetMasses,
        isInteractive
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: styles.canvas
    }, void 0, false, {
        fileName: "[project]/src/app/components/ThreeBodySimulation.tsx",
        lineNumber: 380,
        columnNumber: 10
    }, this);
};
_s(ThreeBodySimulation, "Sg8ZVyxpSjARMzShmrRUARlaPvc=");
_c = ThreeBodySimulation;
const __TURBOPACK__default__export__ = ThreeBodySimulation;
var _c;
__turbopack_refresh__.register(_c, "ThreeBodySimulation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/SocialMediaLinks.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__({
  "socialLink": "SocialMediaLinks-module__15Dgba__socialLink",
  "socialMediaContainer": "SocialMediaLinks-module__15Dgba__socialMediaContainer",
});
}}),
"[project]/src/app/components/SocialMediaLinks.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// src/app/components/SocialMediaLinks.tsx
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$SocialMediaLinks$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/src/app/components/SocialMediaLinks.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
;
;
;
const SocialMediaLinks = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$SocialMediaLinks$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialMediaContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "https://github.com/jxc2008",
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "GitHub",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$SocialMediaLinks$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialLink,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaGithub"], {}, void 0, false, {
                    fileName: "[project]/src/app/components/SocialMediaLinks.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/components/SocialMediaLinks.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "https://www.linkedin.com/in/joseph-cheng-b03886296/",
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "LinkedIn",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$SocialMediaLinks$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialLink,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaLinkedin"], {}, void 0, false, {
                    fileName: "[project]/src/app/components/SocialMediaLinks.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/components/SocialMediaLinks.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "https://www.instagram.com/koioseph_/",
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "Instagram",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$SocialMediaLinks$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialLink,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaInstagram"], {}, void 0, false, {
                    fileName: "[project]/src/app/components/SocialMediaLinks.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/components/SocialMediaLinks.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/SocialMediaLinks.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
};
_c = SocialMediaLinks;
const __TURBOPACK__default__export__ = SocialMediaLinks;
var _c;
__turbopack_refresh__.register(_c, "SocialMediaLinks");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/professional/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// src/app/professional/page.tsx
__turbopack_esm__({
    "default": (()=>Professional)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/src/app/professional/Professional.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$Navigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/components/Navigation.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ThreeBodySimulation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/components/ThreeBodySimulation.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$SocialMediaLinks$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/components/SocialMediaLinks.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
;
;
const NavbarContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    isDark: true,
    setIsDark: ()=>{}
});
function Professional() {
    _s();
    // State to handle navigation visibility
    const [showNav, setShowNav] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDark, setIsDark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true); // Navbar theme state
    const projectsSectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const experienceSectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Professional.useEffect": ()=>{
            const handleScroll = {
                "Professional.useEffect.handleScroll": ()=>{
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
                }
            }["Professional.useEffect.handleScroll"];
            window.addEventListener("scroll", handleScroll);
            handleScroll(); // Initial check
            return ({
                "Professional.useEffect": ()=>{
                    window.removeEventListener("scroll", handleScroll);
                }
            })["Professional.useEffect"];
        }
    }["Professional.useEffect"], []);
    // Function to scroll to a specific section
    const scrollToSection = (sectionId)=>{
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: "smooth"
            });
        }
    };
    // Reordered Projects Array (Three-Body Simulation first)
    const projects = [
        {
            title: "Three-Body Simulation",
            description: "An interactive simulation of the three-body problem, showcasing the complex gravitational interactions between celestial bodies in real-time.",
            image: "/images/three-body-simulation-image.png",
            link: "/three-body-simulation"
        },
        {
            title: "HI-LO Quant Trading Game",
            description: "A real-time multiplayer trading simulation built with MongoDB, Flask, React Native, and Axios. Features bid-ask spreads, long/short positions, live UI updates, and secure communication via Socket.IO. Developed using Expo Go for seamless cross-platform deployment.",
            image: "/images/hilo-image.png",
            link: "https://hilotrader.org"
        },
        {
            title: "DerivaDash - Interactive Calculus Practice Platform",
            description: "A full-stack web app created with React, Flask, and Axios for generating and solving calculus problems. Includes user progress tracking and dynamic difficulty levels. Deployed on Vercel and Render for scalability and high availability.",
            image: "/images/derivadash-image.png",
            link: "https://derivadash.com"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavbarContext.Provider, {
        value: {
            isDark,
            setIsDark
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ThreeBodySimulation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isInteractive: false,
                initialG: 9.8
            }, void 0, false, {
                fileName: "[project]/src/app/professional/page.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                "aria-label": "Back to Home",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backToHome,
                children: "Back to Home"
            }, void 0, false, {
                fileName: "[project]/src/app/professional/page.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$Navigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                navColor: isDark ? "#ffffff" : "#000000",
                showNav: showNav
            }, void 0, false, {
                fileName: "[project]/src/app/professional/page.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
                id: "home",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header} fade-in-name`,
                                children: "Professional Pursuits"
                            }, void 0, false, {
                                fileName: "[project]/src/app/professional/page.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content} fade-in`,
                                children: [
                                    "I study",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].blueText,
                                        children: "Computer Science"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/professional/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this),
                                    " and",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].redText,
                                        children: "Mathematics"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/professional/page.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this),
                                    " at",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].purpleText,
                                        children: "New York University"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/professional/page.tsx",
                                        lineNumber: 128,
                                        columnNumber: 13
                                    }, this),
                                    ". Here you'll find my projects, experience, and other professional achievements."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/professional/page.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contactButton,
                                onClick: ()=>window.location.href = "mailto:joseph.x.cheng@gmail.com",
                                "aria-label": "Contact Me",
                                children: "Contact Me"
                            }, void 0, false, {
                                fileName: "[project]/src/app/professional/page.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$SocialMediaLinks$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/app/professional/page.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            " "
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/professional/page.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scrollDown,
                        onClick: ()=>scrollToSection("projectsSection"),
                        "aria-label": "Scroll Down to Projects",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Scroll Down"
                            }, void 0, false, {
                                fileName: "[project]/src/app/professional/page.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                children: "↓"
                            }, void 0, false, {
                                fileName: "[project]/src/app/professional/page.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/professional/page.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/professional/page.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "projectsSection",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].professionalProjectsSection,
                ref: projectsSectionRef,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].projectContent,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].projectsTitle} fade-in`,
                            children: "My Projects"
                        }, void 0, false, {
                            fileName: "[project]/src/app/professional/page.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].projectsSubtitle} fade-in`,
                            children: "Explore my innovative projects below."
                        }, void 0, false, {
                            fileName: "[project]/src/app/professional/page.tsx",
                            lineNumber: 160,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].projectCardsContainer,
                            children: projects.map((project, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].projectCard,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].projectImageContainer,
                                            children: project.link.startsWith("http") ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: project.link,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                "aria-label": `Visit ${project.title} website`,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].externalLink,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: project.image,
                                                    alt: `Screenshot of ${project.title}`,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].projectImage,
                                                    width: 500,
                                                    height: 300,
                                                    layout: "responsive" // Ensures responsiveness
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/professional/page.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/professional/page.tsx",
                                                lineNumber: 170,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: project.link,
                                                "aria-label": `Visit ${project.title} page`,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].internalLink,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: project.image,
                                                    alt: `Screenshot of ${project.title}`,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].projectImage,
                                                    width: 500,
                                                    height: 300,
                                                    layout: "responsive"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/professional/page.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/professional/page.tsx",
                                                lineNumber: 187,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/professional/page.tsx",
                                            lineNumber: 168,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].projectTextContainer,
                                            children: [
                                                project.link.startsWith("http") ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: project.link,
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    "aria-label": `Visit ${project.title} website`,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].projectTitleLink,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].projectTitle,
                                                        children: project.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/professional/page.tsx",
                                                        lineNumber: 212,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/professional/page.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: project.link,
                                                    "aria-label": `Visit ${project.title} page`,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].projectTitleLink,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].projectTitle,
                                                        children: project.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/professional/page.tsx",
                                                        lineNumber: 220,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/professional/page.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].projectDescription,
                                                    children: project.description
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/professional/page.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/professional/page.tsx",
                                            lineNumber: 203,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/app/professional/page.tsx",
                                    lineNumber: 167,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/professional/page.tsx",
                            lineNumber: 165,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/professional/page.tsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/professional/page.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "experienceSection",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].experienceSection,
                ref: experienceSectionRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].experienceTitle,
                        children: "Experience"
                    }, void 0, false, {
                        fileName: "[project]/src/app/professional/page.tsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].experienceCardsContainer,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].experienceCard,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].experienceImageContainer,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://github.com/ExtraMediumDev/SPY-Prediction-using-LSTM-Neural-Network",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            "aria-label": "View Undergraduate Research Project",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: "/images/undergraduate-research.png" // Ensure this image exists in public/images
                                                ,
                                                alt: "Undergraduate Research",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].experienceImage,
                                                width: 500,
                                                height: 300,
                                                layout: "responsive"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/professional/page.tsx",
                                                lineNumber: 246,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/professional/page.tsx",
                                            lineNumber: 240,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/professional/page.tsx",
                                        lineNumber: 239,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].experienceTextContainer,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].experienceTitleText,
                                                children: "Undergraduate Research Assistant"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/professional/page.tsx",
                                                lineNumber: 257,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].experienceCompany,
                                                children: "NYU Stern Undergraduate Research"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/professional/page.tsx",
                                                lineNumber: 260,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].experienceDetails,
                                                children: "New York, New York | Feb 2024 – May 2024"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/professional/page.tsx",
                                                lineNumber: 263,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].experienceDescription,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "Utilized AlphaVantage API, Pandas, and Matplotlib to sample 600,000 stock prices at a minute time interval over 3 years."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/professional/page.tsx",
                                                        lineNumber: 268,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "Analyzed SPY equity data to rigorously backtest a new options trading strategy."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/professional/page.tsx",
                                                        lineNumber: 271,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: [
                                                            "Assisted by",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "https://www.linkedin.com/in/librianli/",
                                                                target: "_blank",
                                                                rel: "noopener noreferrer",
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].assistLink,
                                                                children: "Brian Li"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/professional/page.tsx",
                                                                lineNumber: 276,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/professional/page.tsx",
                                                        lineNumber: 274,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/professional/page.tsx",
                                                lineNumber: 267,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/professional/page.tsx",
                                        lineNumber: 256,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/professional/page.tsx",
                                lineNumber: 238,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].experienceCard,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].experienceImageContainer,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://www.intoitapp.com/",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            "aria-label": "Visit Intoit Website",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: "/images/marketing-internship.png" // Ensure this image exists in public/images
                                                ,
                                                alt: "Marketing Internship",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].experienceImage,
                                                width: 500,
                                                height: 300,
                                                layout: "responsive"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/professional/page.tsx",
                                                lineNumber: 298,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/professional/page.tsx",
                                            lineNumber: 292,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/professional/page.tsx",
                                        lineNumber: 291,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].experienceTextContainer,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].experienceTitleText,
                                                children: "Marketing Intern at Startup"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/professional/page.tsx",
                                                lineNumber: 309,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].experienceCompany,
                                                children: "Intoit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/professional/page.tsx",
                                                lineNumber: 312,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].experienceDetails,
                                                children: "New York, New York | Feb 2024 – May 2024"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/professional/page.tsx",
                                                lineNumber: 315,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$professional$2f$Professional$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].experienceDescription,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "Reached out to venture capitalists which helped raise $100,000 pre-seed funding as verified by Crunchbase."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/professional/page.tsx",
                                                        lineNumber: 320,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "Networked with venues in the New York City area to set up meetings and build partnerships."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/professional/page.tsx",
                                                        lineNumber: 323,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "Produced short films and skits for Intoit's social media, amassing 175K views and 18.7K likes."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/professional/page.tsx",
                                                        lineNumber: 326,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/professional/page.tsx",
                                                lineNumber: 319,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/professional/page.tsx",
                                        lineNumber: 308,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/professional/page.tsx",
                                lineNumber: 290,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/professional/page.tsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/professional/page.tsx",
                lineNumber: 234,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/professional/page.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_s(Professional, "rV5ktlvErzQCmTW2L2G8P0beeZo=");
_c = Professional;
var _c;
__turbopack_refresh__.register(_c, "Professional");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/professional/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_app_d78cc1._.js.map