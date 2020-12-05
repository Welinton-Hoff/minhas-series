import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const Series = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/series")
      .then(res => {
        setData(res.data.data)
      })
  }, []);

  const deleteSerie = id => {
    axios.delete('api/series/' + id)
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
          <button className='btn btn-danger' onClick={() => deleteSerie(record.id)}>Remover</button>
          <Link to={'/Series/' + record.id} className='btn btn-warning' >Info</Link>
        </td>
      </tr>
    );
  }

  if (data.length === 0) {
    return (
      <div className="container">
        <h1>Série</h1>
        <div><Link to={'/Series/novo'} className='btn btn-primary' >Nova Série</Link></div>
        <div className="alert alert-warning" role="alert">
          Você mão possui séries criados
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Séries</h1>
      <div><Link to={'/Series/novo'} className='btn btn-primary' >Nova Série</Link></div>
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

export default Series;