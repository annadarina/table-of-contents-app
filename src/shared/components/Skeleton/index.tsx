import "./Skeleton.css";

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

const Skeleton = ({ className = "", width, height }: Props) => {
  const size = {
    width: `${width || 280}px`,
    height: `${height || 20}px`,
  };

  return <div className={`skeleton ${className}`} style={size} />;
};

export default Skeleton;
