import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Table,
    Form,
    FormGroup,
    Input,
    Label,
    Button
} from "reactstrap";

const Crud = () => {
    const [allData, setAllData] = useState(() => {
        const datastorage = localStorage.getItem('data');

        if(datastorage){
            return JSON.parse(datastorage);
        }
    }); 

    //const [allData, setAllData] = useState([])

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [office, setOffice] = useState('');

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(allData))
    }, [allData])

    const handleInputChangeName = e => {
        setName(e.target.value)        
    }

    const handleInputChangeEmail = e => {
        setEmail(e.target.value)        
    }
    const handleInputChangeOffice = e => {
        setOffice(e.target.value)        
    }

    const handleFormSubmit = e => {
        e.preventDefault();

        let storage = []

        const datastorage = localStorage.getItem('data');

        storage.push(datastorage)

        const storageContext = JSON.parse(storage)

        const emails = storageContext.map(data => data.email)        

        const ckeckExistentEmail = emails.filter(data => data === email)                

        if(ckeckExistentEmail.length > 0){
            alert('Email existente')
            setName('');
            setEmail('');
            setOffice('')
            return
        }

        if(
            name
            ||
            email
            ||
            office !== ""
        ){
            setAllData([
                ...allData,
                {
                    id: allData.length + 1,
                    name: name.trim(),
                    email: email.trim(),
                    office: office.trim()
                }
            ]);

            setName('');
            setEmail('');
            setOffice('')
        }
        else {
            alert('Preencha os campos vázios!')
        }
    }

    const handleDelete = id => {
        const deleteIttem = allData.filter(data => data.id !== id)
        setAllData(deleteIttem)
    }


    return (
        <Container className="py-5">
            <Row>
                
                <Col lg="12" md="12" sm="12">
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Cargo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {allData?.map((data, key) => (
                                <tr key={key}>
                                    <th scope="row">{data.id}</th>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.office}</td>
                                    <td>
                                        <Button 
                                            color="danger"
                                            onClick={() => handleDelete(data.id)}
                                        >
                                            delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </Col>

                <Col lg="4" md="4" sm="4">
                    <Form
                        onSubmit={handleFormSubmit}
                    >
                        <FormGroup className="my-2">
                            <Label for="name" className="my-1">Nome</Label>
                            <Input 
                                type="text" 
                                placeholder="Digita o nome" 
                                id="name" 
                                name="name"
                                value={name}
                                onChange={handleInputChangeName} 
                            />
                        </FormGroup>
                        <FormGroup className="my-2">
                            <Label for="email" className="my-1">Email</Label>
                            <Input 
                                type="text"
                                placeholder="Digita o email" 
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleInputChangeEmail} 
                             />
                        </FormGroup>
                        <FormGroup className="my-2">
                            <Label for="office" className="my-1">Cargo</Label>
                            <Input 
                                type="select" 
                                name="office" 
                                id="office"
                                value={office}
                                onChange={handleInputChangeOffice} 
                            >
                                <option>Seleciona teu cargo</option>
                                <option value="Frontend Developer">Frontend Developer</option>
                                <option value="Backend Developer">Backend Developer</option>
                            </Input>
                        </FormGroup>
                        <Button className="col-lg-12" color="primary" active>Enviar</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Crud;
