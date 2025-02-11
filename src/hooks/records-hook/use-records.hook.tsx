import { useEffect, useState } from "react";
import { RecordModel } from "../../core/model/record.model";
import apiServices from "../../core/services/api/api.services";

export const useRecords = (recordsPerPage: number, totalRecords: number) => {
  const [records, setRecords] = useState<RecordModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const totalPageCount = Math.ceil(totalRecords / recordsPerPage);
    setTotalPages(totalPageCount);
  }, [recordsPerPage, totalRecords]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await apiServices.getRecords(currentPage, recordsPerPage);
        if (data.data) {
          setRecords(data.data);
        }
      } catch (error) {
        console.error("Error al obtener productos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, recordsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return { records, loading, currentPage, totalPages, handlePageChange };
};
