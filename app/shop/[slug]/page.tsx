import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { ProductDetails } from "@/components/shop/ProductDetails";
import { products } from "@/data/products";

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen py-20">
      <Container>
        <ProductDetails product={product} />
      </Container>
    </main>
  );
}
