from fastapi import APIRouter, Query
import pandas as pd
import os

router = APIRouter()

DATA_PATH = os.path.join("data", "houses.csv")


@router.get("/houses/filter")
def filter_houses(
    min_price: int = Query(None),
    max_price: int = Query(None)
):

    print("🔎 FILTER HIT:", min_price, max_price)

    if not os.path.exists(DATA_PATH):
        return []

    df = pd.read_csv(DATA_PATH)

    if df.empty:
        return []

    df["price"] = pd.to_numeric(df["price"], errors="coerce")
    df = df.dropna(subset=["price"])

    if min_price is not None:
        df = df[df["price"] >= int(min_price)]

    if max_price is not None:
        df = df[df["price"] <= int(max_price)]

    df = df.sort_values(by="price", ascending=False)

    return df.to_dict(orient="records")