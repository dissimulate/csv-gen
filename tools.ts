import { faker } from '@faker-js/faker';

export type Sentiment = 'positive' | 'neutral' | 'negative';

const wordBanks = {
  adjective: {
    positive: ['excellent', 'fantastic', 'amazing', 'outstanding', 'pleasant', 'delightful', 'impressive'],
    negative: ['terrible', 'horrible', 'disappointing', 'poor', 'frustrating'],
    neutral:  ['okay', 'average', 'mediocre', 'fair'],
  },
  feeling: {
    positive: ['happy', 'joyful', 'ecstatic', 'content', 'satisfied', 'delighted', 'impressed'],
    negative: ['sad', 'unhappy', 'frustrated', 'disappointed', 'unsatisfied', 'dismayed', 'disgusted'],
    neutral:  ['neutral', 'indifferent', 'meh', 'okay'],
  }
} as const;

// Convert a normalized CSAT rating (0–1) to a sentiment bucket
function ratingToSentiment(rating: number): Sentiment {
  if (rating <= 0.33) return 'negative';
  if (rating < 0.67) return 'neutral';
  return 'positive';
}

// Generate sentiment-leaning lorem ipsum paragraphs
export function generateSentimentParagraphs(
  sentimentOrRating: Sentiment | number,
  count = 1
): string {
  const sentiment: Sentiment =
    typeof sentimentOrRating === 'number'
      ? ratingToSentiment(sentimentOrRating)
      : sentimentOrRating;

  return Array.from({ length: count }, () => {
    const body = faker.lorem.paragraph();
    const adjective = faker.helpers.arrayElement(wordBanks.adjective[sentiment]);
    const feeling = faker.helpers.arrayElement(wordBanks.feeling[sentiment]);
    return `${body} Overall, I found this ${adjective} and I feel ${feeling}.`;
  }).join('\n');
}
