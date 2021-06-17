import {useState} from 'react';
import {useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';


function App() {
  //estado de todas las citas
  const [citas, setCitas] = useState(JSON.parse(localStorage.getItem('citas')) || [])

  useEffect(() => {
    localStorage.setItem('citas', JSON.stringify(citas))    
  }, [citas]);

  //funcion que tome todas las citas actuales y agregue una
  const crearCita = cita => {
    setCitas([ //traemos las citas y le agregamos el obj de cita
      ...citas,
      cita
    ]);
  };

  //Funcion encargada de eliminar las citas
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    //este filtro retorna las citas que no tengan el mismo id de la que queremos eliminar
    setCitas(nuevasCitas)
  }

  return (
    <div>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
            crearCita={crearCita}//componente tiene acceso a esa funcion
            />
          </div>
          <div className="one-half column">
            <h2>{citas.length === 0 ? 'No hay citas' : 'Administra tus citas'}</h2>
            {citas.map(cita => (
              <Cita 
              cita={cita} 
              key={cita.id}
              eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
