"use client"

import { useState, useRef, useEffect } from "react"
import { FaTrello, FaBell, FaUserCircle, FaSearch } from "react-icons/fa"
import styles from "../styles/header.module.scss"
import { IoMdSettings } from "react-icons/io"
import { TiUserAdd } from "react-icons/ti"
import { IoIosLogOut } from "react-icons/io"
import Profile from "./profile"


const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [showNotification, setShowNotification] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const profileModalRef = useRef<HTMLDivElement>(null)

  // Lấy thông tin người dùng từ localStorage
  const [userInfo, setUserInfo] = useState<{
    username: string
    email: string
    avatar?: string
  }>({
    username: localStorage.getItem("username") || "User",
    email: localStorage.getItem("email") || "",
    avatar: localStorage.getItem("avatar") || "",
  })

  // Cập nhật thông tin người dùng khi component mount hoặc khi menu mở
  useEffect(() => {
    const username = localStorage.getItem("username")
    const email = localStorage.getItem("email")
    const avatar = localStorage.getItem("avatar")

    if (username || email) {
      setUserInfo({
        username: username || "User",
        email: email || "",
        avatar: avatar || "",
      })
    }
  }, [showUserMenu, showProfileModal])

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Đóng user menu nếu đang mở và click ra ngoài nó
      if (showUserMenu && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
      // Đóng notification nếu đang mở và click ra ngoài nó
      if (showNotification && notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotification(false)
      }
      // Đóng modal profile nếu đang mở và click ra ngoài nó
      if (showProfileModal && profileModalRef.current && !profileModalRef.current.contains(event.target as Node)) {
        setShowProfileModal(false)
      }
    }
    if (showUserMenu || showNotification || showProfileModal) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showUserMenu, showNotification, showProfileModal])

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <span className={styles.logo}>
          <FaTrello className={styles.logoIcon} />
          Trello
        </span>
        <nav className={styles.nav}>
          <span>Workspaces</span>
          <span>Recent</span>
          <span>Starred</span>
          <span>Templates</span>
          <span>Create</span>
        </nav>
      </div>
      <div className={styles.right}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input type="text" placeholder="Search" />
        </div>
        <FaBell className={styles.icon} onClick={() => setShowNotification((v) => !v)} style={{ cursor: "pointer" }} />
        {showNotification && (
          <div className={styles.notificationPopup} ref={notificationRef}>
            <div className={styles.notificationHeader}>
              <span>Notification</span>
              <span className={styles.notificationMore}>⋮</span>
            </div>
            <div className={styles.notificationEmpty}>
              <div className={styles.notificationText}>No unread notifications</div>
            </div>
          </div>
        )}

        {/* Hiển thị avatar từ Google nếu có, nếu không thì hiển thị icon mặc định */}
        {userInfo.avatar ? (
          <img
            src={userInfo.avatar || "/placeholder.svg"}
            alt={userInfo.username}
            className={styles.avatarImage}
            onClick={() => setShowUserMenu((v) => !v)}
            style={{
              cursor: "pointer",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <FaUserCircle
            className={styles.avatar}
            onClick={() => setShowUserMenu((v) => !v)}
            style={{ cursor: "pointer" }}
          />
        )}

        {showUserMenu && (
          <div className={styles.userMenu} ref={menuRef}>
            <div
              className={styles.menuItem}
              style={{ display: "flex", alignItems: "center", gap: 8, cursor: "default" }}
            >
              {userInfo.avatar ? (
                <img
                  src={userInfo.avatar || "/placeholder.svg"}
                  alt={userInfo.username}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <FaUserCircle className={styles.menuIcon} />
              )}
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                <span style={{ fontWeight: 600 }}>{userInfo.username}</span>
                <span style={{ fontSize: 13, color: "#888" }}>{userInfo.email}</span>
              </div>
            </div>
            <div
              className={styles.menuItem}
              onClick={() => {
                setShowProfileModal(true)
                setShowUserMenu(false)
              }}
            >
              <FaUserCircle className={styles.menuIcon} />
              Profile
            </div>
            <div className={styles.menuDivider} />
            <div className={styles.menuItem}>
              <TiUserAdd className={styles.menuIcon} />
              Add another account
            </div>
            <div className={styles.menuItem}>
              <IoMdSettings className={styles.menuIcon} />
              Settings
            </div>
            <div
              className={styles.menuItem}
              onClick={() => {
                localStorage.removeItem("token")
                localStorage.removeItem("username")
                localStorage.removeItem("email")
                localStorage.removeItem("avatar")
                window.location.href = "/login"
              }}
            >
              <IoIosLogOut className={styles.menuIcon} />
              Logout
            </div>
          </div>
        )}

        {/* Hiện modal profile nếu showProfileModal = true */}
        {showProfileModal && (
          <div className={styles.profileModalOverlay}>
            <div className={styles.profileModal} ref={profileModalRef}>
              <Profile onClose={() => setShowProfileModal(false)} />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
