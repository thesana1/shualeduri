import React, { useState } from 'react'

export default function Main({ count, setCount, setShowCartLabel }) {
  const images = ['image1.png', 'image2.png', 'image3.png']
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedQty, setSelectedQty] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)

  const handlePrev = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleAddToCart = () => {
    if (selectedQty > 0) {
      setCount((prev) => prev + selectedQty)
      setShowCartLabel(true)
      setSelectedQty(0)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      <div
        className="relative w-[500px] h-[500px] cursor-pointer"
        onClick={() => setShowLightbox(true)}
      >
        <img
          src={`/assets/${images[selectedImage]}`}
          alt="product"
          className="w-full h-full object-cover rounded-2xl shadow-lg"
        />

        <button
          onClick={(e) => { e.stopPropagation(); handlePrev() }}
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow hover:bg-white"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); handleNext() }}
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow hover:bg-white"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <div className="max-w-sm flex flex-col gap-3 text-center md:text-left">
        <h3 className="text-[10px] uppercase tracking-[0.25em] text-amber-500 font-semibold">
          Sneaker Company
        </h3>

        <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
          Fall Limited Edition Sneakers
        </h1>

        <p className="text-gray-600 text-[13px] md:text-sm leading-relaxed">
          These low-profile sneakers are your perfect casual wear companion.
          Featuring a durable rubber outer sole, they’ll withstand everything
          the weather can offer.
        </p>

        <div className="flex items-center justify-between md:justify-start md:gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900">$125.00</h2>
            <span className="text-amber-500 font-semibold bg-amber-100 px-2 py-[1px] rounded text-[11px]">
              50% OFF
            </span>
          </div>
          <span className="text-gray-400 line-through text-[11px]">$250.00</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-full">
          <button
            onClick={() => setSelectedQty((prev) => (prev > 0 ? prev - 1 : 0))}
            className="text-2xl font-bold"
          >
            -
          </button>
          <h2 className="text-xl font-semibold">{selectedQty}</h2>
          <button
            onClick={() => setSelectedQty((prev) => prev + 1)}
            className="text-2xl font-bold"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className={`px-6 py-2 rounded-xl shadow transition w-40 flex items-center justify-center gap-2
            ${selectedQty > 0
              ? 'bg-amber-500 hover:bg-amber-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          Add to cart
        </button>
      </div>

      {showLightbox && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-2xl p-4 max-w-lg w-full">
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
              title="Close"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="relative">
              <img
                src={`/assets/${images[selectedImage]}`}
                alt="large view"
                className="rounded-xl w-full h-[400px] object-cover"
              />
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow hover:bg-white"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow hover:bg-white"
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            <div className="flex justify-center gap-3 mt-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={`/assets/${img}`}
                  alt="thumbnail"
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-xl object-cover cursor-pointer border-2 transition
                    ${selectedImage === i
                      ? 'border-amber-500 opacity-100'
                      : 'border-transparent opacity-60 hover:opacity-100'}`}
                />
              ))}
            </div>

            <div className="flex justify-center mt-5">
              <button
                onClick={() => setShowLightbox(false)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
