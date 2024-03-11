import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import provincesData from '@/assets/thai-province-data/thai_provinces.json'
import amphuresData from '@/assets/thai-province-data/thai_amphures.json'
import tambonsData from '@/assets/thai-province-data/thai_tambons.json'

const getLocation = (path: any) => {
    const provinces = provincesData.RECORDS.find((province) => province.id === parseInt(path.province));
    const amphures = amphuresData.RECORDS.find((amphure) => amphure.id === parseInt(path.district));
    const tambons = tambonsData.RECORDS.find((tambon) => tambon.id === parseInt(path.subdistrict));
    return [provinces, amphures, tambons]
};

export default getLocation