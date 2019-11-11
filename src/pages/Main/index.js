import React, {useState} from 'react';

import { FaGithubAlt, FaPlus } from 'react-icons/fa';

import { Container, Form, SubmnitBtn } from './styles';

function Main() {
    const [ getRepo, setGetRepo ]= useState("")

    const handleInputChange = e => {
        setGetRepo(e.target.value)
    }

    const handleSubmit = e =>{
        e.preventDefault()
        console.log(getRepo)
        setGetRepo("")
    }


    return (
        <Container>
            <h1>
                <FaGithubAlt />
                Repositories
            </h1>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <input type="text"
                 placeholder="Add Repositorie"
                 value={getRepo}
                 onChange={(e) => handleInputChange(e)}
                 />
                <SubmnitBtn>
                    <FaPlus color="#FFF" size={14} />
                </SubmnitBtn>
            </Form>
        </Container>
    );
}

export default Main;
