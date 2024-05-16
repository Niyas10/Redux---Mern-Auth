import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import './ProfileScreen.css';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [render,setRender] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    
  }, [userInfo]);

  useEffect(() => {
    if(render){
 
      console.log('Components re-rendered');
    }
  }, [render]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (name.trim().length === 0) {
      toast.error("Name can't be empty");
      return;
    }

    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      toast.error('Please enter a valid email address!');
      return;
    }

    if (password && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('_id', userInfo._id);
      formData.append('name', name);
      formData.append('email', email);
      if (password) formData.append('password', password);
      if (image) formData.append('file', image);

      const res = await updateProfile(formData).unwrap('');
      dispatch(setCredentials({ ...res }));
      setRender(true)

      toast.success('Profile updated!');
      navigate('/profile');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Row className="profile-screen">
      <Col md={6} className="profile-form">
        <div className="main shadow">
          <h1 className="text-center">Update Profile</h1>
          {isLoading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="my-2" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="my-2" controlId="imageUpload">
              <Form.Label>Image Upload</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <div className="row">
              <div className="col-lg-12 update-btn">
                <Button type="submit" variant="primary" className="mt-3">
                  Update
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </Col>
      <Col md={6} className="profile-details shadow">
        <div className="profile-image-container">
        {userInfo.imageUrl ? (
  <img src={userInfo.imageUrl} alt={userInfo.name} className="profile-image" />
) : (
  <img 
    src="https://static.thenounproject.com/png/363633-200.png" 
    alt="Default" 
    className="default-image" 
    style={{ 
      maxWidth: '100%', 
      maxHeight: '100%' 
    }} 
  />
)}


        </div>
        <div className="user-details">
          <h2 className="text-center">{userInfo.name}</h2>
          <p className="text-center">{userInfo.email}</p>
        </div>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
