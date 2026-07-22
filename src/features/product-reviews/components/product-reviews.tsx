import { SectionTitle } from "@/shared/components";

export default function ProductReviews() {
  return (
    <section>
      <div className="container">
          <SectionTitle>Product Reviews</SectionTitle>
          <header>
            <h3>General rating:</h3>
          </header>
          <div className="flex items-center gap-5">
              {/* product reviews */}
            <div className="bg-lime-500 min-h-12 flex-2">
              
            </div>
               {/* user rating */}
            <div className="bg-violet-500 min-h-12 flex-1">

            </div>
          </div>
      </div>
    </section>
  )
}
