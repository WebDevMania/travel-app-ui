import AXIOS_API from "@/utils/axiosAPI"

export async function deleteListing(id) {
    const { data } = await AXIOS_API.delete(`/admin/listing/${id}`)

    return data
}