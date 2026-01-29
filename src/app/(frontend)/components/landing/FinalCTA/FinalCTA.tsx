import styles from "./FinalCTA.module.css";

interface Props {
  data: {
    title: string;
    subtitle?: string | null;
    primaryButtonLabel?: string | null;
    primaryButtonUrl?: string | null;
    secondaryButtonLabel?: string | null;
    secondaryButtonUrl?: string | null;
  };
}

export default function FinalCTA({ data }: Props) {
  return (
    <section className={styles.cta}>
      <h2>{data.title}</h2>
      {data.subtitle && <p>{data.subtitle}</p>}

      <div className={styles.actions}>
        {data.primaryButtonLabel && data.primaryButtonUrl && (
          <a href={data.primaryButtonUrl} className={styles.primary}>
            {data.primaryButtonLabel}
          </a>
        )}

        {data.secondaryButtonLabel && data.secondaryButtonUrl && (
          <a href={data.secondaryButtonUrl} className={styles.secondary}>
            {data.secondaryButtonLabel}
          </a>
        )}
      </div>
    </section>
  );
}
