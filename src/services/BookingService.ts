import ResourceService from "./ResourceService";

class BookingService extends ResourceService {
  protected resource = "bookings";
}

export default new BookingService();
