// import { Image } from "../../screens/Home"

import React from "react"

const ImageCard = ({alt_description, urls, user}) => {
  return (
    <div className="bg-black text-white p-3 shadow-lg hover:shadow-xl flex flex-col items-start space-y-4">
        <img src={urls.full} alt={alt_description} className="w-64 h-72 object-cover" />
        <p className="font-semibold">{user.name}</p>
    </div>
  )
}

export default ImageCard