import * as React from 'react';

const Home: React.FC = () => {
  console.log("Home renderizado");
  return (
    <div>
      <h1>Bem-vindo ao Sistema de Gerenciamento</h1>
      <p>Selecione uma opção no menu para começar.</p>
    </div>
  );
};

export default Home;
