"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Column from "./column"
import AddColumnForm from "./addColumnForm"
import styles from "../styles/board.module.scss"
import { AiFillFileAdd } from "react-icons/ai"
import BoardToolbar from "./boardToolBar"
// import DebugPanel from "./debugPanel"
import { columnApi, cardApi, boardApi } from "../api"
import type { CreateColumnDto } from "../api/column.api"

export type CardType = {
  id: number
  title: string
  description: string
  type: "blocker" | "discussion" | "fyi" | "paused" | "goal"
  count: number
}

export type ColumnType = {
  id: number
  title: string
  position: number // ✅ Thêm position property
  cards: CardType[]
}

interface BoardProps {
  boardId: string
}

const Board: React.FC<BoardProps> = ({ boardId }) => {
  const [columns, setColumns] = useState<ColumnType[]>([])
  const [showAddColumn, setShowAddColumn] = useState(false)
  const [, setSelectedCard] = useState<CardType | null>(null)
  const [loading, setLoading] = useState(true)
  const [addingColumn, setAddingColumn] = useState(false)
  const [currentBoardId, setCurrentBoardId] = useState<string>("")

  useEffect(() => {
    console.log("🔓 Loading board...")
    loadBoardData()
  }, [boardId])

  const loadBoardData = async () => {
    try {
      setLoading(true)
      console.log("🔄 Loading board data for:", boardId)

      if (boardId === "default") {
        const boards = await boardApi.getBoards()

        if (boards.length > 0) {
          const firstBoard = boards[0]
          const actualBoardId = firstBoard.id 
          setCurrentBoardId(actualBoardId)

          console.log("🎯 Using board ID:", actualBoardId)

          const columnsData = await columnApi.getColumns(actualBoardId)
          console.log("✅ Columns data loaded:", columnsData)

          // ✅ Convert API data với position
          const formattedColumns: ColumnType[] = columnsData.map((column) => ({
            id: column.id,
            title: column.title,
            position: column.position, // ✅ Map position từ API
            cards: (column.cards || []).map((card) => ({
              id: card.id,
              title: card.title,
              description: card.description,
              type: (card.type as CardType["type"]) || "goal",
              count: card.count,
            })),
          }))

          setColumns(formattedColumns)
        } else {
          console.log("🧪 No boards found, using mock data...")
          setMockData()
        }
      } else {
        setCurrentBoardId(boardId)
        console.log("🎯 Loading columns for board:", boardId)

        const columnsData = await columnApi.getColumns(boardId)
        console.log("✅ Columns data loaded:", columnsData)

        const formattedColumns: ColumnType[] = columnsData.map((column) => ({
          id: column.id,
          title: column.title,
          position: column.position, // ✅ Map position từ API
          cards: (column.cards || []).map((card) => ({
            id: card.id,
            title: card.title,
            description: card.description,
            type: (card.type as CardType["type"]) || "goal",
            count: card.count,
          })),
        }))

        setColumns(formattedColumns)
      }
    } catch (err) {
      console.error("❌ Failed to load board data:", err)
      setMockData()
    } finally {
      setLoading(false)
    }
  }

  const setMockData = () => {
    console.log("🧪 Using fallback mock data...")
    setColumns([
      {
        id: 1,
        title: "To Do",
        position: 0, // ✅ Thêm position cho mock data
        cards: [
          { id: 1, title: "Task 1", description: "Description 1", type: "goal", count: 0 },
          { id: 2, title: "Task 2", description: "Description 2", type: "goal", count: 0 },
        ],
      },
      {
        id: 2,
        title: "In Progress",
        position: 1, // ✅ Thêm position cho mock data
        cards: [{ id: 3, title: "Task 3", description: "Description 3", type: "goal", count: 0 }],
      },
      {
        id: 3,
        title: "Done",
        position: 2, // ✅ Thêm position cho mock data
        cards: [],
      },
    ])
  }

  const handleAddColumn = async (title: string) => {
    if (addingColumn || !currentBoardId) return

    try {
      setAddingColumn(true)
      console.log("➕ Adding column:", title, "to board:", currentBoardId)

      const createData: CreateColumnDto = {
        title,
        boardId: currentBoardId,
        position: columns.length,
      }

      const newColumn = await columnApi.createColumn(createData)
      console.log("✅ Column created:", newColumn)

      const formattedColumn: ColumnType = {
        id: newColumn.id,
        title: newColumn.title,
        position: newColumn.position, // ✅ Map position từ API response
        cards: [],
      }

      setColumns([...columns, formattedColumn])
      setShowAddColumn(false)
    } catch (error) {
      console.error("❌ Failed to add column:", error)

      console.log("🧪 Adding mock column for testing...")
      const newColumn: ColumnType = {
        id: Date.now(),
        title,
        position: columns.length, // ✅ Set position cho mock data
        cards: [],
      }
      setColumns([...columns, newColumn])
      setShowAddColumn(false)
    } finally {
      setAddingColumn(false)
    }
  }

  const handleUpdateColumn = async (columnId: number, newTitle: string) => {
    try {
      console.log("✏️ Updating column:", columnId, newTitle)
      await columnApi.updateColumn(columnId, { title: newTitle })
      setColumns((cols) => cols.map((col) => (col.id === columnId ? { ...col, title: newTitle } : col)))
      console.log("✅ Column updated successfully")
    } catch (error) {
      console.error("❌ Failed to update column:", error)
      setColumns((cols) => cols.map((col) => (col.id === columnId ? { ...col, title: newTitle } : col)))
    }
  }

  const handleDeleteColumn = async (columnId: number) => {
    try {
      console.log("🗑️ Deleting column:", columnId)
      await columnApi.deleteColumn(columnId)
      setColumns((cols) => cols.filter((col) => col.id !== columnId))
      console.log("✅ Column deleted successfully")
    } catch (error) {
      console.error("❌ Failed to delete column:", error)
      setColumns((cols) => cols.filter((col) => col.id !== columnId))
    }
  }

  const handleCopyColumn = async (columnId: number) => {
    const columnToCopy = columns.find((col) => col.id === columnId)
    if (!columnToCopy || !currentBoardId) return

    try {
      console.log("📋 Copying column:", columnId)
      const createData: CreateColumnDto = {
        title: `${columnToCopy.title} (Copy)`,
        boardId: currentBoardId,
        position: columns.length,
      }

      const newColumn = await columnApi.createColumn(createData)
      const formattedColumn: ColumnType = {
        id: newColumn.id,
        title: newColumn.title,
        position: newColumn.position, // ✅ Map position từ API response
        cards: [],
      }

      setColumns([...columns, formattedColumn])
      console.log("✅ Column copied successfully")
    } catch (error) {
      console.error("❌ Failed to copy column:", error)
      const newColumn: ColumnType = {
        id: Date.now(),
        title: `${columnToCopy.title} (Copy)`,
        position: columns.length, // ✅ Set position cho mock data
        cards: [],
      }
      setColumns([...columns, newColumn])
    }
  }

  const handleAddCard = async (columnId: number, title: string) => {
    try {
      const column = columns.find((col) => col.id === columnId)
      if (!column) return

      console.log("🃏 Adding card:", title, "to column:", columnId)

      const newCardData = await cardApi.createCard({
        title,
        columnId,
        description: "",
        type: "goal",
        count: 0,
        position: column.cards.length,
      })

      const newCard: CardType = {
        id: newCardData.id,
        title: newCardData.title,
        description: newCardData.description,
        type: newCardData.type as CardType["type"],
        count: newCardData.count,
      }

      setColumns((cols) => cols.map((col) => (col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col)))
      console.log("✅ Card added successfully")
    } catch (error) {
      console.error("❌ Failed to add card:", error)
      const newCard: CardType = {
        id: Date.now(),
        title,
        description: "",
        type: "goal",
        count: 0,
      }
      setColumns((cols) => cols.map((col) => (col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col)))
    }
  }

  const handleUpdateCard = async (cardId: number, newTitle: string) => {
    try {
      console.log("✏️ Updating card:", cardId, newTitle)
      await cardApi.updateCard(cardId, { title: newTitle })
      setColumns((cols) =>
        cols.map((col) => ({
          ...col,
          cards: col.cards.map((card) => (card.id === cardId ? { ...card, title: newTitle } : card)),
        })),
      )
      console.log("✅ Card updated successfully")
    } catch (error) {
      console.error("❌ Failed to update card:", error)
      setColumns((cols) =>
        cols.map((col) => ({
          ...col,
          cards: col.cards.map((card) => (card.id === cardId ? { ...card, title: newTitle } : card)),
        })),
      )
    }
  }

  if (loading) {
    return (
      <div className={styles.board}>
        <BoardToolbar />
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading board data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.board}>
      <BoardToolbar />
      <div className={styles.columns}>
        {columns.map((col) => (
          <Column
            key={col.id}
            column={col}
            onCardClick={setSelectedCard}
            onAddCard={handleAddCard}
            onUpdateColumn={handleUpdateColumn}
            onDeleteColumn={handleDeleteColumn}
            onCopyColumn={handleCopyColumn}
            onUpdateCard={handleUpdateCard}
            boardId={currentBoardId}
            data-id={col.id}
          />
        ))}
        {showAddColumn ? (
          <AddColumnForm onAdd={handleAddColumn} onCancel={() => setShowAddColumn(false)} loading={addingColumn} />
        ) : (
          <button className={styles.addColumnBtn} onClick={() => setShowAddColumn(true)}>
            <AiFillFileAdd className={styles.addColumnIcon} />
            Add new column
          </button>
        )}
      </div>
    </div>
  )
}

export default Board
