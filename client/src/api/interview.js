import request from "./request";

/**
 * 获取所有分类的面试题标题
 */

export function getInterviewTitle() {
  return request("/api/interview/interviewTitle/", {
    method: "GET",
  });
}

/**
 * 根据面试题 id 获取面试题
 */

export function getInterviewById(interviewId) {
  return request(`/api/interview/${interviewId}`, {
    method: "GET",
  });
}

/**
 * 添加面试题
 */
export function addInterview(newInterview) {
  return request("/api/interview", {
    method: "POST",
    data: newInterview,
  });
}
