import Link from 'next/link'

const Pagination = ({page, totalPages , query,  sort ,title }) => {
  return (
    <div className="flex justify-center mt-8">
    {Array.from({ length: totalPages }, (_, i) => (
      <Link
        key={i + 1}
        href={ title ? `/products/${title}?sort=${sort}&page=${i + 1}` : `/products?search=${query}&sort=${sort}&page=${i + 1}` }
        className={`mx-1 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
          Number(page) === i + 1 ? 'bg-primary-default text-white shadow-md' : 'bg-gray-200 hover:bg-primary-hover hover:text-white'
        }`}
      >
        {i + 1}
      </Link>
    ))}
  </div>
  )
}

export default Pagination