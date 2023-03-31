import {FaPlusCircle, FaChartPie ,FaSignOutAlt} from 'react-icons/fa';
import {IoSettingsSharp} from 'react-icons/io5';
import styles from '../assets/styles/menubar.module.css';

function MainMenuBar(){
    return(
        <nav>
            <ul className={styles.menu}>
                <li>
                    <a href='#' className={styles.menuItem}>
                        <FaPlusCircle size={18} className={styles.iconPlus}/> <br />
                        <span className={styles.menuText}>Add</span> 
                    </a>
                </li>
                <li>
                    <a href='#' className={styles.menuItem}>
                        <FaChartPie size={18} className={styles.iconChart}/> <br />
                        <span className={styles.menuText}>Chart</span> 
                    </a>
                </li>
                <li>
                    <a href='#' className={styles.menuItem}>
                        <IoSettingsSharp size={19} className={styles.iconSettings}/> <br />
                        <span className={styles.menuText}>Settings</span> 
                    </a>
                </li>
                <li>
                    <a href='#' className={styles.menuItem}>
                        <FaSignOutAlt size={18} className={styles.iconSignout}/> <br />
                        <span className={styles.menuText}>Logout</span> 
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default MainMenuBar