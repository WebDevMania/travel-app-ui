import AXIOS_API from "@/utils/axiosAPI"

export async function getFilteredListings(values) {

    const { data } = await AXIOS_API.get(`/listing/filter?location=${values.location}&min_price=${values.min_price}&max_price=${values.max_price}&type=${values.type}`)

    if (data) {
        const blurredImages = await Promise.all(
            data.map((listing) => AXIOS_API.get(`/base64?url=${listing.imageUrls[0]}`))
        )

        const bestHotels = blurredImages.map((img, idx) => {
            const blurredImage = img.data
            const currentHotel = data[idx]

            return { ...currentHotel, blurredImage }
        })

        return bestHotels
    }

}