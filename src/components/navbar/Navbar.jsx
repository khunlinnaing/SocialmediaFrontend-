import './navbar.scss'
import HouseIcon from '@mui/icons-material/House';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AppsIcon from '@mui/icons-material/Apps';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../contact/darkModeContext';
import { AuthContext } from '../../contact/authContext';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
function Navbar(){

    const { toggle, darkMode } = useContext(DarkModeContext)
    const { currentUser } = useContext(AuthContext)
    
    const navigate = useNavigate()

    const queryClient = useQueryClient();


    const mutation = useMutation({
        mutationFn: () => {
                return makeRequest.post("/auth/logout")
                },
        onSuccess: () => {
        // Invalidate and refetch
        localStorage.removeItem("user");
        navigate('/login')
        // queryClient.invalidateQueries({ queryKey: ['logout'] })
        },
    })
    const handleLogout = () =>{
        mutation.mutate()
    }
    return(
        <div className='navbar'>
            <div className="left">
                <Link to='/' style={{textDecoration: 'none'}}>
                    <span>Lamasocial</span>
                </Link>
                <HouseIcon />
                {darkMode ? <WbSunnyIcon onClick={toggle}/> : <DarkModeIcon onClick={toggle}/>}
                <AppsIcon />
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type='text' placeholder='Search.....'/>
                </div>
            </div>
            <div className="right">
                <PersonOutlinedIcon />
                <MailIcon />
                <NotificationsIcon />

                <div className="user">
                    <Link to={`/profile/${currentUser.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img src={"/upload/"+currentUser.profilePic} alt="" />
                        <span>{currentUser.name}</span>
                    </Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}
export default Navbar;