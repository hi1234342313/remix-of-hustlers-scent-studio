import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, TrendingDown } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ProductCardProps {
  product: ShopifyProduct;
  isBestSeller?: boolean;
  showSavings?: boolean;
  originalPrice?: number;
  imageOverride?: string;
}

export const ProductCard = ({ product, isBestSeller, showSavings, originalPrice, imageOverride }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const [selectedVariantId, setSelectedVariantId] = useState(product.node.variants.edges[0]?.node.id || '');
  const [pantsSize, setPantsSize] = useState<string>('');
  const [hoodieSize, setHoodieSize] = useState<string>('');
  
  const hasMultipleVariants = product.node.variants.edges.length > 1;
  const hasSizeOption = product.node.options?.some(option => option.name.toLowerCase() === 'size');
  const isBundle = (product.node.productType || '').toLowerCase().includes('bundle') ||
    product.node.title.toLowerCase().includes('bundle');
  
  const handleAddToCart = () => {
    const selectedVariant = product.node.variants.edges.find(
      v => v.node.id === selectedVariantId
    )?.node;
    
    if (!selectedVariant) {
      toast.error('Please select a variant');
      return;
    }

    if (isBundle && !hoodieSize) {
      toast.error('Please select your hoodie size');
      return;
    }

    if (isBundle && !pantsSize) {
      toast.error('Please select your pants size');
      return;
    }

    addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: [
        ...(selectedVariant.selectedOptions || []),
        ...(isBundle && hoodieSize ? [{ name: 'Hoodie Size', value: hoodieSize }] : []),
        ...(isBundle && pantsSize ? [{ name: 'Pants Size', value: pantsSize }] : []),
      ],
    });
    
    toast.success('Added to cart!');
  };

  const image = imageOverride || product.node.images.edges[0]?.node.url || '';
  const title = product.node.title;
  const description = product.node.description;
  const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
  const currencyCode = product.node.priceRange.minVariantPrice.currencyCode;
  const savings = originalPrice ? originalPrice - price : 0;
  
  return (
    <Card className="group relative overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-[0_8px_30px_hsl(32_100%_45%/0.12)]">
      {isBestSeller && (
        <Badge className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground shadow-lg shadow-primary/30">
          <Star className="w-3 h-3 mr-1 fill-current" />
          Best Seller
        </Badge>
      )}
      {showSavings && savings > 0 && (
        <Badge className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground shadow-lg shadow-accent/30">
          <TrendingDown className="w-3 h-3 mr-1" />
          Save ${savings.toFixed(2)}
        </Badge>
      )}
      <div className="aspect-[3/4] overflow-hidden bg-gradient-to-b from-background/50 to-background flex items-center justify-center p-8">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
          />
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
        {isBundle && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Select Hoodie Size</label>
              <RadioGroup
                value={hoodieSize}
                onValueChange={setHoodieSize}
                className="flex flex-wrap gap-3"
              >
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <label
                    key={size}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 cursor-pointer hover:border-primary transition-colors"
                  >
                    <RadioGroupItem value={size} />
                    <span className="text-sm font-medium">{size}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Select Pants Size</label>
              <RadioGroup
                value={pantsSize}
                onValueChange={setPantsSize}
                className="flex flex-wrap gap-3"
              >
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <label
                    key={size}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 cursor-pointer hover:border-primary transition-colors"
                  >
                    <RadioGroupItem value={size} />
                    <span className="text-sm font-medium">{size}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}
        
        {hasMultipleVariants && hasSizeOption && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Select Variant</label>
            <Select value={selectedVariantId} onValueChange={setSelectedVariantId}>
              <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder="Choose an option" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border z-50">
                {product.node.variants.edges.map((variant) => (
                  <SelectItem 
                    key={variant.node.id} 
                    value={variant.node.id}
                    className="hover:bg-muted cursor-pointer"
                  >
                    {variant.node.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            {showSavings && originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{currencyCode} {originalPrice.toFixed(2)}</span>
            )}
            <span className="text-2xl font-bold text-primary">{currencyCode} {price.toFixed(2)}</span>
          </div>
          <Button variant="hero" size="sm" className="shadow-lg" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};
