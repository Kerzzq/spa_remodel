import { DefaultAzureCredential } from "@azure/identity";

/**
 * Configura estas variables en la Function App (Application settings):
 * - DATAVERSE_URL  -> https://TU_ORG.crm.dynamics.com
 * - DATAVERSE_TABLE -> nombre lógico del entity set, p.ej. new_cases
 */
export default async function (context, req) {
  try {
    const dataverseUrl = process.env.DATAVERSE_URL;
    const table = process.env.DATAVERSE_TABLE;

    if (!dataverseUrl || !table) {
      context.res = { status: 500, body: { error: "Missing DATAVERSE_URL or DATAVERSE_TABLE" } };
      return;
    }

    // Token usando Managed Identity / DefaultAzureCredential
    const credential = new DefaultAzureCredential();
    const token = await credential.getToken(`${dataverseUrl}/.default`);

    // (Opcional) filtros por query
    // Ej: /api/cases?sector=Public
    const sector = req.query;

    const url = `${dataverseUrl}/api/data/v9.2/${table}`;

    const r = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token.token}`,
        Accept: "application/json",
        "OData-MaxVersion": "4.0",
        "OData-Version": "4.0"
      }
    });

    if (!r.ok) {
      const txt = await r.text();
      context.res = { status: r.status, body: { error: "Dataverse error", details: txt } };
      return;
    }

    const data = await r.json();

    // Devuelve solo los registros
    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: data.value
    };
  } catch (err) {
    context.res = { status: 500, body: { error: err.message } };
  }
}
