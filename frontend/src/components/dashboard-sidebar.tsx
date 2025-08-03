"use client";

import {
  Plus,
  Settings,
  Globe,
  Lock,
  MoreHorizontal,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Project {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  techStack: string[];
  stats: {
    totalLogs: number;
    mistakes: number;
    decisions: number;
    progress: number;
  };
  color: string;
}

interface DashboardSidebarProps {
  projects: Project[];
  selectedProject: Project;
  onProjectSelect: (project: Project) => void;
}

export function DashboardSidebar({
  projects,
  selectedProject,
  onProjectSelect,
}: DashboardSidebarProps) {
  return (
    <aside className="w-80 border-r bg-muted/30 flex flex-col">
      {/* User Profile */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarImage src="/placeholder.svg?height=40&width=40&text=JD" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-foreground">John Developer</p>
            <p className="text-sm text-muted-foreground">john@buildboard.dev</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Projects */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Projects</h2>
            <Button size="sm" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              New
            </Button>
          </div>

          <div className="space-y-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                className={`cursor-pointer transition-all duration-200 hover:bg-accent/50 ${
                  selectedProject.id === project.id
                    ? "ring-2 ring-primary/50 bg-accent/50"
                    : ""
                }`}
                onClick={() => onProjectSelect(project)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={`w-3 h-3 rounded-full ${project.color} mt-1 flex-shrink-0`}
                      />
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm text-foreground truncate">
                          {project.name}
                        </CardTitle>
                        <CardDescription className="text-xs mt-1 line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      {project.isPublic ? (
                        <Globe className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Lock className="h-3 w-3 text-muted-foreground" />
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-foreground"
                          >
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Project</DropdownMenuItem>
                          <DropdownMenuItem>View Public Page</DropdownMenuItem>
                          <DropdownMenuItem>Export Logs</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs px-1.5 py-0.5"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="text-xs px-1.5 py-0.5"
                      >
                        +{project.techStack.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {project.stats.totalLogs} logs • {project.stats.progress}{" "}
                    progress
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-6 border-t">
        <h3 className="font-medium mb-4 text-foreground flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          This Week
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              <span className="text-sm text-muted-foreground">New Logs</span>
            </div>
            <span className="font-medium text-foreground">12</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-600 dark:bg-red-400" />
              <span className="text-sm text-muted-foreground">
                Mistakes Logged
              </span>
            </div>
            <span className="font-medium text-foreground">3</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-600 dark:bg-amber-400" />
              <span className="text-sm text-muted-foreground">
                Lessons Learned
              </span>
            </div>
            <span className="font-medium text-foreground">5</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Zap className="h-3 w-3" />
            <span>Streak: 7 days</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
