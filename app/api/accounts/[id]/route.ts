import Account from "@/database/account.model";
import handleError from "@/lib/handlers/errors";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";
import z from "zod";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id) throw new NotFoundError("Account");

    await dbConnect();

    const account = await Account.findById(id);

    if (!account) throw new NotFoundError("Account");

    return NextResponse.json({ success: true, body: account }, { status: 200 });
  } catch (error) {
    handleError(error, "api") as APIErrorResponse;
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id) throw new NotFoundError("Account");

    await dbConnect();

    const account = await Account.findByIdAndDelete(id);

    if (!account) throw new NotFoundError("Account");

    return NextResponse.json({ success: true, body: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id) throw new NotFoundError("Account");

    await dbConnect();

    const body = await request.json();
    const validatedData = AccountSchema.partial().safeParse(body);

    if (!validatedData.success) throw new ValidationError(z.flattenError(validatedData.error).fieldErrors);

    const updateAccount = await Account.findByIdAndUpdate(id, validatedData, { new: true });
    if (!updateAccount) throw new NotFoundError("Account");

    return NextResponse.json({ success: true, body: updateAccount }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
