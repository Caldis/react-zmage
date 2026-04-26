import React from 'react'

export const IconArrowRight = ({ color }: { color?: string }) => (
  <svg
    width="23" height="23" viewBox="0 0 23 23"
    fill="none" stroke={color || 'currentColor'}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
)
