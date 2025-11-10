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
import { FilterXSS, getDefaultWhiteList } from 'xss';

const TAG_NAME_PATTERN = /<\/?([a-zA-Z][a-zA-Z0-9-]*)[^>]*>/g;

const allowedHtmlTags = {
  ...getDefaultWhiteList(),
  span: ['style', 'class', 'title'],
  div: ['style', 'class'],
  a: ['style', 'class', 'href', 'title', 'target'],
  img: ['style', 'class', 'src', 'alt', 'title', 'width', 'height'],
  video: [
    'autoplay',
    'controls',
    'loop',
    'preload',
    'src',
    'height',
    'width',
    'muted',
  ],
};

const xssFilter = new FilterXSS({
  whiteList: allowedHtmlTags,
  stripIgnoreTag: true,
  css: false,
});

const ALLOWED_TAG_NAMES = new Set(Object.keys(allowedHtmlTags));

export function sanitizeHtml(htmlString: string) {
  return xssFilter.process(htmlString);
}

export function hasHtmlTagPattern(str: string): boolean {
  const htmlTagPattern =
    /<(html|head|body|div|span|a|p|h[1-6]|title|meta|link|script|style)/i;

  return htmlTagPattern.test(str);
}

export function isProbablyHTML(text: string): boolean {
  if (!text || typeof text !== 'string') {
    return false;
  }

  const trimmed = text.trim();

  if (!trimmed.includes('<') || !trimmed.includes('>')) {
    return false;
  }

  const lowerTrimmed = trimmed.toLowerCase();
  if (lowerTrimmed.startsWith('<!doctype html>')) {
    return true;
  }

  const tagNames = new Set<string>();
  let match;

  TAG_NAME_PATTERN.lastIndex = 0;

  while ((match = TAG_NAME_PATTERN.exec(trimmed)) !== null) {
    const tagName = match[1].toLowerCase();
    tagNames.add(tagName);
  }

  if (tagNames.size === 0) {
    return false;
  }

  for (const tagName of tagNames) {
    if (ALLOWED_TAG_NAMES.has(tagName)) {
      return true;
    }
  }

  return false;
}

export function sanitizeHtmlIfNeeded(htmlString: string) {
  return isProbablyHTML(htmlString) ? sanitizeHtml(htmlString) : htmlString;
}

export function safeHtmlSpan(possiblyHtmlString: string) {
  const isHtml = isProbablyHTML(possiblyHtmlString);
  if (isHtml) {
    return (
      <span
        className="safe-html-wrapper"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(possiblyHtmlString) }}
      />
    );
  }
  return possiblyHtmlString;
}

export function removeHTMLTags(str: string): string {
  return str.replace(/<[^>]*>/g, '');
}

export function isJsonString(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

export function getParagraphContents(
  str: string,
): { [key: string]: string } | null {
  if (!isProbablyHTML(str)) {
    return null;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  const pTags = doc.querySelectorAll('p');

  if (pTags.length === 0) {
    return null;
  }

  const paragraphContents: { [key: string]: string } = {};

  pTags.forEach((pTag, index) => {
    paragraphContents[`p${index + 1}`] = pTag.textContent || '';
  });

  return paragraphContents;
}
