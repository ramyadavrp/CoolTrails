import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../Footer";
import NavTop from "../../AppHeader/NavTop";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL; 
interface StaticPage {
  slug: string;
  title?: string;
  data?: string;
  content?: string;
}
const Terms = () => {
  const { slug } = useParams<{ slug: string }>();
    const [page, setPage] = useState<StaticPage | null>(null);
  
  const [loading, setLoading] = useState(true);
    // console.log('sls',slug);


    useEffect(() => {
  if (!slug) return;

  const fetchStaticPage = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${BASE_URL}/common/static-page-content`,
        { slug },
        { headers: { "Content-Type": "application/json" } }
      );

      setPage(response.data);
    } catch (error) {
      console.error("Error loading page", error);
      setPage(null);
    } finally {
      setLoading(false);
    }
  };

  fetchStaticPage();
}, [slug]);

  
  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!page) return <p className="text-center mt-5">Page not found</p>;

  return (
    <>
    <NavTop/>

       <main className="mainContent">
            <section className="section">
                <div className="container">
                    <div className="row">
                        <h1 className="mb-4 text-capitalize">{slug?.replace("-", " ")}</h1>
                        {/* API returns HTML or text */}
                        <div dangerouslySetInnerHTML={{ __html: page.data || page.content || "" }}/> 
                    </div>
                </div>
            </section>
        </main>
    <Footer/>
    </>
  );
};

export default Terms;
