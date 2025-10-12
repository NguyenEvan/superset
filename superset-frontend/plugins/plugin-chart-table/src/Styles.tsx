/*
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

import { css, styled } from '@superset-ui/core';

export default styled.div`
  ${({ theme }) => css`
    table {
      width: 100%;
      min-width: auto;
      max-width: none;
      margin: 0;
    }

    th,
    td {
      min-width: 4.3em;
    }

    thead > tr > th {
      padding-right: 0;
      position: relative;
      background: ${theme.colors.grayscale.light5};
      text-align: left;
    }
    th svg {
      color: ${theme.colors.grayscale.light2};
      margin: ${theme.gridUnit / 2}px;
    }
    th.is-sorted svg {
      color: ${theme.colors.grayscale.base};
    }
    .table > tbody > tr:first-of-type > td,
    .table > tbody > tr:first-of-type > th {
      border-top: 0;
    }

    .table > tbody tr td {
      font-feature-settings: 'tnum' 1;
    }

    .dt-controls {
      padding-bottom: 0.65em;
    }
    .dt-metric {
      text-align: right;
    }
    .dt-totals {
      font-weight: ${theme.typography.weights.bold};
    }
    .dt-is-null {
      color: ${theme.colors.grayscale.light1};
    }
    td.dt-is-filter {
      cursor: pointer;
    }
    td.dt-is-filter:hover {
      background-color: ${theme.colors.secondary.light4};
    }
    td.dt-is-active-filter,
    td.dt-is-active-filter:hover {
      background-color: ${theme.colors.secondary.light3};
    }

    .dt-global-filter {
      float: right;
    }

    .dt-truncate-cell {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .dt-truncate-cell:hover {
      overflow: visible;
      white-space: normal;
      height: auto;
    }

    .dt-pagination {
      text-align: right;
      /* use padding instead of margin so clientHeight can capture it */
      padding: 0.75em 0 1.25em 0; /* top: 12px, bottom: 20px to match pagination-container */
    }

    .dt-pagination .pagination {
      margin: 0 15px; /* horizontal margin to match working pagination */
    }

    .dt-pagination .pagination > li > a,
    .dt-pagination .pagination > li > span {
      border: none; /* remove all borders/grid lines */
      border-radius: ${theme.borderRadius}px; /* rounded corners */
      padding: 8px 12px; /* consistent padding with design system */
    }

    .dt-pagination .pagination > li > a:hover,
    .dt-pagination .pagination > li > a:focus {
      background-color: ${theme.colors.primary.base}; /* blue background on hover */
      color: ${theme.colors.grayscale.light5}; /* white text on hover */
      text-decoration: none; /* remove underline */
    }

    .dt-pagination .pagination > li.active > a {
      background-color: ${theme.colors.primary.base}; /* blue background for active page */
      color: ${theme.colors.grayscale.light5}; /* white text for active page */
    }

    .dt-pagination .pagination > li > span {
      padding: 8px 12px;
      text-decoration: none;
      background-color: ${theme.colors.grayscale.light5};
      border-radius: ${theme.borderRadius}px;
      border: none;
      color: ${theme.colors.grayscale.dark1};
      display: inline-block;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    
    .dt-pagination .pagination > li > span:hover,
    .dt-pagination .pagination > li > span:focus {
      background-color: ${theme.colors.primary.base}; /* blue on hover */
      color: ${theme.colors.grayscale.light5}; /* white text on hover */
      text-decoration: none;
    }

    .pagination > li.dt-pagination-ellipsis > a {
      background-color: transparent; /* no background by default */
      color: ${theme.colors.grayscale.base}; /* gray text */
    }
      
    .pagination > li.dt-pagination-ellipsis > a:hover,
    .pagination > li.dt-pagination-ellipsis > a:focus {
      background-color: ${theme.colors.grayscale.light4}; /* subtle hover */
      color: ${theme.colors.grayscale.dark1}; /* darker text on hover */
      text-decoration: none;
    }

    .dt-no-results {
      text-align: center;
      padding: 1em 0.6em;
    }

    .right-border-only {
      border-right: 2px solid ${theme.colors.grayscale.light2};
    }
    table .right-border-only:last-child {
      border-right: none;
    }
  `}
`;
