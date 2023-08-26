import '../templates/modal/style.css'
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function TableMedicines(props) {

    const url = `https://129.146.68.51/aluno5-pfsii/cadastroPaciente/medicines`;
    /* const url = `localhost:4005/cadastroPaciente` */
    const myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    const [medicineList, setMedicineList] = useState([]);
    const [updateList, setUpdateList] = useState(false)

    async function deleteMedicine(medicação) {

        await fetch(url, {
            method: "DELETE",
            headers: myHeaders,
            body: JSON.stringify({...medicação})
        }).then(response => response.json())
            .then((data) => {
                setUpdateList(!updateList);
                window.alert(`Remédio ${medicação.medicineName} excluído com sucesso!`)
            })
    }

    useEffect(() => {

        async function getPatientMedicines() {

            let table = document.querySelector('#table-medicines').style
            table.display = 'none';
            const result = await fetch(url+'/'+props.pacient.cpf, {
                headers: myHeaders
            })
            const list = await result.json();
            table.display = 'block'
            setMedicineList(list)
        }
        getPatientMedicines()
    }, [updateList])


    return (
        <Table id='table-medicines' striped bordered hover variant="dark" style={{ margin: '', width: '100%', position: 'absolute' }} className='text-center'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Medicação</th>
                    <th>Dose</th>
                    <th>Horario Inicial</th>
                    <th>Horario Intermediário</th>
                    <th>Horário Final</th>
                    <th>Data Inicial</th>
                    <th>Data Término</th>
                    <th>Observações diversas:</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {
                    medicineList?.map((medicine) => {
                        return (
                            <tr key={props.pacient.cpf}>
                                <td>{medicine.id}</td>
                                <td>{props.pacient.name}</td>
                                <td>{medicine.medicineName}</td>
                                <td>{medicine.medicineDosage}</td>
                                <td>{medicine.medicineHours ? medicine.medicineHours : ''}</td>
                                <td>{medicine.medicineHours2 ? medicine.medicineHours2 : ''}</td>
                                <td>{medicine.medicineHours3 ? medicine.medicineHours3 : ''}</td>
                                <td>{medicine.medicineDateStart ? medicine.medicineDateStart : ''}</td>
                                <td>{medicine.medicineDateEnd ? medicine.medicineDateEnd : ''}</td>
                                <td>{medicine.medicineObservation ? medicine.medicineObservation : ''}</td>
                                <td>
                                    <Button
                                        className='btn-danger'
                                        onClick={() => {
                                            if (window.confirm(`Deseja realmente excluir esta medicação?`)) {
                                                deleteMedicine(medicine)
                                            }
                                        }}
                                    >Excluir
                                    </Button>
                                    {' '}
                                    <Button>Editar</Button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );
}

export default TableMedicines;