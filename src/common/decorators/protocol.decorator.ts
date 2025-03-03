import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { FastifyRequest } from "fastify";

// @Param('http')'
export const Protocol = createParamDecorator(
  (defaultValue: string, ctx: ExecutionContext) => {
    console.log(defaultValue);
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();
    return request.protocol;
  }
)