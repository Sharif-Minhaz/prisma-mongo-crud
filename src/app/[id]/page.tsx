import TodoAsCodeInfo from "@/components/TodoAsCodeInfo";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function SingleTodo({ params }: { params: { id: string } }) {
	if (!params.id) redirect("/todos");
	return (
		<div>
			<h1 className="text-2xl mb-4">Details Object view</h1>
			<Suspense fallback={<p>Loading from [fallback]...</p>}>
				<TodoAsCodeInfo id={params.id} />
			</Suspense>
			<Link href="/">
				<button className="bg-slate-800 rounded-md px-3.5 py-2 mt-3 text-white">
					{"<-"} Go Back
				</button>
			</Link>
		</div>
	);
}
