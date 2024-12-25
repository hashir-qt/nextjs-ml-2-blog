import { simpleBlogCard } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import { Card, CardContent } from "./components/ui/card";
import Image from "next/image";
import { Button } from "./components/ui/button";
import Link from "next/link";

async function getData() {
  const query = `
*[_type == 'blog']| order(_createdAt asc)
{
  title,
    smallDescription,
    "currentSlug":slug.current,
    titleImage,
}
  `;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();
  console.log(data);
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 sm:grid-cols-2 mt-5">
      {data.map((post, idx) => (
        <Card
          key={idx}
          className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        >
          <div className="relative w-full h-48 overflow-hidden rounded-md mb-4">
            <Image
              src={urlFor(post.titleImage).url()}
              alt="image"
              layout="fill" // This makes the image responsive
              objectFit="cover" // Ensures the image covers the area without distortion
              className="rounded-t-lg"
            />
          </div>

          <CardContent className="mt-5">
            <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
              {post.smallDescription}
            </p>
            <Button
              asChild
              className="w-full mt-7"
            >
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
