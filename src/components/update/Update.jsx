import { useContext, useState, useEffect } from 'react'
import './update.scss'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from '../../contact/authContext';
// import GenerateImage from '../../generateimage'
const Update = ({ setOpenUpdate, user }) => {
  const { currentUser } = useContext(AuthContext)
  const [cover, setCover] = useState(null)
  const [profile, setProfile] = useState(null)
  const [texts, setTexts] = useState({
    name: "",
    city: "",
    website: ""
  });

  const upload = async (file) => {
    // const file = e.target.files[0];
    // if (e.target.name === 'background') {
    //   GenerateImage(file, (base64String) => {
    //     setCover(base64String);
    //   })
    // }else{
    //   GenerateImage(file, (base64String) => {
    //     setProfile(base64String);
    //   })
    // }

    try {
      const formData = new FormData();
      formData.append('file', file)
      const res = await makeRequest.post('/upload', formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const queryClient = useQueryClient();


  const mutation = useMutation({
    mutationFn: (user) => {
      return makeRequest.put("/users", user);
    },
    onSuccess: (res) => {
      // Invalidate and refetch
      const result = res.data;
      const a = {...result, email:currentUser.email, id: currentUser.id}
      localStorage.setItem('user',JSON.stringify(a))
      queryClient.invalidateQueries({ queryKey: ['user'] })
      window.location.reload()
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e)
    let coverUrl;
    let profileUrl;
    
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;
    console.log({ ...texts, coverPic: coverUrl, profilePic: profileUrl})
    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl})
    // setOpenUpdate(false)
  }
  
  return (
    <div className='update'>
      <form>
        <input type="file" name='background' onChange={(e) => setCover(e.target.files[0])} />
        <input type="file" name='profile' onChange={(e) => setProfile(e.target.files[0])} />
        <input type="text" name='name' onChange={handleChange} />
        <input type="text" name='city' onChange={handleChange} />
        <input type="text" name='website' onChange={handleChange} />
        <button onClick={handleSubmit}>Update</button>
      </form>
      <button onClick={() => setOpenUpdate(false)}>X</button>
    </div>
  )
}
export default Update
