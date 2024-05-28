import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cards = ({ item }) => {
  const { _id, image, name, price } = item;

  const [isHeartFillted, setIsHeartFillted] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFillted(!isHeartFillted);
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div
        className={`rating gap-1 absolute right-7 top-2 p-4 bg-green heartStar ${
          isHeartFillted ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart />
      </div>
      <Link to={`/menu/${_id}`}>
        <figure className="px-10 pt-10">
          <img
            src={image}
            alt=""
            className="hover:scale-105 transition-all duration-200 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span>
            {price}
          </h5>
          <button className="btn bg-green text-white">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
