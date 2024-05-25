import React from 'react';
import DesenvolvedoresList from '../components/Desenvolvedores/DesenvolvedoresList';
import DesenvolvedoresForm from '../components/Desenvolvedores/DesenvolvedoresForm';

function DesenvolvedoresPage() {
 
  const [desenvolvedores, setDesenvolvedores] = React.useState([]);

  const handleAddDesenvolvedor = (desenvolvedor) => {

  };

  React.useEffect(() => {
 
  }, []);

  return (
    <div>
      <DesenvolvedoresList desenvolvedores={desenvolvedores} />
      <DesenvolvedoresForm onSubmit={handleAddDesenvolvedor} />
    </div>
  );
}

export default DesenvolvedoresPage;
