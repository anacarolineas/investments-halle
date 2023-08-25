import { NextApiRequest, NextApiResponse } from "next";
import { generateRentabilityImport } from "../../../../../lib/repository/rentability";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
  ) {

    const result = await generateRentabilityImport();

    response.status(200).json({
        message: result,
      });
  }