import React, { FormEvent, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import { Title, Form, Repositories } from './styles';
import Repository from '../Repository/index';

interface Repository {
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    const { data } = await api.get<Repository>(`repos/${newRepo}`);
    setRepositories([...repositories, data]);
    setNewRepo('');
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={event => setNewRepo(event.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        {repositories &&
          repositories.map(({ description, full_name, owner }: Repository) => {
            return (
              <a href="test" key={full_name}>
                <img src={owner.avatar_url} alt={owner.login} />

                <div>
                  <strong>{full_name}</strong>
                  <p>{description}</p>
                </div>

                <FiChevronRight size={20} />
              </a>
            );
          })}
      </Repositories>
    </>
  );
};

export default Dashboard;
