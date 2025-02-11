import { useState } from "react";
import { Carousel, Image } from "react-bootstrap";

const ProductCarousel = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(
    product.images && product.images.length > 0
      ? `http://localhost:3001/uploads/${product.images[0]}`
      : "/image/cardimage.jpg"
  );

  return (
    <div>
      {/* Main Image Display */}
      <div className="text-center">
        <Image
          src={selectedImage}
          className="img-fluid border"
          alt="Selected Product"
        />
      </div>

      {/* Thumbnails */}
      <div className="d-flex justify-content-center mt-3">
        {product.images &&
          product.images.length > 0 &&
          product.images.map((img, index) => (
            <div
              key={index}
              className="mx-2"
              onClick={() => setSelectedImage(`http://localhost:3001/uploads/${img}`)}
              style={{
                border: selectedImage.includes(img) ? "2px solid orange" : "2px solid transparent",
                cursor: "pointer",
              }}
            >
              <Image
                src={`http://localhost:3001/uploads/${img}`}
                width={60}
                height={60}
                className="rounded"
                alt={`Thumbnail ${index + 1}`}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
