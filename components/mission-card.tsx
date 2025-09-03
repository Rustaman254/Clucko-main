"use client"

import { Card } from "@/components/ui/card"

interface MissionCardProps {
  title: string
  description: string
  image: string
  badge?: string
  badgeColor?: string
  backgroundColor?: string
  textColor?: string
  special?: boolean
  logo?: string
  feeds?: number
  onClick?: () => void
}

export function MissionCard({
  title,
  description,
  image,
  badge,
  badgeColor = "bg-purple-600",
  backgroundColor = "bg-gradient-to-br from-gray-800 to-gray-900",
  textColor = "text-white",
  special = false,
  logo,
  feeds,
  onClick,
}: MissionCardProps) {
  return (
    <Card
      className={`${backgroundColor} border-0 overflow-hidden rounded-xl relative group hover:scale-105 transition-transform duration-200 p-0 cursor-pointer`}
      onClick={onClick}
    >
      <div className="h-40 relative overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        {badge && (
          <div className={`absolute top-3 right-3 ${badgeColor} text-white text-xs px-2 py-1 rounded-full`}>
            {badge}
          </div>
        )}
      </div>

      {logo && (
        <div className="absolute top-32 left-6 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-gray-300 shadow-lg z-10">
          <img src={logo || "/placeholder.svg"} alt={`${title} logo`} className="w-8 h-8 object-contain" />
        </div>
      )}

      <div className="px-8 py-6" style={{ backgroundColor: "#24203D" }}>
        <h3 className={`${textColor} font-bold text-lg mb-2`}>{title}</h3>
        <p className={`${textColor} text-sm opacity-90 mb-3`}>{description}</p>
        {feeds && (
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-sm">🌾</span>
            <span className={`${textColor} text-sm font-medium`}>{feeds} feeds</span>
          </div>
        )}
      </div>
    </Card>
  )
}
