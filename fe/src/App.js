import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';
import api from './api';

const App = () => {
  const defaultFormData = {
    latitude: 0,
    longitude: 0,
    is_public: true,
    title: '',
    description: '',
    evaluation: null,
  }
  const [events, setEvents] = useState([])
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    fetchEvents();
  }, [])

  const fetchEvents = async () => {
    const response = await api.get('/events/')
    setEvents(response.data)
  }

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    await api.post(/events/, formData)
    fetchEvents()
    setFormData(defaultFormData)
  }

  return (
    <div className="App">
      <div className='navbar navbar-dark bg-primary'>
        <div className='container-fluid'>
          <a className='navbar-brand'>
            Qual a boa?
          </a>
        </div>
      </div>

      <div className='container'>
        <form onSubmit={handleSubmitForm}>
          <div className='mb-3 mt-3'>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input
              type='text'
              className='form-control'
              id='title'
              name='title'
              onChange={handleInputChange}
              value={formData.title}
            />
            <button type='submit' className='btn btn-primary'>Create</button>
          </div>
        </form>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Public?</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Evaluation</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{event.is_public}</td>
                <td>{event.latitude}</td>
                <td>{event.longitude}</td>
                <td>{event.evaluation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default App;
