
import type { Product } from "@/types/product";

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor";

type ApiRecord = Record<string, unknown>;

function isApiRecord(value: unknown): value is ApiRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toNumber(value: unknown): number {
  if (typeof value === "number") return value;

  if (typeof value === "string") {
    const normalized = value
      .replace(/[০-৯]/g, (digit) => String("০১২৩৪৫৬৭৮৯".indexOf(digit)))
      .replace(/,/g, "");

    const result = Number(normalized);
    return Number.isFinite(result) ? result : 0;
  }

  return 0;
}

function getText(
  item: ApiRecord,
  keys: string[],
  fallback = "",
): string {
  for (const key of keys) {
    const value = item[key];

    if (typeof value === "string" && value.trim()) {
      return value;
    }

    if (typeof value === "number") {
      return String(value);
    }
  }

  return fallback;
}

function normalizeMarkets(value: unknown): Product["markets"] {
  if (!Array.isArray(value)) return [];

  return value.filter(isApiRecord).map((market) => ({
    marketName: getText(market, ["market", "marketName"], "নামহীন বাজার"),
    division: getText(market, ["division"], "বিভাগ উল্লেখ নেই"),
    min: toNumber(market.min),
    max: toNumber(market.max),
  }));
}

function normalizeProduct(item: ApiRecord): Product {
  const today = toNumber(item.today);
  const yesterday = toNumber(item.yesterday);
  const name = getText(item, ["nameBn"], "নাম পাওয়া যায়নি");
  const category = getText(
    item,
    ["categoryNameBn", "category_name_bn", "categoryName", "category"],
    "অন্যান্য",
  );

  const rawId = item.id ?? item._id ?? item.slug ?? name;
  const slug = getText(item, ["slug"], String(rawId));
  const image = getText(item, ["image", "categoryIcon"], "🛒");
  const categorySlug = getText(
    item,
    ["categorySlug", "category_slug", "category"],
    category.toLowerCase(),
  );

  return {
    id: String(rawId),
    slug,
    nameBn: name,
    image,
    emoji: image,
    category,
    categorySlug,
    unit: getText(item, ["unit"], "প্রতি কেজি"),
    price: today,
    previousPrice: yesterday,
    today,
    yesterday,
    markets: normalizeMarkets(item.markets),
    description: getText(item, ["description", "descriptionBn", "summary"]),
  };
}

async function getJson(path: string): Promise<unknown> {
  const response = await fetch(`${API_URL}${path}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

function extractList(payload: unknown): ApiRecord[] {
  if (Array.isArray(payload)) {
    return payload.filter(isApiRecord);
  }

  if (isApiRecord(payload)) {
    for (const key of ["data", "products", "result"]) {
      if (Array.isArray(payload[key])) {
        return payload[key].filter(isApiRecord);
      }
    }
  }

  throw new Error("Unexpected products API response format");
}

export async function getProducts(): Promise<Product[]> {
  const payload = await getJson("/products");
  return extractList(payload).map(normalizeProduct);
}

export async function getProductById(
  id: string,
): Promise<Product | null> {
  const payload = await getJson(`/products/${encodeURIComponent(id)}`);

  if (!isApiRecord(payload)) return null;

  const candidate = payload.data ?? payload.product ?? payload;

  if (!isApiRecord(candidate)) return null;

  return normalizeProduct(candidate);
}

export async function getCategoryProducts(
  category: string,
): Promise<Product[]> {
  const products = await getProducts();
  const requestedCategory = category.trim().toLowerCase();

  return products.filter(
    (product) => product.categorySlug.toLowerCase() === requestedCategory,
  );
}

export function formatBn(value: number): string {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);
}

export function getChange(product: Product): number {
  if (product.yesterday <= 0) return 0;

  return ((product.today - product.yesterday) / product.yesterday) * 100;
}
