import {useState} from 'react';
import {useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';


function App() {
  //Citas en el localstorage
  // let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  // if(!citasIniciales){ //cuando no exista citasIniciales
  //   citasIniciales = []
  // }

  //estado de todas las citas
  const [citas, setCitas] = useState(JSON.parse(localStorage.getItem('citas')) || [])

  useEffect(() => {
    localStorage.setItem('citas', JSON.stringify(citas))
    /* if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    } */
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

  // const titulo = citas.length == 0 ? 'No hay citas' : 'Administra tus citas';

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
