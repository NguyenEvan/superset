/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { CSSProperties, forwardRef, Ref } from 'react';
import { styled } from '@superset-ui/core';
import { createUltimatePagination, ITEM_TYPES } from 'react-ultimate-pagination';
import PaginationWrapper from 'src/components/Pagination/Wrapper';
import { Item } from 'src/components/Pagination/Item';
import { Next } from 'src/components/Pagination/Next';
import { Prev } from 'src/components/Pagination/Prev';
import { Ellipsis } from 'src/components/Pagination/Ellipsis';

/**
 * Create the ultimate pagination component using Superset's standard pagination components.
 * This replaces the old custom pagination implementation with a standardized, properly styled version.
 */
const UltimatePagination = createUltimatePagination({
  WrapperComponent: PaginationWrapper,
  itemTypeToComponent: {
    [ITEM_TYPES.PAGE]: ({ value, isActive, onClick }) => (
      <Item active={isActive} onClick={onClick}>
        {value}
      </Item>
    ),
    [ITEM_TYPES.ELLIPSIS]: ({ isActive, onClick }) => (
      <Ellipsis disabled={isActive} onClick={onClick} />
    ),
    [ITEM_TYPES.PREVIOUS_PAGE_LINK]: ({ isActive, onClick }) => (
      <Prev disabled={isActive} onClick={onClick} />
    ),
    [ITEM_TYPES.NEXT_PAGE_LINK]: ({ isActive, onClick }) => (
      <Next disabled={isActive} onClick={onClick} />
    ),
    [ITEM_TYPES.FIRST_PAGE_LINK]: () => null,
    [ITEM_TYPES.LAST_PAGE_LINK]: () => null,
  },
});

/**
 * Styled wrapper to maintain .dt-pagination class for sticky table calculations
 * and provide right-aligned layout consistent with the table design.
 */
const PaginationContainer = styled.div`
  text-align: right;
`;

export interface PaginationProps {
  pageCount: number; // number of pages
  currentPage?: number; // index of current page, zero-based (for backward compatibility)
  maxPageItemCount?: number; // kept for backward compatibility (not used by react-ultimate-pagination)
  onPageChange: (page: number) => void; // `page` is zero-based (for backward compatibility)
  style?: CSSProperties; // for visibility toggling in sticky mode
}

/**
 * Pagination adapter component that wraps react-ultimate-pagination.
 * Maintains backward compatibility with the existing DataTable API by:
 * - Converting 0-based page indexing to 1-based (required by react-ultimate-pagination)
 * - Maintaining forwardRef for sticky table height calculations
 * - Supporting style prop for visibility toggling
 * - Keeping the .dt-pagination class for CSS targeting
 */
export default forwardRef(function Pagination(
  {
    style,
    pageCount,
    currentPage = 0,
    maxPageItemCount = 9, // Not used by react-ultimate-pagination, but kept for API compatibility
    onPageChange,
  }: PaginationProps,
  ref: Ref<HTMLDivElement>,
) {
  // Convert 0-based to 1-based for standard component
  const currentPage1Based = currentPage + 1;

  // Handle page change: convert 1-based back to 0-based for backward compatibility
  const handlePageChange = (page1Based: number) => {
    onPageChange(page1Based - 1);
  };

  return (
    <PaginationContainer ref={ref} className="dt-pagination" style={style}>
      <UltimatePagination
        totalPages={pageCount}
        currentPage={currentPage1Based}
        onChange={handlePageChange}
      />
    </PaginationContainer>
  );
});
