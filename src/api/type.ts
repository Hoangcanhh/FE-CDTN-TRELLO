// API Response Types
export interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

// List/Column Types
export interface ListDto {
  id: string
  title: string
  boardId: string
  position: number
  createdAt: string
  updatedAt: string
  cards?: CardDto[]
}

export interface CardDto {
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

// Request DTOs
export interface CreateListDto {
  title: string
  boardId: string
  position?: number
}

export interface UpdateListDto {
  title?: string
  position?: number
}

export interface ReorderListsDto {
  boardId: string
  listIds: string[]
}

export interface CreateCardDto {
  title: string
  description?: string
  columnId: number
  position?: number
  type?: string
  count?: number
}

export interface UpdateCardDto {
  title?: string
  description?: string
  type?: string
  count?: number
}
