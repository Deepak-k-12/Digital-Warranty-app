import CardWrapper from '@/components/card-wrapper';

const ProductCardSkeleton = () => {
  return (
    <CardWrapper className="p-0 flex flex-col animate-pulse">
      <div className="bg-muted h-48 w-full rounded-t-lg"></div>
      <div className="p-4 space-y-4">
        <div className="flex justify-between">
          <div className="h-5 w-20 bg-muted rounded"></div>
          <div className="h-5 w-16 bg-muted rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-6 w-3/4 bg-muted rounded"></div>
          <div className="h-4 w-1/2 bg-muted rounded"></div>
        </div>
        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <div className="h-4 w-1/3 bg-muted rounded"></div>
            <div className="h-4 w-1/4 bg-muted rounded"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-1/3 bg-muted rounded"></div>
            <div className="h-4 w-1/4 bg-muted rounded"></div>
          </div>
        </div>
        <div className="flex space-x-2 pt-2">
            <div className="h-9 flex-1 bg-muted rounded"></div>
            <div className="h-9 w-9 bg-muted rounded"></div>
            <div className="h-9 w-9 bg-muted rounded"></div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default ProductCardSkeleton;