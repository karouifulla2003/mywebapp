import { deleteUser } from "@/lib/adminActions";
import { cards } from "@/lib/adminData"; // Import the dummy data
import Pagination from "@/components/admin-dashboard/pagination/pagination";
import Search from "@/components/admin-dashboard/search/search";
import styles from "@/components/admin-dashboard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";

const UsersPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  
  // Use dummy data instead of fetchUsers
  const count = cards[0].number; // Using the "Total Users" count from dummy data
  const users = [
    {
      id: "1",
      username: "John Doe",
      email: "john@example.com",
      createdAt: new Date(),
      isAdmin: false,
      isActive: true,
      img: "/noavatar.png"
    },
    {
      id: "2",
      username: "Jane Smith",
      email: "jane@example.com",
      createdAt: new Date(),
      isAdmin: true,
      isActive: true,
      img: "/noavatar.png"
    },
    // Add more dummy users as needed
  ];

  // Simple filtering for search functionality
  const filteredUsers = q 
    ? users.filter(user => 
        user.username.toLowerCase().includes(q.toLowerCase()) || 
        user.email.toLowerCase().includes(q.toLowerCase())
      )
    : users;

  // Simple pagination
  const itemsPerPage = 5;
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="admin/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.createdAt?.toString().slice(4, 16)}</td>
              <td>{user.isAdmin ? "Admin" : "Client"}</td>
              <td>{user.isActive ? "active" : "passive"}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/admin/dashboard/users/${user.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={user.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={filteredUsers.length} />
    </div>
  );
};

export default UsersPage;