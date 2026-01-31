
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL; 

export interface StaticPage {
  slug: string;
  title?: string;
  content?: string;
}

export const fetchStaticPage = async (slug: string): Promise<StaticPage> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/common/static-page-content`,
      { slug },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching static page (${slug}):`, error.response?.data || error.message);
    throw error;
  }
};
