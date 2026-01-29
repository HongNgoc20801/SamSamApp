// components/NavbarWelcome.tsx
import Link from "next/link";
import styles from "./NavbarWelcome.module.css"

export default function NavbarWelcome() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
        {/*   <svg
            className={styles.logoIcon}
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.1288 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"
              fill="currentColor"
            />
          </svg> */}
          <span className={styles.logoText}>Samsam</span>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <Link href="#how-it-works">How Samsam work</Link>
          <Link href="#features">Features</Link>
          <Link href="#why-samsam">Why Choose Samsam</Link>
        </nav>

        {/* Buttons */}
        <div className={styles.buttons}>
            <Link href="/login">
            <button className={styles.login}>Log In</button>
          </Link>
          <Link href="/register">
            <button className={styles.getStarted}>Get Started</button>
          </Link>
        </div>
      </div>
    </header>
  );
}
