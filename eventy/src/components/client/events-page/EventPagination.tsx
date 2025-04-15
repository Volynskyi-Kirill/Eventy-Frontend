import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { EventPaginationProps } from './types';

export function EventPagination({
  pagination,
  onPageChange,
}: EventPaginationProps) {
  const isFirstPage = pagination.page === 1;
  const isLastPage = pagination.page === pagination.pages;
  const hasMultiplePages = pagination.pages > 1;

  if (!hasMultiplePages) {
    return null;
  }

  return (
    <Pagination className='my-8'>
      <PaginationContent>
        {!isFirstPage && (
          <PaginationItem>
            <PaginationPrevious
              href='#'
              onClick={(e) => {
                e.preventDefault();
                onPageChange(pagination.page - 1);
              }}
            />
          </PaginationItem>
        )}

        {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
          (page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href='#'
                isActive={page === pagination.page}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {!isLastPage && (
          <PaginationItem>
            <PaginationNext
              href='#'
              onClick={(e) => {
                e.preventDefault();
                onPageChange(pagination.page + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
