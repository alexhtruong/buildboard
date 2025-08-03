"use client";

import { useState } from "react";
import {
  Plus,
  Filter,
  GitCommit,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Target,
  Calendar,
  Clock,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { NewLogModal } from "@/components/new-log-modal";
import { ProjectStats } from "@/components/project-stats";

// Mock data for design inspiration
const projects = [
  {
    id: "1",
    name: "E-commerce Platform",
    description: "Next.js + Stripe integration",
    isPublic: true,
    techStack: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    stats: { totalLogs: 24, mistakes: 5, decisions: 8, progress: 11 },
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "AI Chat Bot",
    description: "OpenAI integration with React",
    isPublic: false,
    techStack: ["React", "OpenAI", "Node.js", "MongoDB"],
    stats: { totalLogs: 18, mistakes: 3, decisions: 6, progress: 9 },
    color: "bg-purple-500",
  },
];

const logs = [
  {
    id: "1",
    title: "Implemented Stripe webhook handling for payment confirmations",
    type: "Progress" as const,
    timestamp: "2024-01-15T10:30:00Z",
    commitHash: "a1b2c3d",
    techStack: ["Next.js", "Stripe", "TypeScript"],
    content: `Successfully integrated Stripe webhooks to handle payment confirmations. This was a critical piece for ensuring reliable payment processing.

Key implementation details:
• Created webhook endpoint at /api/webhooks/stripe
• Added proper signature verification for security
• Implemented idempotency to handle duplicate events
• Added comprehensive error handling and logging

\`\`\`typescript
export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get('stripe-signature')!
  
  const event = stripe.webhooks.constructEvent(
    body, 
    sig, 
    process.env.STRIPE_WEBHOOK_SECRET!
  )
  
  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object)
      break
    default:
      console.log(\`Unhandled event type \${event.type}\`)
  }
}
\`\`\`

This ensures reliable payment processing and proper order fulfillment. Next step is to add webhook retry logic for failed deliveries.`,
    projectId: "1",
  },
  {
    id: "2",
    title: "Database connection pooling exhaustion in production",
    type: "Mistake" as const,
    timestamp: "2024-01-14T15:45:00Z",
    commitHash: "x9y8z7w",
    techStack: ["Prisma", "PostgreSQL", "Vercel"],
    content: `Ran into connection pool exhaustion in production during high traffic. The application started throwing "too many connections" errors.

**Root cause analysis:**
• Prisma client instances weren't being reused properly
• Each serverless function was creating new connections
• Connection pool limit was set too low (10 connections)
• No proper connection cleanup in error scenarios

**Immediate fix:**
• Implemented singleton pattern for Prisma client
• Increased connection pool limit to 50
• Added proper connection cleanup in finally blocks

**Long-term solution:**
• Implemented connection pooling with PgBouncer
• Added monitoring for connection usage
• Set up alerts for connection pool utilization

This taught me the importance of proper resource management in serverless environments.`,
    projectId: "1",
  },
  {
    id: "3",
    title: "Chose Zustand over Redux Toolkit for state management",
    type: "Decision" as const,
    timestamp: "2024-01-13T09:15:00Z",
    techStack: ["React", "Zustand", "TypeScript"],
    content: `After evaluating Redux Toolkit vs Zustand vs Jotai, decided to go with Zustand for this project.

**Evaluation criteria:**
• Bundle size impact
• Developer experience
• TypeScript integration
• Learning curve for team
• Community support

**Zustand advantages:**
• Minimal boilerplate (2.9kb vs 47kb for RTK)
• Excellent TypeScript support out of the box
• Simple mental model - just stores and actions
• No providers needed
• Easy to test and debug

**Trade-offs considered:**
• Smaller ecosystem compared to Redux
• Less tooling (no Redux DevTools equivalent)
• Team familiarity with Redux patterns

**Decision rationale:**
Given our team size and project complexity, Zustand's simplicity outweighs Redux's ecosystem benefits. The reduced boilerplate should improve development velocity significantly.`,
    projectId: "1",
  },
  {
    id: "4",
    title: "Always validate webhook signatures - security lesson learned",
    type: "Lesson" as const,
    timestamp: "2024-01-12T14:20:00Z",
    techStack: ["Security", "Webhooks", "Node.js"],
    content: `Critical security lesson: Always validate webhook signatures before processing any payload data.

**What I learned:**
Without proper signature validation, malicious actors could send fake webhook events to your endpoint. This could lead to:
• Unauthorized order fulfillment
• Data corruption and inconsistency
• Financial losses from fake payment confirmations
• Security breaches and data exposure

**Best practices established:**
• Always use the service's official SDK for signature verification
• Validate signatures before any payload processing
• Use constant-time comparison to prevent timing attacks
• Log all webhook attempts for security monitoring
• Implement rate limiting on webhook endpoints

**Implementation pattern:**
\`\`\`typescript
// ❌ Wrong - processing before validation
const payload = await req.json()
await processPayment(payload)

// ✅ Correct - validate first
const signature = req.headers['stripe-signature']
const event = stripe.webhooks.constructEvent(body, signature, secret)
await processPayment(event.data.object)
\`\`\`

This is now part of our security checklist for all webhook integrations.`,
    projectId: "1",
  },
  {
    id: "5",
    title: "Migrated from REST to GraphQL for better data fetching",
    type: "Progress" as const,
    timestamp: "2024-01-11T11:20:00Z",
    commitHash: "f5e4d3c",
    techStack: ["GraphQL", "Apollo", "React"],
    content: `Completed the migration from REST API to GraphQL for our product catalog and user management.

**Migration highlights:**
• Reduced API calls by 60% through efficient queries
• Eliminated over-fetching of user profile data
• Improved mobile performance significantly
• Better developer experience with type safety

**Challenges overcome:**
• Learning curve for the team
• Caching strategy adjustments
• Error handling pattern changes

The migration is complete and we're already seeing performance improvements in production.`,
    projectId: "1",
  },
];

const tagColors = {
  Progress: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Mistake: "bg-red-500/10 text-red-600 border-red-500/20",
  Decision: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Lesson: "bg-amber-500/10 text-amber-600 border-amber-500/20",
};

const tagIcons = {
  Progress: CheckCircle,
  Mistake: AlertTriangle,
  Decision: Target,
  Lesson: Lightbulb,
};

export default function DashboardPage() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [filterTag, setFilterTag] = useState<string>("all");
  const [filterTech, setFilterTech] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewLogModalOpen, setIsNewLogModalOpen] = useState(false);

  const filteredLogs = logs.filter((log) => {
    if (log.projectId !== selectedProject.id) return false;
    if (filterTag !== "all" && log.type !== filterTag) return false;
    if (filterTech !== "all" && !log.techStack.includes(filterTech))
      return false;
    if (
      searchQuery &&
      !log.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const allTechStack = Array.from(new Set(selectedProject.techStack));

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar
        projects={projects}
        selectedProject={selectedProject}
        onProjectSelect={setSelectedProject}
      />

      <main className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div
                  className={`w-3 h-3 rounded-full ${selectedProject.color}`}
                />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {selectedProject.name}
                  </h1>
                  <p className="text-muted-foreground">
                    {selectedProject.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ProjectStats project={selectedProject} />
                <Button
                  onClick={() => setIsNewLogModalOpen(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Log
                </Button>
              </div>
            </div>
          </header>

          {/* AI Summary */}
          <div className="p-6 border-b bg-muted/30">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-primary flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-white" />
                  </div>
                  AI-Generated Project Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your e-commerce platform shows strong progress with{" "}
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    24 total logs
                  </span>{" "}
                  and consistent development velocity. Key achievements include
                  successful Stripe integration and GraphQL migration. You&apos;ve
                  demonstrated excellent learning from
                  <span className="text-red-600 dark:text-red-400 font-medium">
                    5 documented mistakes
                  </span>
                  , particularly around database connection pooling and security
                  practices. Recent architectural decisions show thoughtful
                  evaluation of trade-offs.
                  <span className="text-primary font-medium">
                    Recommended focus:
                  </span>{" "}
                  Error handling patterns and performance optimization for
                  upcoming features.
                </p>
              </CardContent>
            </Card>

            {/* Filters */}
            <div className="p-6 border-b">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    Filters:
                  </span>
                </div>

                <Select value={filterTag} onValueChange={setFilterTag}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tags</SelectItem>
                    <SelectItem value="Progress">Progress</SelectItem>
                    <SelectItem value="Mistake">Mistake</SelectItem>
                    <SelectItem value="Decision">Decision</SelectItem>
                    <SelectItem value="Lesson">Lesson</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterTech} onValueChange={setFilterTech}>
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder="Tech Stack" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Technologies</SelectItem>
                    {allTechStack.map((tech) => (
                      <SelectItem key={tech} value={tech}>
                        {tech}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                />

                <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{filteredLogs.length} logs found</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex-1 overflow-auto p-6">
              <div className="space-y-6">
                {filteredLogs.map((log, index) => {
                  const TagIcon = tagIcons[log.type];
                  return (
                    <div key={log.id} className="relative">
                      {index !== filteredLogs.length - 1 && (
                        <div className="absolute left-6 top-16 bottom-0 w-px bg-border" />
                      )}

                      <Card className="ml-12 hover:shadow-md transition-all duration-200 hover:shadow-primary/10">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="absolute -left-6 w-12 h-12 rounded-full bg-background border-2 flex items-center justify-center">
                                <TagIcon className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-lg text-foreground leading-tight">
                                  {log.title}
                                </CardTitle>
                                <div className="flex items-center gap-3 mt-2">
                                  <Badge
                                    className={`${tagColors[log.type]} font-medium`}
                                  >
                                    {log.type}
                                  </Badge>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span>
                                      {new Date(
                                        log.timestamp
                                      ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </span>
                                  </div>
                                  {log.commitHash && (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <GitCommit className="h-3 w-3" />
                                      <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">
                                        {log.commitHash}
                                      </code>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 justify-end">
                              {log.techStack.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <div className="font-mono text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                              {log.content}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}

                {filteredLogs.length === 0 && (
                  <div className="text-center py-12">
                    <Code2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                      No logs found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or create a new log entry.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <NewLogModal
        isOpen={isNewLogModalOpen}
        onClose={() => setIsNewLogModalOpen(false)}
        projectId={selectedProject.id}
        techStack={selectedProject.techStack}
      />
    </div>
  );
}
