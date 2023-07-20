import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { stakingValidationSchema } from 'validationSchema/stakings';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.staking
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getStakingById();
    case 'PUT':
      return updateStakingById();
    case 'DELETE':
      return deleteStakingById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStakingById() {
    const data = await prisma.staking.findFirst(convertQueryToPrismaUtil(req.query, 'staking'));
    return res.status(200).json(data);
  }

  async function updateStakingById() {
    await stakingValidationSchema.validate(req.body);
    const data = await prisma.staking.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteStakingById() {
    const data = await prisma.staking.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
