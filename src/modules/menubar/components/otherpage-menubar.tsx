import {FaHome, FaChartPie ,FaSignOutAlt} from 'react-icons/fa';
import {IoSettingsSharp} from 'react-icons/io5';
import '../assets/styles/menubar.css';

function OthersMenuBar(){
    return(
        <nav>
            <ul className='menu'>
                <li>
                    <a href='#'>
                        <FaHome size={18} id='icon-home'/> <br />
                        <span>Home</span> 
                    </a>
                </li>
                <li>
                    <a href='#'>
                        <FaChartPie size={18} id='icon-chart'/> <br />
                        <span>Chart</span> 
                    </a>
                </li>
                <li>
                    <a href='#'>
                        <IoSettingsSharp size={19} id='icon-settings'/> <br />
                        <span>Settings</span> 
                    </a>
                </li>
                <li>
                    <a href='#'>
                        <FaSignOutAlt size={18} id='icon-signout'/> <br />
                        <span>Logout</span> 
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default OthersMenuBar