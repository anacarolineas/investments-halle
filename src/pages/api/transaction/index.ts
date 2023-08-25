import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/context/prisma";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    //provisório
    //await prisma.transaction.deleteMany();
    await prisma.rentabilityAsset.deleteMany();

    return response.status(200).send({
        message: "foi",
      });;
}