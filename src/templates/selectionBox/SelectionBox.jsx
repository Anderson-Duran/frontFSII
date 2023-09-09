import React, { useEffect, useState } from 'react';
import { Container, Form, Row, Col, Spinner } from 'react-bootstrap';

function SelectionBox({ source, dataKey, exhibitionField, selectFunction }) {
  const [selectedValue, setSelectedValue] = useState("");
  const [data, setData] = useState([]);



  useEffect(() => {

    function filterAndCapitalizeName(array) {
      let uniqueWord = array.filter((item, index, self) => {
        return self.findIndex((el) => el.name === item.name) === index
      });


      var capitalizedWord = uniqueWord.map((e) => {
        return e.name.charAt(0).toUpperCase() + e.name.slice(1)
      })


      return capitalizedWord;
    }

    const fetchData = async () => {
      let response = await fetch(source, { method: "GET" })
      let result = await response.json();
      let newList = filterAndCapitalizeName(result)
      await setData(newList)
      console.log(data)
    }

    fetchData()

  }, [source])


  if (data.length === 0) {
    return <Spinner />
  }

  return (
    <Container>
      <Row md={12}>
        <Col>
          <Form.Select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            {data.map((item) => (
              <option value={item[exhibitionField]}
                onClick={() => { selectFunction(item[exhibitionField]) }}
                key={item[dataKey]}>{item[exhibitionField]}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </Container>
  );
}

export default SelectionBox;
