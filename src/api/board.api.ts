import { API_CONFIG, getAuthHeaders, handleApiError } from "./config"
import type { ApiResponse } from "./type"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
// Board types
export interface BoardDto {
  id: string
  title: string
  description: string
  ownerId: number
  backgroundColor: string
  backgroundImage: string
  starred: boolean
  active: boolean
  createdAt: string
  updatedAt: string
  lists?: ListInBoardDto[]
}

export interface ListInBoardDto {
  id: string
  title: string
  boardId: string
  position: number
  createdAt: string
  updatedAt: string
  cards?: CardInListDto[]
}

export interface CardInListDto {
  id: number
  title: string
  description: string
  type: string
  count: number
  columnId: number
  position: number
  createdAt: string
  updatedAt: string
}

export const boardApi = {
  // Get single board with all lists and cards
  async getBoard(boardId: string): Promise<BoardDto> {
    try {
      console.log("🔄 Loading board:", boardId)

      const response = await fetch(`${API_BASE_URL}/boards/${boardId}`, {
        method: "GET",
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<BoardDto> = await response.json()
      console.log("✅ Board loaded:", result.data)
      return result.data
    } catch (error) {
      return handleApiError(error)
    }
  },

  // Get all boards
  async getBoards(): Promise<BoardDto[]> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/boards`, {
        method: "GET",
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<BoardDto[]> = await response.json()
      return result.data
    } catch (error) {
      return handleApiError(error)
    }
  },

  
}
