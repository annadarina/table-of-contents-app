import "./LoadingPlaceholder.css";
import Skeleton from "../../../../shared/components/Skeleton";

const skeletons = Array.from(Array(10).keys());

const LoadingPlaceholder = () => {
  return (
    <div className="loading-placeholder">
      {skeletons.map((skeleton) => (
        <Skeleton
          key={skeleton}
          width={skeleton === 3 || skeleton === 6 ? 184 : 220}
          className={`loading-placeholder__skeleton ${
            skeleton === 3 || skeleton === 6
              ? "loading-placeholder__skeleton--child"
              : ""
          }`}
        />
      ))}
    </div>
  );
};

export default LoadingPlaceholder;
