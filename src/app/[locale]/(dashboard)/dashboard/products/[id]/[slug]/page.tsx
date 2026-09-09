interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { id, slug } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{slug}</h1>
        <p className="text-muted-foreground mt-1">Product ID: {id}</p>
      </div>

      <div className="rounded-lg border bg-white p-6">Product details page</div>
    </div>
  );
}
