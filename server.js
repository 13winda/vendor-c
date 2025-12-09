import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { pool } from "./db.js";

const app = express();

app.get("/api/data", async (req, res) => {
  try {
    const q = "SELECT * FROM vendor_c.menu ORDER BY id ASC";
    const { rows } = await pool.query(q);

    const formatted = rows.map(item => ({
      id: item.id,
      details: {
        name: item.name,
        category: item.category
      },
      pricing: {
        base_price: item.base_price,
        tax: item.tax
      },
      stock: item.stock
    }));

    res.json(formatted);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default app;

console.log("Connected URL:", process.env.DATABASE_URL);

https://github.com/13winda/vendor-c.git