import { useContext, useState } from 'react';
import './comments.scss'
import { AuthContext } from '../../contact/authContext';
import moment from 'moment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
function Comments({ postId }) {
    const [desc, setDesc] = useState("")
    const { currentUser } = useContext(AuthContext)
    const { isPending, error, data } = useQuery({
        queryKey: ['comments'],
        queryFn: () =>
            makeRequest.get("/comments?postId=" + postId).then((res) => {
                return res.data;
            })
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (newComment) => {
            return makeRequest.post("/comments", newComment);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['comments'] })
        },
    });
    const handleClick = async (e) =>{
        e.preventDefault();
        mutation.mutate({desc, postId});
        setDesc("")
    }
    return (
        <div className="comments">
            <div className="write">
                <img src={"/upload/"+currentUser.profilePic} alt="" />
                <input type="text" placeholder='write a comment' value={desc} onChange={(e) => setDesc(e.target.value)}/>
                <button onClick={handleClick}>Send</button>
            </div>
            {
                error ? "Something Wrong!" : (isPending ? "Loading" : data.map(comment => (
                    <div className="comment">
                        <img src={"/upload/"+comment.profilePic} alt="" />
                        <div className="info">
                            <span>{comment.name}</span>
                            <p>{comment.desc}</p>
                        </div>
                        <span className='date'>{moment(comment.createdAt).fromNow()}</span>
                    </div>
                )))
            }
        </div>
    )
}
export default Comments;