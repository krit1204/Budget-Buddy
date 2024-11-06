import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../stylepages/Login.css";

const Login = () => {
  const img = "https://winspiremagazine.com/wp-content/uploads/2023/01/What-is-the-Significance-of-Images-on-Indian-Currency.jpg";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:8080/api/v1/users/login", values);
      message.success("Login Successful");
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error.response ? error.response.data : error.message);
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
        className="login-page"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',  // Set to 100vh to cover the full viewport height
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backgroundBlendMode: 'overlay',
        }}
      >

        <div
          className="login-container"
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
            <h2 style={{ textAlign: 'center' }}>LOGIN FORM</h2>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input type="password" />
            </Form.Item>

            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <Link to="/register">Not a user? Click here to register!</Link>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button type="submit" className="btn btn-primary">LOGIN</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
