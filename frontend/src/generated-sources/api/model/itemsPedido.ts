/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * WebApi
 * OpenAPI spec version: 1.0
 */
import type { Pedido } from './pedido';
import type { Personalizacione } from './personalizacione';
import type { Producto } from './producto';

export interface ItemsPedido {
  id?: number;
  pedidoId?: number;
  productoId?: number;
  cantidad?: number;
  precioUnitario?: number;
  pedido?: Pedido;
  personalizacione?: Personalizacione;
  producto?: Producto;
}
