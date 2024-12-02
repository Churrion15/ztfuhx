import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: "dqh99hpwj",
  api_key: "779416112266988",
  api_secret: "EJuTUfcWrd-5VL1QgR5bEVfuUl8", // Click 'View API Keys' above to copy your API secret
});

export async function GET() {
  try {
    const ress = await conn.query("SELECT * FROM nfts");
    return NextResponse.json(ress);
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

export async function POST(request) {
  try {
    const data = await request.formData();
    const image = data.get("image");

    if (!data.get("name")) {
      return NextResponse.json(
        {
          message: "Name is requiered",
        },
        {
          status: 400,
        }
      );
    }

    if (!image) {
      return NextResponse.json(
        {
          message: "image is requiered",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(process.cwd(), "public", image.name);
    await writeFile(filePath, buffer);

    const res = await cloudinary.uploader.upload(filePath);
    console.log(res);

    if (res) {
      await unlink(filePath);
    }

    const result = await conn.query("INSERT INTO nfts SET ?", {
      name: data.get("name"),
      description: data.get("description"),
      price: data.get("price"),
      image: res.secure_url,
    });

    console.log(result);

    return NextResponse.json({
      name: data.get("name"),
      description: data.get("description"),
      price: data.get("price"),
      id: res.insertId,
    });
  } catch (error) {
    console.log(error);
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
