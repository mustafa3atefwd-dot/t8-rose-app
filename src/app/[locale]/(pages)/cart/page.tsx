import LeftSide from "@/features/cart/components/left-side";

export default function Cart() {
  return (
    <>
      <div className="container mt-15.5 grid grid-cols-3 gap-12.5 mb-9">
        {/* left side */}
        <div className="col-span-2 space-y-6">
            <LeftSide/>
        </div>
        {/* right side */}
        <div></div>
      </div>
    </>
  );
}
