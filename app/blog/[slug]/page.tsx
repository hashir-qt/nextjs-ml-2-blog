import { fullBlog } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image"
import BlogComments from "@/app/components/BlogComments";



async function getData(slug: string) {
    const query = `
    *[_type == "blog" && slug.current == '${slug}' ] {
  "currentSlug": slug.current,
    title,
    content,
    titleImage,
}[0] `;

    const data = await client.fetch(query);
    return data
}


export default async function BlogArticle({params}: {params:{slug: string}}) {
    const data: fullBlog = await getData(params.slug)
    
    return (
       <div>
        <h1>
            <span className="block text-2xl md:mt-4 sm:mt-2 text-center text-primary font-semibold tracking-wide uppercase">
                Latest Crypto News
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>
      <div className="flex flex-col items-center">
      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt="Title Image"
        priority
        className="rounded-lg mt-8 border  "
      />

      <div className="mt-10 prose prose-green prose-lg md:prose-xl dark:prose-invert prose-li:marker:text-primary">
        <PortableText value={data.content} />
      </div>
      
    </div>
  <BlogComments />
    </div>
  );
}
