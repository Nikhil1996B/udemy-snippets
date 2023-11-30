import { db } from "./db";
import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippet.findMany();
  const renderedSnippets = snippets.map((snippet) => (
    <Link
      key={snippet.id}
      className="flex justify-between items-center p-2 border rounded"
      href={`/snippets/${snippet.id}`}
    >
      <div className="">{snippet.title}</div>
      <div className="">View</div>
    </Link>
  ));
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold ">Snippets</h1>
        <Link className="border rounded p-2" href="/snippets/new">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
