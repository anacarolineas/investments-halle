import { readFile, utils } from "xlsx";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import prisma from "../../../../lib/context/prisma";
import moment from "moment";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "POST")
    response.status(405).json({ error: "Method not allowed" });

  // Load the Excel file
  const workbook = readFile(
    "C:/Users/anaca/source/repos/investments-halle/src/pages/api/import/2023.xlsx"
  );

  // Select the desired worksheet
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convert the worksheet to JSON
  const jsonData = utils.sheet_to_json(sheet);
  const transactions = jsonData.filter(
    (t: any) => t["Movimentação"] === "Transferência - Liquidação"
  );

  const mappedTransactions = transactions.map((t: any) => {
    const type = t["Entrada/Saída"] === "Credito" ? "Buy" : "Sell";
    const date = moment(t["Data"], "DD/MM/YYYY").toISOString();
    const institution = t["Instituição"] as string;
    const amount = t["Quantidade"] as number;
    const unitPrice = t["Preço unitário"] as number;
    const operationValue = t["Valor da Operação"] as number;
    const ticker = (t["Produto"] as string).split("-")[0].trim();

    const transaction: Prisma.TransactionCreateInput = {
      type: type,
      date: date,
      institution: institution,
      amount: amount,
      unitPrice: unitPrice,
      operationValue: operationValue,
      ticker: ticker,
    };

    return transaction;
  });

  const result = await prisma.transaction.createMany({
    data: mappedTransactions,
  });

  response.status(200).send({
    message: result,
  });
}
