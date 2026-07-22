type Props = {
  params: Promise<{
    productId: string;
  }>;
};
export default async function page({params}: Props) {
  const {productId} = await params;
  return (
    <div>page id {productId}</div>
  )
}
