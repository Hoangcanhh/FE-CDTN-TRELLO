"use client"

import { useState, useRef, useEffect } from "react"
import { FaTimes, FaLink, FaChevronDown, FaTrash } from "react-icons/fa"
import styles from "../styles/shareModal.module.scss"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "admin" | "member" | "observer"
}

interface ShareBoardModalProps {
  isOpen: boolean
  onClose: () => void
  boardName: string
  onShareSuccess: (newUser: User) => void
  onDeleteMember?: (userId: string) => void // Thêm prop mới để xử lý xóa thành viên
  boardMembers: User[] // Nhận danh sách thành viên từ component cha
  setBoardMembers: (members: User[]) => void // Nhận hàm cập nhật danh sách thành viên
}

// Đảm bảo export mặc định đúng với tên component
export default function ShareBoardModal({
  isOpen,
  onClose,
  boardName,
  onShareSuccess,
  onDeleteMember,
  boardMembers,
  setBoardMembers,
}: ShareBoardModalProps) {
  const [email, setEmail] = useState("")
  const [activeTab, setActiveTab] = useState<"members" | "requests">("members")
  const [selectedRole, setSelectedRole] = useState<"admin" | "member" | "observer">("member")
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const roleDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target as Node)) {
        setIsRoleDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleShare = () => {
    if (!email) {
      alert("Vui lòng nhập địa chỉ email hoặc tên người dùng")
      return
    }

    // Tạo một người dùng mới từ email
    const newUser: User = {
      id: Date.now().toString(),
      name: email.includes("@") ? email.split("@")[0] : email,
      email: email.includes("@") ? email : `${email}@example.com`,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        email.includes("@") ? email.split("@")[0] : email,
      )}&background=random`,
      role: selectedRole,
    }

    // Thêm người dùng mới vào danh sách thành viên
    setBoardMembers([...boardMembers, newUser])

    // Hiển thị thông báo thành công
    setSuccessMessage(`Invited ${newUser.name} to join the table with ${selectedRole}`)

    // Gọi callback để cập nhật avatar trong BoardToolbar
    onShareSuccess(newUser)

    // Xóa thông báo sau 3 giây
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)

    // Reset form
    setEmail("")
  }

  const handleRoleSelect = (role: "admin" | "member" | "observer") => {
    setSelectedRole(role)
    setIsRoleDropdownOpen(false)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(`https://trello.com/b/${boardName.toLowerCase().replace(/\s+/g, "-")}`)
    setSuccessMessage("Link copied to clipboard!")
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "member":
        return "Member"
      case "observer":
        return "Observer"
      default:
        return "Observer"
    }
  }

  // Hàm xử lý xóa thành viên
  const handleDeleteMember = (userId: string) => {
    // Nếu đang hiển thị xác nhận cho thành viên này, thực hiện xóa
    if (deleteConfirmation === userId) {
      // Lọc ra danh sách thành viên mới không bao gồm thành viên bị xóa
      const updatedMembers = boardMembers.filter((member) => member.id !== userId)
      setBoardMembers(updatedMembers)

      // Gọi callback để cập nhật UI ở component cha (nếu có)
      if (onDeleteMember) {
        onDeleteMember(userId)
      }

      setDeleteConfirmation(null)
      setSuccessMessage("Member removed from table")
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } else {
      // Hiển thị xác nhận xóa
      setDeleteConfirmation(userId)
      // Tự động ẩn xác nhận sau 3 giây nếu không có hành động
      setTimeout(() => {
        setDeleteConfirmation(null)
      }, 3000)
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div ref={modalRef} className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Share boards</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.modalContent}>
          {successMessage && (
            <div className={styles.successMessage}>
              <span>{successMessage}</span>
              <button onClick={() => setSuccessMessage("")}>
                <FaTimes />
              </button>
            </div>
          )}

          <div className={styles.shareForm}>
            <input
              type="text"
              placeholder="Email or name..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
            />

            <div className={styles.roleDropdownContainer} ref={roleDropdownRef}>
              <button className={styles.roleDropdownButton} onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}>
                <span>{getRoleDisplayName(selectedRole)}</span>
                <FaChevronDown />
              </button>

              {isRoleDropdownOpen && (
                <div className={styles.roleDropdown}>
                  <div
                    className={`${styles.roleOption} ${selectedRole === "member" ? styles.selected : ""}`}
                    onClick={() => handleRoleSelect("member")}
                  >
                    <div className={styles.roleTitle}>Member</div>
                  </div>
                  <div
                    className={`${styles.roleOption} ${selectedRole === "observer" ? styles.selected : ""}`}
                    onClick={() => handleRoleSelect("observer")}
                  >
                    <div className={styles.roleTitle}>Observer</div>
                    <div className={styles.roleDescription}>Add people with limited permissions to this table.</div>
                  </div>
                </div>
              )}
            </div>

            <button className={styles.shareButton} onClick={handleShare}>Share </button>
          </div>

          <div className={styles.shareLink} onClick={copyLink}>
            <FaLink className={styles.linkIcon} />
            <div>
              <div className={styles.linkText}>Share this board with link</div>
              <div className={styles.linkSubtext}>Create links</div>
            </div>
          </div>

          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${activeTab === "members" ? styles.active : ""}`}
              onClick={() => setActiveTab("members")}
            >
              Member of the bulletin board <span className={styles.tabCount}>{boardMembers.length}</span>
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "requests" ? styles.active : ""}`}
              onClick={() => setActiveTab("requests")}
            >
              Request to join
            </button>
          </div>

          <div>
            {activeTab === "members" ? (
              boardMembers.length > 0 ? (
                <div className={styles.membersList}>
                  {boardMembers.map((user) => (
                    <div key={user.id} className={styles.memberItem}>
                      <div className={styles.memberInfo}>
                        <div className={styles.memberAvatar}>
                          {user.avatar ? (
                            <img src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          ) : (
                            user.name.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div>
                          <div className={styles.memberName}>{user.name}</div>
                          <div className={styles.memberEmail}>
                            @{user.email.split("@")[0]} {user.role === "admin" ? "Không gian làm việc" : ""}
                            {/* Khách */}
                          </div>
                        </div>
                      </div>
                      <div className={styles.memberActions}>
                        <div className={styles.memberRole}>
                          <button className={styles.roleButton}>{getRoleDisplayName(user.role)}</button>
                        </div>

                        {/* Nút xóa thành viên */}
                        <button
                          className={`${styles.deleteButton} ${deleteConfirmation === user.id ? styles.confirmDelete : ""}`}
                          onClick={() => handleDeleteMember(user.id)}
                          title={deleteConfirmation === user.id ? "Nhấn để xác nhận xóa" : "Xóa thành viên"}
                        >
                          {deleteConfirmation === user.id ? <>Confirm</> : <FaTrash />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noMembers}>There are no members in this board yet</div>
              )
            ) : (
              <div className={styles.noRequests}>No participation required</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
