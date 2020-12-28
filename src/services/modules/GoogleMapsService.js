import service from '../ApiService'
import {Convert} from "@/utils/convert";
const prefixPath = `google-maps`;
const GoogleMapsService = {
    textSearch(data) {
        const params = Convert.objectToParams(data);
        let url = `${prefixPath}/textsearch` + params;
        return service.get(url)
    },
    nearbyLocation(data) {
        const params = Convert.objectToParams(data);
        let url = `${prefixPath}/nearbysearch` + params;
        return service.get(url)
    },
}

export default GoogleMapsService
