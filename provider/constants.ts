import { createPublicClient, http } from 'viem'
import { scrollSepolia, scroll, base, celo } from 'viem/chains'

import BirdLifecycle from "@/ABI/BirdLifeCycle.json"

export const EggsToken = "0x0C5C05FEF8f9B41Fd8eC97c0F048F15916994A23"
export const FeedsToken = "0x8841e04Acae3bA6e74c6f1b5c8A459291eD6AC6a"
export const ChickToken = "0x341C07B5445198390Ebfd4a305D10a5161002614"
export const MatureBirdNFT = "0xF7e0DC01ABc8bf62F6534124426335519b7012d6"
export const Manager = "0xD822D8423c3E424F53dd41452e126fD30c529686"

export const mainABI = BirdLifecycle

export const contractAbi = [
  {
    constant: true,
    inputs: [],
    name: "getAllProjects",
    outputs: [{ name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "projectId", type: "uint256" }],
    name: "totalAvailableEggs",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "projects",
    outputs: [
      { name: "owner", type: "address" },
      { name: "basketCount", type: "uint256" },
      { name: "exists", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
]

const client = createPublicClient({ 
  chain: scrollSepolia, 
  transport: http(), 
}) 

// export async function getAllProjects() {
//   try {
//     const projectIds = await client.readContract({
//       address: Manager, 
//       abi: contractAbi,
//       functionName: 'getAllProjects',
//     });
//     console.log('Project IDs:', projectIds.map(id => id.toString()));
//     return projectIds;
//   } catch (error) {
//     console.error('Error fetching projects:', error);
//     return [];
//   }
// }
