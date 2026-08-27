interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Product</h1>
        <p className="text-muted-foreground mt-1">Product ID: {id}</p>
      </div>

      <div className="rounded-lg border bg-white p-6">Product details</div>
    </div>
  );
}
