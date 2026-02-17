import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShopifyProduct } from '@/lib/shopify';
import { getVariantIdForProduct, buildCheckoutUrl } from '@/lib/variantMap';

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  shopifyVariantId: string; // The numeric Shopify variant ID for checkout URL
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  
  addItem: (item: Omit<CartItem, 'shopifyVariantId'>) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setLoading: (loading: boolean) => void;
  checkout: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);
        
        // Resolve the numeric Shopify variant ID from product title
        const shopifyVariantId = getVariantIdForProduct(item.product.node.title) || '';

        if (existingItem) {
          set({
            items: items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          });
        } else {
          set({ items: [...items, { ...item, shopifyVariantId }] });
        }
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.variantId === variantId ? { ...item, quantity } : item
          )
        });
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter(item => item.variantId !== variantId)
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      setLoading: (isLoading) => set({ isLoading }),

      checkout: () => {
        const { items } = get();
        if (items.length === 0) return;

        const checkoutItems = items
          .filter(item => item.shopifyVariantId) // Only items with mapped variant IDs
          .map(item => ({
            variantId: item.shopifyVariantId,
            quantity: item.quantity,
          }));

        if (checkoutItems.length === 0) {
          console.error('No items have mapped Shopify variant IDs');
          return;
        }

        const url = buildCheckoutUrl(checkoutItems);
        window.open(url, '_blank');
      },
    }),
    {
      name: 'shopify-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
