import React from 'react'

export const IconDownload = ({ color }: { color?: string }) => (
  <svg
    width="23" height="23" viewBox="0 0 23 23"
    fill="none" stroke={color || 'currentColor'}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <path d="M7 10l5 5 5-5"/>
    <path d="M12 15V3"/>
  </svg>
)
