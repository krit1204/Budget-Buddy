import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Register = () => {
  const img = "https://winspiremagazine.com/wp-content/uploads/2023/01/What-is-the-Significance-of-Images-on-Indian-Currency.jpg";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8080/api/v1/users/register", values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.error("Registration error:", error.response ? error.response.data : error.message);
      message.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div
        className="register-page"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh', // Adjusted to cover full viewport
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div
          className="register-container"
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            backgroundColor: '#fff',
          }}
        >
          {loading && <Spinner />}

          <Form layout="vertical" onFinish={submitHandler}>
            <h2 style={{ textAlign: 'center' }}>REGISTRATION FORM</h2>

            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: 'Please input your name!' },
                { min: 3, message: 'Name must be at least 3 characters' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, type: 'email', message: 'Please input a valid email!' },
              ]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters' },
              ]}
            >
              <Input type="password" />
            </Form.Item>

            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <Link to="/login">Already registered? Click here to login!</Link>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button type="submit" className="btn btn-primary">REGISTER</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;