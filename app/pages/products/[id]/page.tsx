import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CoffeeProduct, coffeeProducts } from '@/app/pages/menu/page';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  return coffeeProducts.map((product) => ({
    id: product.id.toString(),
  }));
}

async function getProduct(id: string): Promise<CoffeeProduct | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const product = coffeeProducts.find((p) => p.id === parseInt(id, 10));

  if (product) {
    return {
      ...product,
      lastUpdated: new Date().toISOString(),
    };
  }

  return null;
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/product"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          &larr; Back to Coffee Shop
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-md"
              />
            </div>
            <div>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-xl font-semibold mb-4">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Last updated: {product.lastUpdated}
              </p>
              <div className="space-y-4">
                <div>
                  <Label>Size</Label>
                  <RadioGroup defaultValue="medium">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="small" id="small" />
                      <Label htmlFor="small">Small</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="large" id="large" />
                      <Label htmlFor="large">Large</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Milk</Label>
                  <RadioGroup defaultValue="whole">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="whole" id="whole" />
                      <Label htmlFor="whole">Whole Milk</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="skim" id="skim" />
                      <Label htmlFor="skim">Skim Milk</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="almond" id="almond" />
                      <Label htmlFor="almond">Almond Milk</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="oat" id="oat" />
                      <Label htmlFor="oat">Oat Milk</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Extras</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="syrup" />
                      <label htmlFor="syrup">Add Syrup</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sugar" />
                      <label htmlFor="sugar">Add Sugar</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Add to Cart</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export const revalidate = 60;
