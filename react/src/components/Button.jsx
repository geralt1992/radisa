import React from 'react'

export default function Button(props) {

    const {color, text, functionality} = props;

    const dynamicClassName = `inline-flex ml-5 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-${color}-600 hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500`

  return (
    <button
    type="submit"
    onClick={() => functionality()}
    className={dynamicClassName}
    >
      {text}
    </button>
  )
}
