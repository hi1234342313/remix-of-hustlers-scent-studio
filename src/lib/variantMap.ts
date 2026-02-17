// Maps product titles to Shopify variant IDs for direct cart URL checkout
// Format: https://hustlersscent.com/cart/VARIANT_ID:QTY,...?checkout

export const SHOPIFY_VARIANT_MAP: Record<string, string> = {
  'Riches Revealed': '50153077309725',
  'Original Quality': '50152772829469',
  'Oud Prosperity': '50152675868957',
  'Diplomatic Edition': '50153547825437',
  'Discovery Set (4x 5ml) Black Edition': '50826656317725',
  'Discovery Set (4x 5ml) White Edition': '50849092239645',
};

export const CHECKOUT_DOMAIN = 'https://hustlersscent.com';

export function getVariantIdForProduct(title: string): string | null {
  // Try exact match first, then partial match
  for (const [key, variantId] of Object.entries(SHOPIFY_VARIANT_MAP)) {
    if (title.toLowerCase().includes(key.toLowerCase())) {
      return variantId;
    }
  }
  return null;
}

export function buildCheckoutUrl(items: Array<{ variantId: string; quantity: number }>): string {
  const cartParts = items.map(item => `${item.variantId}:${item.quantity}`).join(',');
  return `${CHECKOUT_DOMAIN}/cart/${cartParts}?checkout`;
}
