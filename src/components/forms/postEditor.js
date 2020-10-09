import React from 'react'
import Dante from 'Dante2'

import { DanteTooltipConfig } from 'Dante2/package/es/components/popovers/toolTip.js'
import Icons from 'Dante2/package/es/components/icons'

function PostEditor({ bodyText, handleChange }) {
  return (
    <Dante
      className="blog-editor"
      content={bodyText}
      tooltips={[
        DanteTooltipConfig({
          widget_options: {
            block_types: [
              {
                label: 'h2',
                style: 'header-two',
                type: 'block',
                icon: Icons.h2,
              },
              {
                label: 'h3',
                style: 'header-three',
                type: 'block',
                icon: Icons.h3,
              },
              { type: 'separator' },
              { type: 'link' },

              {
                label: 'blockquote',
                style: 'blockquote',
                type: 'block',
                icon: Icons.blockquote,
              },
              { type: 'separator' },
              {
                label: 'bold',
                style: 'BOLD',
                type: 'inline',
                icon: Icons.bold,
              },
              {
                label: 'italic',
                style: 'ITALIC',
                type: 'inline',
                icon: Icons.italic,
              },
              {
                label: 'code',
                style: 'code-block',
                type: 'block',
                icon: Icons.code,
              },
              {
                label: 'insertunorderedlist',
                style: 'unordered-list-item',
                type: 'block',
                icon: Icons.insertunorderedlist,
              },
              {
                label: 'insertorderedlist',
                style: 'ordered-list-item',
                type: 'block',
                icon: Icons.insertunorderedlist,
              },
            ],
          },
        }),
      ]}
      onChange={(editor) => handleChange(editor)}
    />
  )
}

export default PostEditor
