import AXIOS_API from "@/utils/axiosAPI";

export async function getBestHotels() {
    const { data } = await AXIOS_API.get(`/listing/best-hotels`)

    console.log(data, 'get best hotels')
    return data
}