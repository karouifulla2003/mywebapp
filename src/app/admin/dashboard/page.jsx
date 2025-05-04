import { cards } from "@/lib/adminData";
import Card from "@/components/admin-dashboard/card/card";
import Chart from "@/components/admin-dashboard/chart/chart";
import styles from "@/components/admin-dashboard/dashboard.module.css";
import Rightbar from "@/components/admin-dashboard/rightbar/rightbar";
import Transactions from "@/components/admin-dashboard/transactions/transactions";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
