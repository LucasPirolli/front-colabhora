import Cookies from "js-cookie";

export const authFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = Cookies.get("token");
  console.log(token);
  
  const defaultHeaders: HeadersInit = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const mergedHeaders: HeadersInit = {
    ...defaultHeaders,
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers: mergedHeaders,
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return response;
};
