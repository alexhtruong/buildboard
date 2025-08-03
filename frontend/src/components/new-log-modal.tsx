"use client";

import type React from "react";

import { useState } from "react";
import {
  GitCommit,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NewLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  techStack: string[];
}

const logTypeOptions = [
  {
    value: "Progress",
    label: "Progress",
    description: "Feature completed or milestone reached",
    icon: CheckCircle,
    color: "text-emerald-500",
  },
  {
    value: "Mistake",
    label: "Mistake",
    description: "Error made and how it was resolved",
    icon: AlertTriangle,
    color: "text-red-500",
  },
  {
    value: "Decision",
    label: "Decision",
    description: "Architecture or technical choice made",
    icon: Target,
    color: "text-blue-500",
  },
  {
    value: "Lesson",
    label: "Lesson",
    description: "Key insight or learning discovered",
    icon: Lightbulb,
    color: "text-amber-500",
  },
];

export function NewLogModal({
  isOpen,
  onClose,
  projectId,
  techStack,
}: NewLogModalProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [commitHash, setCommitHash] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ title, type, content, commitHash, selectedTech, projectId });
    onClose();
    // Reset form
    setTitle("");
    setType("");
    setContent("");
    setCommitHash("");
    setSelectedTech([]);
  };

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const selectedLogType = logTypeOptions.find(
    (option) => option.value === type
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Log Entry</DialogTitle>
          <DialogDescription>
            Document your progress, mistakes, decisions, or lessons learned.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Brief description of what happened..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Log Type</Label>
            <Select value={type} onValueChange={setType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select log type" />
              </SelectTrigger>
              <SelectContent>
                {logTypeOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${option.color}`} />
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {option.description}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Describe what happened, what you learned, code snippets, etc. Supports markdown formatting..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="font-mono text-sm"
              required
            />
            <p className="text-xs text-muted-foreground">
              💡 Tip: Use markdown formatting. Code blocks with \`\`\`language
              syntax are supported.
            </p>
          </div>

          {/* Optional Metadata */}
          <div className="grid grid-cols-2 gap-4">
            {/* Commit Hash */}
            <div className="space-y-2">
              <Label htmlFor="commit">Git Commit (Optional)</Label>
              <div className="relative">
                <GitCommit className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="commit"
                  placeholder="a1b2c3d"
                  value={commitHash}
                  onChange={(e) => setCommitHash(e.target.value)}
                  className="pl-10 font-mono"
                />
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <Label>Related Technologies</Label>
              <div className="flex flex-wrap gap-2 p-3 bg-muted border rounded-md min-h-[42px]">
                {techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant={
                      selectedTech.includes(tech) ? "default" : "outline"
                    }
                    className={`cursor-pointer text-xs ${
                      selectedTech.includes(tech)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                    }`}
                    onClick={() => toggleTech(tech)}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          {selectedLogType && (
            <div className="p-4 bg-muted/50 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <selectedLogType.icon
                  className={`h-4 w-4 ${selectedLogType.color}`}
                />
                <span className="text-sm font-medium">Preview</span>
              </div>
              <div className="text-sm text-muted-foreground">
                This will be logged as a{" "}
                <span className={selectedLogType.color}>
                  {selectedLogType.label}
                </span>{" "}
                entry
                {selectedTech.length > 0 && (
                  <>
                    {" "}
                    related to{" "}
                    <span className="text-foreground">
                      {selectedTech.join(", ")}
                    </span>
                  </>
                )}
                .
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Log Entry</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
