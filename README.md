# 🔧 BuildBoard – Build in Public, but Structured

BuildBoard is a full-stack platform where developers, engineers, and learners document their project journeys — not just the end results. It's designed to capture and organize the real work behind building something: the progress logs, tough decisions, mistakes made, and the lessons learned.

Instead of tweeting sporadic updates or losing technical context in Notion docs or GitHub issues, BuildBoard gives users a structured way to share the evolution of any project — turning messy development into meaningful narrative.

## 🚀 Core Features

- **Project Timelines**: Each project becomes a public or private timeline of logs, tagged as progress, mistake, decision, or lesson
- **Smart Search**: Logs are searchable across projects, filterable by stack, and enriched with AI summaries to surface key learnings
- **Developer Integration**: GitHub commits, tool tags, and community engagement features make BuildBoard feel like a dev blog crossed with a structured, searchable digital lab notebook

## 🎯 Who It's For

BuildBoard is designed to support:

- 💡 **Developers learning in public**
- 🧠 **Teams reflecting on technical decisions**
- 🧰 **Builders creating a living portfolio that shows how they think, not just what they built**

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

### Core Platform
- [ ] **Structured Project Logs** - Document progress, decisions, mistakes, and lessons with dedicated entry types
- [ ] **Timeline View** - Chronological visualization of project evolution
- [ ] **Smart Tagging** - Organize entries by technology stack, project phase, or custom tags
- [ ] **AI-Powered Summaries** - Surface key learnings and patterns across projects
- [ ] **Public/Private Projects** - Choose visibility for each project and individual entries

### Developer Experience
- [ ] **GitHub Integration** - Connect commits and code changes to project logs
- [ ] **Rich Text Editor** - Markdown support with code syntax highlighting
- [ ] **Search & Discovery** - Find projects and insights across the platform
- [ ] **Tool Integration** - Tag entries with development tools and frameworks
- [ ] **Export Options** - Generate reports and portfolios from your project data

### Community Features
- [ ] **Developer Profiles** - Showcase your learning journey and technical evolution
- [ ] **Knowledge Graph** - Connect related mistakes, decisions, and learnings
- [ ] **Engagement System** - Comment, bookmark, and learn from others' experiences

## 🗺️ Roadmap

### Phase 1: MVP
- [ ] Project creation and structured log entry system
- [ ] Timeline visualization with entry type indicators
- [ ] Basic search and filtering
- [ ] User authentication and profiles

### Phase 2: Intelligence
- [ ] AI-powered summaries and insights
- [ ] GitHub integration for commit tracking
- [ ] Advanced search with cross-project patterns
- [ ] Rich text editor with enhanced code support

### Phase 3: Community
- [ ] Public project discovery
- [ ] Knowledge graph connections
- [ ] Community engagement features
- [ ] Team collaboration tools

### Phase 4: Scale
- [ ] Mobile-responsive design
- [ ] API for third-party integrations
- [ ] Advanced analytics and reporting
- [ ] Enterprise team features

## � Why BuildBoard Matters

Most dev portfolios are snapshots of the finish line. BuildBoard shows the path. It reflects how people build, debug, and evolve — turning "mistakes" into a knowledge graph, and "logs" into career capital.

**BuildBoard transforms:**
- **Scattered updates** → **Structured narratives**
- **Lost context** → **Searchable knowledge**
- **Individual mistakes** → **Collective learning**
- **Static portfolios** → **Living documentation of growth**

---

**BuildBoard** – Because the path matters as much as the destination. Turn your development journey into career capital. 🚀
