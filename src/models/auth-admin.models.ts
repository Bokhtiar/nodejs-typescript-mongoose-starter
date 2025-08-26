import { Schema, model } from "mongoose";
import { IAdminCreateOrUpdate } from "../types/admin/auth.types";

const adminSchema: Schema = new Schema<IAdminCreateOrUpdate>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true, 
    },
    phone: {
      type: Number,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Admin = model<IAdminCreateOrUpdate>("Admin", adminSchema);
