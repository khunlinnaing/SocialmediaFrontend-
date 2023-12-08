import { makeRequest } from '../../axios';
import Post from '../post/Post';
import './posts.scss';
import { useQuery } from "@tanstack/react-query";
function Posts({userId}) {

    const { isPending, error, data } = useQuery({
        queryKey: ['posts'],
        queryFn: () =>
            makeRequest.get("/posts?userId="+userId).then((res) => {
                return res.data;
            })
    })
    return (
        <div className="posts">
            {
                error ? "Something went worng!" :(isPending ? "Loading" :
                data.map(post => (
                    <div className="post" key={post.id}>
                        <Post post={post}  />
                    </div>
                )))
            }
        </div>
    )
}
export default Posts;