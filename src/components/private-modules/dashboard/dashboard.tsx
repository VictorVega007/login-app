import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Info, User } from "lucide-react";
import { useRecords } from "../../../hooks/records-hook/use-records.hook";
import { truncateText } from "../../../core/utils/functions/functions.utils";
import apiServices from "../../../core/services/api/api.services";
import Paginator from "../../shared/paginator/paginator";
import { Fragment } from "react/jsx-runtime";
import Header from "../../shared/header/header";
import FloatingButton from "../../shared/floating-button/floating-button";

const Dashboard = () => {
  const recordsPerPage = 48;
  const totalRecords = 2000;

  const { records, loading, currentPage, totalPages, handlePageChange } =
    useRecords(recordsPerPage, totalRecords);

  return (
    <Fragment>
      <header>
        <Header />
      </header>
      <div className="p-4 mt-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="my-9">
          <h2 className="text-gray-200 text-lg mb-4 px-0 lg:px-40 xl:px-40">
            Bienvenido a nuestra galería digital, donde cada obra de arte cuenta
            una historia única. Explora una cuidada selección de piezas que
            abarcan diferentes estilos, épocas y culturas. Sumérgete en la
            creatividad y la belleza de la expresión artística.
          </h2>
        </div>

        <hr className="text-gray-300 mb-10" />

        {loading ? (
          <div className="mt-4 flex justify-center items-center h-screen">
            <div className="w-11 h-11 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="px-0 lg:px-3 xl:px-3">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {records.map((record) => (
                <li
                  key={record.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
                >
                  <div
                    className="h-80 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${apiServices.getRecordImage(
                        record
                      )})`,
                    }}
                  />
                  <div className="p-4 flex flex-col justify-between h-[55%]">
                    <div className="mb-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {record.title ? record.title : "Not found"}
                      </h2>
                      <p className="text-sm text-gray-600">
                        <span>Artist: </span>
                        {record.artist_title
                          ? record.artist_title
                          : "Unknown artist"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span>Artwork type: </span>
                        {record.artwork_type_title
                          ? record.artwork_type_title
                          : "Unknown artwork type"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span>Country of origin: </span>
                        {record.place_of_origin
                          ? record.place_of_origin
                          : "Unknown country"}
                      </p>
                      <hr className="text-gray-400 mt-4 mb-4" />
                      <p className="text-sm text-gray-600">
                        <span>Description: </span>
                        {record.short_description ? (
                          <>
                            <span className="ml-1">
                              {truncateText(record.short_description, 100)}
                            </span>
                            <Tooltip>
                              <TooltipTrigger className="ml-2 text-gray-600 cursor-pointer">
                                <Info size={16} />
                              </TooltipTrigger>
                              <TooltipContent className="bg-white shadow-md p-2 rounded-md max-w-xs">
                                {record.short_description}
                              </TooltipContent>
                            </Tooltip>
                          </>
                        ) : (
                          "Not found"
                        )}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User size={24} className="text-gray-500" />
                        </div>
                        <span className="text-gray-900">
                          {record.artist_title
                            ? record.artist_title
                            : "Unknown artist"}
                        </span>
                      </div>
                      <div className="ml-3 text-sm">
                        <div className="text-gray-600">
                          {record.date_display}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <Paginator
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        <FloatingButton />
      </div>
    </Fragment>
  );
};

export default Dashboard;
