"use client"

import { useState } from "react"
import styles from "../styles/boardToolbar.module.scss"
import { FaGlobe, FaUserPlus } from "react-icons/fa"
import { MdDashboard } from "react-icons/md"
import ShareBoardModal from "./share-board-modal"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "admin" | "member" | "observer"
}

const BoardToolbar = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [boardMembers, setBoardMembers] = useState<User[]>([])

  const handleShareSuccess = (newUser: User) => {
    // Thêm người dùng mới vào danh sách thành viên
    setBoardMembers((prevMembers) => {
      // Kiểm tra xem người dùng đã tồn tại chưa
      const exists = prevMembers.some((member) => member.email === newUser.email)
      if (exists) {
        return prevMembers
      }
      return [...prevMembers, newUser]
    })
  }

  // Hàm xử lý xóa thành viên
  const handleDeleteMember = (userId: string) => {
    // Cập nhật danh sách thành viên bằng cách loại bỏ thành viên có id tương ứng
    setBoardMembers((prevMembers) => prevMembers.filter((member) => member.id !== userId))
  }

  return (
    <>
      <div className={styles.toolbar}>
        <span className={styles.boardName}>
          <MdDashboard className={styles.boardIcon} />
          Board
        </span>
        <span className={styles.toolbarItem}>
          <FaGlobe /> Public
        </span>
        

        {/* Đẩy phần invite và avatars sang bên phải */}
        <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
          <button className={styles.inviteBtn} onClick={() => setIsShareModalOpen(true)}>
            <FaUserPlus /> Invite
          </button>

          {/* Hiển thị avatar của các thành viên */}
          {boardMembers.length > 0 && (
            <div className={styles.avatarsContainer}>
              {boardMembers.slice(0, 3).map((member) => (
                <div
                  key={member.id}
                  className={styles.avatar}
                  title={`${member.name} (${
                    member.role === "admin"
                      ? "Quản trị viên"
                      : member.role === "member"
                        ? "Member"
                        : "Observer"
                  })`}
                >
                  {member.avatar ? (
                    <img src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  ) : (
                    member.name.charAt(0).toUpperCase()
                  )}
                </div>
              ))}
              {boardMembers.length > 3 && (
                <div
                  className={`${styles.avatar} ${styles.avatarCount}`}
                  title={`Còn ${boardMembers.length - 3} thành viên khác`}
                >
                  +{boardMembers.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ShareBoardModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        boardName="Trello Clone"
        onShareSuccess={handleShareSuccess}
        onDeleteMember={handleDeleteMember}
        boardMembers={boardMembers}
        setBoardMembers={setBoardMembers}
      />
    </>
  )
}

export default BoardToolbar
