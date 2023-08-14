import "./LoadingPlaceholder.css";
import Skeleton from "../../../../shared/components/Skeleton";

const skeletons = Array.from(Array(10).keys());

const LoadingPlaceholder = () => {
  const getClassNames = (value: number) =>
    `loading-placeholder__skeleton ${
      value === 3 || value === 6 ? "loading-placeholder__skeleton--child" : ""
    }`;

  return (
    <div className="loading-placeholder">
      {skeletons.map((skeleton) => (
        <Skeleton
          key={skeleton}
          width={skeleton === 3 || skeleton === 6 ? 184 : 220}
          className={getClassNames(skeleton)}
        />
      ))}
    </div>
  );
};

export default LoadingPlaceholder;
