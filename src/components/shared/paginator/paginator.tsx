import { PaginatorModel } from "../../../core/model/paginator.model";

const Paginator = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginatorModel) => {
  const maxButtonCount: number = 6;

  const currentBlock: number = Math.floor((currentPage - 1) / maxButtonCount);
  const startPage: number = currentBlock * maxButtonCount + 1;
  const endPage: number = Math.min(startPage + maxButtonCount - 1, totalPages);

  return (
    <div className="flex flex-col items-center mt-6">
      <div className="flex flex-wrap justify-center gap-2 overflow-x-auto">
        {currentPage > 1 && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Anterior
          </button>
        )}

        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={`px-4 py-2 rounded-lg cursor-pointer ${
                currentPage === 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-100"
              }`}
            >
              1
            </button>
            <span className="text-gray-600">...</span>
          </>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const pageNumber = startPage + i;
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`px-4 py-2 rounded-lg cursor-pointer ${
                currentPage === pageNumber
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-100"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        {endPage < totalPages && (
          <>
            <span className="text-gray-600">...</span>
            <button
              onClick={() => onPageChange(totalPages)}
              className={`px-4 py-2 rounded-lg cursor-pointer ${
                currentPage === totalPages
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-100"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}

        {currentPage < totalPages && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default Paginator;
