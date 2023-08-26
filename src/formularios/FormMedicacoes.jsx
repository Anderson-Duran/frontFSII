import React, { useContext, useState } from "react";
import ReactInputMask from "react-input-mask";
import { Container, Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";
import SearchBar from "../templates/searchBar/SearchBar";
import { PacientsContext } from "../contextos/pacientsContext";



export default function Medicines(props) {

    const url = "https://129.146.68.51/aluno5-pfsii/cadastroPaciente/medicines"

    const { pacients } = useContext(PacientsContext)
    const [objectSelected, setObjectSelected] = useState('');
    const [medicine, setMedicine] = useState({
        ...props.medicineEditing
    })

    const handleSubmit = (e) => {
        /* falta implementar */
        handleBar(medicine)
        console.log({ ...medicine })
        fetch(url, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ ...medicine })
        }).then(async (response) => {
            if (response.ok) {

                setMedicine({ ...props.medicineEditing });

                if(!window.confirm('Deseja adicionar mais alguma medicação? Clique OK pra SIM, CANCEL pra NÃO')){
                    window.location.href = '/cadastroPacientes'
                }
            }
            return await response.json()
        }).then(data => console.log(data))



        e.preventDefault()
        e.stopPropagation()
    }


    const handleChange = (event) => {
        let element = document.getElementById(`${event.currentTarget.id}`);
        setMedicine({
            ...medicine, [element.id]: element.value
        })

    }

    const handleBar = (medicine) => {
        setMedicine(
            medicine.pacientName = { ...objectSelected }
        )
    }


    return (
        <Container className="" >
            <Form onSubmit={handleSubmit} >
                <hr />
                <Form.Group as={Col} md={12} className="m-auto mb-3" >
                    <Form.Label>Paciente</Form.Label>
                    <SearchBar
                        selectFunction={setObjectSelected}
                        data={pacients}
                        placeholder={'Informe o nome do paciente'}
                        keyField={'cpf'}
                        searchField={'name'}
                        value={objectSelected}
                    />
                </Form.Group>
                <Row className="mb-3">

                    <Form.Group as={Col} md={6} controlId="medicineName">
                        <Form.Label>
                            Nome da Medicação
                        </Form.Label>
                        <Form.Control
                            placeholder="Ex: Amoxicilina"
                            value={medicine.medicineName}
                            required
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md={6} controlId="medicineDosage">
                        <Form.Label>
                            Dosagem
                        </Form.Label>
                        <Form.Control
                            placeholder="Ex:1/2 Comprimido"
                            value={medicine.medicineDosage}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                </Row>
                <Row>

                    <Form.Group as={Col} md={2} controlId="medicineHours">
                        <Form.Label>
                            1º Horário
                        </Form.Label>
                        <ReactInputMask
                            mask={"99:99"}
                            value={medicine.medicineHours}
                            onChange={handleChange}
                            required
                        >
                            {(inputProps) => <Form.Control
                                placeholder="Ex: 07:00"
                                {...inputProps}
                            />
                            }
                        </ReactInputMask>
                    </Form.Group>

                    <Form.Group as={Col} md={2} controlId="medicineHours2">
                        <Form.Label>
                            2º Horario
                        </Form.Label>
                        <ReactInputMask
                            value={medicine.medicineHours2}
                            onChange={handleChange}
                            mask={"99:99"}
                        >
                            {
                                (inputProps) => <Form.Control
                                    placeholder="Ex: 15:00"
                                    {...inputProps}
                                />
                            }

                        </ReactInputMask>
                    </Form.Group>

                    <Form.Group as={Col} md={2} controlId="medicineHours3">
                        <Form.Label>
                            3º Horário
                        </Form.Label>
                        <ReactInputMask
                            mask={'99:99'}
                            value={medicine.medicineHours3}
                            onChange={handleChange}
                        >
                            {
                                (inputProps) => <Form.Control
                                    placeholder="Ex: 23:00"
                                    {...inputProps}
                                />
                            }
                        </ReactInputMask>
                    </Form.Group>

                    <Form.Group as={Col} md={3} controlId="medicineDateStart">
                        <Form.Label>
                            Data Inicio
                        </Form.Label>
                        <Form.Control
                            type="date"
                            value={medicine.medicineDateStart}
                            required
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md={3} controlId="medicineDateEnd">
                        <Form.Label>
                            Data Fim
                        </Form.Label>
                        <Form.Control
                            type="date"
                            value={medicine.medicineDateEnd}
                            required
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} md={12} className="mt-5 mb-5">

                        <FloatingLabel label="Digite aqui suas observações">
                            <Form.Control
                                id="medicineObservation"
                                as="textarea"
                                value={medicine.medicineObservation}
                                onChange={handleChange}
                                placeholder="Digite aqui suas observações"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>

                    </Form.Group>
                </Row>

                <Row className="mb-5 flex bg-red justify-content-end me-2">
                    <Button className="btn" style={{ width: "100px", marginRight: '15px' }} type="submit" variant="primary">Cadastrar</Button>
                    <Button className="btn" style={{ width: "100px" }} variant="primary">Voltar</Button>
                </Row>
            </Form>
        </Container>
    )
}