import os
import json
import azure.functions as func
from azure.cosmos import CosmosClient

def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        client = CosmosClient(
            os.environ["COSMOS_ENDPOINT"],
            os.environ["COSMOS_KEY"]
        )

        database = client.get_database_client(os.environ["COSMOS_DATABASE"])
        container = database.get_container_client(os.environ["COSMOS_CONTAINER"])

        items = list(
            container.query_items(
                query="SELECT * FROM c",
                enable_cross_partition_query=True
            )
        )

        return func.HttpResponse(
            json.dumps(items),
            status_code=200,
            mimetype="application/json"
        )

    except Exception as e:
        return func.HttpResponse(
            f"Exception: {str(e)}",
            status_code=500
        )
