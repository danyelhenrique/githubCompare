import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';

import { Loading, Owner, IssueList } from './styles';

export default function Repository({ match }) {
    const [dataRepository, setDataRepository] = useState({});
    const [dataIssues, setDataIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            const repoName = decodeURIComponent(match.params.repository);

            const [repository, issues] = await Promise.all([
                api.get(`/repos/${repoName}`),
                api.get(`/repos/${repoName}/issues`, {
                    params: {
                        state: 'open',
                        per_page: 5,
                    },
                }),
            ]);

            setDataRepository(repository.data);
            setDataIssues(issues.data);
            setLoading(false);
        }
        getData();
    }, []);

    const render = () => {
        if (loading) {
            return <Loading>Loading</Loading>;
        }

        return (
            <Container>
                <Owner>
                    <Link to="/">Back to Repositories</Link>
                    <img src={dataRepository.owner.avatar_url} alt="avatar" />
                    <h1>{dataRepository.name}</h1>
                    <p>{dataRepository.description}</p>
                </Owner>
                <IssueList>
                    {dataIssues.map(issue => (
                        <li key={String(issue.id)}>
                            <img
                                src={issue.user.avatar_url}
                                alt={issue.user.login}
                            />
                            <div>
                                <strong>
                                    <a
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        href={issue.html_url}
                                    >
                                        {issue.title}
                                    </a>
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssueList>
            </Container>
        );
    };

    return <>{render()}</>;
}

Repository.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            repository: PropTypes.string,
        }),
    }).isRequired,
};
