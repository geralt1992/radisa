/* eslint-disable react/prop-types */

export default function Header(props) {

  const {title, subtitle} = props

  return (
    <div className='flex flex-col justify-center items-center mt-12'>
      <h1 className="mb-4 text-3xl md:text-4xl font-bold tracking-wide text-gray-600 font-mono">{title}</h1>
      <p className="mb-6 mt-2 text-xl font-light leading-relaxed text-gray-600 hidden md:block text-center">{subtitle}</p>
    </div>
  )
}
