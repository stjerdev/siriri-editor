import * as React from 'react'
import dateFormat from 'dateformat'


export const dateFormatter = (value: number) => {
  if (!value) {
    return ''
  }
  const fechaHora = new Date(value)
  return dateFormat(fechaHora, 'dd/mm/yyyy')
}

