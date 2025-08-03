"use client";

import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Target,
  Lightbulb,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

interface ProjectStatsProps {
  project: Project;
}

export function ProjectStats({ project }: ProjectStatsProps) {
  const { stats } = project;
  const lessonsCount =
    stats.totalLogs - stats.progress - stats.mistakes - stats.decisions;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <BarChart3 className="mr-2 h-4 w-4" />
          Stats
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Project Statistics</CardTitle>
            <CardDescription>
              Overview of your development journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg border">
                <div className="text-2xl font-bold text-primary">
                  {stats.totalLogs}
                </div>
                <div className="text-xs text-muted-foreground">Total Logs</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg border">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {stats.progress}
                </div>
                <div className="text-xs text-muted-foreground">Progress</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm">Progress</span>
                </div>
                <span className="font-medium">{stats.progress}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <span className="text-sm">Mistakes</span>
                </div>
                <span className="font-medium">{stats.mistakes}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm">Decisions</span>
                </div>
                <span className="font-medium">{stats.decisions}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-sm">Lessons</span>
                </div>
                <span className="font-medium">{lessonsCount}</span>
              </div>
            </div>

            <div className="pt-3 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>Avg. 2.3 logs per week</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
