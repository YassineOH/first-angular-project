import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Product, CartItem } from "./products";

@Injectable({
  providedIn: "root",
})
export class CartService {
  items: CartItem[] = [];

  constructor(private http: HttpClient) {}

  addToCart = (product: Product) => {
    const isProductExist = this.items.find((item) => item.id === product.id);

    if (!isProductExist) {
      this.items.push({ ...product, quantity: 1 });
    } else {
      this.items = this.items.map((item) => {
        if (item.id === isProductExist.id) {
          item.quantity += 1;
        }
        return item;
      });
    }
  };

  getItems = () => {
    return this.items;
  };

  getShippingPrices = () => {
    return this.http.get<{ type: string; price: number }[]>(
      "/assets/shipping.json"
    );
  };

  clearCart = () => {
    this.items = [];
    return this.items;
  };
}
