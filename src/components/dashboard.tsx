"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, Award, TrendingUp, LogIn, Eye } from "lucide-react";
import ConferenceStandings from "./predictions/ConferenceStandings";
import PlayerSelectionGrid from "./predictions/PlayerSelectionGrid";
import { Badge } from "./ui/badge";

interface DashboardProps {
  className?: string;
}

interface UserPredictions {
  standings?: {
    eastern: any[];
    western: any[];
  };
  allNBA?: any[];
  awards?: any[];
  props?: any[];
}

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  predictions?: UserPredictions;
}

export function Dashboard({ className = "" }: DashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("standings");
  const [isSeasonLocked, setIsSeasonLocked] = useState(false);
  const [allUsersPredictions, setAllUsersPredictions] = useState<User[]>([]);
  const [selectedUserForComparison, setSelectedUserForComparison] = useState<
    string | null
  >(null);

  // Check if NBA season has started (October 22nd)
  useEffect(() => {
    const nbaStartDate = new Date("2024-10-22");
    const currentDate = new Date();
    setIsSeasonLocked(currentDate >= nbaStartDate);

    // Mock loading all users' predictions if season is locked
    if (currentDate >= nbaStartDate) {
      // In a real app, this would fetch from your database
      setAllUsersPredictions([
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          predictions: {
            standings: {
              eastern: [
                { id: "bos", name: "Boston Celtics", position: 1 },
                { id: "nyk", name: "New York Knicks", position: 2 },
                { id: "phi", name: "Philadelphia 76ers", position: 3 },
                { id: "mil", name: "Milwaukee Bucks", position: 4 },
                { id: "cle", name: "Cleveland Cavaliers", position: 5 },
                { id: "mia", name: "Miami Heat", position: 6 },
                { id: "ind", name: "Indiana Pacers", position: 7 },
                { id: "orl", name: "Orlando Magic", position: 8 },
              ],
              western: [
                { id: "den", name: "Denver Nuggets", position: 1 },
                { id: "gsw", name: "Golden State Warriors", position: 2 },
                { id: "lal", name: "Los Angeles Lakers", position: 3 },
                { id: "phx", name: "Phoenix Suns", position: 4 },
                { id: "dal", name: "Dallas Mavericks", position: 5 },
                { id: "min", name: "Minnesota Timberwolves", position: 6 },
                { id: "okc", name: "Oklahoma City Thunder", position: 7 },
                { id: "lac", name: "LA Clippers", position: 8 },
              ],
            },
            allNBA: [
              {
                team: "1st Team",
                players: [
                  "LeBron James",
                  "Stephen Curry",
                  "Nikola Jokic",
                  "Giannis Antetokounmpo",
                  "Luka Doncic",
                ],
              },
              {
                team: "2nd Team",
                players: [
                  "Joel Embiid",
                  "Kevin Durant",
                  "Jayson Tatum",
                  "Ja Morant",
                  "Anthony Edwards",
                ],
              },
            ],
            awards: [
              { award: "MVP", player: "Nikola Jokic" },
              { award: "DPOY", player: "Giannis Antetokounmpo" },
              { award: "ROTY", player: "Victor Wembanyama" },
              { award: "6MOY", player: "Malcolm Brogdon" },
            ],
          },
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          predictions: {
            standings: {
              eastern: [
                { id: "mil", name: "Milwaukee Bucks", position: 1 },
                { id: "bos", name: "Boston Celtics", position: 2 },
                { id: "phi", name: "Philadelphia 76ers", position: 3 },
                { id: "cle", name: "Cleveland Cavaliers", position: 4 },
                { id: "nyk", name: "New York Knicks", position: 5 },
                { id: "mia", name: "Miami Heat", position: 6 },
                { id: "orl", name: "Orlando Magic", position: 7 },
                { id: "ind", name: "Indiana Pacers", position: 8 },
              ],
              western: [
                { id: "phx", name: "Phoenix Suns", position: 1 },
                { id: "den", name: "Denver Nuggets", position: 2 },
                { id: "gsw", name: "Golden State Warriors", position: 3 },
                { id: "dal", name: "Dallas Mavericks", position: 4 },
                { id: "lal", name: "Los Angeles Lakers", position: 5 },
                { id: "lac", name: "LA Clippers", position: 6 },
                { id: "min", name: "Minnesota Timberwolves", position: 7 },
                { id: "sac", name: "Sacramento Kings", position: 8 },
              ],
            },
            allNBA: [
              {
                team: "1st Team",
                players: [
                  "Giannis Antetokounmpo",
                  "Luka Doncic",
                  "Joel Embiid",
                  "Kevin Durant",
                  "Stephen Curry",
                ],
              },
              {
                team: "2nd Team",
                players: [
                  "LeBron James",
                  "Jayson Tatum",
                  "Nikola Jokic",
                  "Anthony Edwards",
                  "Ja Morant",
                ],
              },
            ],
            awards: [
              { award: "MVP", player: "Giannis Antetokounmpo" },
              { award: "DPOY", player: "Rudy Gobert" },
              { award: "ROTY", player: "Paolo Banchero" },
              { award: "6MOY", player: "Tyler Herro" },
            ],
          },
        },
        {
          id: "3",
          name: "Mike Johnson",
          email: "mike@example.com",
          predictions: {
            standings: {
              eastern: [
                { id: "phi", name: "Philadelphia 76ers", position: 1 },
                { id: "bos", name: "Boston Celtics", position: 2 },
                { id: "mil", name: "Milwaukee Bucks", position: 3 },
                { id: "nyk", name: "New York Knicks", position: 4 },
                { id: "cle", name: "Cleveland Cavaliers", position: 5 },
                { id: "ind", name: "Indiana Pacers", position: 6 },
                { id: "mia", name: "Miami Heat", position: 7 },
                { id: "atl", name: "Atlanta Hawks", position: 8 },
              ],
              western: [
                { id: "lal", name: "Los Angeles Lakers", position: 1 },
                { id: "den", name: "Denver Nuggets", position: 2 },
                { id: "phx", name: "Phoenix Suns", position: 3 },
                { id: "gsw", name: "Golden State Warriors", position: 4 },
                { id: "dal", name: "Dallas Mavericks", position: 5 },
                { id: "lac", name: "LA Clippers", position: 6 },
                { id: "okc", name: "Oklahoma City Thunder", position: 7 },
                { id: "min", name: "Minnesota Timberwolves", position: 8 },
              ],
            },
            allNBA: [
              {
                team: "1st Team",
                players: [
                  "LeBron James",
                  "Luka Doncic",
                  "Joel Embiid",
                  "Giannis Antetokounmpo",
                  "Stephen Curry",
                ],
              },
              {
                team: "2nd Team",
                players: [
                  "Kevin Durant",
                  "Jayson Tatum",
                  "Nikola Jokic",
                  "Ja Morant",
                  "Anthony Edwards",
                ],
              },
            ],
            awards: [
              { award: "MVP", player: "Joel Embiid" },
              { award: "DPOY", player: "Giannis Antetokounmpo" },
              { award: "ROTY", player: "Victor Wembanyama" },
              { award: "6MOY", player: "Jordan Poole" },
            ],
          },
        },
      ]);
    }
  }, []);

  const handleGoogleLogin = async () => {
    // Mock authentication - in real app, use Google OAuth
    const mockUser: User = {
      id: "123",
      name: "NBA Fan",
      email: "user@example.com",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
      predictions: {
        standings: { eastern: [], western: [] },
        allNBA: [],
        awards: [],
        props: [],
      },
    };

    setUser(mockUser);
    setIsAuthenticated(true);

    // Redirect to active picks - find the first incomplete prediction
    if (!mockUser.predictions?.standings?.eastern?.length) {
      setActiveTab("standings");
    } else if (!mockUser.predictions?.allNBA?.length) {
      setActiveTab("allnba");
    } else if (!mockUser.predictions?.awards?.length) {
      setActiveTab("awards");
    } else {
      setActiveTab("props");
    }
  };

  const handlePredictionSave = async (type: string, data: any) => {
    if (!user) return;

    // Auto-save to database - in real app, this would be an API call
    const updatedUser = {
      ...user,
      predictions: {
        ...user.predictions,
        [type]: data,
      },
    };

    setUser(updatedUser);
    console.log(`Auto-saved ${type} predictions:`, data);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
              NBA Predictions
            </CardTitle>
            <p className="text-gray-400 text-sm sm:text-base">
              Track your NBA predictions and props
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleGoogleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
            <p className="text-xs text-gray-500 text-center">
              Sign in to save your predictions and track your score
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-900 ${className}`}>
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-64 bg-gray-800 border-b lg:border-r lg:border-b-0 border-gray-700 lg:min-h-screen">
          <div className="p-4 lg:p-6">
            <div className="flex items-center gap-2 mb-6 lg:mb-8">
              <Trophy className="h-6 w-6 lg:h-8 lg:w-8 text-orange-500" />
              <h1 className="text-lg lg:text-xl font-bold text-white">
                NBA Predictions
              </h1>
            </div>

            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible">
              <Button
                variant={activeTab === "standings" ? "secondary" : "ghost"}
                className="flex-shrink-0 lg:w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 text-sm"
                onClick={() => setActiveTab("standings")}
                disabled={isSeasonLocked}
              >
                <Trophy className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Conference Standings</span>
                <span className="sm:hidden">Standings</span>
              </Button>

              <Button
                variant={activeTab === "allnba" ? "secondary" : "ghost"}
                className="flex-shrink-0 lg:w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 text-sm"
                onClick={() => setActiveTab("allnba")}
                disabled={isSeasonLocked}
              >
                <Users className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">All-NBA Teams</span>
                <span className="sm:hidden">All-NBA</span>
              </Button>

              <Button
                variant={activeTab === "awards" ? "secondary" : "ghost"}
                className="flex-shrink-0 lg:w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 text-sm"
                onClick={() => setActiveTab("awards")}
                disabled={isSeasonLocked}
              >
                <Award className="mr-2 h-4 w-4" />
                Awards
              </Button>

              <Button
                variant={activeTab === "props" ? "secondary" : "ghost"}
                className="flex-shrink-0 lg:w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 text-sm"
                onClick={() => setActiveTab("props")}
                disabled={isSeasonLocked}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Props
              </Button>

              {isSeasonLocked && (
                <Button
                  variant={activeTab === "leaderboard" ? "secondary" : "ghost"}
                  className="flex-shrink-0 lg:w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 text-sm"
                  onClick={() => setActiveTab("leaderboard")}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">All Predictions</span>
                  <span className="sm:hidden">All Picks</span>
                </Button>
              )}
            </nav>

            <div className="mt-6 lg:mt-8 p-3 lg:p-4 bg-gray-700 rounded-lg">
              <h3 className="text-xs lg:text-sm font-semibold text-white mb-2">
                Your Score
              </h3>
              <div className="text-xl lg:text-2xl font-bold text-orange-500">
                1,250
              </div>
              <p className="text-xs text-gray-400">Total Points</p>
            </div>

            {isSeasonLocked && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-700 rounded-lg">
                <p className="text-xs text-red-400 text-center">
                  🔒 Season started - predictions locked
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="standings" className="space-y-4 lg:space-y-6">
              <ConferenceStandings
                onSave={(eastern, western) =>
                  handlePredictionSave("standings", { eastern, western })
                }
                currentPoints={1250}
              />
            </TabsContent>

            <TabsContent value="allnba" className="space-y-4 lg:space-y-6">
              <PlayerSelectionGrid
                type="all-nba"
                onSave={(data) => handlePredictionSave("allNBA", data)}
              />
            </TabsContent>

            <TabsContent value="awards" className="space-y-4 lg:space-y-6">
              <PlayerSelectionGrid
                type="awards"
                onSave={(data) => handlePredictionSave("awards", data)}
              />
            </TabsContent>

            <TabsContent value="props" className="space-y-4 lg:space-y-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  Props Betting
                </h2>
                <p className="text-gray-400 mb-4 lg:mb-6 text-sm lg:text-base">
                  Make predictions on player and team props
                </p>

                <div className="space-y-4">
                  {[
                    {
                      prop: "LeBron James Total Points",
                      line: "Over/Under 25,000",
                      current: "24,850",
                    },
                    {
                      prop: "Stephen Curry 3-Pointers Made",
                      line: "Over/Under 300",
                      current: "285",
                    },
                    {
                      prop: "Luka Dončić Triple-Doubles",
                      line: "Over/Under 25",
                      current: "22",
                    },
                  ].map((prop, index) => (
                    <Card key={index} className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-sm lg:text-base">
                              {prop.prop}
                            </h3>
                            <p className="text-gray-400 text-xs lg:text-sm">
                              {prop.line}
                            </p>
                            <p className="text-orange-500 text-xs lg:text-sm">
                              Current: {prop.current}
                            </p>
                          </div>
                          <div className="flex gap-2 self-end sm:self-auto">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                              disabled={isSeasonLocked}
                              onClick={() =>
                                handlePredictionSave("props", {
                                  ...prop,
                                  prediction: "over",
                                })
                              }
                            >
                              Over
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                              disabled={isSeasonLocked}
                              onClick={() =>
                                handlePredictionSave("props", {
                                  ...prop,
                                  prediction: "under",
                                })
                              }
                            >
                              Under
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {isSeasonLocked && (
              <TabsContent
                value="leaderboard"
                className="space-y-4 lg:space-y-6"
              >
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    All Predictions
                  </h2>
                  <p className="text-gray-400 mb-4 lg:mb-6 text-sm lg:text-base">
                    Compare everyone's predictions side by side
                  </p>

                  {/* User Selection for Comparison */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Compare Against:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={
                          selectedUserForComparison === null
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedUserForComparison(null)}
                        className="text-xs"
                      >
                        All Users
                      </Button>
                      {allUsersPredictions.map((userPred) => (
                        <Button
                          key={userPred.id}
                          variant={
                            selectedUserForComparison === userPred.id
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            setSelectedUserForComparison(userPred.id)
                          }
                          className="text-xs"
                        >
                          {userPred.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Horizontal Scrollable Predictions */}
                  <div className="overflow-x-auto pb-4">
                    <div className="flex gap-4 min-w-max">
                      {(selectedUserForComparison
                        ? allUsersPredictions.filter(
                            (u) =>
                              u.id === selectedUserForComparison ||
                              u.id === user?.id,
                          )
                        : allUsersPredictions
                      ).map((userPred) => (
                        <Card
                          key={userPred.id}
                          className={`bg-gray-800 border-gray-700 flex-shrink-0 w-80 ${userPred.id === user?.id ? "ring-2 ring-orange-500" : ""}`}
                        >
                          <CardHeader className="pb-3">
                            <CardTitle className="text-white text-lg flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
                                {userPred.name.charAt(0)}
                              </div>
                              {userPred.name}
                              {userPred.id === user?.id && (
                                <Badge variant="secondary" className="text-xs">
                                  You
                                </Badge>
                              )}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Conference Standings */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-2">
                                Conference Standings (Top 8)
                              </h4>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <p className="text-gray-400 mb-1">Eastern:</p>
                                  <div className="space-y-1">
                                    {userPred.predictions?.standings?.eastern
                                      ?.slice(0, 8)
                                      .map((team: any, idx: number) => (
                                        <div
                                          key={team.id}
                                          className="flex items-center gap-1"
                                        >
                                          <span className="w-4 text-center text-orange-400">
                                            {idx + 1}.
                                          </span>
                                          <span className="truncate">
                                            {team.name}
                                          </span>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-gray-400 mb-1">Western:</p>
                                  <div className="space-y-1">
                                    {userPred.predictions?.standings?.western
                                      ?.slice(0, 8)
                                      .map((team: any, idx: number) => (
                                        <div
                                          key={team.id}
                                          className="flex items-center gap-1"
                                        >
                                          <span className="w-4 text-center text-orange-400">
                                            {idx + 1}.
                                          </span>
                                          <span className="truncate">
                                            {team.name}
                                          </span>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* All-NBA Teams */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-2">
                                All-NBA Teams
                              </h4>
                              <div className="space-y-2 text-xs">
                                {userPred.predictions?.allNBA?.map(
                                  (team: any, idx: number) => (
                                    <div key={idx}>
                                      <p className="text-gray-400 font-medium">
                                        {team.team}:
                                      </p>
                                      <div className="ml-2 space-y-1">
                                        {team.players?.map(
                                          (
                                            player: string,
                                            playerIdx: number,
                                          ) => (
                                            <p
                                              key={playerIdx}
                                              className="text-gray-300"
                                            >
                                              {player}
                                            </p>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>

                            {/* Awards */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-2">
                                Awards
                              </h4>
                              <div className="space-y-1 text-xs">
                                {userPred.predictions?.awards?.map(
                                  (award: any, idx: number) => (
                                    <div
                                      key={idx}
                                      className="flex justify-between"
                                    >
                                      <span className="text-gray-400">
                                        {award.award}:
                                      </span>
                                      <span className="text-gray-300 font-medium">
                                        {award.player}
                                      </span>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
