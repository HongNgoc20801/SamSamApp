import styles from "./Features.module.css";

interface Props {
  data: {
    title: string;
    items: {
      featureTitle: string;
      points: { text: string }[];
    }[];
  };
}

const icons = ["📅", "💬", "💳", "🔒", "🧾", "📌", "✅", "🧠"];

export default function Features({ data }: Props) {
  return (
     <section id="features" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{data.title}</h2>

        <div className={styles.grid}>
          {data.items.map((item, i) => {
            const primary = item.points?.[0]?.text ?? "";
            const rest = item.points?.slice(1) ?? [];

            return (
              <div key={i} className={styles.card}>
                <div className={styles.icon} aria-hidden="true">
                  {icons[i % icons.length]}
                </div>

                <h3 className={styles.cardTitle}>{item.featureTitle}</h3>

                {/* mô tả chính (giống ảnh) */}
                {primary && <p className={styles.cardDesc}>{primary}</p>}

                {/* nếu có nhiều point thì show thêm bullet nhỏ */}
                {rest.length > 0 && (
                  <ul className={styles.list}>
                    {rest.map((p, j) => (
                      <li key={j} className={styles.listItem}>
                        {p.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
