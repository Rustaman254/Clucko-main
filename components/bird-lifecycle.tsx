"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Egg, Bird, Star, Zap } from "lucide-react"

interface BirdLifecycleProps {
  bird: {
    id: string
    name: string
    species: string
    stage: string
    energy: number
    lastFed: string
    value: number
    rarity: string
    image: string
    timeToNextStage: string | null
    feedsRequired: number
    dailyFeedings: number
    maxDailyFeedings: number
    incubationStart?: number
    growthStart?: number
    maturityTime?: number
    baseIncubationTime?: number
    baseGrowthTime?: number
  }
  onBirdUpdate: (birdId: string, updates: any) => void
  userFeeds: number
  onFeedUse: (amount: number) => void
}

const SPECIES_DATA = {
  Phoenix: {
    incubationTime: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    growthTime: 5 * 24 * 60 * 60 * 1000, // 5 days
    matureValue: 2000,
    rarity: "legendary",
  },
  Rooster: {
    incubationTime: 3 * 24 * 60 * 60 * 1000, // 3 days
    growthTime: 2 * 24 * 60 * 60 * 1000, // 2 days
    matureValue: 800,
    rarity: "rare",
  },
  Hen: {
    incubationTime: 2 * 24 * 60 * 60 * 1000, // 2 days
    growthTime: 1 * 24 * 60 * 60 * 1000, // 1 day
    matureValue: 400,
    rarity: "common",
  },
  Peacock: {
    incubationTime: 5 * 24 * 60 * 60 * 1000, // 5 days
    growthTime: 3 * 24 * 60 * 60 * 1000, // 3 days
    matureValue: 1500,
    rarity: "epic",
  },
  Dragon: {
    incubationTime: 10 * 24 * 60 * 60 * 1000, // 10 days
    growthTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    matureValue: 5000,
    rarity: "mythical",
  },
}

export function BirdLifecycle({ bird, onBirdUpdate, userFeeds, onFeedUse }: BirdLifecycleProps) {
  const [currentTime, setCurrentTime] = useState(Date.now())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Check if bird should progress to next stage
    const speciesData = SPECIES_DATA[bird.species as keyof typeof SPECIES_DATA]
    if (!speciesData) return

    const now = Date.now()
    let shouldUpdate = false
    let updates: any = {}

    if (bird.stage === "incubating" && bird.incubationStart) {
      const timeElapsed = now - bird.incubationStart
      if (timeElapsed >= speciesData.incubationTime) {
        updates = {
          stage: "young",
          growthStart: now,
          value: Math.floor(bird.value * 1.2),
          image: bird.image.replace("egg", "young"),
        }
        shouldUpdate = true
      }
    } else if (bird.stage === "young" && bird.growthStart) {
      const timeElapsed = now - bird.growthStart
      if (timeElapsed >= speciesData.growthTime) {
        updates = {
          stage: "mature",
          value: speciesData.matureValue,
          image: bird.image.replace("young", "mature"),
          timeToNextStage: null,
        }
        shouldUpdate = true
      }
    }

    if (shouldUpdate) {
      onBirdUpdate(bird.id, updates)
    }
  }, [currentTime, bird, onBirdUpdate])

  const getTimeRemaining = () => {
    const speciesData = SPECIES_DATA[bird.species as keyof typeof SPECIES_DATA]
    if (!speciesData) return null

    const now = Date.now()

    if (bird.stage === "incubating" && bird.incubationStart) {
      const timeElapsed = now - bird.incubationStart
      const timeRemaining = speciesData.incubationTime - timeElapsed
      return Math.max(0, timeRemaining)
    } else if (bird.stage === "young" && bird.growthStart) {
      const timeElapsed = now - bird.growthStart
      const timeRemaining = speciesData.growthTime - timeElapsed
      return Math.max(0, timeRemaining)
    }

    return null
  }

  const getProgressPercentage = () => {
    const speciesData = SPECIES_DATA[bird.species as keyof typeof SPECIES_DATA]
    if (!speciesData) return 0

    const now = Date.now()

    if (bird.stage === "incubating" && bird.incubationStart) {
      const timeElapsed = now - bird.incubationStart
      return Math.min(100, (timeElapsed / speciesData.incubationTime) * 100)
    } else if (bird.stage === "young" && bird.growthStart) {
      const timeElapsed = now - bird.growthStart
      return Math.min(100, (timeElapsed / speciesData.growthTime) * 100)
    }

    return 100
  }

  const formatTimeRemaining = (milliseconds: number) => {
    const days = Math.floor(milliseconds / (24 * 60 * 60 * 1000))
    const hours = Math.floor((milliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
    const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000))

    if (days > 0) return `${days}d ${hours}h ${minutes}m`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const feedBird = () => {
    if (bird.dailyFeedings >= bird.maxDailyFeedings || userFeeds < bird.feedsRequired) return

    onFeedUse(bird.feedsRequired)
    onBirdUpdate(bird.id, {
      energy: Math.min(100, bird.energy + 15),
      dailyFeedings: bird.dailyFeedings + 1,
      lastFed: "Just now",
      value: bird.energy < 50 ? Math.max(bird.value * 0.95, bird.value - 50) : bird.value, // Prevent value loss
    })
  }

  const accelerateGrowth = () => {
    const accelerationCost = 50
    if (userFeeds < accelerationCost) return

    onFeedUse(accelerationCost)

    if (bird.stage === "incubating" && bird.incubationStart) {
      onBirdUpdate(bird.id, {
        incubationStart: bird.incubationStart - 2 * 60 * 60 * 1000, // Reduce by 2 hours
      })
    } else if (bird.stage === "young" && bird.growthStart) {
      onBirdUpdate(bird.id, {
        growthStart: bird.growthStart - 2 * 60 * 60 * 1000, // Reduce by 2 hours
      })
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "mythical":
        return "text-red-400 bg-red-400/20"
      case "legendary":
        return "text-yellow-400 bg-yellow-400/20"
      case "epic":
        return "text-purple-400 bg-purple-400/20"
      case "rare":
        return "text-blue-400 bg-blue-400/20"
      default:
        return "text-gray-400 bg-gray-400/20"
    }
  }

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case "incubating":
        return <Egg className="w-4 h-4" />
      case "young":
        return <Bird className="w-4 h-4" />
      case "mature":
        return <Star className="w-4 h-4" />
      default:
        return <Egg className="w-4 h-4" />
    }
  }

  const timeRemaining = getTimeRemaining()
  const progress = getProgressPercentage()

  return (
    <Card className="p-4 border-0" style={{ backgroundColor: "#120F29" }}>
      <div className="relative mb-4">
        <img
          src={bird.image || "/placeholder.svg?height=120&width=120&query=bird"}
          alt={bird.name}
          className="w-full h-32 object-cover rounded-lg"
        />
        <Badge className={`absolute top-2 right-2 ${getRarityColor(bird.rarity)} border-0`}>{bird.rarity}</Badge>
        {bird.stage !== "mature" && (
          <div className="absolute bottom-2 left-2 bg-black/70 rounded-lg px-2 py-1">
            <div className="flex items-center gap-1 text-white text-xs">
              <Clock className="w-3 h-3" />
              {timeRemaining ? formatTimeRemaining(timeRemaining) : "Ready!"}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold">{bird.name}</h3>
          <div className="flex items-center gap-1 text-gray-400">
            {getStageIcon(bird.stage)}
            <span className="text-xs capitalize">{bird.stage}</span>
          </div>
        </div>

        {/* Lifecycle Progress */}
        {bird.stage !== "mature" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">{bird.stage === "incubating" ? "Incubation" : "Growth"} Progress</span>
              <span className="text-blue-400">{Math.floor(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Energy Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Energy</span>
            <span className={`${bird.energy < 50 ? "text-red-400" : "text-green-400"}`}>{bird.energy}%</span>
          </div>
          <Progress value={bird.energy} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Value</span>
          <span className="text-yellow-400">${bird.value}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Fed Today</span>
          <span className="text-white">
            {bird.dailyFeedings}/{bird.maxDailyFeedings}
          </span>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            onClick={feedBird}
            disabled={bird.dailyFeedings >= bird.maxDailyFeedings || userFeeds < bird.feedsRequired}
          >
            Feed ({bird.feedsRequired} 🌾)
          </Button>

          {bird.stage !== "mature" && timeRemaining && timeRemaining > 0 && (
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={accelerateGrowth}
              disabled={userFeeds < 50}
            >
              <Zap className="w-3 h-3 mr-1" />
              Boost (50 🌾)
            </Button>
          )}

          {bird.stage === "mature" && (
            <Button size="sm" variant="outline" className="text-purple-400 border-purple-400 bg-transparent">
              List NFT
            </Button>
          )}
        </div>

        {bird.energy < 50 && (
          <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-2 rounded">
            <span>⚠️</span>
            Low energy! Feed soon to prevent value loss.
          </div>
        )}

        {bird.stage !== "mature" && timeRemaining === 0 && (
          <div className="flex items-center gap-2 text-green-400 text-xs bg-green-400/10 p-2 rounded">
            <span>✨</span>
            Ready to evolve to next stage!
          </div>
        )}
      </div>
    </Card>
  )
}
