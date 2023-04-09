import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ListsPage() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  useEffect(() => {
    async function checkSession() {
      if (sessionData === null) {
        await router.push("/");
      }
    }

    checkSession().catch((error) => {
      console.error(error);
    });
  }, [sessionData, router]);

  return (
    <main className="flex h-screen flex-col items-center justify-center p-4">
      <div className="mt-4">
        <Link
          href="/lists/add"
          type="button"
          className="relative flex w-full flex-col items-center rounded-lg border-2 border-dashed border-gray-300 p-12 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <DocumentPlusIcon className="h-10 w-10 text-gray-400" />
          <span className="mt-2 block text-sm font-semibold text-gray-900">
            No lists
          </span>
          <span className="mt-1 block text-sm text-gray-500">
            Get started by creating a new list.
          </span>
        </Link>
      </div>
    </main>
  );
}
