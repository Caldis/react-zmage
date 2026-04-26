import React from 'react'

export const IconRotateLeft = ({ color }: { color?: string }) => (
  <svg
    width="23" height="23" viewBox="0 0 23 23"
    fill="none" stroke={color || 'currentColor'}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
)
