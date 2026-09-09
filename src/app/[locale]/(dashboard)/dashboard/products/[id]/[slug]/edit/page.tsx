interface EditProductPageProps {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id, slug } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Product</h1>
        <p className="text-muted-foreground mt-1">
          Editing: {slug} ({id})
        </p>
      </div>

      <div className="rounded-lg border bg-white p-6">Edit product form</div>
    </div>
  );
}
