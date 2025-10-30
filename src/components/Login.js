import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Footer from '../components/Footer';

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

const Login=()=> {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', keep: false });
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.username) e.username = 'Username/email required';
    if (!form.password) e.password = 'Password required';
    else if (!passwordRegex.test(form.password)) {
      e.password = 'Password must be min 8 chars, include 1 uppercase, 1 number and 1 symbol';
    }
    return e;
  }

  const onSubmit=(ev)=> {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      localStorage.setItem('loggedIn', 'true');
      navigate('/home');
    }
  }

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-dark">
      <Card style={{ maxWidth: 900, width: '95%' }}>
        <Row className="g-0">
          <Col md={6} className="p-4">
            <h4>Sign In</h4>
            <small>New user? <a href="#create">Create an account</a></small>
            <Form onSubmit={onSubmit} className="mt-3">
              <Form.Group className="mb-2">
                <Form.Control
                  placeholder="Username or email"
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                />
                {errors.username && <div className="text-danger small">{errors.username}</div>}
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
                {errors.password && <div className="text-danger small">{errors.password}</div>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  label="Keep me signed in"
                  checked={form.keep}
                  onChange={e => setForm({ ...form, keep: e.target.checked })}
                />
              </Form.Group>

              <Button variant="dark" type="submit" className="w-100">Sign In</Button>
            </Form>

            <div className="mt-3 text-center">
              <small>Or Sign In With</small>
              <div className="mt-2 d-flex justify-content-center gap-2">
                <Footer />
              </div>
            </div>
          </Col>

         <Col md={6} className="p-4 d-none d-md-flex align-items-center justify-content-center bg-light">
            <div style={{ textAlign: 'center' }}>
               <img
                src="/assets/loginimage.png"
                alt="Welcome"
                style={{
                    maxWidth: '60%',
                    height: '50%',
                    borderRadius: '8px',
                }}
                />
            </div>
        </Col>

        </Row>
      </Card>
    </Container>
  );
}

export default Login;
