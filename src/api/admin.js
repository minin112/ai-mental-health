import service from "@/utils/request";

export function login(data) {
  return service.post("/user/login", data); //登录接口
}

export function categoryTree() {
  return service.get("/knowledge/category/tree"); //获取文章分类树接口
}

export function articlePage(params) {
  return service.get("/knowledge/article/page", { params }); //获取文章列表接口
}

export function uploadFile(file, businessInfo) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("businessType", "ARTICLE");
  formData.append("businessId", businessInfo.businessId);
  formData.append("businessField", "cover");

  return service.post("/file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}//上传文件接口

export  function createArticle(data) {
  return service.post("/knowledge/article", data); //创建文章接口
}

export function getArticleDetail(id){
  return service.get(`/knowledge/article/${id}`); //获取文章详情接口
}

export function updateArticle(id,data){
  return service.put(`/knowledge/article/${id}`,data); //更新文章接口
}

export function changeArticleStatus(id,data){
  return service.put(`/knowledge/article/${id}/status`,data); //切换文章状态接口
}

export function deleteArticle(id){
  return service.delete(`/knowledge/article/${id}`); //删除文章接口
}

export function getConsultationsPage(params){
  return service.get("/psychological-chat/sessions", { params }); //获取咨询记录列表接口
}

export function getSessionDetail(sessionId){
  return service.get(`/psychological-chat/sessions/${sessionId}/messages`); //获取咨询记录详情接口
}

export function getEmotionalPage(params){
  console.log(params);
  return service.get("/emotion-diary/admin/page", { params }); //获取情绪日志列表接口
}

export function deleteEmotional(id){
  return service.delete(`/emotion-diary/admin/${id}`); //删除情绪日志接口
}

export function getAnalyticsOverview(){
  return service.get(`/data-analytics/overview`); //获取数据分析概览接口
}
