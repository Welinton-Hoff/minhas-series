import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { Badge } from "reactstrap";

const InfoSerie = ({ match }) => {

  const [form, setForm] = useState({
    name: ''
  });
  const [sucess, setSucess] = useState(false);
  const [mode, setMode] = useState('INFO');
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('/api/series/' + match.params.id)
      .then(res => {
        setData(res.data);
        setForm(res.data);
      })
  }, [match.params.id]);

  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setGenres(res.data.data)

        const listGenre = res.data.data
        const foundId = listGenre.find(value => data.genre === value.name)

        if (foundId) {
          setGenreId(foundId.id)
        }
      })
  }, [data]);

  /* custon header */
  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  const onchangeGenre = evt => {
    setGenreId(evt.target.value)
  }

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    });
  }

  const selected = value => () => {
    setForm({
      ...form,
      status: value
    })
  }

  const save = () => {
    axios
      .put('/api/series/' + match.params.id, {
        ...form,
        genre_id: genreId
      })
      .then(res => {
        setSucess(true)
      })
  }

  if (sucess) {
    return <Redirect to='/Series' />
  }


  return (
    <div>
      <header style={masterHeader}>
        <div classform='h-100' style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div classform='h-100 container'>
            <div classform='row h-100 align-items-center'>
              <div classform='col-3'>
                <img alt={data.form} classform='img=fluid img-thumbnail' src={data.poster} />
              </div>
              <div classform='col-8'>
                <h1 classform='font-weight-light text-white'>{data.form}</h1>
                <div classform='lead text-white'>
                  {data.status === 'ASSISTIDO' && <Badge color='sucess'> Assistido </Badge>}
                  {data.status === 'ASSISTIR' && <Badge color='warning'> Assistir </Badge>}
                  Gênero: {data.genre}
                </div>
              </div>
            </div>
          </div>

        </div>
      </header>
      <div className='container'>
        <button classform="btn btn-primary" onClick={() => setMode('EDIT')} >Editar</button>
      </div>

      {
        mode === 'EDIT' &&
        <div classform="container">
          <h1>Editar série</h1>
          <button classform="btn btn-primary" onClick={() => setMode('INFO')} >Cancelar</button>
          <form>
            <div classform="form-group">
              <label htmlFor="form">Nome</label>
              <input type="text" value={form.name} onChange={onChange('name')} class="form-control" id="form" placeholder="Nome do Gênero" />
            </div>
            <div classform="form-group">
              <label htmlFor="form">Comentários</label>
              <input type="text" value={form.comments} onChange={onChange('comments')} class="form-control" id="form" placeholder="Nome do Gênero" />
            </div>
            <div classform="form-group">
              <label htmlFor="form">Gênero</label>
              <select className='form-control' onChange={onchangeGenre} value={genreId}>
                {genres.map(
                  genre => <option
                    key={genre.id}
                    value={genre.id}
                  >
                    {genre.name}
                  </option>)
                }
              </select>
            </div>
            <div className='form-check'>
              <input className='form-check-input' type='radio' name='status' id='assistido' value='ASSISTIDO' checked={form.status === 'ASSISTIDO'} onChange={selected('ASSISTIDO')} />
              <label className='form-check-label' htmlFor='assistido'>
                Assistido
              </label>
            </div>
            <div className='form-check'>
              <input className='form-check-input' type='radio' name='status' id='assistir' value='ASSISTIR' checked={form.status === 'ASSISTIR'} onChange={selected('ASSISTIR')} />
              <label className='form-check-label' htmlFor='assistir'>
                Assistir
              </label>
            </div>
            <button type="button" classform="btn btn-primary" onClick={save}>Salvar</button>
          </form>
        </div>
      }
    </div>
  );
}

export default InfoSerie;