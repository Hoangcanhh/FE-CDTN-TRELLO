import { getAuthHeaders, handleApiError } from "./config"
import type { ApiResponse } from "./type"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"

// Column types
export interface ColumnDto {
  id: number
  title: string
  boardId: string
  position: number
  createdAt: string
  updatedAt: string
  cards: CardInColumnDto[]
}

export interface CardInColumnDto {
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

export interface CreateColumnDto {
  title: string
  boardId: string
  position?: number
}

export interface UpdateColumnDto {
  title?: string
  position?: number
}

export interface ReorderColumnsDto {
  boardId: string
  columnIds: number[]
}

export const columnApi = {
  // Get all columns by boardId
  async getColumns(boardId?: string): Promise<ColumnDto[]> {
    try {
      const url = boardId ? `${API_BASE_URL}/columns?boardId=${boardId}` : `${API_BASE_URL}/columns`
      console.log("📋 Fetching columns:", url)

      const response = await fetch(url, {
        method: "GET",
        headers: getAuthHeaders(),
      })

      console.log("📡 Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Response error:", errorText)
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      const result: ApiResponse<ColumnDto[]> = await response.json()
      console.log("✅ Columns fetched:", result.data)
      return result.data
    } catch (error) {
      console.error("❌ getColumns error:", error)
      return handleApiError(error)
    }
  },

  // Get single column
  async getColumn(id: number): Promise<ColumnDto> {
    try {
      console.log("🔍 Fetching column:", id)

      const response = await fetch(`${API_BASE_URL}/columns/${id}`, {
        method: "GET",
        headers: getAuthHeaders(),
      })

      console.log("📡 Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Response error:", errorText)
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      const result: ApiResponse<ColumnDto> = await response.json()
      console.log("✅ Column fetched:", result.data)
      return result.data
    } catch (error) {
      console.error("❌ getColumn error:", error)
      return handleApiError(error)
    }
  },

  // Create new column
  async createColumn(data: CreateColumnDto): Promise<ColumnDto> {
    try {
      console.log("📝 Creating column:", data)

      const response = await fetch(`${API_BASE_URL}/columns`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      })

      console.log("📡 Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Response error:", errorText)
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      const result: ApiResponse<ColumnDto> = await response.json()
      console.log("✅ Column created:", result.data)
      return result.data
    } catch (error) {
      console.error("❌ createColumn error:", error)
      return handleApiError(error)
    }
  },

  // Update column
  async updateColumn(id: number, data: UpdateColumnDto): Promise<ColumnDto> {
    try {
      console.log("📝 Updating column:", id, data)

      const response = await fetch(`${API_BASE_URL}/columns/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      })

      console.log("📡 Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Response error:", errorText)
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      const result: ApiResponse<ColumnDto> = await response.json()
      console.log("✅ Column updated:", result.data)
      return result.data
    } catch (error) {
      console.error("❌ updateColumn error:", error)
      return handleApiError(error)
    }
  },

  // Delete column
  async deleteColumn(id: number): Promise<void> {
    try {
      console.log("🗑️ Deleting column:", id)
      console.log("🌐 DELETE URL:", `${API_BASE_URL}/columns/${id}`)
      console.log("🔐 Headers:", getAuthHeaders())

      const response = await fetch(`${API_BASE_URL}/columns/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })

      console.log("📡 Delete response status:", response.status)
      console.log("📡 Delete response headers:", Object.fromEntries(response.headers.entries()))

      // ✅ Handle 204 No Content response
      if (response.status === 204) {
        console.log("✅ Column deleted successfully (204 No Content)")
        return
      }

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Delete response error:", errorText)
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      // Try to parse JSON if there's content
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json()
        console.log("✅ Delete response:", result)
      }

      console.log("✅ Column deleted:", id)
    } catch (error) {
      console.error("❌ deleteColumn error details:", {
        error,
      })
      return handleApiError(error)
    }
  },

  // Reorder columns
  async reorderColumns(data: ReorderColumnsDto): Promise<void> {
    try {
      console.log("🔄 Reordering columns:", data)

      const response = await fetch(`${API_BASE_URL}/columns/reorder`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      })

      console.log("📡 Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Response error:", errorText)
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      console.log("✅ Columns reordered")
    } catch (error) {
      console.error("❌ reorderColumns error:", error)
      return handleApiError(error)
    }
  },
}
