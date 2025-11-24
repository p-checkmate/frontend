import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS 클래스를 조건적으로 병합하고 충돌을 해결하는 유틸리티 함수
 * - clsx: 조건에 따라 className을 조합
 * - tailwind-merge: 중복되는 Tailwind 클래스 속성 제거
 *
 * @example
 * cn('text-red-500', isActive && 'bg-blue-500')
 * → 'text-red-500 bg-blue-500' (isActive가 true일 때)
 *
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
