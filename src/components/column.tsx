"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import Card from "./card"
import AddCardForm from "./addCardForm"
import type { ColumnType, CardType } from "./board"
import { columnApi } from "../api/column.api"
import styles from "../styles/column.module.scss"
import { FaEllipsisH } from "react-icons/fa"
import { MdAddCard } from "react-icons/md"
import { FaRegCopy } from "react-icons/fa6"
import { MdDeleteForever } from "react-icons/md"
import { IoMdClose } from "react-icons/io"
import { MdEdit } from "react-icons/md"

type Props = {
  column: ColumnType
  onAddCard: (columnId: number, title: string) => void
  onCardClick: (card: CardType) => void
  onUpdateColumn: (columnId: number, title: string) => void
  onDeleteColumn: (columnId: number) => void
  onCopyColumn: (columnId: number) => void
  onUpdateCard: (cardId: number, title: string) => void
  "data-id": number
  boardId?: string // ✅ Thêm boardId prop để tạo column mới
}

const Column: React.FC<Props> = ({
  column,
  onAddCard,
  onCardClick,
  onUpdateColumn,
  onDeleteColumn,
  onCopyColumn,
  onUpdateCard,
  "data-id": dataId,
  boardId,
}) => {
  const [showAddCard, setShowAddCard] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [titleValue, setTitleValue] = useState(column.title)
  const [isLoading, setIsLoading] = useState(false) // ✅ Loading state
  const menuRef = useRef<HTMLDivElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)

  // Sử dụng useSortable để hỗ trợ kéo thả
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: column.id })

  // Áp dụng style với kiểu CSSProperties, giữ kích thước cố định, không mờ
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 250ms ease",
    width: "250px",
    minHeight: "200px",
    boxSizing: "border-box" as const,
  }

  // Update title value when column title changes
  useEffect(() => {
    setTitleValue(column.title)
  }, [column.title])

  // Focus input when editing title
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus()
      titleInputRef.current.select()
    }
  }, [isEditingTitle])

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showMenu])

  // ✅ Handle title save với API call
  const handleSaveTitle = async () => {
    if (titleValue.trim() && titleValue.trim() !== column.title) {
      setIsLoading(true)
      try {
        // Gọi API để update column title
        await columnApi.updateColumn(column.id, { title: titleValue.trim() })

        // Gọi callback để update UI
        onUpdateColumn(column.id, titleValue.trim())
        console.log("✅ Column title updated successfully")
      } catch (error) {
        console.error("❌ Failed to update column title:", error)
        // Reset title nếu lỗi
        setTitleValue(column.title)
        alert("Không thể cập nhật tên cột. Vui lòng thử lại!")
      } finally {
        setIsLoading(false)
      }
    } else {
      setTitleValue(column.title) // Reset if empty or unchanged
    }
    setIsEditingTitle(false)
  }

  // Handle title cancel
  const handleCancelTitleEdit = () => {
    setTitleValue(column.title)
    setIsEditingTitle(false)
  }

  // ✅ Các hàm thao tác với API calls
  const handleDeleteColumn = async () => {
    if (!confirm(`Bạn có chắc muốn xóa cột "${column.title}"?`)) {
      return
    }

    setIsLoading(true)
    try {
      console.log("🗑️ Starting delete column:", column.id)

      // Gọi API để xóa column
      await columnApi.deleteColumn(column.id)

      // Gọi callback để update UI
      onDeleteColumn(column.id)
      console.log("✅ Column deleted successfully")
    } catch (error) {
      console.error("❌ Failed to delete column details:", {
        error,
        columnId: column.id,
        columnTitle: column.title,
        // message: error?.message,
      })
      alert(`Không thể xóa cột "${column.title}". Lỗi: ${ "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
    setShowMenu(false)
  }

  const handleCopyColumn = async () => {
    if (!boardId) {
      console.error("❌ BoardId is required to copy column")
      alert("Không thể sao chép cột. Thiếu thông tin board!")
      return
    }

    setIsLoading(true)
    try {
      // Tạo column mới với title có prefix "Copy of"
      const newColumnData = {
        title: `Copy of ${column.title}`,
        boardId: boardId,
        position: column.position + 1,
      }

      await columnApi.createColumn(newColumnData)

      // Gọi callback để update UI
      onCopyColumn(column.id)
      console.log("✅ Column copied successfully")
    } catch (error) {
      console.error("❌ Failed to copy column:", error)
      alert("Không thể sao chép cột. Vui lòng thử lại!")
    } finally {
      setIsLoading(false)
    }
    setShowMenu(false)
  }

  const handleEditTitle = () => {
    setIsEditingTitle(true)
    setShowMenu(false)
  }

  // Xử lý thêm thẻ từ menu, đảm bảo không xung đột với useSortable
  const handleAddCardFromMenu = () => {
    setShowAddCard(true)
    setShowMenu(false)
  }

  const handleRenameCard = (cardId: number, newTitle: string) => {
    onUpdateCard(cardId, newTitle)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${styles.column} ${isLoading ? styles.loading : ""}`} // ✅ Add loading class
      data-is-dragging={isDragging}
      data-id={dataId}
    >
      <div
        className={styles.header}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}
      >
        {isEditingTitle ? (
          <input
            ref={titleInputRef}
            type="text"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            onBlur={handleSaveTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSaveTitle()
              } else if (e.key === "Escape") {
                handleCancelTitleEdit()
              }
            }}
            className={styles.titleInput}
            disabled={isLoading} // ✅ Disable khi loading
          />
        ) : (
          <span className={styles.title} onDoubleClick={handleEditTitle} title="Double-click to edit">
            {column.title}
            {isLoading && <span className={styles.loadingIndicator}>...</span>} {/* ✅ Loading indicator */}
          </span>
        )}

        <button
          className={styles.menuBtn}
          onClick={() => setShowMenu((v) => !v)}
          disabled={isLoading} // ✅ Disable khi loading
        >
          <FaEllipsisH />
        </button>

        {showMenu && (
          <div className={styles.columnMenu} ref={menuRef}>
            <div className={styles.menuItem} onClick={handleAddCardFromMenu}>
              <MdAddCard className={styles.menuIcon} />
              Add new card
            </div>
            <div className={styles.menuItem} onClick={handleEditTitle}>
              <MdEdit className={styles.menuIcon} />
              Edit title
            </div>
            <div className={styles.menuItem} onClick={handleCopyColumn}>
              <FaRegCopy className={styles.menuIcon} />
              Copy column
            </div>
            <div className={`${styles.menuItem} ${styles.menuDanger}`} onClick={handleDeleteColumn}>
              <MdDeleteForever className={styles.menuIcon} />
              Delete column
            </div>
            <div className={styles.menuItem} style={{ color: "#888" }} onClick={() => setShowMenu(false)}>
              <IoMdClose className={styles.menuIcon} />
              Close
            </div>
          </div>
        )}
      </div>

      <div className={styles.cards}>
        {column.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => onCardClick(card)}
            onRename={(newTitle) => handleRenameCard(card.id, newTitle)}
          />
        ))}
      </div>

      {showAddCard ? (
        <AddCardForm
          onAdd={(title) => {
            if (title && title.trim()) {
              onAddCard(column.id, title.trim())
            }
            setShowAddCard(false)
          }}
          onCancel={() => setShowAddCard(false)}
        />
      ) : (
        <button
          className={styles.addCardBtn}
          onClick={() => setShowAddCard(true)}
          disabled={isLoading} // ✅ Disable khi loading
        >
          <MdAddCard className={styles.addCardIcon} />
          Add new card
        </button>
      )}
    </div>
  )
}

export default Column
