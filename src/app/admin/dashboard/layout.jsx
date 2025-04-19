import Navbar from "@components/admin-dashboard/navbar/navbar"
import Sidebar from "@components/admin-dashboard/sidebar/sidebar"
import styles from "@components/admin-dashboard/dashboard.module.css"
import Footer from "@components/admin-dashboard/footer/footer"

const Layout = ({children}) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar/>
      </div>
      <div className={styles.content}>
        <Navbar/>
        {children}
        <Footer/>
      </div>
    </div>
  )
}

export default Layout