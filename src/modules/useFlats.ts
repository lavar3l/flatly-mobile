import { useState } from "react";
import FlatService from "../services/FlatService";
import { Flat } from "../common/types/Flat";

const useFlats = () => {
  const [flatsLoading, setFlatsLoading] = useState(false);
  const [flats, setFlats] = useState<Flat[]>([]);
  const [flat, setFlat] = useState<Flat>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFlats = (params: any | null = null) => {
    return new Promise((resolve, reject) => {
      setFlatsLoading(true);
      return FlatService.index(params === null ? null : params)
        .then((res: any) => {
          setFlats(params === null || params.page === 1 ? res.data : [...flats, ...res.data]);
          setCurrentPage(res.pagination.page);
          setTotalPages(res.pagination.totalPages);
          resolve(true);
        })
        .catch((e: any) => reject(e))
        .finally(() => setFlatsLoading(false));
    });
  };

  const fetchFlat = (id: number) => {
    return new Promise((resolve, reject) => {
      setFlatsLoading(true);
      return FlatService.show(id)
        .then((res: any) => {
          setFlat(res);
          resolve(true);
        })
        .catch((e: any) => reject(e))
        .finally(() => setFlatsLoading(false));
    });
  };

  return {
    flatsLoading,
    flats,
    flat,
    fetchFlats,
    fetchFlat,
    currentPage,
    totalPages,
  };
};

export default useFlats;
