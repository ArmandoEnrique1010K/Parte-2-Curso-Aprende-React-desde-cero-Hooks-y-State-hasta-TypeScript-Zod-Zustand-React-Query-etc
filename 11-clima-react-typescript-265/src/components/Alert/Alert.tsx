import { ReactNode } from "react";
import styles from './Alert.module.css';

// Asignale el type al children
export default function Alert({ children }: { children: ReactNode }) {
    return (
        <div className={styles.alert}>{children}</div>
    )
}
