import React, { useState } from 'react';
import { updateUser } from '../api/profile.api';

type ProfileProps = {
  onClose: () => void;
};

const labelStyle: React.CSSProperties = {
  fontWeight: 600,
  color: '#555',
  alignSelf: 'center',
};

const inputStyle: React.CSSProperties = {
  fontSize: '1rem',
  width: '100%',
  padding: '6px 10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  outline: 'none',
  transition: 'border-color 0.3s',
};

const buttonStyle: React.CSSProperties = {
  marginTop: '30px',
  display: 'block',
  width: '100%',
  padding: '12px 0',
  fontSize: '1.1rem',
  fontWeight: 600,
  color: '#fff',
  backgroundColor: '#0079bf',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const toastStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 32,
  left: 32,
  background: '#4A90E2',
  color: '#fff',
  padding: '14px 28px',
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 16,
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  zIndex: 3000,
  animation: 'fadeIn 0.3s',
};

const Profile: React.FC<ProfileProps> = ({ onClose }) => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    email: '',
    phone: '',
    job: '',
    website: '',
    description: '',
  });
  // const [, setSavedData] = useState<typeof profileData | null>(null);
  const [isButtonHovered, setIsButtonHovered] = React.useState(false);
  const [showToast] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));

  const handleChange = (field: keyof typeof profileData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };
  const handleSave = async () => {
  const updatedUser = await updateUser(user.id, {
    username: user.username,
    email: user.email,
    // các trường khác nếu có
  });
  setUser(updatedUser);
  // localStorage đã được cập nhật ở hàm updateUser
};

//   const handleSave = async () => {
//     try {
//       const userId = localStorage.getItem('userId'); // hoặc lấy từ user object
//       if (!userId) {
//         setShowToast(true);
//         return;
//       }
//       await updateUser(Number(userId), profileData);
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 2000);
//     } catch (err) {
//       alert('Lưu thông tin thất bại!');
//     }
//   };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      {showToast && (
        <div style={toastStyle}>
          Information saved successfully!
        </div>
      )}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000
      }} onClick={handleOverlayClick}>
        <div style={{
          background: '#fff',
          borderRadius: 8,
          padding: 0,
          minWidth: 400,
          boxShadow: '0 8px 32px #091e4224',
          position: 'relative',
          width: 420,
          maxWidth: '95vw'
        }}>
          <button
            style={{
              position: 'absolute',
              top: 12,
              right: 16,
              background: 'transparent',
              border: 'none',
              fontSize: 24,
              cursor: 'pointer'
            }}
            onClick={onClose}
          >×</button>
          <div style={{
            padding: '28px 32px 20px 32px',
            boxSizing: 'border-box'
          }}>
            <h1 style={{ margin: 0, marginBottom: 18, fontSize: 22, textAlign: 'center', color: '#0079bf' }}>Personal Information</h1>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              rowGap: 10,
              columnGap: 16,
              fontSize: '1rem',
              marginBottom: 10
            }}>
              <label style={labelStyle} htmlFor="fullName">Full name:</label>
              <input
                id="fullName"
                type="text"
                value={profileData.fullName}
                onChange={handleChange('fullName')}
                style={{ ...inputStyle, background: '#fff', color: '#222' }}
                placeholder="Full Name"
                aria-label="Full Name"
              />

              <label style={labelStyle} htmlFor="dob">Date of Birth:</label>
              <input
                id="dob"
                type="date"
                value={profileData.dateOfBirth}
                onChange={handleChange('dateOfBirth')}
                style={{ ...inputStyle, background: '#fff', color: '#222' }}
                placeholder="Date of Birth"
                aria-label="Date of Birth"
              />

              <label style={labelStyle} htmlFor="address">Address:</label>
              <input
                id="address"
                type="text"
                value={profileData.address}
                onChange={handleChange('address')}
                style={{ ...inputStyle, background: '#fff', color: '#222' }}
                placeholder="Address"
                aria-label="Address"
              />

              {/* <label style={labelStyle} htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={profileData.email}
                onChange={handleChange('email')}
                style={{ ...inputStyle, background: '#fff', color: '#222' }}
                placeholder="Email"
                aria-label="Email"
              /> */}

              <label style={labelStyle} htmlFor="phone">Phone number:</label>
              <input
                id="phone"
                type="tel"
                value={profileData.phone}
                onChange={handleChange('phone')}
                style={{ ...inputStyle, background: '#fff', color: '#222' }}
                placeholder="Enter phone number"
                aria-label="Số điện thoại"
              />

              <label style={labelStyle} htmlFor="job">Occupation:</label>
              <input
                id="job"
                type="text"
                value={profileData.job}
                onChange={handleChange('job')}
                style={{ ...inputStyle, background: '#fff', color: '#222' }}
                placeholder="Enter occupation"
                aria-label="Công việc"
              />

              {/* <label style={labelStyle} htmlFor="website">Website:</label>
              <input
                id="website"
                type="url"
                value={profileData.website}
                onChange={handleChange('website')}
                style={{ ...inputStyle, background: '#fff', color: '#222' }}
                placeholder="Enter website"
                aria-label="Website"
              /> */}
            </div>

            {/* <label htmlFor="description" style={{ ...labelStyle, display: 'block', marginTop: 10 }}>
              Description:
            </label>
            <textarea
              id="description"
              value={profileData.description}
              onChange={handleChange('description')}
              rows={3}
              style={{ ...inputStyle, background: '#fff', color: '#222', resize: 'vertical', width: '100%', marginBottom: 0 }}
              placeholder="Enter description about yourself..."
              aria-label="description"
            ></textarea> */}

            <button
              type="button"
              style={{ ...buttonStyle, ...(isButtonHovered ? { backgroundColor: '#357ABD' } : {}), marginTop: 18, marginBottom: 0 }}
              onClick={handleSave}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              Save Information
            </button>

            {/* {savedData && (
              <div style={{ marginTop: 18, borderTop: '1px solid #eee', paddingTop: 10 }}>
                <h2 style={{ textAlign: 'center', color: '#4A90E2', fontSize: 18, margin: 0, marginBottom: 8 }}>Thông tin đã lưu</h2>
                <div><b>Họ và tên:</b> {savedData.fullName}</div>
                <div><b>Ngày sinh:</b> {savedData.dateOfBirth}</div>
                <div><b>Địa chỉ:</b> {savedData.address}</div>
                <div><b>Email:</b> {savedData.email}</div>
                <div><b>Số điện thoại:</b> {savedData.phone}</div>
                <div><b>Công việc:</b> {savedData.job}</div>
                <div><b>Website:</b> {savedData.website}</div>
                <div><b>Mô tả:</b> {savedData.description}</div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;


