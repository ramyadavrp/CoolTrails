import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const BASE_URL = import.meta.env.VITE_API_URL;

interface MetaTag {
  tagName: string;
  tagContent: string;
  tagType: "meta" | "og" | "twitter" | "script";
}

interface Meta {
  title: string;
  metaDescription: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  metaTags?: MetaTag[];
}
interface SeoMetaProps {
  page: string;
  pagetitle?: string; 
}

const SeoMeta: React.FC<SeoMetaProps> = ({  page, pagetitle }) => {
    // console.log('page',page);
    // console.log('pagetitle',pagetitle);
  const [seo, setSeo] = useState<Meta | null>(null);
    useEffect(() => {
        // if (!page) return; 
        if (!page || typeof page !== 'string' || page.trim() === '') return; // page null check
        const fetchSeo = async() =>{
            try{
            const response = await axios.get(`${BASE_URL}/SeoMetaTags/${page}`);
                if (response.data) {
                setSeo(response.data);
                }
            
             console.log('response',response.data);
            
            }catch(err){
                console.error('SEO API Error:', err);
                
            } finally{
            }
        }  
            fetchSeo();
    }, [page]);
    const finalTitle = seo?.title?.trim() ||pagetitle || "Cooltrails | Home";
    if (!seo) return null;
    return (
        <Helmet  key={page}>
            <title>{finalTitle}</title>
        {seo.metaDescription && (
            <meta name="description" content={seo.metaDescription} />
        )}

        {seo.metaKeywords && (
            <meta name="keywords" content={seo.metaKeywords} />
        )}

        {seo.canonicalUrl && (
            <link rel="canonical" href={seo.canonicalUrl} />
        )}

        {seo.metaTags?.map((tag, index) => {
            switch (tag.tagType) {
            case "meta":
                return (
                <meta
                    key={index}
                    name={tag.tagName}
                    content={tag.tagContent}
                />
                );

            case "og":
                return (
                <meta
                    key={index}
                    property={tag.tagName}
                    content={tag.tagContent}
                />
                );

            case "twitter":
                return (
                <meta
                    key={index}
                    name={tag.tagName}
                    content={tag.tagContent}
                />
                );

            case "script":
                return (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: tag.tagContent }}
                />
                );

            default:
                return null;
            }
        })}
        </Helmet>
    );
};

export default SeoMeta;
