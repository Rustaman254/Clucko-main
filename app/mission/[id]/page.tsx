"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import { MobileNavigation } from "@/components/mobile-navigation"

const missions = [
  {
    id: "hyperbloom",
    title: "HYPERBLOOM",
    description: "50% point boost on HyperBloom",
    image: "/purple-gradient-hyperbloom-crypto.png",
    backgroundColor: "bg-gradient-to-br from-purple-900 to-purple-800",
    logo: "/hyperbloom-logo-purple.png",
    feeds: 250,
    fullDescription:
      "Join the HyperBloom protocol and earn massive point boosts. This exclusive mission offers a 50% increase in all point earnings while participating in HyperBloom activities. Complete various DeFi tasks and maximize your rewards.",
    reward: "50% Point Boost + 1000 CLUCK tokens",
    tasks: [
      {
        id: "1",
        title: "Connect Wallet",
        description: "Connect your wallet to HyperBloom",
        completed: true,
        feeds: 50,
        complexity: "Easy",
        reward: "100 points",
      },
      {
        id: "2",
        title: "Make First Swap",
        description: "Complete your first token swap",
        completed: false,
        feeds: 75,
        complexity: "Medium",
        reward: "500 points",
      },
      {
        id: "3",
        title: "Provide Liquidity",
        description: "Add liquidity to any pool",
        completed: false,
        feeds: 125,
        complexity: "Hard",
        reward: "1000 points",
      },
    ],
  },
  {
    id: "chicken-farm",
    title: "CHICKEN FARM",
    description: "Explore Chicken Farm",
    image: "/colorful-chicken-farm-game-style.png",
    backgroundColor: "bg-gradient-to-br from-orange-600 to-red-600",
    logo: "/chicken-farm-logo-orange.png",
    feeds: 180,
    fullDescription:
      "Dive into the colorful world of Chicken Farm and discover new ways to earn. Complete farming tasks and build your agricultural empire while earning valuable feeds for your birds.",
    reward: "Farm NFT + 800 CLUCK tokens",
    tasks: [
      {
        id: "1",
        title: "Plant First Crop",
        description: "Start your farming journey",
        completed: false,
        feeds: 60,
        complexity: "Easy",
        reward: "200 points",
      },
      {
        id: "2",
        title: "Harvest Crops",
        description: "Collect your first harvest",
        completed: false,
        feeds: 80,
        complexity: "Medium",
        reward: "400 points",
      },
      {
        id: "3",
        title: "Build Chicken Coop",
        description: "Construct housing for chickens",
        completed: false,
        feeds: 40,
        complexity: "Easy",
        reward: "300 points",
      },
    ],
  },
]

export default function MissionDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const mission = missions.find((m) => m.id === params.id)

  if (!mission) {
    return <div>Mission not found</div>
  }

  const handleTaskComplete = (taskId: string) => {
    const task = mission.tasks.find((t) => t.id === taskId)
    if (task && !task.completed) {
      // In a real app, this would update the backend and user's feed balance
      console.log(`[v0] Task completed: ${task.title}, Feeds earned: ${task.feeds}`)
      task.completed = true
    }
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0" style={{ backgroundColor: "#100029" }}>
      <Header />
      <MobileNavigation />

      <main className="px-4 md:px-6 py-8 pt-20 md:pt-24">
        <div className="max-w-6xl mx-auto">
          <Button onClick={() => router.back()} variant="ghost" className="text-white hover:text-gray-300 mb-6 p-0">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Missions
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="p-6 border-0" style={{ backgroundColor: "#120F29" }}>
                <div className="relative mb-6">
                  <img
                    src={mission.image || "/placeholder.svg"}
                    alt={mission.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute -bottom-6 left-6 w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-gray-300 shadow-lg">
                    <img
                      src={mission.logo || "/placeholder.svg"}
                      alt={`${mission.title} logo`}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h1 className="text-white text-3xl font-bold mb-4">{mission.title}</h1>
                  <p className="text-gray-300 text-lg mb-6">{mission.fullDescription}</p>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">🌾</span>
                      <span className="text-white font-medium">{mission.feeds} total feeds</span>
                    </div>
                    <div className="text-green-400 font-medium">{mission.reward}</div>
                  </div>

                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full">
                    Start Mission
                  </Button>
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-6 border-0" style={{ backgroundColor: "#120F29" }}>
                <h2 className="text-white text-xl font-bold mb-4">Tasks</h2>
                <div className="space-y-3">
                  {mission.tasks.map((task) => (
                    <div key={task.id} className="p-4 rounded-lg" style={{ backgroundColor: "#24203D" }}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-white font-medium text-sm">{task.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                task.complexity === "Easy"
                                  ? "bg-green-600 text-green-100"
                                  : task.complexity === "Medium"
                                    ? "bg-yellow-600 text-yellow-100"
                                    : "bg-red-600 text-red-100"
                              }`}
                            >
                              {task.complexity}
                            </span>
                            <span className="text-yellow-400 text-xs">🌾 {task.feeds} feeds</span>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full ${task.completed ? "bg-green-500" : "bg-gray-600"}`} />
                      </div>
                      <p className="text-gray-300 text-xs mb-2">{task.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-green-400 text-xs font-medium">{task.reward}</p>
                        {!task.completed && (
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 h-6"
                            onClick={() => handleTaskComplete(task.id)}
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
