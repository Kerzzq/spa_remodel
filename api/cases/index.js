import { DefaultAzureCredential } from "@azure/identity";

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

// OJO: necesitas el "Entity Set Name" correcto.
// Asumimos que es contoso_casos (lo más probable).
// Si te da 404, hay que mirar el Entity Set Name en Dataverse.
export default async function (context, req) {
  try {
    const dataverseUrl = requireEnv("DATAVERSE_URL").replace(/\/$/, "");
    const table = requireEnv("DATAVERSE_TABLE");

    // Token con Managed Identity en Azure
    // En local: funciona si has hecho `az login` (o si tu usuario tiene acceso)
    const credential = new DefaultAzureCredential();

    // Scope recomendado para Dataverse: {resource}/.default
    const token = await credential.getToken(`${dataverseUrl}/.default`);

    // Traemos registros (puedes añadir $select para optimizar cuando confirmes columnas)
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
      const details = await r.text();
      context.res = {
        status: r.status,
        headers: { "Content-Type": "application/json" },
        body: { error: "Dataverse request failed", status: r.status, details }
      };
      return;
    }

    const data = await r.json();

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: data.value ?? []
    };
  } catch (err) {
    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: { error: err.message }
    };
  }
}
