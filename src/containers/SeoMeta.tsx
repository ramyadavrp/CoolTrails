import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const BASE_URL = import.meta.env.VITE_API_URL;

interface MetaTag {
  tagName: string;
  tagContent: string;
  tagType: string;
//   tagType: "meta" | "og" | "twitter" | "script";
}

interface Meta {
  title: string;
  metaDescription: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  customScript?: string;
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
            
             console.log('response seo',response.data);
            
            }catch(err){
                console.error('SEO API Error:', err);
                
            } finally{
            }
        }  
            fetchSeo();
    }, [page]);
    
    // useEffect(() => {
    //     if (!seo?.customScript) return;
    //     // 1. Remove old script (avoid duplicate)
    //     const oldScript = document.getElementById("seo-script");
    //     if (oldScript) oldScript.remove();
    //     // 2. Create new script
    //     const script = document.createElement("script");
    //     script.id = "seo-script";
    //     // 3. Clean script (remove <script> tags)
    //     const cleanScript = seo.customScript.replace(/<script>|<\/script>/g, "");
    //     // 4. Add script content
    //     script.innerHTML = cleanScript;
    //     // 5. Append to HEAD
    //     document.head.appendChild(script);
    //     console.log("Script :", cleanScript);
    //     // 6. Cleanup
    //     return () => {
    //         document.getElementById("seo-script")?.remove();
    //     };
    // }, [seo]);

    useEffect(() => {
        if (!seo?.customScript) return;
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = seo.customScript;
        const scripts = tempDiv.querySelectorAll("script");
        const isAlreadyLoaded = (src: string) =>
            Array.from(document.querySelectorAll("script"))
                .some(s => s.src === src);
        scripts.forEach((scr) => {
            if (scr.src && isAlreadyLoaded(scr.src)) return;
            const newScript = document.createElement("script");
            newScript.className = "seo-script";
            if (scr.src) {
                newScript.src = scr.src;
                newScript.async = true;
            } else {
                newScript.textContent = scr.textContent;
            }
            document.head.appendChild(newScript);
        });
    }, [seo?.customScript]);
    // console.log('response seo', seo?.customScript);
    const finalTitle = seo?.title?.trim() ||pagetitle || "Cooltrails | Home";
    // if (!seo) return null;
    return (
        <Helmet  key={page}>
            <title>{finalTitle}</title>
        {seo?.metaDescription && (
            <meta name="description" content={seo?.metaDescription} />
        )}

        {seo?.metaKeywords && (
            <meta name="keywords" content={seo?.metaKeywords} />
        )}

        {seo?.canonicalUrl && (
            <link rel="canonical" href={seo?.canonicalUrl} />
        )}
        
        {seo?.metaTags?.map((tag, index) => {
            //  console.log("META TAG:", tag);
             if (tag.tagType?.startsWith("og:")) {
                return (
                <meta
                    key={index}
                    property={tag.tagType}
                    content={tag.tagContent}
                />
                );
            }
            
            if (tag.tagType?.startsWith("twitter:")) {
                return (
                <meta
                    key={index}
                    name={tag.tagType}
                    content={tag.tagContent}
                />
                );
            }
            if (tag.tagType === "script") {
                return (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: tag.tagContent }}
                />
                );
            }
            return (
                <meta
                key={index}
                name={tag.tagName}
                content={tag.tagContent}
                />
            );
        })}
        </Helmet>
    );
};

export default SeoMeta;
