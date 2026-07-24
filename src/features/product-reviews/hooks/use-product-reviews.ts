'use client';
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { getReviews } from "../lib/apis/reviews.api";

const LIMIT = 2;

export function useProductReviews(productId: string) {
  const { ref, inView } = useInView();

  const reviewsQuery = useInfiniteQuery({
    queryKey: ["reviews", productId],
    queryFn: ({ pageParam }) =>
      getReviews(productId, pageParam, LIMIT),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.payload.metadata;

      return page < totalPages ? page + 1 : undefined;
    },
  });

  useEffect(() => {
    if (
      inView &&
      reviewsQuery.hasNextPage &&
      !reviewsQuery.isFetchingNextPage
    ) {
      reviewsQuery.fetchNextPage();
    }
  }, [
    inView,
    reviewsQuery.hasNextPage,
    reviewsQuery.isFetchingNextPage,
    reviewsQuery.fetchNextPage,
  ]);

  return {
    ...reviewsQuery,
    ref,
  };
}