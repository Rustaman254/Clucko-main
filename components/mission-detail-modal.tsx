"use client"

import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface MissionDetailModalProps {
  isOpen: boolean
  onClose: () => void
  mission: {
    title: string
    description: string
    image: string
    logo?: string
    fullDescription: string
    reward: string
    tasks: Array<{
      id: string
      title: string
      description: string
      completed: boolean
      reward: string
    }>
  }
}

export function MissionDetailModal({ isOpen, onClose, mission }: MissionDetailModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl">
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* Main Mission Card */}
          <Card className="flex-1 bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30 p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="space-y-6">
              <div className="relative">
                <img
                  src={mission.image || "/placeholder.svg"}
                  alt={mission.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
                {mission.logo && (
                  <div className="absolute -bottom-6 left-6 w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-purple-500 shadow-xl">
                    <img
                      src={mission.logo || "/placeholder.svg"}
                      alt={`${mission.title} logo`}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="pt-4">
                <h2 className="text-3xl font-bold text-white mb-4">{mission.title}</h2>
                <p className="text-white/90 text-lg leading-relaxed mb-6">{mission.fullDescription}</p>
                <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
                  <p className="text-green-400 font-semibold">🎁 Reward: {mission.reward}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Side Tasks Container */}
          <Card className="w-full lg:w-80 bg-[#120F29] border-purple-500/30 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Mini Tasks</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {mission.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border transition-all ${
                    task.completed
                      ? "bg-green-500/20 border-green-500/30"
                      : "bg-[#24203D] border-purple-500/30 hover:border-purple-400/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-medium text-sm">{task.title}</h4>
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        task.completed ? "bg-green-500 border-green-500" : "border-purple-400"
                      }`}
                    >
                      {task.completed && <span className="text-white text-xs">✓</span>}
                    </div>
                  </div>
                  <p className="text-white/70 text-xs mb-2">{task.description}</p>
                  <p className="text-purple-400 text-xs font-medium">💰 {task.reward}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
