import { notFound } from "next/navigation";
import { QuizPage } from "@/app/quiz/quiz-page";
import { universeConfigs } from "@/app/quiz/quiz-data";
import {PokemonRunClient} from '@/app/quiz/pokemon-run-client';

type PageProps = {
  params: Promise<{ world: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function WorldRunPage({ params, searchParams }: PageProps) {
  const { world } = await params;
  if (world !== "pokemon" && world !== "dofus" && world !== "runeterra") notFound();
  const query=await searchParams;
  // Existing bookmarked URL-based runs keep their original rules until finished.
  if(world==='pokemon'&&query.play!=='1')return <PokemonRunClient bank={universeConfigs.pokemon.questions} initialLevel={query.difficulty==='easy'||query.difficulty==='expert'?query.difficulty:'normal'}/>;
  return <QuizPage config={universeConfigs[world]} searchParams={query} count={world === "runeterra" ? 20 : 15} />;
}
