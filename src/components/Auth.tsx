import { Button, Form } from "react-bootstrap";
import { AuthDispatchContext } from "../context/AuthContext";
import { MouseEvent, useContext, useState } from "react";
import { useMutation } from "react-query";
import { AuthService, ILogin } from "../service/auth-service";
import { saveCookies } from "../api/save-token";

export const Auth = () => {
  const dispatch = useContext(AuthDispatchContext);
  const [email, setEmail] = useState("an5@ya.ru");
  const [password, setPassword] = useState("111111");

  const login = useMutation("login", (data: ILogin) =>
    AuthService.login(data).then((data) => {
      dispatch({ type: "complete", user: data });
      saveCookies({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    })
  );

  const register = useMutation("register", (data: ILogin) =>
    AuthService.register(data).then((data) =>
      dispatch({ type: "complete", user: data.data.user })
    )
  );

  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    isLogin: boolean
  ) => {
    e.preventDefault();
    if (isLogin) login.mutate({ email, password });
    else register.mutate({ email, password });
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={(e) => handleSubmit(e, true)}
      >
        Login
      </Button>
      <Button
        variant="primary"
        type="submit"
        onClick={(e) => handleSubmit(e, false)}
      >
        Register
      </Button>
    </Form>
  );
};
