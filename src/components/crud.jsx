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

    const [isEditing, setIsEditing] = useState(false);

    const [currentData, setCurrentData] = useState({});
    // const [currentName, setCurrentName] = useState({});
    // const [currentEmail, setCurrentEmail] = useState({});
    // const [currentOffice, setCurrentOffice] = useState({});
    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(allData))
    }, [allData])

    // Input ADD
    const handleInputChangeName = e => {
        setName(e.target.value)        
    }

    const handleInputChangeEmail = e => {
        setEmail(e.target.value)        
    }
    const handleInputChangeOffice = e => {
        setOffice(e.target.value)        
    }

    // Input Edit
    const handleEditInputChangeName = e =>{
        setCurrentData({ 
            ...currentData.name, 
            name: e.target.value,
        })
        console.log(currentData.name);
    }

    const handleEditInputChangeEmail = e =>{
        //setCurrentEmail({ ...currentEmail, email: e.targe.value})
        setCurrentData({ 
            ...currentData.email, 
            email: e.target.value,
        })
        console.log(currentData.email);
    }

    const handleEditInputChangeOffice = e =>{
        //setCurrentOffice({ ...currentOffice, office: e.targe.value})
        setCurrentData({ 
            ...currentData.office, 
            office: e.target.value,
        })
        console.log(currentData.office);
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

    // function form update
    const handleEditFormSubmit = (e) => {
        e.preventDefault();

        handleUpdateData(currentData.id, currentData);
        console.log(currentData)
        return
    }

    const handleUpdateData = (id, updateData) => {
        const updatedItem = allData.map((data) => data.id === id? updateData : data);

        setIsEditing(false);

        setAllData(updatedItem)

        console.log('Success',JSON.stringify(updatedItem))
    }


    const handleDelete = id => {
        const deleteIttem = allData.filter(data => data.id !== id)
        setAllData(deleteIttem)
    }

   
    const handleEditCkick = data => {
        setIsEditing(true)
        setCurrentData({...data})
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
                                        <Button 
                                            color="success"
                                            onClick={() => handleEditCkick(data)}
                                        >
                                            Editar
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </Col>

                <Col lg="4" md="4" sm="4">
                    {isEditing? (
                        <Form
                        onSubmit={handleEditFormSubmit}
                    >   
                        <h1>Update</h1>
                        <FormGroup className="my-2">
                            <Label for="name" className="my-1">Nome</Label>
                            <Input 
                                type="text" 
                                placeholder="Digita o nome" 
                                id="name" 
                                name="name"
                                value={currentData.name}
                                onChange={handleEditInputChangeName} 
                            />
                        </FormGroup>
                        <FormGroup className="my-2">
                            <Label for="email" className="my-1">Email</Label>
                            <Input 
                                type="text"
                                placeholder="Digita o email" 
                                id="email"
                                name="email"
                                value={currentData.email}
                                onChange={handleEditInputChangeEmail} 
                             />
                        </FormGroup>
                        <FormGroup className="my-2">
                            <Label for="office" className="my-1">Cargo</Label>
                            <Input 
                                type="select" 
                                name="office" 
                                id="office"
                                value={currentData.office}
                                onChange={handleEditInputChangeOffice} 
                            >
                                <option>Seleciona teu cargo</option>
                                <option value="Frontend Developer">Frontend Developer</option>
                                <option value="Backend Developer">Backend Developer</option>
                                <option value="Fullstack Developer">Fullstack Developer</option>
                            </Input>
                        </FormGroup>
                        <Button className="col-lg-12" color="primary" active>Enviar</Button>
                    </Form>
                    ): (
                        <Form
                        onSubmit={handleFormSubmit}
                    >
                         <h1>Create</h1>
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
                    )}
                  
                </Col>
            </Row>
        </Container>
    );
};

export default Crud;
