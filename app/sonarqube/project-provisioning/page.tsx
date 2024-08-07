
import type { NextPage } from 'next';
import CreateProjectForm from '../../../components/SonarQubeProjectCreate';

const Home: NextPage = () => {
  return (
    <div>
      <CreateProjectForm />
    </div>
  );
};

export default Home;
