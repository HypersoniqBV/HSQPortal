/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react'

function Card({msg, children}) {

  return (
    <div 
      className="bg-dark hovercard mb-2 rounded"
    >
      <div
        className="p-2"
        style={{ display: 'flex' }}
      >
        {children}
      </div>
      {msg ? (
      <div className='bg-primary rounded-bottom' style={{ paddingLeft: 10, paddingTop: 2, paddingBottom: 2}}>
        {msg}
      </div> ) : (<></>)}
    </div>
  )
}

export default Card
