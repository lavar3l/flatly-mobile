import ResourceService from "./ResourceService";

class FlatService extends ResourceService {
  protected resource = "facilities";
}

export default new FlatService();
