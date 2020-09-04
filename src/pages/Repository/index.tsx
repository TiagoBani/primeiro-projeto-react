import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronDown, FiChevronLeft } from 'react-icons/fi';
import { Header, RepositoryInfo, Issues } from './styles';

import logoImg from '../../assets/logo.svg';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      <RepositoryInfo>
        <header>
          <img
            src="https://avatars3.githubusercontent.com/u/139426?v=4"
            alt="Avatar"
          />
          <div>
            <strong>{params.repository}</strong>
            <p>descrição</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>1080</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>48</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>67</strong>
            <span>Issues</span>
          </li>
        </ul>
      </RepositoryInfo>
      <Issues>
        <Link to="/aaaaa">
          <div>
            <strong>aaaaaaa</strong>
            <p>ppppppppp</p>
          </div>

          <FiChevronDown size={20} />
        </Link>
      </Issues>
    </>
  );
};

export default Repository;
