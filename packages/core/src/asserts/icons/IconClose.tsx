import React from 'react'

export const IconClose = ({ color }: { color?: string }) => (
  <svg
    width="23" height="23" viewBox="0 0 23 23"
    fill="none" stroke={color || 'currentColor'}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M20 4 4 20"/>
    <path d="m4 4 16 16"/>
  </svg>
)
