import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';

import { Form, SubmnitBtn, List } from './styles';

function Main() {
    const [getRepo, setGetRepo] = useState('');
    const [repoData, setRepoData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const repositories = localStorage.getItem('@repositories');

        if (repositories) {
            setRepoData(JSON.parse(repositories));
        }
    }, []);

    useEffect(() => {
        const repoItems = JSON.stringify(repoData);

        localStorage.setItem('@repositories', repoItems);
    }, [repoData]);

    const handleInputChange = e => {
        setGetRepo(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        setLoading(true);

        const response = await api.get(`/repos/${getRepo}`);

        const data = {
            name: response.data.full_name,
        };

        setRepoData([...repoData, data]);

        setGetRepo('');

        setLoading(false);
    };

    return (
        <Container>
            <h1>
                <FaGithubAlt />
                Repositories
            </h1>
            <Form onSubmit={e => handleSubmit(e)}>
                <input
                    type="text"
                    placeholder="Add Repositorie"
                    value={getRepo}
                    onChange={e => handleInputChange(e)}
                />
                <SubmnitBtn loading={loading}>
                    {loading ? (
                        <FaSpinner color="#fff" size={14} />
                    ) : (
                        <FaPlus color="#FFF" size={14} />
                    )}
                </SubmnitBtn>
            </Form>

            <List>
                {repoData.map(repository => (
                    <li key={Date.now()}>
                        <span>{repository.name}</span>
                        <Link
                            to={`/repository/${encodeURIComponent(
                                repository.name
                            )}`}
                        >
                            Details
                        </Link>
                    </li>
                ))}
            </List>
        </Container>
    );
}

export default Main;
