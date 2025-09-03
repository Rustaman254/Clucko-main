"use client"

import { useRouter } from "next/navigation"
import { useReadContract, useAccount } from "wagmi"
import { Header } from "@/components/header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { MissionCard } from "@/components/mission-card"
import { ConnectWalletButton } from "@/components/connect-wallet"
import { Manager, mainABI } from "@/provider/constants"

export default function CluckoMissions() {
  const router = useRouter()
  const { isConnected } = useAccount()

  // Fetch project IDs
  const { data: projectIds, isError, isLoading } = useReadContract({
    address: Manager, 
    abi: mainABI,
    functionName: 'getAllProjects',
    enabled: isConnected,
  })

  console.log(projectIds)

  // Map project IDs to MissionCard props
  const missions = projectIds
    ? projectIds.map((id, index) => {
        // Fetch totalAvailableEggs for each project
        const { data: totalEggs } = useReadContract({
          address: Manager,
          abi: mainABI,
          functionName: 'totalAvailableEggs',
          args: [id],
          enabled: isConnected && !!id,
        })

        // Fetch project owner
        const { data: projectData } = useReadContract({
          address: Manager,
          abi: mainABI,
          functionName: 'projects',
          args: [id],
          enabled: isConnected && !!id,
        })

        const owner = projectData ? projectData[0] : '0x0' // First element is owner address
        const eggs = totalEggs ? Number(totalEggs) / 1e18 : 0 // Convert from wei to Eggs

        return {
          id: id.toString(),
          title: `Project #${id.toString()}`,
          description: `Managed by ${owner.slice(0, 6)}...${owner.slice(-4)} with ${eggs.toFixed(2)} Eggs available`,
          image: "/generic-project-image.png", // Replace with actual image path
          backgroundColor: `bg-gradient-to-br from-blue-800 to-purple-800`,
          logo: "/generic-project-logo.png", // Replace with actual logo path
          feeds: totalEggs ? Math.floor(eggs * 10) : 100, // Example: 10 feeds per Egg
          badge: index === 0 ? "New" : undefined,
          badgeColor: index === 0 ? "bg-green-600" : undefined,
        }
      })
    : []

  const handleMissionClick = (mission) => {
    router.push(`/mission/${mission.id}`)
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0" style={{ backgroundColor: "#100029" }}>
      <Header />
      <MobileNavigation />

      <main className="px-4 md:px-6 py-8 pt-20 md:pt-24">
        <div className="max-w-6xl mx-auto p-6 md:p-8 rounded-2xl" style={{ backgroundColor: "#120F29" }}>
          <div className="mb-8">
            <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">Missions</h1>
            <p className="text-gray-400">
              {isConnected ? `Explore ${missions.length} missions` : "Connect wallet to view missions"}
            </p>
          </div>

          {isConnected ? (
            <div>
              {isLoading && <p className="text-white">Loading projects...</p>}
              {isError && <p className="text-red-500">Error fetching projects</p>}
              {missions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {missions.map((mission, index) => (
                    <MissionCard
                      key={index}
                      title={mission.title}
                      description={mission.description}
                      image={mission.image}
                      badge={mission.badge}
                      badgeColor={mission.badgeColor}
                      backgroundColor={mission.backgroundColor}
                      textColor={mission.textColor}
                      special={mission.special}
                      logo={mission.logo}
                      feeds={mission.feeds}
                      onClick={() => handleMissionClick(mission)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-white">No projects found.</p>
              )}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-white mb-4">Please connect your wallet to view projects.</p>
              <ConnectWalletButton />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}