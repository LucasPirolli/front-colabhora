import Cookies from "universal-cookie";

export const authFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const cookies = new Cookies();

  const token = cookies.get("token");
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

  if (response.status === 401 || response.status === 403) {
    cookies.remove("token", { path: "/" });
    window.location.href = "/";
  }

  return response;
};
