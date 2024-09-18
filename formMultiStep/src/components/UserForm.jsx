import React from 'react'

export const UserForm = ({data, updateFieldHandler}) => {
  return (
    <div>
        <div className="form-control">
          <label htmlFor="name">Nome:</label>
          <input type="text" 
          placeholder='Digite seu nome' 
          id='name' name='name' 
          required
          value = {data.name || ''}
          onChange={(e) => updateFieldHandler('name', e.target.value)}
          />
          <label htmlFor="name">Email:</label>
          <input type="text" 
          placeholder='Digite seu e-mail' 
          required 
          id='email'
          name='email' 
          value = {data.email || ''}
          onChange={(e) => updateFieldHandler('email', e.target.value)}
          />
        </div>
    </div>
  )
}
