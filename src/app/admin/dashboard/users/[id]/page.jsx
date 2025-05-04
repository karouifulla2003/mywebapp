"use client";
import { useState, useEffect } from "react";
import styles from "@/components/admin-dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

// بيانات محلية بدلاً من قاعدة البيانات
const mockUsers = {
  "1": {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    phone: "1234567890",
    address: "123 Main St",
    isAdmin: true,
    isActive: true,
    img: "/noavatar.png"
  },
  // يمكنك إضافة المزيد من المستخدمين
};

const SingleUserPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    isAdmin: false,
    isActive: false
  });

  useEffect(() => {
    // محاكاة جلب البيانات
    const fetchUserData = () => {
      // استخدام البيانات المحلية
      const userData = mockUsers[id] || {
        id,
        username: "user_" + id,
        email: `user${id}@example.com`,
        phone: "",
        address: "",
        isAdmin: false,
        isActive: true,
        img: "/noavatar.png"
      };
      
      setUser(userData);
      setFormData({
        username: userData.username,
        email: userData.email,
        password: "",
        phone: userData.phone || "",
        address: userData.address || "",
        isAdmin: userData.isAdmin || false,
        isActive: userData.isActive || true
      });
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "isAdmin" || name === "isActive" ? value === "true" : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // محاكاة حفظ البيانات
    const updatedUser = {
      ...user,
      ...formData
    };
    
    console.log("تم تحديث بيانات المستخدم:", updatedUser);
    
    // تخزين البيانات في localStorage
    const storedUsers = JSON.parse(localStorage.getItem("adminUsers") || "{}");
    storedUsers[id] = updatedUser;
    localStorage.setItem("adminUsers", JSON.stringify(storedUsers));
    
    alert("User data has been successfully updated");
    router.push("/admin/dashboard/users");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.img || "/noavatar.png"} alt="" fill />
        </div>
        {user.username}
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="id" value={user.id}/>
          <label>Username</label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
          />
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
          />
          <label>Phone</label>
          <input 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
          />
          <label>Address</label>
          <textarea 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
          />
          <label>Is Admin?</label>
          <select 
            name="isAdmin" 
            value={formData.isAdmin}
            onChange={handleChange}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <label>Is Active?</label>
          <select 
            name="isActive" 
            value={formData.isActive}
            onChange={handleChange}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;