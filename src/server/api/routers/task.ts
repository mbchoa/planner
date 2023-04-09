import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const taskRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        description: z.string(),
        listId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.task.create({
        data: {
          description: input.description,
          userId: ctx.session.user.id,
          taskListId: input.listId,
        },
      });
    }),
  complete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          completed: true,
          completedAt: new Date(),
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.task.delete({
        where: {
          id: input.id,
        },
      });
    }),
});

export default taskRouter;
