
import React, { useContext, useState } from 'react';
import { Table, Button, Row, Container, Col, Form } from 'react-bootstrap';
import { urlBase } from '../assets/definicoes';
import '../templates/modal/style.css';
import { AuthContext } from '../contextos/authContext.js';


function TabelaUsuarios(props) {
  const [localUsuarios, setLocalUsuarios] = useState(props.listUsers);
  const { user } = useContext(AuthContext);

  function getCookie() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {

      let cookie = cookies[i].trim();

      if (cookie.startsWith(user.email + '=')) {
        return cookie.substring(user.email.length + 1)
      }
    }

    return null;
  }

  function deleteUsuario(usuario) {

    let token = getCookie();

    fetch(urlBase, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(usuario),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === true) {
          window.alert(result.message);
          const cleaningList = localUsuarios.filter((el) => el.id !== usuario.id);
          setLocalUsuarios(cleaningList);
          props.setListUsuarios(cleaningList);
        } else {
          window.alert(result.message);
        }
      });
  }

  function filterUsuarios(event) {
    const term = event.currentTarget.value;
    const searchResult = props.listUsers.filter((usuario) =>
      usuario.name.toLowerCase().includes(term.toLowerCase())
    );
    setLocalUsuarios(searchResult);
  }

  return (
    <Container id="table" className="m-0">
      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            id="termoBusca"
            onChange={filterUsuarios}
            placeholder="Buscar"
          />
        </Col>
      </Row>
      <Table striped bordered hover className="text-center ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Administrador</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: 13 }}>
          {localUsuarios?.map((usuario, i) => {
            return (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
                <td>{usuario.isAdmin ? 'Sim' : 'Não'}</td>
                <td>
                  <Button
                    onClick={() => {
                      props.prepareUsuarioToEdition(usuario);
                    }}
                    className="btn-success"
                  >
                    Editar
                  </Button>
                  {' '}
                  <Button
                    onClick={() => {
                      if (
                        window.confirm('Are you sure you want to delete this user?')
                      ) {
                        deleteUsuario(usuario);
                      }
                    }}
                    className="btn-danger"
                  >
                    Deletar
                  </Button>


                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Container className="d-flex justify-content-end mb-3">
        <Button onClick={props.changeScreen}>Cadastrar Usuário</Button>
      </Container>
    </Container>
  );
}

export default TabelaUsuarios;
