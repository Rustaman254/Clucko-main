"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Bird } from "lucide-react"
import { BirdLifecycle } from "@/components/bird-lifecycle"
import { WorkerManagement } from "@/components/worker-management"

const mockBirds = [
  {
    id: "1",
    name: "Golden Phoenix",
    species: "Phoenix",
    stage: "mature",
    energy: 85,
    lastFed: "2 hours ago",
    value: 2000,
    rarity: "legendary",
    image: "/golden-phoenix-bird.png",
    timeToNextStage: null,
    feedsRequired: 3,
    dailyFeedings: 2,
    maxDailyFeedings: 4,
    incubationStart: Date.now() - 8 * 24 * 60 * 60 * 1000, // 8 days ago
    growthStart: Date.now() - 6 * 24 * 60 * 60 * 1000, // 6 days ago
  },
  {
    id: "2",
    name: "Ruby Rooster",
    species: "Rooster",
    stage: "young",
    energy: 92,
    lastFed: "30 minutes ago",
    value: 450,
    rarity: "rare",
    image: "/ruby-rooster-young.png",
    timeToNextStage: "1 day 14 hours",
    feedsRequired: 2,
    dailyFeedings: 3,
    maxDailyFeedings: 3,
    incubationStart: Date.now() - 4 * 24 * 60 * 60 * 1000, // 4 days ago
    growthStart: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
  },
  {
    id: "3",
    name: "Sapphire Hen",
    species: "Hen",
    stage: "incubating",
    energy: 78,
    lastFed: "4 hours ago",
    value: 200,
    rarity: "common",
    image: "/sapphire-hen-egg.png",
    timeToNextStage: "1 day 8 hours",
    feedsRequired: 1,
    dailyFeedings: 1,
    maxDailyFeedings: 2,
    incubationStart: Date.now() - 12 * 60 * 60 * 1000, // 12 hours ago
  },
  {
    id: "4",
    name: "Crystal Peacock",
    species: "Peacock",
    stage: "young",
    energy: 45,
    lastFed: "8 hours ago",
    value: 800,
    rarity: "epic",
    image: "/crystal-peacock-young.png",
    timeToNextStage: "2 days 6 hours",
    feedsRequired: 2,
    dailyFeedings: 0,
    maxDailyFeedings: 3,
    incubationStart: Date.now() - 6 * 24 * 60 * 60 * 1000, // 6 days ago
    growthStart: Date.now() - 12 * 60 * 60 * 1000, // 12 hours ago
  },
  {
    id: "5",
    name: "Mystic Dragon",
    species: "Dragon",
    stage: "incubating",
    energy: 95,
    lastFed: "1 hour ago",
    value: 1000,
    rarity: "mythical",
    image: "/mystic-dragon-egg.png",
    timeToNextStage: "8 days 12 hours",
    feedsRequired: 4,
    dailyFeedings: 1,
    maxDailyFeedings: 5,
    incubationStart: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
  },
]

const mockWorkers = [
  {
    id: "1",
    name: "Auto Feeder Bot",
    type: "feeding" as const,
    level: 2,
    efficiency: 85,
    cost: 500,
    active: true,
    birdsManaged: 8,
    maxBirds: 10,
    experience: 75,
    maxExperience: 100,
    dailyUpkeep: 50,
    specialAbilities: ["Smart Feeding", "Energy Optimization"],
    automationSettings: {
      autoFeed: true,
      feedThreshold: 60,
      autoHeal: false,
      healthThreshold: 50,
      workHours: { start: 6, end: 22 },
    },
  },
  {
    id: "2",
    name: "Health Monitor Bot",
    type: "health" as const,
    level: 1,
    efficiency: 70,
    cost: 300,
    active: true,
    birdsManaged: 5,
    maxBirds: 8,
    experience: 30,
    maxExperience: 50,
    dailyUpkeep: 40,
    specialAbilities: ["Disease Detection"],
    automationSettings: {
      autoFeed: false,
      feedThreshold: 50,
      autoHeal: true,
      healthThreshold: 40,
      workHours: { start: 0, end: 23 },
    },
  },
  {
    id: "3",
    name: "Breeding Assistant Bot",
    type: "breeding" as const,
    level: 3,
    efficiency: 95,
    cost: 800,
    active: false,
    birdsManaged: 0,
    maxBirds: 5,
    experience: 90,
    maxExperience: 150,
    dailyUpkeep: 80,
    specialAbilities: ["Genetic Analysis", "Optimal Pairing", "Incubation Control"],
    automationSettings: {
      autoFeed: false,
      feedThreshold: 50,
      autoHeal: false,
      healthThreshold: 50,
      workHours: { start: 8, end: 18 },
    },
  },
]

export default function MyFarm() {
  const [userFeeds, setUserFeeds] = useState(1250)
  const [farmLevel, setFarmLevel] = useState(3)
  const [farmCapacity, setFarmCapacity] = useState(20)
  const [birds, setBirds] = useState(mockBirds)
  const [workers, setWorkers] = useState(mockWorkers)

  const updateBird = (birdId: string, updates: any) => {
    setBirds((prev) =>
      prev.map((bird) => {
        if (bird.id === birdId) {
          return { ...bird, ...updates }
        }
        return bird
      }),
    )
  }

  const updateWorker = (workerId: string, updates: any) => {
    setWorkers((prev) =>
      prev.map((worker) => {
        if (worker.id === workerId) {
          return { ...worker, ...updates }
        }
        return worker
      }),
    )
  }

  const useFeed = (amount: number) => {
    setUserFeeds((prev) => Math.max(0, prev - amount))
  }

  const spendClucks = (amount: number) => {
    setUserFeeds((prev) => Math.max(0, prev - amount))
  }

  const toggleWorker = (workerId: string) => {
    setWorkers((prev) =>
      prev.map((worker) => {
        if (worker.id === workerId) {
          return { ...worker, active: !worker.active }
        }
        return worker
      }),
    )
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "text-yellow-400 bg-yellow-400/20"
      case "epic":
        return "text-purple-400 bg-purple-400/20"
      case "rare":
        return "text-blue-400 bg-blue-400/20"
      case "mythical":
        return "text-red-400 bg-red-400/20"
      default:
        return "text-gray-400 bg-gray-400/20"
    }
  }

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case "incubating":
        return <Bird className="w-4 h-4" />
      case "young":
      case "growing":
        return <Bird className="w-4 h-4" />
      case "mature":
        return <Bird className="w-4 h-4" />
      default:
        return <Bird className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0" style={{ backgroundColor: "#100029" }}>
      <Header />
      <MobileNavigation />

      <main className="px-4 md:px-6 py-8 pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto">
          {/* Farm Stats Header */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 border-0" style={{ backgroundColor: "#120F29" }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-400/20">
                  <span className="text-yellow-400 text-xl">🌾</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Feeds</p>
                  <p className="text-white text-xl font-bold">{userFeeds}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-0" style={{ backgroundColor: "#120F29" }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-400/20">
                  <Bird className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Birds</p>
                  <p className="text-white text-xl font-bold">
                    {birds.length}/{farmCapacity}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-0" style={{ backgroundColor: "#120F29" }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-400/20">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Farm Level</p>
                  <p className="text-white text-xl font-bold">{farmLevel}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-0" style={{ backgroundColor: "#120F29" }}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold">Active Workers</h3>
                  <Badge className="bg-green-600 text-white border-0">{workers.filter((w) => w.active).length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold">Total Workers</h3>
                  <Badge className="bg-blue-600 text-white border-0">{workers.length}</Badge>
                </div>
              </div>
            </Card>
          </div>

          <Tabs defaultValue="birds" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-transparent border-0">
              <TabsTrigger
                value="birds"
                className="data-[state=active]:bg-[#24203D] data-[state=active]:text-white text-gray-400 rounded-full"
              >
                My Birds
              </TabsTrigger>
              <TabsTrigger
                value="workers"
                className="data-[state=active]:bg-[#24203D] data-[state=active]:text-white text-gray-400 rounded-full"
              >
                Workers
              </TabsTrigger>
              <TabsTrigger
                value="shop"
                className="data-[state=active]:bg-[#24203D] data-[state=active]:text-white text-gray-400 rounded-full"
              >
                Shop
              </TabsTrigger>
            </TabsList>

            <TabsContent value="birds" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {birds.map((bird) => (
                  <BirdLifecycle
                    key={bird.id}
                    bird={bird}
                    onBirdUpdate={updateBird}
                    userFeeds={userFeeds}
                    onFeedUse={useFeed}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="workers" className="mt-6">
              <WorkerManagement
                workers={workers}
                onWorkerUpdate={updateWorker}
                userClucks={userFeeds}
                onCluckSpend={spendClucks}
                birds={birds}
              />
            </TabsContent>

            <TabsContent value="shop" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-4 border-0" style={{ backgroundColor: "#120F29" }}>
                  <div className="text-center space-y-4">
                    <div className="text-4xl">🌾</div>
                    <h3 className="text-white font-bold">Feed Bundle</h3>
                    <p className="text-gray-400 text-sm">100 feeds for your birds</p>
                    <p className="text-yellow-400 font-bold">50 CLUCK</p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Buy Feeds</Button>
                  </div>
                </Card>

                <Card className="p-4 border-0" style={{ backgroundColor: "#120F29" }}>
                  <div className="text-center space-y-4">
                    <div className="text-4xl">🏠</div>
                    <h3 className="text-white font-bold">Farm Expansion</h3>
                    <p className="text-gray-400 text-sm">+5 bird capacity</p>
                    <p className="text-yellow-400 font-bold">200 CLUCK</p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Expand Farm</Button>
                  </div>
                </Card>

                <Card className="p-4 border-0" style={{ backgroundColor: "#120F29" }}>
                  <div className="text-center space-y-4">
                    <div className="text-4xl">🤖</div>
                    <h3 className="text-white font-bold">Premium Worker</h3>
                    <p className="text-gray-400 text-sm">Advanced farm management</p>
                    <p className="text-yellow-400 font-bold">1000 CLUCK</p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Hire Worker</Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
