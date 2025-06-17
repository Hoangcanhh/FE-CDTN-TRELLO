"use client"

import type React from "react"
import { useState, useEffect } from "react"
import styles from "../styles/boardList.module.scss"
import { boardApi } from "../api/board.api"
import type { BoardDto } from "../api/board.api"
import { Link } from "react-router-dom"

const BoardList: React.FC = () => {
  const [boards, setBoards] = useState<BoardDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadBoards()
  }, [])

  const loadBoards = async () => {
    try {
      setLoading(true)
      setError(null)

      const boardsData = await boardApi.getBoards()
      setBoards(boardsData)
    } catch (err) {
      console.error("Failed to load boards:", err)
      setError("Failed to load boards")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading boards...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={loadBoards}>Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* <h1>Your Boards</h1> */}
      {/* <div className={styles.boardGrid}> */}
        {boards.map((board) => (
          <Link key={board.id} to={`/board/${board.id}`} className={styles.boardCard}>
            <div className={styles.boardTitle}>{board.title}</div>
            <div className={styles.boardDescription}>{board.description}</div>
            {board.starred && <div className={styles.starred}>⭐</div>}
          </Link>
        ))}
      {/* </div> */}
    </div>
  )
}

export default BoardList
