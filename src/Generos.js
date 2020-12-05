import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const Generos = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/genres")
      .then(res => {
        setData(res.data.data)
      })
  }, []);

  const deleteGenre = id => {
    axios.delete('api/genres/' + id)
      .then(res => {
        const filtred = data.filter(item => item.id !== id);
        setData(filtred);
      })
  }

  const renderLine = record => {
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button className='btn btn-danger' onClick={() => deleteGenre(record.id)}>Remover</button>
          <Link to={'/generos/' + record.id} className='btn btn-warning' >Editar</Link>
        </td>
      </tr>
    );
  }

  if (data.length === 0) {
    return (
      <div className="container">
       <h1>Gêneros</h1>
       <div><Link to={'/Generos/novo'} className='btn btn-primary' >Nova Gênero</Link></div>
        <div className="alert alert-warning" role="alert">
          Você mão possui Gêneros criados
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Generos</h1>
      <div><Link to={'/Generos/novo'} className='btn btn-primary' >Nova Gênero</Link></div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(renderLine)}
        </tbody>
      </table>
    </div>
  );
}

export default Generos;