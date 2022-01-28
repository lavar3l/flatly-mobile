import {useState} from "react";
import {Facility} from "../common/types/Facility";
import FacilityService from "../services/FacilityService";

const useFacilities = () => {
    const [facilitiesLoading, setFacilitiesLoading] = useState<boolean>(false);
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [facility, setFacility] = useState<Facility | null>(null);

    const fetchFacilities = () => {
        return new Promise((resolve, reject) => {
            setFacilitiesLoading(true);
            FacilityService.index()
                .then((res: any) => {
                    setFacilities(facilities);
                    resolve(res);
                })
                .catch((e: any) => reject(e))
                .finally(() => setFacilitiesLoading(false))
        })
    }

    const fetchFacility = (name: string) => {
        return new Promise((resolve, reject) => {
            setFacilitiesLoading(true);
            FacilityService.show(name)
                .then((res: any) => {
                    setFacility(facility);
                    resolve(res);
                })
                .catch((e: any) => reject(e))
                .finally(() => setFacilitiesLoading(false))
        })
    }

    const saveFacility = (facility: Facility) => {
        return new Promise((resolve, reject) => {
            FacilityService.store(facility)
                .catch(e => {
                    console.error(e)
                    reject(e);
                })
                .then((res: any) => {
                    setFacility(facility);
                    resolve(res)
                })
        })
    }

    return {
        facilitiesLoading,
        fetchFacilities,
        fetchFacility,
        saveFacility,
        facilities,
        facility
    };
}

export default useFacilities;