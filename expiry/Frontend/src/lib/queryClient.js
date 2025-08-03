import { QueryClient } from "@tanstack/react-query";

/**
 * Checks if a fetch response is OK, and throws an error if it's not.
 * @param {Response} res The response object from a fetch call.
 */
async function throwIfResNotOk(res) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

/**
 * A wrapper for making API requests using fetch, intended for mutations.
 * @param {string} method The HTTP method (e.g., 'POST', 'PUT').
 * @param {string} url The URL to request.
 * @param {unknown} [data] The optional data to send as a JSON body.
 * @returns {Promise<Response>}
 */
export async function apiRequest(method, url, data) {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

/**
 * A higher-order function that creates a default query function for React Query.
 * @param {{ on401: 'returnNull' | 'throw' }} options
 * @returns The query function.
 */
export const getQueryFn = ({ on401: unauthorizedBehavior }) => async ({ queryKey }) => {
  const res = await fetch(queryKey.join("/"), {
    credentials: "include",
  });

  if (unauthorizedBehavior === "returnNull" && res.status === 401) {
    return null;
  }

  await throwIfResNotOk(res);
  return await res.json();
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      // NOTE: These settings disable most of React Query's automatic refetching.
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity, // Data will be considered "fresh" forever.
      retry: false, // Queries will not retry on failure.
    },
    mutations: {
      retry: false, // Mutations will not retry on failure.
    },
  },
});