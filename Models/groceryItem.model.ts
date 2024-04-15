import mongoose from "mongoose";

interface GroceryItem {
    id: number;
    name: string;
    price: number;
    stock: number;
  }
  
  const groceryItemSchema = new mongoose.Schema<GroceryItem>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  });
  
  export const GroceryItemModel = mongoose.model<GroceryItem>('GroceryItem', groceryItemSchema);
  