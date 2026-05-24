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
}

export  function createArticle(data) {
  return service.post("/knowledge/article", data); //创建文章接口
}
