import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronDown, FiChevronLeft } from 'react-icons/fi';
import { Header, RepositoryInfo, Issues } from './styles';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

interface RepositoryParams {
  repository: string;
}
interface Repository {
  full_name: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [repository, setRepository] = useState<Repository | null>(null);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api
      .get<Repository>(`repos/${params.repository}`)
      .then(response => setRepository(response.data));
    api
      .get<Issue[]>(`repos/${params.repository}/issues`)
      .then(response => setIssues(response.data));
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{params.repository}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      <Issues>
        {issues &&
          issues.map(issue => (
            <a
              target="_blank"
              rel="noreferrer"
              key={issue.id}
              href={issue.html_url}
            >
              <div>
                <strong>{issue.user.login}</strong>
                <p>{issue.title}</p>
              </div>

              <FiChevronDown size={20} />
            </a>
          ))}
      </Issues>
    </>
  );
};

export default Repository;
