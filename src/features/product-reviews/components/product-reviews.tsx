import { Rating, SectionTitle } from "@/shared/components";
import ProductReview from "./product-review";
type Props = {
  productId: string;
}
export default function ProductReviews({productId}: Props) {
  return (
    <section>
      <div className="container">
          <SectionTitle className="ms-0">Product Reviews</SectionTitle>
          <header className="border-b border-ds-border-muted pb-4 mb-4">
            <h3 className="text-ds-text-plain font-semibold text-xl">General rating:</h3>
            <div className="flex items-center gap-1">
              <span className="text-ds-text-plain font-bold text-2xl">4.5</span>
              <span className="text-ds-text-muted font-medium text-sm">(8 ratings)</span>
            </div>
            <Rating rating={4.5} className="justify-start"/>
          </header>
          <div className="flex items-center gap-5">
              {/* product reviews */}
            <div className="bg-lime-500 min-h-12 flex-2 border-e border-ds-border-muted pe-5">
              <ProductReview/>
            </div>
               {/* user rating */}
            <div className="bg-violet-500 min-h-12 flex-1">

            </div>
          </div>
      </div>
    </section>
  )
}
