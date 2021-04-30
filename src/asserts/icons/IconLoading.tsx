import React from 'react'

export const IconLoading = ({ color }: { color?: string }) => (
  <svg fill={color} width="24" height="24" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="spinner-1552570621916" x1="0%" y1="0%" x2="65%" y2="0%">
        <stop offset="0%" className="Spinner-blue-3_W"/>
        <stop offset="100%" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="90" fill="transparent" stroke="url(#spinner-1552570621916)" strokeWidth="20"/>
  </svg>
)
