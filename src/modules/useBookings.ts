import { useState } from "react";
import BookingService from "../services/BookingService";
import { Booking } from "../common/types/Booking";

const useBookings = () => {
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [booking, setBooking] = useState<Booking>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBookings = (page: number | null = null) => {
    return new Promise((resolve, reject) => {
      setBookingsLoading(true);
      return BookingService.index(page === null ? null : { page })
        .then((res: any) => {
          setBookings(page === 1 ? res.data : [...bookings, ...res.data]);
          setCurrentPage(res.pagination.page);
          setTotalPages(res.pagination.totalPages);
          resolve(true);
        })
        .catch((e: any) => reject(e))
        .finally(() => setBookingsLoading(false));
    });
  };

  const fetchBooking = (id: string) => {
    return new Promise((resolve, reject) => {
      setBookingsLoading(true);
      return BookingService.show(id)
        .then((res: any) => {
          setBooking(res);
          resolve(true);
        })
        .catch((e: any) => reject(e))
        .finally(() => setBookingsLoading(false));
    });
  };

  const fetchFlatBookings = (flatID: number | undefined) => {
    if (flatID === undefined) return fetchBookings();

    setBookingsLoading(true);
    return new Promise((resolve, reject) => {
      return BookingService.index({ id: flatID })
        .then((res: any) => {
          setBookings(res.data);
          if (res.data.length === 0) reject();
          resolve(res.data);
        })
        .catch((e: any) => reject(e))
        .finally(() => setBookingsLoading(false));
    });
  };

  return {
    bookingsLoading,
    bookings,
    booking,
    fetchBookings,
    fetchBooking,
    fetchFlatBookings,
    currentPage,
    totalPages,
  };
};

export default useBookings;
