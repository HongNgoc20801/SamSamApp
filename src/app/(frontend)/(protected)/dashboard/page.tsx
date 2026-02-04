
import styles from './dashboard.module.css'
 
export default function DashboardPage() {
  return (
    <section className={styles.placeholderCard} aria-label="Dashboard placeholder">
      <h1 className={styles.placeholderTitle}>Dashboard</h1>
      <p className={styles.placeholderText}>
        Trang dashboard sẽ làm sau khi các trang chức năng (Kalender, Oppdateringer, Økonomi, Barn-info, Profil) hoàn
        thiện. Hiện tại dashboard để trống/placeholder.
      </p>
    </section>
  )
}
