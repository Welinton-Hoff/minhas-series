import React, { useState } from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";

const NewSerie = () => {

  const [name, setName] = useState("");
  const [sucess, setSucess] = useState(false)
  const onChange = evt => {
    setName(evt.target.value)
  }

  const save = () => {
    axios
      .post('/api/series', {
        name
      })
      .then(res => {
        setSucess(true)
      })
  }

  if (sucess) {
    return <Redirect to='/Series' />
  }


  return (
    <div className="container">
      <h1>Nova série</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input type="text" value={name} onChange={onChange} class="form-control" id="name" placeholder="Nome do Gênero" />
        </div>
        <button type="button" className="btn btn-primary" onClick={save}>Salvar série</button>
      </form>
    </div>
  );
}

export default NewSerie;