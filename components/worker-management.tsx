"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Settings } from "lucide-react"

interface Worker {
  id: string
  name: string
  type: "feeding" | "health" | "breeding" | "cleaning" | "security"
  level: number
  efficiency: number
  cost: number
  active: boolean
  birdsManaged: number
  maxBirds: number
  experience: number
  maxExperience: number
  dailyUpkeep: number
  specialAbilities: string[]
  automationSettings: {
    autoFeed: boolean
    feedThreshold: number
    autoHeal: boolean
    healthThreshold: number
    workHours: { start: number; end: number }
  }
}

interface WorkerManagementProps {
  workers: Worker[]
  onWorkerUpdate: (workerId: string, updates: any) => void
  userClucks: number
  onCluckSpend: (amount: number) => void
  birds: any[]
}

const WORKER_TYPES = {
  feeding: {
    icon: "🌾",
    color: "text-green-400 bg-green-400/20",
    description: "Automatically feeds birds when energy is low",
    baseCapacity: 5,
  },
  health: {
    icon: "❤️",
    color: "text-red-400 bg-red-400/20",
    description: "Monitors bird health and prevents illness",
    baseCapacity: 8,
  },
  breeding: {
    icon: "🥚",
    color: "text-purple-400 bg-purple-400/20",
    description: "Manages breeding programs and egg incubation",
    baseCapacity: 3,
  },
  cleaning: {
    icon: "🧹",
    color: "text-blue-400 bg-blue-400/20",
    description: "Keeps farm clean and prevents disease",
    baseCapacity: 10,
  },
  security: {
    icon: "🛡️",
    color: "text-yellow-400 bg-yellow-400/20",
    description: "Protects birds from predators and theft",
    baseCapacity: 15,
  },
}

export function WorkerManagement({ workers, onWorkerUpdate, userClucks, onCluckSpend, birds }: WorkerManagementProps) {
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null)

  useEffect(() => {
    // Simulate worker automation
    const interval = setInterval(() => {
      workers.forEach((worker) => {
        if (!worker.active) return

        const currentHour = new Date().getHours()
        const { start, end } = worker.automationSettings.workHours

        // Check if worker is within working hours
        const isWorkingHours =
          start <= end ? currentHour >= start && currentHour <= end : currentHour >= start || currentHour <= end

        if (!isWorkingHours) return

        // Auto-feeding logic
        if (worker.type === "feeding" && worker.automationSettings.autoFeed) {
          const lowEnergyBirds = birds
            .filter((bird) => bird.energy < worker.automationSettings.feedThreshold)
            .slice(0, worker.birdsManaged)

          if (lowEnergyBirds.length > 0) {
            console.log(`[v0] Worker ${worker.name} auto-feeding ${lowEnergyBirds.length} birds`)
            // In real app, this would trigger feeding logic
          }
        }

        // Auto-healing logic
        if (worker.type === "health" && worker.automationSettings.autoHeal) {
          const unhealthyBirds = birds
            .filter((bird) => bird.energy < worker.automationSettings.healthThreshold)
            .slice(0, worker.birdsManaged)

          if (unhealthyBirds.length > 0) {
            console.log(`[v0] Worker ${worker.name} monitoring ${unhealthyBirds.length} birds`)
            // In real app, this would trigger healing logic
          }
        }

        // Gain experience
        if (Math.random() < 0.1) {
          // 10% chance per interval
          const expGain = Math.floor(Math.random() * 5) + 1
          onWorkerUpdate(worker.id, {
            experience: Math.min(worker.maxExperience, worker.experience + expGain),
          })
        }
      })
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [workers, birds, onWorkerUpdate])

  const levelUpWorker = (workerId: string) => {
    const worker = workers.find((w) => w.id === workerId)
    if (!worker || worker.experience < worker.maxExperience) return

    const levelUpCost = worker.level * 200
    if (userClucks < levelUpCost) return

    onCluckSpend(levelUpCost)
    onWorkerUpdate(workerId, {
      level: worker.level + 1,
      efficiency: Math.min(100, worker.efficiency + 5),
      maxBirds: worker.maxBirds + 2,
      experience: 0,
      maxExperience: worker.maxExperience + 50,
    })
  }

  const toggleWorker = (workerId: string) => {
    const worker = workers.find((w) => w.id === workerId)
    if (!worker) return

    if (!worker.active && userClucks < worker.dailyUpkeep) return

    onWorkerUpdate(workerId, { active: !worker.active })
  }

  const updateAutomationSettings = (workerId: string, settings: any) => {
    onWorkerUpdate(workerId, {
      automationSettings: { ...workers.find((w) => w.id === workerId)?.automationSettings, ...settings },
    })
  }

  const getWorkerTypeInfo = (type: string) => {
    return WORKER_TYPES[type as keyof typeof WORKER_TYPES] || WORKER_TYPES.feeding
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workers.map((worker) => {
          const typeInfo = getWorkerTypeInfo(worker.type)
          const experiencePercent = (worker.experience / worker.maxExperience) * 100

          return (
            <Card key={worker.id} className="p-4 border-0" style={{ backgroundColor: "#120F29" }}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${typeInfo.color}`}>
                      <span className="text-lg">{typeInfo.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{worker.name}</h3>
                      <p className="text-gray-400 text-sm capitalize">{worker.type} Bot</p>
                    </div>
                  </div>
                  <Badge className={`${worker.active ? "bg-green-600" : "bg-gray-600"} text-white border-0`}>
                    {worker.active ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <p className="text-gray-300 text-xs">{typeInfo.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Level {worker.level}</span>
                    <span className="text-blue-400">{worker.efficiency}% efficiency</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Experience</span>
                      <span className="text-white">
                        {worker.experience}/{worker.maxExperience}
                      </span>
                    </div>
                    <Progress value={experiencePercent} className="h-1" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Managing:</span>
                    <span className="text-white">
                      {worker.birdsManaged}/{worker.maxBirds}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Daily Cost:</span>
                    <span className="text-yellow-400">{worker.dailyUpkeep}</span>
                  </div>
                </div>

                {worker.specialAbilities.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-gray-400 text-xs">Special Abilities:</p>
                    <div className="flex flex-wrap gap-1">
                      {worker.specialAbilities.map((ability, index) => (
                        <Badge key={index} className="bg-[#24203D] text-gray-300 text-xs border-0">
                          {ability}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className={`flex-1 ${worker.active ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"} text-white`}
                    onClick={() => toggleWorker(worker.id)}
                    disabled={!worker.active && userClucks < worker.dailyUpkeep}
                  >
                    {worker.active ? "Deactivate" : `Activate (${worker.dailyUpkeep} 🪙)`}
                  </Button>

                  {worker.experience >= worker.maxExperience && (
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => levelUpWorker(worker.id)}
                      disabled={userClucks < worker.level * 200}
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Level Up
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    className="text-gray-400 border-gray-600 bg-transparent"
                    onClick={() => setSelectedWorker(selectedWorker === worker.id ? null : worker.id)}
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                </div>

                {selectedWorker === worker.id && (
                  <Card className="p-3 border-0" style={{ backgroundColor: "#24203D" }}>
                    <h4 className="text-white text-sm font-medium mb-3">Automation Settings</h4>

                    {worker.type === "feeding" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">Auto Feed</span>
                          <Button
                            size="sm"
                            variant={worker.automationSettings.autoFeed ? "default" : "outline"}
                            className="h-6 text-xs"
                            onClick={() =>
                              updateAutomationSettings(worker.id, { autoFeed: !worker.automationSettings.autoFeed })
                            }
                          >
                            {worker.automationSettings.autoFeed ? "ON" : "OFF"}
                          </Button>
                        </div>

                        <div className="space-y-1">
                          <span className="text-gray-300 text-sm">
                            Feed when energy below: {worker.automationSettings.feedThreshold}%
                          </span>
                          <input
                            type="range"
                            min="20"
                            max="80"
                            value={worker.automationSettings.feedThreshold}
                            onChange={(e) =>
                              updateAutomationSettings(worker.id, { feedThreshold: Number.parseInt(e.target.value) })
                            }
                            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                    )}

                    {worker.type === "health" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">Auto Monitor</span>
                          <Button
                            size="sm"
                            variant={worker.automationSettings.autoHeal ? "default" : "outline"}
                            className="h-6 text-xs"
                            onClick={() =>
                              updateAutomationSettings(worker.id, { autoHeal: !worker.automationSettings.autoHeal })
                            }
                          >
                            {worker.automationSettings.autoHeal ? "ON" : "OFF"}
                          </Button>
                        </div>

                        <div className="space-y-1">
                          <span className="text-gray-300 text-sm">
                            Alert when health below: {worker.automationSettings.healthThreshold}%
                          </span>
                          <input
                            type="range"
                            min="30"
                            max="70"
                            value={worker.automationSettings.healthThreshold}
                            onChange={(e) =>
                              updateAutomationSettings(worker.id, { healthThreshold: Number.parseInt(e.target.value) })
                            }
                            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 mt-3">
                      <span className="text-gray-300 text-sm">Working Hours</span>
                      <div className="flex gap-2">
                        <select
                          value={worker.automationSettings.workHours.start}
                          onChange={(e) =>
                            updateAutomationSettings(worker.id, {
                              workHours: {
                                ...worker.automationSettings.workHours,
                                start: Number.parseInt(e.target.value),
                              },
                            })
                          }
                          className="flex-1 bg-[#120F29] text-white text-xs p-1 rounded border-gray-600"
                        >
                          {Array.from({ length: 24 }, (_, i) => (
                            <option key={i} value={i}>
                              {i.toString().padStart(2, "0")}:00
                            </option>
                          ))}
                        </select>
                        <span className="text-gray-400 text-xs self-center">to</span>
                        <select
                          value={worker.automationSettings.workHours.end}
                          onChange={(e) =>
                            updateAutomationSettings(worker.id, {
                              workHours: {
                                ...worker.automationSettings.workHours,
                                end: Number.parseInt(e.target.value),
                              },
                            })
                          }
                          className="flex-1 bg-[#120F29] text-white text-xs p-1 rounded border-gray-600"
                        >
                          {Array.from({ length: 24 }, (_, i) => (
                            <option key={i} value={i}>
                              {i.toString().padStart(2, "0")}:00
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Worker Hiring Section */}
      <Card className="p-6 border-0" style={{ backgroundColor: "#120F29" }}>
        <h3 className="text-white text-xl font-bold mb-4">Hire New Workers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(WORKER_TYPES).map(([type, info]) => (
            <Card key={type} className="p-4 border-0" style={{ backgroundColor: "#24203D" }}>
              <div className="text-center space-y-3">
                <div className={`inline-flex p-3 rounded-lg ${info.color}`}>
                  <span className="text-2xl">{info.icon}</span>
                </div>
                <h4 className="text-white font-bold capitalize">{type} Bot</h4>
                <p className="text-gray-300 text-sm">{info.description}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Base Capacity:</span>
                    <span className="text-white">{info.baseCapacity} birds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hire Cost:</span>
                    <span className="text-yellow-400">1000 CLUCK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Daily Upkeep:</span>
                    <span className="text-yellow-400">50 CLUCK</span>
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={userClucks < 1000}>
                  Hire Worker
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  )
}
