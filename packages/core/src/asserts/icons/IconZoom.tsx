import React from 'react'

export const IconZoom = ({ color }: { color?: string }) => (
  <svg
    width="23" height="23" viewBox="0 0 23 23"
    fill="none" stroke={color || 'currentColor'}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M8 3H5a2 2 0 0 0-2 2v3"/>
    <path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
    <path d="M3 16v3a2 2 0 0 0 2 2h3"/>
    <path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
  </svg>
)
