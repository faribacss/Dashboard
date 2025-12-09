// library
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = "https://strapi.arvanschool.ir/api";

let TOKEN = ""; // Bearer Token

export function setToken(token) {
  TOKEN = token;
}

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    ...(TOKEN && { Authorization: `Bearer ${TOKEN}` }),
  };
}

// Get All Posts
export function GetAllPost() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      axios
        .get(`${API_BASE_URL}/posts?populate=*`, {
          headers: getAuthHeaders(),
        })
        .then((res) => res.data.data),
  });
  return { data, isLoading, error, refetch };
}

// Get Post By ID
export function GetPostById(documentId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["post", documentId],
    queryFn: () =>
      axios
        .get(`${API_BASE_URL}/posts/${documentId}`, {
          headers: getAuthHeaders(),
        })
        .then((res) => res.data.data),
  });
  return { data, isLoading, error };
}

// Create a Post
export default function CreateOnePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postData) =>
      axios
        .post(
          `${API_BASE_URL}/posts`,
          { data: postData },
          { headers: getAuthHeaders() }
        )
        .then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });
}

// Edit (update) a Post
export function EditPostById(documentId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postData) =>
      axios
        .put(
          `${API_BASE_URL}/posts/${documentId}`,
          { data: postData },
          { headers: getAuthHeaders() }
        )
        .then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["editPost", documentId] });
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.error("Error updating post:", error);
    },
  });
}

// Delete a Post
export function DeletePostById(documentId) {
  return useMutation({
    mutationFn: () =>
      axios.delete(`${API_BASE_URL}/posts/${documentId}`, {
        headers: getAuthHeaders(),
      }),
  });
}
