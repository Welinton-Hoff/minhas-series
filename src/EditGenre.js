import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";

const EditGenre = ({ match }) => {

  const [name, setName] = useState("");
  const [sucess, setSucess] = useState(false);

  useEffect(() => {
    axios
      .get('/api/genres/' + match.params.id)
      .then(res => {
        setName(res.data.name)
      })
  }, [match.params.id])

  const onChange = evt => {
    setName(evt.target.value)
  }

  const save = () => {
    axios
      .put('/api/genres' + match.params.id, {
        name
      })
      .then(res => {
        setSucess(true)
      })
  }

  if (sucess) {
    return <Redirect to='/Generos' />
  }


  return (
    <div className="container">
      <h1>Editar gêneros</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input type="text" value={name} onChange={onChange} class="form-control" id="name" placeholder="Nome do Gênero" />
        </div>
        <button type="button" className="btn btn-primary" onClick={save}>Salvar gênero</button>
      </form>
    </div>
  );
}

export default EditGenre;