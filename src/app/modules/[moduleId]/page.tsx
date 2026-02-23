import { modules } from "@/lib/data";
import ModulePageClient from "@/components/ModulePage";

export function generateStaticParams() {
  return modules.map((m) => ({ moduleId: m.id }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  return <ModulePageClient moduleId={moduleId} />;
}
