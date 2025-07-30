# BuildBoard

BuildBoard is a full-stack web platform for developers, learners, and tinkerers to publicly (or privately) document their progress, architecture decisions, mistakes, technical struggles, and lessons while working on any project.

Think of it as:
- **A journal + changelog + dev blog + build-in-public platform**
- **Designed to showcase the thinking, process, and technical nuance of real projects — not just the polished result**

## 🚀 What is BuildBoard?

BuildBoard bridges the gap between private development notes and public showcasing. It's a platform where developers can:

- Document their thought process and decision-making in real-time
- Share technical struggles and how they overcame them
- Create a transparent timeline of project evolution
- Build a portfolio that shows the journey, not just the destination
- Learn from others' documented experiences and mistakes

## 🛠️ Tech Stack

### Frontend
- **Next.js** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Bun** - Fast JavaScript runtime and package manager

### Backend
- **FastAPI** - Modern, fast Python web framework
- **PostgreSQL** - Robust relational database
- **UV** - Fast Python package manager

## 📁 Project Structure

```
buildboard/
├── frontend/          # Next.js frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── server/           # FastAPI backend application
│   ├── api/
│   ├── src/
│   ├── pyproject.toml
│   └── ...
└── README.md
```

## 🏃‍♂️ Getting Started

### Prerequisites

- **Node.js** (18+) or **Bun**
- **Python** (3.11+)
- **PostgreSQL**
- **UV** (Python package manager)

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   uv sync
   ```

3. Set up environment variables:
   ```
   :)
   ```

4. Run the FastAPI server:
   ```bash
   uv run python main.py
   ```

The API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun dev
   ```

The frontend will be available at `http://localhost:3000`

## 🌟 Features

### Core Features
- [ ] **Project Timeline** - Chronological documentation of project progress
- [ ] **Decision Logs** - Record and explain architectural and technical decisions
- [ ] **Struggle Stories** - Document challenges, bugs, and how they were resolved
- [ ] **Code Evolution** - Track how code and architecture evolve over time
- [ ] **Learning Notes** - Capture insights and lessons learned during development

### Platform Features
- [ ] **Public/Private Projects** - Choose visibility for each project
- [ ] **Rich Text Editor** - Markdown support with code highlighting
- [ ] **Tagging System** - Organize entries by technology, topic, or phase
- [ ] **Search & Discovery** - Find projects and entries by technology or topic
- [ ] **Developer Profiles** - Showcase your development journey

## 🗺️ Roadmap

- [ ] MVP: Basic project creation and entry logging
- [ ] User authentication and profiles
- [ ] Rich text editor with code support
- [ ] Public project discovery
- [ ] Mobile-responsive design
- [ ] API for third-party integrations
- [ ] Advanced analytics and insights
- [ ] Team collaboration features

## 💡 Why BuildBoard?

Most developer portfolios show the final product, but the real learning happens in the messy middle. BuildBoard celebrates the process:

- **Transparency** - Show your real development process, including failures
- **Learning** - Learn from others' documented journeys and mistakes
- **Growth** - Track your own evolution as a developer
- **Community** - Connect with others facing similar challenges

---

**BuildBoard** - Because the journey is just as important as the destination. 🚀
