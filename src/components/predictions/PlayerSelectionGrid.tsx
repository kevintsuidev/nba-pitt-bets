"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  imageUrl?: string;
}

interface AllNBATeam {
  name: string;
  slots: {
    position: string;
    player: Player | null;
  }[];
}

interface Award {
  name: string;
  description: string;
  player: Player | null;
}

interface PlayerSelectionGridProps {
  type: "all-nba" | "awards";
  onSave?: (data: AllNBATeam[] | Award[]) => void;
  initialData?: AllNBATeam[] | Award[];
}

const mockPlayers: Player[] = [
  {
    id: "1",
    name: "LeBron James",
    position: "F",
    team: "Los Angeles Lakers",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=lebron",
  },
  {
    id: "2",
    name: "Stephen Curry",
    position: "G",
    team: "Golden State Warriors",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=curry",
  },
  {
    id: "3",
    name: "Nikola Jokic",
    position: "C",
    team: "Denver Nuggets",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jokic",
  },
  {
    id: "4",
    name: "Giannis Antetokounmpo",
    position: "F",
    team: "Milwaukee Bucks",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=giannis",
  },
  {
    id: "5",
    name: "Luka Doncic",
    position: "G",
    team: "Dallas Mavericks",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=luka",
  },
  {
    id: "6",
    name: "Joel Embiid",
    position: "C",
    team: "Philadelphia 76ers",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=embiid",
  },
  {
    id: "7",
    name: "Kevin Durant",
    position: "F",
    team: "Phoenix Suns",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=durant",
  },
  {
    id: "8",
    name: "Jayson Tatum",
    position: "F",
    team: "Boston Celtics",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=tatum",
  },
  {
    id: "9",
    name: "Ja Morant",
    position: "G",
    team: "Memphis Grizzlies",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=morant",
  },
  {
    id: "10",
    name: "Anthony Edwards",
    position: "G",
    team: "Minnesota Timberwolves",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=edwards",
  },
];

const defaultAllNBATeams: AllNBATeam[] = [
  {
    name: "1st Team All-NBA",
    slots: [
      { position: "G", player: null },
      { position: "G", player: null },
      { position: "F", player: null },
      { position: "F", player: null },
      { position: "C", player: null },
    ],
  },
  {
    name: "2nd Team All-NBA",
    slots: [
      { position: "G", player: null },
      { position: "G", player: null },
      { position: "F", player: null },
      { position: "F", player: null },
      { position: "C", player: null },
    ],
  },
  {
    name: "3rd Team All-NBA",
    slots: [
      { position: "G", player: null },
      { position: "G", player: null },
      { position: "F", player: null },
      { position: "F", player: null },
      { position: "C", player: null },
    ],
  },
];

const defaultAwards: Award[] = [
  { name: "MVP", description: "Most Valuable Player", player: null },
  { name: "DPOY", description: "Defensive Player of the Year", player: null },
  { name: "ROTY", description: "Rookie of the Year", player: null },
  { name: "MIP", description: "Most Improved Player", player: null },
  { name: "6MOY", description: "Sixth Man of the Year", player: null },
  { name: "COTY", description: "Coach of the Year", player: null },
  {
    name: "Finals MVP",
    description: "Finals Most Valuable Player",
    player: null,
  },
];

const PlayerSelectionGrid: React.FC<PlayerSelectionGridProps> = ({
  type = "all-nba",
  onSave = () => {},
  initialData,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [allNBATeams, setAllNBATeams] = useState<AllNBATeam[]>(
    (initialData as AllNBATeam[]) || defaultAllNBATeams,
  );
  const [awards, setAwards] = useState<Award[]>(
    (initialData as Award[]) || defaultAwards,
  );
  const [selectedSlot, setSelectedSlot] = useState<{
    teamIndex?: number;
    slotIndex?: number;
    awardIndex?: number;
  } | null>(null);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(mockPlayers);

  useEffect(() => {
    let filtered = mockPlayers;

    if (searchTerm) {
      filtered = filtered.filter((player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedPosition) {
      filtered = filtered.filter(
        (player) => player.position === selectedPosition,
      );
    }

    setFilteredPlayers(filtered);
  }, [searchTerm, selectedPosition]);

  const handlePlayerSelect = (player: Player) => {
    if (!selectedSlot) return;

    if (
      type === "all-nba" &&
      selectedSlot.teamIndex !== undefined &&
      selectedSlot.slotIndex !== undefined
    ) {
      const newTeams = [...allNBATeams];
      newTeams[selectedSlot.teamIndex].slots[selectedSlot.slotIndex].player =
        player;
      setAllNBATeams(newTeams);
    } else if (type === "awards" && selectedSlot.awardIndex !== undefined) {
      const newAwards = [...awards];
      newAwards[selectedSlot.awardIndex].player = player;
      setAwards(newAwards);
    }

    setSelectedSlot(null);
  };

  // Auto-save whenever selections change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (type === "all-nba") {
        onSave(allNBATeams);
      } else {
        onSave(awards);
      }
    }, 1000); // Debounce auto-save by 1 second

    return () => clearTimeout(timeoutId);
  }, [allNBATeams, awards, type, onSave]);

  const handleSave = () => {
    if (type === "all-nba") {
      onSave(allNBATeams);
    } else {
      onSave(awards);
    }
  };

  const handleClearSlot = () => {
    if (!selectedSlot) return;

    if (
      type === "all-nba" &&
      selectedSlot.teamIndex !== undefined &&
      selectedSlot.slotIndex !== undefined
    ) {
      const newTeams = [...allNBATeams];
      newTeams[selectedSlot.teamIndex].slots[selectedSlot.slotIndex].player =
        null;
      setAllNBATeams(newTeams);
    } else if (type === "awards" && selectedSlot.awardIndex !== undefined) {
      const newAwards = [...awards];
      newAwards[selectedSlot.awardIndex].player = null;
      setAwards(newAwards);
    }

    setSelectedSlot(null);
  };

  const renderAllNBATeams = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {allNBATeams.map((team, teamIndex) => (
          <Card key={teamIndex} className="bg-card">
            <CardHeader>
              <CardTitle className="text-center">{team.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {team.slots.map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className={`p-3 border rounded-md flex items-center justify-between cursor-pointer ${selectedSlot?.teamIndex === teamIndex && selectedSlot?.slotIndex === slotIndex ? "border-primary" : "border-border"}`}
                    onClick={() => setSelectedSlot({ teamIndex, slotIndex })}
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{slot.position}</Badge>
                      {slot.player ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <img
                              src={slot.player.imageUrl}
                              alt={slot.player.name}
                            />
                          </Avatar>
                          <div>
                            <p className="font-medium">{slot.player.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {slot.player.team}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Select player</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderAwards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {awards.map((award, awardIndex) => (
          <Card key={awardIndex} className="bg-card">
            <CardHeader>
              <CardTitle>{award.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {award.description}
              </p>
            </CardHeader>
            <CardContent>
              <div
                className={`p-4 border rounded-md flex items-center justify-between cursor-pointer ${selectedSlot?.awardIndex === awardIndex ? "border-primary" : "border-border"}`}
                onClick={() => setSelectedSlot({ awardIndex })}
              >
                {award.player ? (
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <img
                        src={award.player.imageUrl}
                        alt={award.player.name}
                      />
                    </Avatar>
                    <div>
                      <p className="font-medium">{award.player.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {award.player.team} | {award.player.position}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Select player</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-background text-foreground p-4 lg:p-6 rounded-lg space-y-4 lg:space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-xl lg:text-2xl font-bold">
          {type === "all-nba" ? "All-NBA Teams" : "NBA Awards"}
        </h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="text-xs text-muted-foreground self-end sm:self-center">
            Auto-saving changes...
          </div>
          {selectedSlot && (
            <Button onClick={handleClearSlot} variant="outline" size="sm">
              Clear Selection
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2 order-2 lg:order-1">
          {type === "all-nba" ? renderAllNBATeams() : renderAwards()}
        </div>

        <div className="space-y-4 order-1 lg:order-2">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Player Search</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search players..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {["G", "F", "C"].map((pos) => (
                  <Badge
                    key={pos}
                    variant={selectedPosition === pos ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() =>
                      setSelectedPosition(selectedPosition === pos ? null : pos)
                    }
                  >
                    {pos}
                  </Badge>
                ))}
                {selectedPosition && (
                  <Badge
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => setSelectedPosition(null)}
                  >
                    Clear
                  </Badge>
                )}
              </div>

              <div className="h-[300px] lg:h-[400px] overflow-y-auto border rounded-md p-2">
                {filteredPlayers.length > 0 ? (
                  <div className="space-y-2">
                    {filteredPlayers.map((player) => (
                      <div
                        key={player.id}
                        className="p-2 hover:bg-accent rounded-md cursor-pointer flex items-center justify-between"
                        onClick={() => handlePlayerSelect(player)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <img src={player.imageUrl} alt={player.name} />
                          </Avatar>
                          <div>
                            <p className="font-medium">{player.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {player.team} | {player.position}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">{player.position}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No players found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlayerSelectionGrid;
