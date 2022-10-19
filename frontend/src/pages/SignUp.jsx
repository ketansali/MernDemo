import { Container, Form, Button, } from "react-bootstrap";
import {useDispatch} from 'react-redux'
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom'
import { signUp } from "../reducers/authReducer";
const SignUp = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = (data) => {
    dispatch(signUp(data))
    navigate('/signin')
  };
  return (
    <Container>
      <div className="d-flex justify-content-center">
        <h1>SignUp</h1>
      </div>
      <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3 mt-3" controlId="formGroupEmail">
          <Form.Label>firstName</Form.Label>
          <Form.Control
            placeholder="Enter firstName"
            {...register("firstName", {
              required: "firstName is required" })}
          />
          {errors?.firstName?.type === "required" && (
            <p className="error">firstName is required</p>
          )}

        </Form.Group>
        <Form.Group className="mb-3 mt-3" controlId="formGroupEmail">
          <Form.Label>lastName</Form.Label>
          <Form.Control
            placeholder="Enter lastName"
            {...register("lastName", {
              required: "lastName is required" })}
          />
          {errors?.lastName?.type === "required" && (
            <p className="error">lastName is required</p>
          )}

        </Form.Group>
        <Form.Group className="mb-3 mt-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            placeholder="Enter Email"
            {...register("email", {
              required: "email is required",
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />
          {errors?.email?.type === "required" && (
            <p className="error">Email is required</p>
          )}
          {errors?.email?.type === "pattern" && (
            <p className="error">Please enter a valid email</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            autoComplete="on"
            placeholder="Enter Password"
            {...register("password", { required: true })}
          />
          {errors?.password?.type === "required" && (
            <p className="error">Password is required</p>
          )}
        </Form.Group>
        <div className="d-grid gap-2">
          <Button type="submit" variant="primary" size="lg">
            SignUp
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default SignUp;
