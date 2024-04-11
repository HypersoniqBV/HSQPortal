/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react'

function Card({ children }) {

  return (
    <div 
      className="hovercard mb-2 rounded"
    >
      <div
        className="p-2"
        style={{ display: 'flex' }}
      >
        {children}
      </div>
    </div>
  )
}

export default Card
