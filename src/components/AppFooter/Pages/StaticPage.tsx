import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchStaticPage ,StaticPage as StaticPageType} from "../../../utils/footerstaticPages";
import Footer from "../Footer";
import NavTop from "../../AppHeader/NavTop";

const StaticPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<StaticPageType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const slugs = ["privacy-policy", "terms", "cookie-policy", "manage-cookies"];
  
      const fetchStaticAll = async () => {
        try {
          const results = await Promise.all(slugs.map((slug) => fetchStaticPage(slug)));
          const pagesMap: Record<string, StaticPage> = {};
          results.forEach((res, index) => {
            pagesMap[slugs[index]] = res;
          });
          setPages(pagesMap);
        } catch (err: any) {
          // setError(err.message || "Error loading footer pages");
        } finally {
          // setLoading(false);
        }
      };
  
      fetchStaticAll();
    }, []);
  useEffect(() => {
    if (!slug) return;

    const loadPage = async () => {
      try {
        const res = await fetchStaticPage(slug);
        setPage(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [slug]);
  console.log('StaticPage as StaticPageType',page);
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
                        <div dangerouslySetInnerHTML={{ __html: page.data || page.content || "" }}/> </div>
                    </div>
            </section>
        </main>
    <Footer/>
    </>
  );
};

export default StaticPage;
