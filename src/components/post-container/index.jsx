import React from 'react'

import './index.scss'

export const PostContainer = ({ html }) => (
  <div id="postContainer" dangerouslySetInnerHTML={{ __html: html }} />
)
