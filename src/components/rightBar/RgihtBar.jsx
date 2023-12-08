import './rightBar.scss'
import image from '../../assets/background.png'
import { useQuery, useMutation } from "@tanstack/react-query";
import { makeRequest } from '../../axios';
import { useContext } from 'react';
import { AuthContext } from '../../contact/authContext';
function RightBar() {
    const { currentUser } = useContext(AuthContext)
    const { isLoading: isPending,error: error,data: beforeFollowData } = useQuery({
        queryKey: ['users'],
        queryFn: () =>
            makeRequest.get("/users?userId=" + currentUser.id).then((res) => {
                return res.data;
            })
    });


    // const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (newPost) => {
            // console.log(newPost)
            return makeRequest.post("/relationships", newPost);
        },
        onSuccess: () => {
            // Invalidate and refetch
            // queryClient.invalidateQueries({ queryKey: ['users'] })
            window.location.reload()
        },
    })

    function handleFollow(id) {
        mutation.mutate({ userId: id })
    }
    return (
        <div className="rightBar">
            <div className="container">
                <div className="item">
                    <span>Suggestions For You</span>
                    {
                        (isPending ? 'Loading...' : (beforeFollowData && beforeFollowData.map((firend) => {
                            return (
                                <div className="user" key={firend.id}>
                                    <div className="userInfo">
                                        <img src={firend.profilePic ? firend.profilePic : "/logo192.png"} alt="" />
                                        <span>{firend.name}</span>
                                    </div>
                                    <div className="buttons">
                                        <button onClick={() => handleFollow(firend.id)}>follow</button>
                                        <button>dismiss</button>
                                    </div>
                                </div>
                            )
                        })))

                    }
                    {
                        beforeFollowData?.length === 0 && <div className='user'><p>No Firends For Suggestions</p></div>
                    }
                </div>
                <div className="item">
                    <span>Latest Activities</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src={image} alt="" />
                            <p>
                                <span>Jane Doe</span> Changed their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={image} alt="" />
                            <p>
                                <span>Jane Doe</span> Changed their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={image} alt="" />
                            <p>
                                <span>Jane Doe</span> Changed their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={image} alt="" />
                            <p>
                                <span>Jane Doe</span> Changed their cover picture
                            </p>
                        </div>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="item">
                    <span>Online Friends</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src={image} alt="" />
                            <div className="online" />
                            <span>Jane Doe</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={image} alt="" />
                            <div className="online" />
                            <span>Jane Doe</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={image} alt="" />
                            <div className="online" />
                            <span>Jane Doe</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={image} alt="" />
                            <div className="online" />
                            <span>Jane Doe</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={image} alt="" />
                            <div className="online" />
                            <span>Jane Doe</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={image} alt="" />
                            <div className="online" />
                            <span>Jane Doe</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={image} alt="" />
                            <div className="online" />
                            <span>Jane Doe</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={image} alt="" />
                            <div className="online" />
                            <span>Jane Doe</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={image} alt="" />
                            <div className="online" />
                            <span>Jane Doe</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RightBar;