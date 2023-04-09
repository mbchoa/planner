import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const taskListRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.taskList.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        tasks: true,
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.taskList.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
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
      return ctx.prisma.taskList.delete({
        where: {
          id: input.id,
        },
      });
    }),
});

export default taskListRouter;
