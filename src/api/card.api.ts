import { API_CONFIG, getAuthHeaders, handleApiError } from "./config"
import type { ApiResponse, CardDto, CreateCardDto, UpdateCardDto } from "./type"


export const cardApi = {
  async getCards(columnId?: number): Promise<CardDto[]> {
    try {
      const queryParam = columnId ? `?columnId=${columnId}` : ""
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARDS}${queryParam}`, {
        method: "GET",
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<CardDto[]> = await response.json()
      return result.data
    } catch (error) {
      return handleApiError(error)
    }
  },

  // Get single card
  async getCard(id: number): Promise<CardDto> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARDS}/${id}`, {
        method: "GET",
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<CardDto> = await response.json()
      return result.data
    } catch (error) {
      return handleApiError(error)
    }
  },

  // Create new card
  async createCard(data: CreateCardDto): Promise<CardDto> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARDS}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<CardDto> = await response.json()
      return result.data
    } catch (error) {
      return handleApiError(error)
    }
  },

  // Update card
  async updateCard(id: number, data: UpdateCardDto): Promise<CardDto> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARDS}/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<CardDto> = await response.json()
      return result.data
    } catch (error) {
      return handleApiError(error)
    }
  },

  // Delete card
  async deleteCard(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARDS}/${id}`, {
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

  // Move card
  async moveCard(
    id: number,
    data: {
      targetColumnId: number
      position: number
    },
  ): Promise<CardDto> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARDS}/${id}/move`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<CardDto> = await response.json()
      return result.data
    } catch (error) {
      return handleApiError(error)
    }
  },
}
