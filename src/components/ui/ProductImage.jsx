import { productImage } from '../../data/catalog';

// Foto do produto gerada a partir do modelo 3D (ver tools/render-products.mjs)
const ProductImage = ({ product, className = '', eager = false }) => (
  <img
    src={productImage(product.id)}
    alt={`${product.model} ${product.storage}`}
    width={313}
    height={720}
    loading={eager ? 'eager' : 'lazy'}
    decoding="async"
    className={`object-contain ${className}`}
  />
);

export default ProductImage;
