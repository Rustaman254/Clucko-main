"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Egg, Star, TrendingUp, Clock } from "lucide-react"

const marketplaceEggs = [
  {
    id: "egg-1",
    name: "Phoenix Egg",
    species: "Phoenix",
    rarity: "legendary",
    price: 2500,
    seller: "DragonMaster",
    image: "/phoenix-egg-golden.png",
    incubationTime: "7 days",
    description: "A rare Phoenix egg with golden shimmer. Hatches into a majestic Phoenix.",
    traits: ["Fire Resistance", "Regeneration", "Golden Feathers"],
  },
  {
    id: "egg-2",
    name: "Dragon Egg",
    species: "Dragon",
    rarity: "mythical",
    price: 5000,
    seller: "MythicBreeder",
    image: "/dragon-egg-crystal.png",
    incubationTime: "10 days",
    description: "An extremely rare Dragon egg with crystal formations. The ultimate prize.",
    traits: ["Elemental Magic", "Ancient Wisdom", "Crystal Scales"],
  },
  {
    id: "egg-3",
    name: "Unicorn Egg",
    species: "Unicorn",
    rarity: "mythical",
    price: 4500,
    seller: "RainbowFarm",
    image: "/unicorn-egg-rainbow.png",
    incubationTime: "8 days",
    description: "A mystical Unicorn egg that radiates rainbow light. Pure magic incarnate.",
    traits: ["Healing Powers", "Rainbow Mane", "Horn of Purity"],
  },
  {
    id: "egg-4",
    name: "Peacock Egg",
    species: "Peacock",
    rarity: "epic",
    price: 800,
    seller: "FeatherCollector",
    image: "/peacock-egg-jeweled.png",
    incubationTime: "5 days",
    description: "An elegant Peacock egg with jeweled patterns. Beauty personified.",
    traits: ["Dazzling Display", "Jeweled Feathers", "Royal Bearing"],
  },
  {
    id: "egg-5",
    name: "Griffin Egg",
    species: "Griffin",
    rarity: "legendary",
    price: 3000,
    seller: "SkyRider",
    image: "/griffin-egg-winged.png",
    incubationTime: "6 days",
    description: "A powerful Griffin egg with wing-like markings. King of the skies.",
    traits: ["Flight Mastery", "Eagle Eyes", "Lion Heart"],
  },
  {
    id: "egg-6",
    name: "Rooster Egg",
    species: "Rooster",
    rarity: "rare",
    price: 300,
    seller: "FarmKeeper",
    image: "/rooster-egg-red.png",
    incubationTime: "3 days",
    description: "A vibrant Rooster egg with red speckles. A reliable farm companion.",
    traits: ["Early Riser", "Protective", "Loud Crow"],
  },
]

const marketplaceBirds = [
  {
    id: "bird-1",
    name: "Majestic Phoenix",
    species: "Phoenix",
    rarity: "legendary",
    price: 8000,
    seller: "FireBreeder",
    image: "/phoenix-mature-golden.png",
    level: 5,
    energy: 100,
    description: "A fully mature Phoenix with maximum energy. Ready for breeding or display.",
    traits: ["Fire Immunity", "Rebirth Ability", "Golden Aura"],
    stats: { strength: 95, magic: 98, beauty: 92, rarity: 99 },
  },
  {
    id: "bird-2",
    name: "Crystal Dragon",
    species: "Dragon",
    rarity: "mythical",
    price: 15000,
    seller: "CrystalCave",
    image: "/dragon-mature-crystal.png",
    level: 7,
    energy: 98,
    description: "An ancient Crystal Dragon with immense power. The crown jewel of any collection.",
    traits: ["Crystal Breath", "Time Magic", "Immortal Wisdom"],
    stats: { strength: 100, magic: 100, beauty: 88, rarity: 100 },
  },
  {
    id: "bird-3",
    name: "Royal Peacock",
    species: "Peacock",
    rarity: "epic",
    price: 2500,
    seller: "RoyalGarden",
    image: "/peacock-mature-royal.png",
    level: 3,
    energy: 95,
    description: "A stunning Royal Peacock with perfect plumage. A true work of art.",
    traits: ["Hypnotic Display", "Royal Blood", "Perfect Symmetry"],
    stats: { strength: 70, magic: 75, beauty: 100, rarity: 85 },
  },
]

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState("eggs")
  const [searchTerm, setSearchTerm] = useState("")
  const [rarityFilter, setRarityFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [userClucks, setUserClucks] = useState(10000)

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

  const filteredEggs = marketplaceEggs.filter((egg) => {
    const matchesSearch =
      egg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      egg.species.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRarity = rarityFilter === "all" || egg.rarity === rarityFilter
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "low" && egg.price < 1000) ||
      (priceFilter === "medium" && egg.price >= 1000 && egg.price < 3000) ||
      (priceFilter === "high" && egg.price >= 3000)

    return matchesSearch && matchesRarity && matchesPrice
  })

  const filteredBirds = marketplaceBirds.filter((bird) => {
    const matchesSearch =
      bird.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bird.species.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRarity = rarityFilter === "all" || bird.rarity === rarityFilter
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "low" && bird.price < 5000) ||
      (priceFilter === "medium" && bird.price >= 5000 && bird.price < 10000) ||
      (priceFilter === "high" && bird.price >= 10000)

    return matchesSearch && matchesRarity && matchesPrice
  })

  const handlePurchase = (item: any, type: "egg" | "bird") => {
    if (userClucks >= item.price) {
      setUserClucks((prev) => prev - item.price)
      // In a real app, this would add the item to user's inventory
      console.log(`[v0] Purchased ${type}: ${item.name} for ${item.price} CLUCK`)
    }
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0" style={{ backgroundColor: "#100029" }}>
      <Header />
      <MobileNavigation />

      <main className="px-4 md:px-6 py-8 pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-white text-3xl font-bold mb-2">Marketplace</h1>
              <p className="text-gray-400">Buy and sell eggs and birds</p>
            </div>
            <Card className="p-4 border-0" style={{ backgroundColor: "#120F29" }}>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-xl">🪙</span>
                <div>
                  <p className="text-gray-400 text-sm">Your CLUCK</p>
                  <p className="text-white text-lg font-bold">{userClucks.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Filters */}
          <Card className="p-4 mb-6 border-0" style={{ backgroundColor: "#120F29" }}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search eggs and birds..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-[#24203D] border-0 text-white placeholder-gray-400"
                  />
                </div>
              </div>
              <Select value={rarityFilter} onValueChange={setRarityFilter}>
                <SelectTrigger className="w-full md:w-40 bg-[#24203D] border-0 text-white">
                  <SelectValue placeholder="Rarity" />
                </SelectTrigger>
                <SelectContent className="bg-[#24203D] border-gray-600">
                  <SelectItem value="all">All Rarities</SelectItem>
                  <SelectItem value="common">Common</SelectItem>
                  <SelectItem value="rare">Rare</SelectItem>
                  <SelectItem value="epic">Epic</SelectItem>
                  <SelectItem value="legendary">Legendary</SelectItem>
                  <SelectItem value="mythical">Mythical</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-full md:w-40 bg-[#24203D] border-0 text-white">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent className="bg-[#24203D] border-gray-600">
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="low">Low (&lt; 1000)</SelectItem>
                  <SelectItem value="medium">Medium (1000-3000)</SelectItem>
                  <SelectItem value="high">High (&gt; 3000)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-transparent border-0">
              <TabsTrigger
                value="eggs"
                className="data-[state=active]:bg-[#24203D] data-[state=active]:text-white text-gray-400 rounded-full"
              >
                <Egg className="w-4 h-4 mr-2" />
                Eggs ({filteredEggs.length})
              </TabsTrigger>
              <TabsTrigger
                value="birds"
                className="data-[state=active]:bg-[#24203D] data-[state=active]:text-white text-gray-400 rounded-full"
              >
                <Star className="w-4 h-4 mr-2" />
                Birds ({filteredBirds.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="eggs" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEggs.map((egg) => (
                  <Card key={egg.id} className="p-0 border-0 overflow-hidden" style={{ backgroundColor: "#120F29" }}>
                    <div className="relative">
                      <img
                        src={egg.image || "/placeholder.svg?height=200&width=300&query=egg"}
                        alt={egg.name}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className={`absolute top-3 right-3 ${getRarityColor(egg.rarity)} border-0`}>
                        {egg.rarity}
                      </Badge>
                      <div className="absolute bottom-3 left-3 bg-black/70 rounded-lg px-2 py-1">
                        <div className="flex items-center gap-1 text-white text-xs">
                          <Clock className="w-3 h-3" />
                          {egg.incubationTime}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="text-white font-bold text-lg">{egg.name}</h3>
                        <p className="text-gray-400 text-sm">by {egg.seller}</p>
                      </div>

                      <p className="text-gray-300 text-sm">{egg.description}</p>

                      <div className="space-y-2">
                        <p className="text-gray-400 text-xs font-medium">Traits:</p>
                        <div className="flex flex-wrap gap-1">
                          {egg.traits.map((trait, index) => (
                            <Badge key={index} className="bg-[#24203D] text-gray-300 text-xs border-0">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">🪙</span>
                          <span className="text-white font-bold text-lg">{egg.price.toLocaleString()}</span>
                          <span className="text-gray-400 text-sm">CLUCK</span>
                        </div>
                        <Button
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handlePurchase(egg, "egg")}
                          disabled={userClucks < egg.price}
                        >
                          Buy Egg
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="birds" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBirds.map((bird) => (
                  <Card key={bird.id} className="p-0 border-0 overflow-hidden" style={{ backgroundColor: "#120F29" }}>
                    <div className="relative">
                      <img
                        src={bird.image || "/placeholder.svg?height=200&width=300&query=bird"}
                        alt={bird.name}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className={`absolute top-3 right-3 ${getRarityColor(bird.rarity)} border-0`}>
                        {bird.rarity}
                      </Badge>
                      <div className="absolute top-3 left-3 bg-black/70 rounded-lg px-2 py-1">
                        <div className="flex items-center gap-1 text-white text-xs">
                          <TrendingUp className="w-3 h-3" />
                          Level {bird.level}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="text-white font-bold text-lg">{bird.name}</h3>
                        <p className="text-gray-400 text-sm">by {bird.seller}</p>
                      </div>

                      <p className="text-gray-300 text-sm">{bird.description}</p>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Strength:</span>
                          <span className="text-white">{bird.stats.strength}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Magic:</span>
                          <span className="text-white">{bird.stats.magic}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Beauty:</span>
                          <span className="text-white">{bird.stats.beauty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Energy:</span>
                          <span className="text-green-400">{bird.energy}%</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-gray-400 text-xs font-medium">Traits:</p>
                        <div className="flex flex-wrap gap-1">
                          {bird.traits.map((trait, index) => (
                            <Badge key={index} className="bg-[#24203D] text-gray-300 text-xs border-0">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">🪙</span>
                          <span className="text-white font-bold text-lg">{bird.price.toLocaleString()}</span>
                          <span className="text-gray-400 text-sm">CLUCK</span>
                        </div>
                        <Button
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => handlePurchase(bird, "bird")}
                          disabled={userClucks < bird.price}
                        >
                          Buy NFT
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
