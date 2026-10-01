# Portfolio Website And 20MB PDF Casebook Design

**Status:** Approved for specification  
**Date:** 2026-10-01  
**Owner:** 安雨鑫  
**Target roles:** UI / UX / Product Designer (AIGC-oriented)

## 1. Objective

Build one unified portfolio website and one portfolio PDF that demonstrate:

- Product thinking and problem framing
- UX research, information architecture, and interaction decisions
- UI craft, visual systems, and motion control
- Responsible human-AI collaboration in an AIGC-oriented design workflow
- Range across audio, finance, immersive gaming, emotional wellness, and productivity

The website is the primary interactive portfolio. The PDF is a complete, screen-first UI/UX casebook that remains useful without access to the website.

The PDF may include resume content at the beginning, but the five projects must remain the primary content.

## 2. Hard Constraints

### PDF

- The final PDF file size MUST be **20MB or less**.
- The content target is **14-18MB** to leave a safe margin.
- Acceptance uses the actual file size in bytes:
  - Required: `file_size <= 20 * 1024 * 1024` bytes
  - Required: `file_size < 20,000,000` bytes
- Reducing file size must not remove required project pages or essential design-thinking evidence.
- If compression is required, apply it in this order:
  1. Recompress embedded images.
  2. Reduce image dimensions while preserving legibility.
  3. Subset embedded fonts.
  4. Replace decorative raster backgrounds with vector gradients or shapes.
  5. Remove only non-essential decorative assets.
- The PDF section structure and page count may not be reduced without explicit user approval.

### Motion And Video

- The website keeps only the Flow 15-second demonstration.
- Delete the Flow 38-second video section and related presentation.
- Remove all video sections from LIGHTMAP.
- Remove both Lumen motion iframes and use static key frames.
- Renew and Soundscape remain video-free.
- The PDF must not depend on embedded video.
- The Flow 15-second demo becomes a 3-4 frame storyboard in the PDF with a QR link to the website version.
- Other motion content becomes static frames, annotated sequences, or still-image comparisons.

### Content Integrity

- Do not invent user research, business metrics, client feedback, or production results.
- Clearly distinguish concept work, simulated data, AIGC-assisted assets, and implemented work.
- Preserve the original project facts and terminology.
- Use `AIGC` consistently.

## 3. Positioning

Primary statement:

> I turn complex product problems into clear, testable, and expressive product experiences. I also use AI as a controlled design and production workflow rather than as a visual gimmick.

The portfolio must communicate three layers:

1. **Product judgment:** Why the problem matters and what trade-offs were made.
2. **UX process:** How research, structure, flows, and iterations lead to decisions.
3. **UI craft:** How the final system, visual language, and screens express the product.

The AIGC direction is demonstrated through method and evidence, not through tool-name stacking.

## 4. Website Information Architecture

Primary routes:

```text
/
/work
/work/soundscape
/work/renew
/work/lightmap
/work/lumen
/work/flow
/thinking
/aigc-process
/about
/resume
/contact
```

### 4.1 Global Shell

The shell is neutral, editorial, and highly legible:

- Warm off-white base
- Ink-black primary text
- Thin rules and restrained borders
- Large statements paired with compact metadata
- Sticky navigation with current-section feedback
- Persistent Resume and Contact actions
- Project-specific color appears in covers, case headers, and transition moments

The shell must not force every project into the same visual identity. Each project opens into its own world.

### 4.2 Homepage

Sections:

1. **Identity**
   - Name
   - Role: UI / UX / Product Designer
   - AIGC specialization
   - One-line value statement
   - Resume and contact links

2. **Project Index**
   - Five prominent project entries
   - Each card shows cover, role, duration, domain, key methods, deliverables, and one-sentence thesis
   - Cards use project-specific visual treatments

3. **Capability Evidence**
   - Product strategy
   - User research
   - Information architecture
   - Interaction design
   - UI systems
   - Motion and prototyping
   - AIGC workflow and quality control

4. **AIGC Method Preview**
   - Human-AI division of labor
   - Prompt iteration
   - Output checking
   - Reusable workflows
   - Link to the full AIGC process page

5. **About And Contact**
   - Education, internship, collaboration style, tools
   - Email, resume, website, and social links if available

### 4.3 Project Page Template

All five projects share the same reading logic while retaining different visual identities.

Required sections:

1. Project value statement
2. Role, duration, constraints, and deliverables
3. Problem and user goals
4. Research and key insights
5. Information architecture and core flow
6. Visual system and key screens
7. Interaction, motion, or prototype
8. Iteration and design decisions
9. Results, limitations, and next steps
10. Next-project navigation

Each project must answer:

- What problem existed
- Why it mattered
- What evidence informed the direction
- What alternatives were considered
- What trade-off was made
- What was designed
- What remains unverified

### 4.4 Project-Specific Emphasis

#### Soundscape

- Emphasize spatial audio as an interface language
- Show journey across commute, exercise, and sleep
- Show the low-saturation visual system and immersive visualization
- Show the relationship between six core screens

#### Renew

- Emphasize product logic and user control
- Show AI recognition, low-confidence correction, renewal risk, cancellation assistance, and trust boundaries
- Explain why AI suggests but does not act autonomously

#### LIGHTMAP

- Emphasize game world, tactical systems, and visual identity
- Show the game loop, numbering logic, and cross-screen continuity
- Explain why the visual system supports gameplay rather than only decoration

#### Lumen

- Emphasize emotional design and low-stimulation interaction
- Show research synthesis, memory boundaries, and AI behavior limits
- Show why the product must avoid creating dependency

#### Flow

- Emphasize calm productivity and Bento structure
- Show the ten-screen system and one complete flow
- Keep the 15-second demonstration as the only moving asset

### 4.5 Thinking Page

The cross-project design decision map contains:

- User problem
- Core tension
- Key decision
- Rejected alternative
- Reason for the final choice
- Evidence or validation
- Unresolved questions

Projects shown in this map:

1. Soundscape
2. Renew
3. LIGHTMAP
4. Lumen
5. Flow

### 4.6 AIGC Process Page

The AIGC process must show an eight-stage workflow:

1. Problem definition
2. Research organization
3. AI-assisted divergence
4. Human selection
5. Prompt iteration
6. Visual and semantic consistency
7. Usability and quality checks
8. Human final decision

Each project records only the stages where AI was actually used.

Required evidence from the resume and supporting work:

- Badcase Museum: Prompt Diff, convergence rounds, root-cause categories, and reusable method
- Homestyler: automation SOP, Token cost, accuracy comparison, human-AI boundary, and asset QA
- Lumen: AIGC-assisted visual development with human control of light, composition, and narrative
- Renew: AI suggests, the user confirms
- LIGHTMAP: AI exploration followed by human system design

The core message:

> The value is not how many AI tools were used. The value is how AI output becomes usable, trustworthy, and repeatable.

### 4.7 Visual System

Global tokens:

- Canvas: warm off-white
- Ink: near black
- Rules: low-opacity ink
- Typography: modern Chinese sans-serif with compact English metadata
- Layout: editorial grid with generous whitespace

Project accents:

- Soundscape: lilac, teal, rose, cool light background
- Renew: warm paper, ink black, acid green
- LIGHTMAP: deep black, tactical gold, parchment
- Lumen: midnight blue, amber gold, moon cream
- Flow: warm white, sage, sand, mist blue

### 4.8 Motion And Interaction

- Motion must explain hierarchy, flow, or state change.
- No autoplay audio.
- No long autoplay video.
- Respect `prefers-reduced-motion`.
- Project transitions may change color and pace but must not delay reading.
- The Flow 15-second video is user-controlled unless using a muted homepage preview with an explicit play state.

### 4.9 Responsive Behavior

Desktop:

- Editorial multi-column layout
- Sticky project navigation
- Large project covers and comparison views

Tablet:

- Reduced columns
- No critical information hidden behind hover

Mobile:

- Single-column reading order
- Tap-friendly project index
- UI screens shown in consistent ratios
- No horizontal scrolling
- Motion reduced where it harms readability

## 5. PDF Casebook

### 5.1 Format

- 16:9 landscape
- Screen-first
- 26 pages
- One primary conclusion per page
- Vector text and diagrams
- Compressed raster imagery
- Clickable table of contents if supported by the final generator
- Page numbers and a consistent project color rail

### 5.2 Page Structure

#### Front Matter

1. Cover
   - Name, role, AIGC specialization, year, five-project key visual

2. Visual Resume Snapshot
   - Education
   - Internship
   - Core projects
   - AIGC and design capabilities
   - This is a redesigned visual summary, not a direct copy of the dense ATS resume

3. Portfolio Overview And AIGC Method
   - Five project covers
   - One-sentence thesis per project
   - Human-AI workflow diagram
   - Clear labels for AI-assisted and human-decided work

#### Soundscape: Pages 4-7

4. Problem, positioning, role, timeline, and hero
5. User journey across commute, exercise, and sleep
6. Low-saturation UI system and spatial audio visualization
7. Six-screen overview, core experience, outcome, and reflection

#### Renew: Pages 8-11

8. Opportunity, persona, pain points, and product promise
9. Product logic and information architecture
10. AI recognition, risk model, cancellation assistance, and trust boundaries
11. Core flow, decision metrics, limitations, and reflection

#### LIGHTMAP: Pages 12-15

12. Worldview, project positioning, and target experience
13. Game loop and UX structure
14. UI system, tactical visual language, and six screens
15. Cross-screen continuity, interaction logic, and reflection

#### Lumen: Pages 16-19

16. User tension, context, and product opportunity
17. Research synthesis, AI behavior, memory, and privacy boundaries
18. UI system, night-bus experience, accessibility, and key screens
19. Core experience, AIGC boundaries, outcome, and reflection

#### Flow: Pages 20-23

20. Problem, positioning, and Calm design principles
21. Bento information architecture and ten-screen map
22. UI system, components, and motion principles
23. Complete flow, 15-second storyboard, outcome, and reflection

#### AIGC Evidence And Closing

24. Badcase Museum
25. Homestyler AIGC workflow
26. Contact, website QR, resume QR, and project links

### 5.3 Page Composition Rules

- Project cover pages prioritize one strong visual and one clear statement.
- Process pages use diagrams, flows, comparisons, and annotated artifacts.
- UI pages use large screen groupings with short annotations.
- Reflection pages connect decisions, limitations, and learning.
- No page may become a wall of text.
- Chinese body copy should remain legible at normal screen zoom.
- Long paragraphs must be rewritten as short conclusions and supporting annotations.

### 5.4 PDF Asset Pipeline

- Design at `1920 x 1080` or A4 landscape.
- Use vector text for all titles, labels, diagrams, and page numbers.
- Use 1600-2000px wide raster assets for most UI imagery.
- Use JPEG quality around 80-88 for photographic or gradient-heavy assets.
- Preserve sharper treatment for UI screens where text legibility is critical.
- Use one embedded Chinese font family with subset weights.
- Do not embed video or animated GIF content.
- Downsample only after visual QA.
- Re-run file-size checks after every meaningful export.

### 5.5 PDF Acceptance Criteria

- File size is 20MB or less.
- Target file size is 14-18MB.
- All 26 required pages exist.
- All five projects retain four dedicated pages.
- No text is clipped, overlapping, or unreadable.
- No broken glyphs or black-square rendering defects.
- Images and UI screens remain sharp at normal viewing size.
- The PDF communicates a complete problem-to-decision-to-result narrative for every project.
- The PDF remains usable if the reader never opens the website.
- The website remains the richer source for motion and interactive exploration.

## 6. Source And Deployment Rules

- Use the full project source folders, not only saved-web-page exports.
- Rewrite absolute `file:///` navigation links into relative routes.
- Copy only required assets into the final portfolio structure.
- Use ASCII folder names for deployment.
- Preserve Chinese visible content.
- Keep the website and PDF visually related but not mechanically identical.
- The PDF is the compressed casebook; the website is the complete interactive presentation.

## 7. Non-Goals

- No fake commercial results.
- No live backend or account system.
- No interactive Flash-style experience that blocks content.
- No autoplay audio.
- No video-heavy PDF.
- No generic template that erases each project's individual visual identity.

## 8. Success Definition

The final result succeeds when a recruiter can:

1. Open one website link and understand the designer's role, direction, and strongest capabilities within 10 seconds.
2. Review the five projects from a single index.
3. Follow each project from problem to research, decision, interface, iteration, and reflection.
4. Download a PDF under 20MB that independently demonstrates the same aesthetic range and UX thinking.
5. See credible evidence of AIGC awareness, workflow design, quality control, and human judgment.
