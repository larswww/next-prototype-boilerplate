/**
 * kitchen-sink component to ensure test/setup etc works
 */
import styles from '../styles/Canary.module.css'
import Image from 'next/image'

export interface CanaryProps {
    message: string
}

export const Canary = (props: CanaryProps) => {
    return (
        <div>
            <h1 className={'bg-green-500'}>Canary</h1>
            <p role="test" className={styles.test}>Background from css module</p>
            <Image src="https://via.placeholder.com/150" width={150} height={150}/>
            <p>{props.message}</p>
        </div>
    )

}

export default Canary