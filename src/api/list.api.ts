import { API_CONFIG, getAuthHeaders, handleApiError } from "./config"
import type { ApiResponse, ListDto, CreateListDto, UpdateListDto, ReorderListsDto } from "./type"

export const listApi = {
  // Get all lists or lists by boardId
  async getLists(boardId?: string): Promise<ListDto[]> {
    try {
      const queryParam = boardId ? `?boardId=${boardId}` : ""
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LISTS}${queryParam}`, {
        method: "GET",
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<ListDto[]> = await response.json()
      return result.data
    } catch (error) {
      return handleApiError(error)
    }
  },

  // Get single list
  async getList(id: string): Promise<ListDto> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LISTS}/${id}`, {
        method: "GET",
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<ListDto> = await response.json()
      return result.data
    } catch (error) {
      return handleApiError(error)
    }
  },

  // Create new list
  async createList(data: CreateListDto): Promise<ListDto> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LISTS}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<ListDto> = await response.json()
      return result.data
    } catch (error) {
      return handleApiError(error)
    }
  },

  // Update list
  async updateList(id: string, data: UpdateListDto): Promise<ListDto> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LISTS}/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<ListDto> = await response.json()
      return result.data
    } catch (error) {
      return handleApiError(error)
    }
  },

  // Delete list
  async deleteList(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LISTS}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      return handleApiError(error)
    }
  },

  // Reorder lists
  async reorderLists(data: ReorderListsDto): Promise<void> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LISTS}/reorder`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      return handleApiError(error)
    }
  },
}
