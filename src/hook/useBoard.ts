// "use client"

// import type React from "react"

// import { useState, useEffect, useCallback } from "react"
// import { listApi } from "../api/list.api"
// import type { ListDto } from "../api/type"
// import type { ColumnType, CardType } from "../components/board"

// interface UseBoardProps {
//   boardId: string
// }

// interface UseBoardReturn {
//   columns: ColumnType[]
//   loading: boolean
//   error: string | null
//   refreshData: () => Promise<void>
//   setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>
// }

// export const useBoard = ({ boardId }: UseBoardProps): UseBoardReturn => {
//   const [columns, setColumns] = useState<ColumnType[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   const loadData = useCallback(async () => {
//     try {
//       setLoading(true)
//       setError(null)

//       // Fetch lists/columns from API
//       const listsData = await listApi.getLists(boardId)

//       // Convert API data to component format
//       const formattedColumns: ColumnType[] = listsData.map((list: ListDto) => ({
//         id: Number.parseInt(list.id),
//         title: list.title,
//         cards:
//           list.cards?.map((card) => ({
//             id: card.id,
//             title: card.title,
//             description: card.description,
//             type: (card.type as CardType["type"]) || "goal",
//             count: card.count,
//           })) || [],
//       }))

//       // Sort by position
//       formattedColumns.sort((a, b) => {
//         const aList = listsData.find((l) => Number.parseInt(l.id) === a.id)
//         const bList = listsData.find((l) => Number.parseInt(l.id) === b.id)
//         return (aList?.position || 0) - (bList?.position || 0)
//       })

//       setColumns(formattedColumns)
//     } catch (err) {
//       console.error("Failed to load board data:", err)
//       setError("Failed to load board data. Please check your connection and try again.")
//     } finally {
//       setLoading(false)
//     }
//   }, [boardId])

//   useEffect(() => {
//     if (boardId) {
//       loadData()
//     }
//   }, [boardId, loadData])

//   const refreshData = useCallback(async () => {
//     await loadData()
//   }, [loadData])

//   return {
//     columns,
//     loading,
//     error,
//     refreshData,
//     setColumns,
//   }
// }
