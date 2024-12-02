import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const res = await conn.query("SELECT * FROM nfts WHERE id = ?", [
      params.id,
    ]);

    if (res.length === 0) {
      return NextResponse.json(
        {
          message: "NFT no encontrado",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(res[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(resquest, { params }) {
  try {
    const res = await conn.query("DELETE FROM nfts WHERE id = ?", [params.id]);
    console.log(res);

    if (res.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "NFT no encontrado",
        },
        {
          status: 404,
        }
      );
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const res = await conn.query("UPDATE nfts SET ? WHERE id = ?", [
      data,
      params.id,
    ]);

    if (res.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "NFT no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    const updateNft = await conn.query("SELECT * FROM nfts WHERE id = ?", [
      params.id,
    ]);

    return NextResponse.json(updateNft[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
