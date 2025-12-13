import { useState, useRef, useCallback, useEffect } from 'react';
import { searchBooks, type BookSearchItem, type BookSearchResponse } from '@/api/main/search.api';

type PaginationState = {
  totalResults: number;
  hasMore: boolean;
  nextStart: number;
  pageSize: number;
};

const INITIAL_PAGINATION: PaginationState = {
  totalResults: 0,
  hasMore: false,
  nextStart: 1,
  pageSize: 30,
};

export const useInfiniteBookSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<BookSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>(INITIAL_PAGINATION);

  const debounceRef = useRef<number | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchSearch = useCallback(
    async (value: string, start?: number, append = false) => {
      const trimmed = value.trim();

      if (!trimmed) {
        setIsSearching(false);
        setResults([]);
        setLoading(false);
        setIsLoadingMore(false);
        setPagination(INITIAL_PAGINATION);
        return;
      }

      if (!append) {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        setIsSearching(true);
        setResults([]);
        setPagination(INITIAL_PAGINATION);
        setLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const pageSize = pagination.pageSize || 30;
      const startParam = typeof start === 'number' ? start : append ? pagination.nextStart : 1;

      try {
        const res: BookSearchResponse = await searchBooks(trimmed, startParam, pageSize);

        setResults((prev) => (append ? [...prev, ...res.items] : res.items));

        setPagination((prev) => ({
          totalResults: res.totalResults,
          hasMore: res.hasMore,
          pageSize: res.itemsPerPage || prev.pageSize || pageSize,
          nextStart: startParam + 1,
        }));

        setIsSearching(true);
      } catch (e) {
        console.error('검색 실패:', e);
        if (!append) {
          setResults([]);
          setIsSearching(true);
        }
      } finally {
        if (append) {
          setIsLoadingMore(false);
        } else {
          setLoading(false);
        }
      }
    },
    [pagination.pageSize, pagination.nextStart],
  );

  const handleKeywordChange = useCallback(
    (value: string) => {
      setKeyword(value);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      const timeoutId = window.setTimeout(() => {
        fetchSearch(value, 1, false);
      }, 700);

      debounceRef.current = timeoutId;
    },
    [fetchSearch],
  );

  const handleSubmit = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    fetchSearch(keyword, 1, false);
  }, [fetchSearch, keyword]);

  const resetSearch = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    setKeyword('');
    setIsSearching(false);
    setResults([]);
    setLoading(false);
    setIsLoadingMore(false);
    setPagination(INITIAL_PAGINATION);

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (!isSearching) return;
    if (!pagination.hasMore) return;

    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !loading && !isLoadingMore && pagination.hasMore) {
          fetchSearch(keyword, undefined, true);
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [isSearching, pagination.hasMore, loading, isLoadingMore, keyword, fetchSearch]);

  return {
    keyword,
    isSearching,
    results,
    loading,
    isLoadingMore,
    pagination,

    handleKeywordChange,
    handleSubmit,
    resetSearch, // ✅ 반환에 추가

    loadMoreRef,
  };
};
