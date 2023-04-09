import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

const FormValueSchema = z.object({
  description: z.string().min(1, { message: "Task description is required" }),
});

type IFormValues = z.infer<typeof FormValueSchema>;

export default function AddTaskPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: zodResolver(FormValueSchema),
  });

  const onSubmit: SubmitHandler<IFormValues> = (data) =>
    alert(data.description);

  const hasErrors = errors.description !== undefined;

  return (
    <main className="flex h-screen flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="description"
          className={twMerge(
            "block text-sm font-medium leading-6 text-gray-900",
            hasErrors && "text-red-600"
          )}
        >
          Description
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            {...register("description")}
            type="text"
            className={twMerge(
              "block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6",
              hasErrors &&
                "border-red-300 text-red-900 placeholder-red-300 ring-red-300 focus:outline-none focus:ring-red-500"
            )}
            aria-invalid={hasErrors}
          />
          {hasErrors && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        <ErrorMessage
          errors={errors}
          name="description"
          className="mt-2 text-sm text-red-600"
          as="span"
        />
        <div className="mt-2">
          <button
            className="hover:bg-grau-500 focus-visible:outline-grau-600 w-full rounded-md bg-gray-600 px-2.5 py-2.5 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            type="submit"
          >
            Add Task
          </button>
        </div>
      </form>
    </main>
  );
}
