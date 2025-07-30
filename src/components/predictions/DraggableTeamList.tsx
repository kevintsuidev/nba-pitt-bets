"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";

interface Team {
  id: string;
  name: string;
  logo: string;
  position?: number;
}

interface DraggableTeamListProps {
  conference?: string;
  teams: Team[];
  onTeamsReordered?: (conference: string, teams: Team[]) => void;
  onReorder?: (teams: Team[]) => void;
  maxDisplayed?: number;
  highlightTop?: number;
}

export default function DraggableTeamList({
  conference = "Eastern",
  teams = [
    {
      id: "1",
      name: "Boston Celtics",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=celtics",
    },
    {
      id: "2",
      name: "Milwaukee Bucks",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=bucks",
    },
    {
      id: "3",
      name: "Philadelphia 76ers",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=76ers",
    },
    {
      id: "4",
      name: "New York Knicks",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=knicks",
    },
    {
      id: "5",
      name: "Cleveland Cavaliers",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=cavs",
    },
    {
      id: "6",
      name: "Miami Heat",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=heat",
    },
    {
      id: "7",
      name: "Indiana Pacers",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=pacers",
    },
    {
      id: "8",
      name: "Orlando Magic",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=magic",
    },
    {
      id: "9",
      name: "Chicago Bulls",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=bulls",
    },
    {
      id: "10",
      name: "Atlanta Hawks",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=hawks",
    },
  ],
  onTeamsReordered = () => {},
  onReorder,
  maxDisplayed = 10,
  highlightTop = 0,
}: DraggableTeamListProps) {
  const [orderedTeams, setOrderedTeams] = useState<Team[]>([]);
  const [draggedTeam, setDraggedTeam] = useState<Team | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    // Assign positions to teams if they don't have them
    const teamsWithPositions = teams.map((team, index) => ({
      ...team,
      position: team.position || index + 1,
    }));

    // Sort teams by position
    const sortedTeams = [...teamsWithPositions].sort(
      (a, b) => (a.position || 0) - (b.position || 0),
    );

    setOrderedTeams(sortedTeams);
  }, [teams]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, team: Team) => {
    setDraggedTeam(team);
    // Make the drag image transparent
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
    }
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedTeam(null);
    setDragOverIndex(null);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number,
  ) => {
    e.preventDefault();

    if (!draggedTeam) return;

    const draggedIndex = orderedTeams.findIndex(
      (team) => team.id === draggedTeam.id,
    );
    if (draggedIndex === -1) return;

    // Create a new array without the dragged team
    const newOrderedTeams = orderedTeams.filter(
      (team) => team.id !== draggedTeam.id,
    );

    // Insert the dragged team at the drop position
    newOrderedTeams.splice(dropIndex, 0, draggedTeam);

    // Update positions
    const updatedTeams = newOrderedTeams.map((team, index) => ({
      ...team,
      position: index + 1,
    }));

    setOrderedTeams(updatedTeams);
    if (onTeamsReordered) {
      onTeamsReordered(conference, updatedTeams);
    }
    if (onReorder) {
      onReorder(updatedTeams);
    }

    setDraggedTeam(null);
    setDragOverIndex(null);
  };

  return (
    <Card className="p-4 bg-card text-card-foreground w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{conference} Conference</h3>
      </div>

      <div className="space-y-2">
        {orderedTeams.slice(0, maxDisplayed).map((team, index) => {
          const isPlayoffTeam = highlightTop > 0 && index < highlightTop;
          return (
            <div
              key={team.id}
              className={`flex items-center p-3 rounded-md relative cursor-grab active:cursor-grabbing ${dragOverIndex === index ? "bg-accent" : "bg-secondary/20"} ${draggedTeam?.id === team.id ? "opacity-50" : ""} ${isPlayoffTeam ? "border-l-4 border-red-500 bg-red-50/10" : ""}`}
              draggable
              onDragStart={(e) => handleDragStart(e, team)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              onDrop={(e) => handleDrop(e, index)}
            >
              {isPlayoffTeam && (
                <div className="absolute -left-1 top-0 bottom-0 w-1 bg-red-500 rounded-r"></div>
              )}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${isPlayoffTeam ? "bg-red-500/20 text-red-200 font-bold" : "bg-primary/10 text-white"}`}
              >
                {team.position}
              </div>

              <div className="flex items-center flex-1">
                <div className="w-8 h-8 mr-3 rounded-full overflow-hidden">
                  <img
                    src={team.logo}
                    alt={`${team.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className={`font-medium text-white ${isPlayoffTeam ? "text-red-200" : ""}`}
                >
                  {team.name}
                </span>
                {isPlayoffTeam && (
                  <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                    PLAYOFFS
                  </span>
                )}
              </div>

              <div className="text-white/50">
                <GripVertical className="h-4 w-4" />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
