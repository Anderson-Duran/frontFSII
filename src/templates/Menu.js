import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { LinkContainer } from "react-router-bootstrap";
import React, { useContext } from "react";
import { AuthContext } from "../contextos/authContext";



export default function Menu(props) {

    const navbarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: '10px',
        fontWeight: 'bolder',
    };

    const {user, setUser} = useContext(AuthContext);

    return (
        <Navbar style={navbarStyle} bg="black" variant="dark" expand="lg">
            <Container >
                <LinkContainer to="/home" ><Navbar.Brand><font color="white"><strong>HOME</strong></font></Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav><font color="black">------------------------</font></Nav>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="CADASTROS" id="basic-nav-dropdown">
                            <LinkContainer to="/cadastroPacientes"><NavDropdown.Item><strong>PACIENTES</strong></NavDropdown.Item></LinkContainer>
                            <LinkContainer to={"/cadastroMedicacoes"}><NavDropdown.Item><strong>FARMACOTERAPIA</strong></NavDropdown.Item></LinkContainer>
                            <LinkContainer to="/cadastroTurma"><NavDropdown.Item><strong>TURMAS</strong></NavDropdown.Item></LinkContainer>
                        </NavDropdown>
                    </Nav>

                    <Nav><font color="black">------------------------</font></Nav>

                    <NavbarCollapse><LinkContainer to="/cadastroDoacao"><NavDropdown.Item><strong><font color="white">DOAÇÃO</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>

                    <NavbarCollapse><LinkContainer to="/cadastroVisitantes"><NavDropdown.Item><strong><font color="white">VISITANTES</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>

                    <NavbarCollapse><LinkContainer to="/cadastroSugestao"><NavDropdown.Item><strong><font color="white">SUGESTÕES</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>
                    {
                        user.isAdmin === true?<NavbarCollapse><LinkContainer to="/cadastroUsuario"><NavDropdown.Item><strong><font color="white">GERENCIAR USUÁRIOS</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>:''
                    }
                    <Nav>
                        <Nav.Link href="/"><strong><font color="white">VOLTAR</font></strong></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}