import './leftBar.scss'
import Friends from '../../assets/1.png';
import Groups from '../../assets/2.png';
import Market from '../../assets/3.png';
import Watch from '../../assets/4.png';
import Memories from '../../assets/5.png';
import Events from '../../assets/6.png';
import Gaming from '../../assets/7.png';
import Gallery from '../../assets/8.png';
import Videos from '../../assets/9.png';
import Messages from '../../assets/10.png';
import Tutorials from '../../assets/11.png';
import Courses from '../../assets/12.png';
import Fund from '../../assets/13.png';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contact/authContext';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from '../../axios';
import { useNavigate } from 'react-router-dom';
function LeftBar() {
    const { currentUser } = useContext(AuthContext)
    const [openFirendsLists, setFriendLists] = useState(false)
    const navigate = useNavigate();

    const { isLoading: rIsLoading,data: firendlistData } = useQuery({
        queryKey: ['friendlist'],
        queryFn: () =>
            makeRequest.get("/users/getfirends?userId=" + currentUser.id).then((res) => {
                return res.data;
            })
    });
    function handleProfile(id){
        navigate('/profile/'+id)
    }
    
    
    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img
                            src={"/upload/"+currentUser.profilePic}
                            alt=""
                        />
                        <span>{currentUser.name}</span>
                    </div>
                    <div className="item" onClick={() => setFriendLists(!openFirendsLists)}>
                        <img src={Friends} alt="" />
                        <span>Friends</span>
                    </div>
                    {
                        openFirendsLists && 
                            (<div className='firendlists' >
                                {
                                    firendlistData && firendlistData.map((friend) =>{
                                        return(
                                            
                                            <div className='item' key={friend.id} style={{padding: 10+'px'}} onClick={()=>handleProfile(friend.id)}>
                                                <img src={friend.profilePic ? firendlistData.profilePic : "/logo192.png" }/>
                                                <span>{friend.name}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>)

                    }
                    <div className="item">
                        <img src={Groups} alt="" />
                        <span>Groups</span>
                    </div>
                    <div className="item">
                        <img src={Market} alt="" />
                        <span>Marketplace</span>
                    </div>
                    <div className="item">
                        <img src={Watch} alt="" />
                        <span>Watch</span>
                    </div>
                    <div className="item">
                        <img src={Memories} alt="" />
                        <span>Memories</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Your shortcuts</span>
                    <div className="item">
                        <img src={Events} alt="" />
                        <span>Events</span>
                    </div>
                    <div className="item">
                        <img src={Gaming} alt="" />
                        <span>Gaming</span>
                    </div>
                    <div className="item">
                        <img src={Gallery} alt="" />
                        <span>Gallery</span>
                    </div>
                    <div className="item">
                        <img src={Videos} alt="" />
                        <span>Videos</span>
                    </div>
                    <div className="item">
                        <img src={Messages} alt="" />
                        <span>Messages</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Others</span>
                    <div className="item">
                        <img src={Fund} alt="" />
                        <span>Fundraiser</span>
                    </div>
                    <div className="item">
                        <img src={Tutorials} alt="" />
                        <span>Tutorials</span>
                    </div>
                    <div className="item">
                        <img src={Courses} alt="" />
                        <span>Courses</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LeftBar;