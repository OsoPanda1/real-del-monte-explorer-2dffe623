import { db } from "../lib/store.js";

interface RecommendationInput {
  intent: string;
}

const intentCategoryMap: Record<string, string> = {
  comer: "gastronomia",
  hospedaje: "hospedaje",
  aventura: "ecoturismo",
  cultura: "cultura",
};

const planWeight: Record<string, number> = {
  basic: 1,
  plus: 2,
  premium: 3,
};

export function recommendBusinesses({ intent }: RecommendationInput) {
  const targetCategory = intentCategoryMap[intent.toLowerCase()];

  return [...db.businesses.values()]
    .filter((business) => business.isActive)
    .map((business) => {
      const relevance = targetCategory && business.category === targetCategory ? 3 : 1;
      const score = relevance * 10 + (planWeight[business.plan] ?? 1);
      return { ...business, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}
