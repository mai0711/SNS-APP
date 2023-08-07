import './Header.css'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

function Header() {
  return (
    <div className="headerContainer">
        <div className="headerLeft">
            <span className="logo">LOGO</span>
        </div>
        <div className="headerCenter">
            <div className="searchBar">
                <SearchIcon className="searchIcon" />
                <input
                placeholder="Search"
                className="searchInput"
                />
            </div>
        </div>
        <div className="headerRight">
            <div className="headerIcons">
                <div className="headerIconItem">
                    <Link className="headerLink" to="/"><HomeIcon /></Link>
                </div>
                <div className="headerIconItem">
                    <Link className="headerLink" to="/profile"><PersonIcon /></Link>
                </div>
                <div className="headerIconItem">
                    {/* <Link className="headerLink" to="/poste"><PostAddIcon /></Link> */}
                </div>
                <div className="headerIconItem">
                    <Link className="headerLink" to="/favorite"><FavoriteBorderIcon /></Link>
                </div>
                <div className="headerIconItem">
                    <Link className="headerLink" to="/"><LogoutIcon /></Link>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Header