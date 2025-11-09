import React from 'react';

const BASE_URL = 'https://www.bearcavemarketing.com';

interface ReviewSchemaProps {
  reviews?: Array<{
    author: string;
    authorTitle?: string;
    authorCompany?: string;
    reviewBody: string;
    rating?: number;
    datePublished?: string;
  }>;
}

const ReviewSchema: React.FC<ReviewSchemaProps> = ({
  reviews = [
    {
      author: 'Sarah Chen',
      authorTitle: 'Chief Marketing Officer',
      authorCompany: 'Series B SaaS',
      reviewBody:
        'Jacob is the rare operator who can architect the system, build it, and prove the ROI inside the same sprint.',
      rating: 5,
      datePublished: '2024-01-15',
    },
    {
      author: 'Michael Rodriguez',
      authorTitle: 'Founder',
      authorCompany: 'Commerce Collective',
      reviewBody:
        'He turned our fragmented data into a growth engine. Strategy, implementation, and documentation all shipped together.',
      rating: 5,
      datePublished: '2024-02-20',
    },
    {
      author: 'Emily Johnson',
      authorTitle: 'VP of Growth',
      authorCompany: 'Healthcare Network',
      reviewBody:
        "Jacob's marketing automation work gave our team time back and produced the most predictable pipeline we've ever had.",
      rating: 5,
      datePublished: '2024-03-10',
    },
  ],
}) => {
  const aggregateRating = {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: reviews.length.toString(),
    bestRating: '5',
    worstRating: '1',
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BearCave Marketing',
    url: BASE_URL,
    aggregateRating: aggregateRating,
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
        jobTitle: review.authorTitle,
        worksFor: review.authorCompany
          ? {
              '@type': 'Organization',
              name: review.authorCompany,
            }
          : undefined,
      },
      reviewBody: review.reviewBody,
      reviewRating: review.rating
        ? {
            '@type': 'Rating',
            ratingValue: review.rating.toString(),
            bestRating: '5',
            worstRating: '1',
          }
        : undefined,
      datePublished: review.datePublished || new Date().toISOString().split('T')[0],
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData, null, 2) }}
    />
  );
};

export default ReviewSchema;
