/* eslint-disable import/prefer-default-export */
import request from './request';

/**
 * 获取类型列表
 */
export function getType() {
  return request('/api/type', {
    method: 'GET',
  });
}
