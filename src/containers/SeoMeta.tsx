
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const BASE_URL = import.meta.env.VITE_API_URL;

interface Meta {
  pageUrl: string;
  title: string;
  metaDescription: string;
  metaKeywords?: string;    
  canonicalUrl?: string;     
  customScript?: string;     
  metaTags?: MetaTag[];  
}
interface MetaTag {
  tagName: string;
  tagContent: string;
  tagType: "meta" | "og" | "twitter" | "script";
}


const SeoMeta: React.FC = () => {
  const [seo, setSeo] = useState<Meta | null>(null);
  const [loading,setLoading] = useState(true);

    useEffect(() => {
        const fetchSeo = async() =>{
            try{
            const response = await axios.get(`${BASE_URL}/SeoMetaTags/home`);
            setSeo(response.data);
            
            // console.log(response.data);
            
            }catch(err){
                console.error('API Error:', err);
                
            } finally{
                setLoading(false);
            }
        }  
            fetchSeo();
    }, []);

  

    if (!seo) return null;

    return (
        <Helmet>
        {/* Default fields */}
            <title>{seo.title}</title>
            <meta name="description" content={seo.metaDescription} />
            <meta name="keywords" content={seo.metaKeywords} />
            <link rel="canonical" href={seo.canonicalUrl} />
        {/* Robots meta tag */}
        {/* Loop over metaTags */}
            {seo.metaTags?.map((tag, i) => {
                if (tag.tagType === "meta") {
                return <meta key={i} name={tag.tagName} content={tag.tagContent} />;
                }
                if (tag.tagType === "og") {
                return <meta key={i} property={tag.tagName} content={tag.tagContent} />;
                }
                if (tag.tagType === "twitter") {
                return <meta key={i} name={tag.tagName} content={tag.tagContent} />;
                }
                if (tag.tagType === "script") {
                return <script key={i} dangerouslySetInnerHTML={{ __html: tag.tagContent }} />;
                }
                return null;
            })}
        
        </Helmet>
    );
};

export default SeoMeta;
