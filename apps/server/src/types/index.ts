/**
 * Общие типы для приложения
 */

/**
 * Тип для ответа API
 */
export interface ApiResponse<T = unknown> {
  status: 'success' | 'error' | 'fail';
  message?: string;
  data?: T;
}

