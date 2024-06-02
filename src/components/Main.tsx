import { useMutation } from "react-query";

import { useContext } from "react";
import { AuthContext, AuthDispatchContext } from "../context/AuthContext";
import { UserService } from "../service/user-service";
import { Accordion, Alert } from "react-bootstrap";

const Main = () => {
  const auth = useContext(AuthContext);
  const dispatch = useContext(AuthDispatchContext);

  const profile = useMutation("profile", () =>
    UserService.getProfile()
      .then((data) => {
        dispatch({ type: "complete", user: data.data });
      })
      .catch((e) => {
        if (e.response.status === 401) {
          dispatch({ type: "error", action: {} });
        }
      })
  );

  return (
    <>
      <Alert variant={`success`}>
        Авторизация c <b>Cookie</b> на основе собственного <b>Nest.js </b>
        сервера
      </Alert>
      {auth.user && <Alert itemType="primary">You is Authorized</Alert>}
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Общий доступ</Accordion.Header>
          <Accordion.Body>
            <h3>/Main</h3>
            <h3>/Auth</h3>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Доступ админа</Accordion.Header>
          <Accordion.Body>
            <h3>/Main</h3>
            <h3>/User</h3>
            <h3>/Admin</h3>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Доступ пользователя</Accordion.Header>
          <Accordion.Body>
            <h3>/Main</h3>
            <h3>/User</h3>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
export default Main;
