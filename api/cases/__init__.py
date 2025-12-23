import json
import os
import azure.functions as func
from azure.cosmos import CosmosClient
from uuid import uuid4

COSMOS_ENDPOINT = os.environ["COSMOS_ENDPOINT"]
COSMOS_KEY = os.environ["COSMOS_KEY"]
COSMOS_DATABASE = os.environ["COSMOS_DATABASE"]
COSMOS_CONTAINER = os.environ["COSMOS_CONTAINER"]

client = CosmosClient(COSMOS_ENDPOINT, COSMOS_KEY)
db = client.get_database_client(COSMOS_DATABASE)
container = db.get_container_client(COSMOS_CONTAINER)

def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        method = req.method
        case_id = req.route_params.get("id")

        # =========================
        # GET ALL
        # =========================
        if method == "GET" and not case_id:
            items = list(container.read_all_items())
            return func.HttpResponse(
                json.dumps(items),
                mimetype="application/json"
            )

        # =========================
        # GET BY ID
        # =========================
        if method == "GET" and case_id:
            item = container.read_item(item=case_id, partition_key=case_id)
            return func.HttpResponse(
                json.dumps(item),
                mimetype="application/json"
            )

        # =========================
        # CREATE
        # =========================
        if method == "POST":
            body = req.get_json()
            body["id"] = str(uuid4())
            container.create_item(body)
            return func.HttpResponse(
                json.dumps(body),
                status_code=201,
                mimetype="application/json"
            )

        # =========================
        # UPDATE
        # =========================
        if method == "PUT" and case_id:
            body = req.get_json()
            body["id"] = case_id
            container.upsert_item(body)
            return func.HttpResponse(
                json.dumps(body),
                mimetype="application/json"
            )

        return func.HttpResponse("Method not allowed", status_code=405)

    except Exception as e:
        return func.HttpResponse(
            json.dumps({ "error": str(e) }),
            status_code=500,
            mimetype="application/json"
        )
