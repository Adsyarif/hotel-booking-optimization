import { Heart, Star } from "lucide-react";
import type { IHotelData } from "../types";
import { useState } from "react";

interface IHotelCardProps {
  data: IHotelData;
}

const formatDate = (s: string, e: string) => {
  const start = new Date(s);
  const end = new Date(e);

  const startMonth = start.toLocaleString("en-US", { month: "short" });
  const endMonth = end.toLocaleString("en-US", { month: "short" });

  const startDate = start.getDate();
  const endDate = end.getDate();

  const startYear = start.getFullYear();
  const endyear = end.getFullYear();

  if (startMonth === endMonth && startYear === endyear) {
    return `${startMonth} ${startDate} - ${endDate}`;
  } else if (startYear === endyear) {
    return `${startMonth} ${startDate} - ${endMonth} ${endDate}`;
  } else {
    return `${startMonth} ${startDate}, ${startYear} - ${endMonth} ${endDate}, ${endyear}`;
  }
};

const HotelCard = ({ data }: IHotelCardProps) => {
  const [isLike, setIsLike] = useState<boolean>(false);

  const likeClickHandle = () => setIsLike((currentLike) => !currentLike);

  return (
    <div className="mt-2">
      <div className="relative mb-4">
        <img
          className="h-[310px] w-full rounded-xl object-cover"
          src={data.imageUrl}
        />
        <button
          onClick={() => likeClickHandle()}
          className="absolute top-3 right-3"
        >
          <Heart fill={isLike ? "white" : "gray"} size={24} color="white" />
        </button>
      </div>
      <div className="flex flex-row justify-between">
        <p className="font-medium">{data.location}</p>
        <div className="flex items-center gap-1">
          <Star size={16} fill="black" />
          <p>{data.rating}</p>
          <p>({data.reviews})</p>
        </div>
      </div>
      <div>
        <p className="mb-1 text-sm text-gray-500">{data.distance} kilometers</p>
        <p className="mb-2 text-sm text-gray-500">
          {formatDate(data.availableDates.start, data.availableDates.end)}
        </p>
        <p className="font-semibold">
          ${data.pricePerNight} <span className="font-normal">night</span>
        </p>
      </div>
    </div>
  );
};

export default HotelCard;
