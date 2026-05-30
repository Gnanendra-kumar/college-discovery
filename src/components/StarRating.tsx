interface StarRatingProps {
  rating: number;
  size?: "sm" | "md";
}

export default function StarRating({ rating, size = "md" }: StarRatingProps) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const starSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <span key={i} className={`${starSize} text-yellow-400`}>★</span>
      );
    } else if (i === fullStars && hasHalf) {
      stars.push(
        <span key={i} className={`${starSize} text-yellow-400`}>★</span>
      );
    } else {
      stars.push(
        <span key={i} className={`${starSize} text-gray-300`}>★</span>
      );
    }
  }

  return (
    <div className="flex items-center gap-0.5">
      {stars}
      <span className={`ml-1 text-gray-600 ${size === "sm" ? "text-xs" : "text-sm"}`}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
