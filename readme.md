# 🏢 Workspace Staff Manager

A modern web application for visually managing and organizing staff across office spaces in real time. Built using HTML5, CSS3 (including Tailwind), Vanilla JavaScript, and advanced UI/UX patterns, the app allows dynamic addition, assignment, and removal of employees on an interactive building layout—all while enforcing business rules for roles and zone restrictions.

---

## 📋 Table of Contents

-   [Overview](#overview)
-   [Key Features](#key-features)
-   [Technologies Used](#technologies-used)
-   [Project Structure](#project-structure)
-   [Demo](#demo)
-   [Installation](#installation)
-   [Performance Criteria](#performance-criteria)
-   [Implemented User Stories](#implemented-user-stories)
-   [Bonus Features](#bonus-features)
-   [Author](#author)
-   [Acknowledgments](#acknowledgments)
-   [License](#license)

---

## <div id="overview">🎯 Overview</div>

Workspace offers a **fast, accessible, and intuitive solution** to staff management by centralizing team data and enabling direct interactions within a graphical floor plan. Key goals are organizing employees, maintaining business logic for zone permissions, and providing a seamless experience across desktop, tablet, and mobile.

**Main objectives:**

-   Enable real-time addition, movement, and removal of employees from a graphical floor plan.
-   Enforce role-based zone restrictions (ex: only receptionists can occupy the reception).
-   Provide a fluid, responsive, and intuitive UX on all devices.
-   Centralize staff data and spatial visualization in a single platform.

---

## <div id="key-features">🛠 Key Features</div>

**1. Employee/Zone Management**

-   Add new employees with dynamic, multi-field forms (including multiple experiences).
-   Assign/unassign employees to/from six distinct zones:
    -   Salle de conférence
    -   Réception
    -   Salle des serveurs
    -   Salle de sécurité
    -   Salle du personnel
    -   Salle d’archives
-   Drag & drop (optional enhancement) for reassigning staff visually.
-   Remove employees from zones with a single click ("X") for instant unassignment.
-   Detailed profile view for each employee (photo, name, role, contact, experiences, current location).

**2. Business Logic Enforcement**

-   Role permissions:
    -   Réception → only receptionists
    -   Serveurs → only IT technicians
    -   Sécurité → only security agents
    -   Manager → can be assigned everywhere
    -   Nettoyage → assigned everywhere except archives
    -   All other roles → can access non-restricted zones only
-   Limit the number of employees per zone.
-   Visual indicators for required empty zones (light red highlights for unfilled mandatory rooms).

**3. UI/UX & Responsive Design**

-   Sidebar for "Unassigned Staff", with easy "Add New Worker" button.
-   Modern grid and flex layouts (Flexbox/Grid).
-   Colorful buttons and rounded cards (green, orange, red as status indicators).
-   Desktop and mobile versions, optimized for:
    -   Large desktop (>1280px)
    -   Small desktop (1024–1279px)
    -   Tablet (768–1023px)
    -   Mobile (<767px)
-   CSS transitions and smooth animations for all key actions.

**4. Data Persistence**

-   Save floor plan and assignments using localStorage.
-   Restore data upon browser reload—never lose status!

**5. Modals & Forms**

-   Add/Edit worker modal: fields for all user info + photo preview + dynamic experiences.
-   Search/filter employees by name or role in the sidebar.

---

## <div id="technologies-used">💻 Technologies Used</div>

-   **HTML5**: Semantic structure and accessibility
-   **Tailwind**/**CSS3**: Responsive layouts, design system, and utility classes
-   **Vanilla JavaScript**: Core logic, event handling, dynamic DOM updates
-   **Git**: Versioning and branching (GitHub)
-   **LocalStorage API**: Persistent client-side data
-   **SEO Techniques**: Clean markup and meta tags for better discoverability

---

## <div id="project-structure">📁 Project Structure</div>

```
📦 Workspace-Staff-Manager
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   ├── images/
│   └── localData.json   # Offline demo data
├── index.html
└── README.md
```

**Descriptions:**

-   **js/app.js**: Employee/zone logic, modal control, drag-drop, persistence, and business rules
-   **css/styles.css**: Main style sheet; grid/flex, palette, transitions, responsive queries
-   **images/**: Placeholder and default images
-   **localData.json**: Structure and seed for staff/zones

---

## <div id="demo">🖥 Demo</div>

-   Interactive sidebar for "Unassigned Staff"
-   Dynamically add/edit employee profiles
-   Six-room floor plan with real-time assignments
-   Responsive UI that adapts to any device
-   Animated modal dialogs for details and editing

---

## <div id="installation">📥 Installation</div>

**Requirements:**

-   Modern web browser (Chrome, Firefox, Safari, Edge)
-   (Optional) Node.js + npm for Tailwind customization

**Steps:**

1. Clone the repository
    ```bash
    git clone "https://github.com/Sami-Regragui-Work/WorkSpace-Staff-Manager.git"
    cd Workspace-Staff-Manager
    ```
2. (Optional) Install dependencies for development and run local server
    ```bash
    npm install
    ```
3. Open index.html in your browser (or use VS Code Live Server)

---

## <div id="performance-criteria">⚙️ Performance Criteria</div>

-   Validates form input for all employee data
-   Enforces user stories and business rules for room assignments
-   Responsive on all screen sizes
-   Intuitive workflow with clear navigation and animations
-   Local storage keeps all data safe

---

## <div id="implemented-user-stories">✅ Implemented User Stories</div>

**Design:**

-   As a designer, create an intuitive UI, coherent palettes, and fluid navigation.

**Frontend:**

-   Build sidebar with unassigned employee list and "Add New Worker" button.
-   Modal with preview and full employee form.
-   Display main floor plan with six named rooms.
-   Assign restrictions based on roles; non-compliant assignments are blocked.
-   Enable removal of employees from rooms to sidebar list.
-   View full employee profile in modal on click.
-   Visual feedback for empty rooms or restrictions.
-   Responsive and animated interface.
-   Validate code using W3C validator.
-   Publish project via GitHub Pages or Vercel.

**Planning & Collaboration:**

-   Project managed and tracked via Jira, Trello, or GitHub Projects.
-   Git branching for structured development.
-   Present final project and demo as described.

**Screen Sizes Managed:**

-   Large/small desktop, tablet, mobile (portrait & landscape)

---

## <div id="bonus-features">🎉 Bonus Features</div>

-   Drag & Drop assignment between rooms/sidebar
-   Edit employee details directly from the unassigned list
-   Real-time search/filter by name or role
-   Auto-save plan to localStorage
-   Auto-reorganize staff according to business rules (testing, random assignment)
-   Default photo for employees missing an image

---

## <div id="author">👤 Author</div>

Your Name  
Developed for Workspace as a full-stack personnel visualization challenge.

---

## <div id="acknowledgments">🙏 Acknowledgments</div>

-   Project supervision and support
-   Tailwind team for design utilities
-   Open source JavaScript communities
-   All contributors to best practices referenced

---

## <div id="license">📄 License</div>

Educational and open for internal/professional/commercial adaptation with this README attached.

---

**Tech stack:** HTML5 | CSS3/Tailwind | Vanilla JavaScript | Git | LocalStorage  
**Goal:** An interactive, responsive, and robust office personnel management system for modern companies.
