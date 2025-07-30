"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DraggableTeamList from "./DraggableTeamList";
import { Badge } from "@/components/ui/badge";
import { Save } from "lucide-react";

// Mock data for NBA teams
const easternTeams = [
  {
    id: "bos",
    name: "Boston Celtics",
    logo: "https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg",
  },
  {
    id: "nyk",
    name: "New York Knicks",
    logo: "https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg",
  },
  {
    id: "phi",
    name: "Philadelphia 76ers",
    logo: "https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg",
  },
  {
    id: "bkn",
    name: "Brooklyn Nets",
    logo: "https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg",
  },
  {
    id: "tor",
    name: "Toronto Raptors",
    logo: "https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg",
  },
  {
    id: "mil",
    name: "Milwaukee Bucks",
    logo: "https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg",
  },
  {
    id: "cle",
    name: "Cleveland Cavaliers",
    logo: "https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg",
  },
  {
    id: "chi",
    name: "Chicago Bulls",
    logo: "https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg",
  },
  {
    id: "ind",
    name: "Indiana Pacers",
    logo: "https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg",
  },
  {
    id: "det",
    name: "Detroit Pistons",
    logo: "https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg",
  },
  {
    id: "mia",
    name: "Miami Heat",
    logo: "https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg",
  },
  {
    id: "orl",
    name: "Orlando Magic",
    logo: "https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg",
  },
  {
    id: "atl",
    name: "Atlanta Hawks",
    logo: "https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg",
  },
  {
    id: "cha",
    name: "Charlotte Hornets",
    logo: "https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg",
  },
  {
    id: "was",
    name: "Washington Wizards",
    logo: "https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg",
  },
];

const westernTeams = [
  {
    id: "lal",
    name: "Los Angeles Lakers",
    logo: "https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg",
  },
  {
    id: "lac",
    name: "LA Clippers",
    logo: "https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg",
  },
  {
    id: "gsw",
    name: "Golden State Warriors",
    logo: "https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg",
  },
  {
    id: "sac",
    name: "Sacramento Kings",
    logo: "https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg",
  },
  {
    id: "phx",
    name: "Phoenix Suns",
    logo: "https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg",
  },
  {
    id: "den",
    name: "Denver Nuggets",
    logo: "https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg",
  },
  {
    id: "min",
    name: "Minnesota Timberwolves",
    logo: "https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg",
  },
  {
    id: "uta",
    name: "Utah Jazz",
    logo: "https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg",
  },
  {
    id: "por",
    name: "Portland Trail Blazers",
    logo: "https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg",
  },
  {
    id: "okc",
    name: "Oklahoma City Thunder",
    logo: "https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg",
  },
  {
    id: "dal",
    name: "Dallas Mavericks",
    logo: "https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg",
  },
  {
    id: "hou",
    name: "Houston Rockets",
    logo: "https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg",
  },
  {
    id: "mem",
    name: "Memphis Grizzlies",
    logo: "https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg",
  },
  {
    id: "sas",
    name: "San Antonio Spurs",
    logo: "https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg",
  },
  {
    id: "nop",
    name: "New Orleans Pelicans",
    logo: "https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg",
  },
];

interface Team {
  id: string;
  name: string;
  logo: string;
}

interface ConferenceStandingsProps {
  initialEasternTeams?: Team[];
  initialWesternTeams?: Team[];
  onSave?: (eastern: Team[], western: Team[]) => void;
  currentPoints?: number;
}

export default function ConferenceStandings({
  initialEasternTeams = easternTeams,
  initialWesternTeams = westernTeams,
  onSave = () => {},
  currentPoints = 0,
}: ConferenceStandingsProps) {
  const [eastern, setEastern] = useState<Team[]>(initialEasternTeams);
  const [western, setWestern] = useState<Team[]>(initialWesternTeams);
  const [activeTab, setActiveTab] = useState<string>("eastern");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Auto-save whenever predictions change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSave(eastern, western);
    }, 1000); // Debounce auto-save by 1 second

    return () => clearTimeout(timeoutId);
  }, [eastern, western, onSave]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // In a real implementation, this would save to a database
      onSave(eastern, western);
      setTimeout(() => {
        setIsSaving(false);
      }, 1000);
    } catch (error) {
      console.error("Error saving predictions:", error);
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full bg-background text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold">
            Conference Standings Predictions
          </h1>
          <p className="text-muted-foreground text-sm lg:text-base">
            Drag and drop teams to predict their final standings position.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs lg:text-sm font-medium">
              Current Points:
            </span>
            <Badge
              variant="secondary"
              className="text-sm lg:text-lg px-2 lg:px-3 py-1"
            >
              {currentPoints}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            Auto-saving changes...
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4 lg:mb-6">
          <TabsTrigger value="eastern" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Eastern Conference</span>
            <span className="sm:hidden">Eastern</span>
          </TabsTrigger>
          <TabsTrigger value="western" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Western Conference</span>
            <span className="sm:hidden">Western</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="eastern" className="w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Eastern Conference Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="text-sm font-medium text-red-800">
                  🏀 Top 8 teams make the playoffs
                </p>
              </div>
              <DraggableTeamList
                teams={eastern}
                onReorder={setEastern}
                maxDisplayed={15}
                highlightTop={8}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="western" className="w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Western Conference Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="text-sm font-medium text-red-800">
                  🏀 Top 8 teams make the playoffs
                </p>
              </div>
              <DraggableTeamList
                teams={western}
                onReorder={setWestern}
                maxDisplayed={15}
                highlightTop={8}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="font-medium mb-2">Scoring System</h3>
        <ul className="list-disc list-inside text-sm text-muted-foreground">
          <li>+5 points for each team correctly predicted in the top 10</li>
          <li>
            +10 points for each team correctly predicted in exact position
          </li>
          <li>Predictions are locked once the regular season begins</li>
        </ul>
      </div>
    </div>
  );
}
