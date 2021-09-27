import Skeleton from 'react-loading-skeleton';

const LoadingSkeleton: React.FC = () => {
  return (
    <div>
      <Skeleton height={200} width={200} />
    </div>
  );
};

export default LoadingSkeleton;
