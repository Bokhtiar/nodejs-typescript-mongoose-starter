import { Admin } from "../../models/auth-admin.models";
import { IAdmin, IAdminCreateOrUpdate } from "../../types/admin/auth.types";

/* specific resource findOneByKey */
const findOneByKey = async (params: any): Promise<IAdmin | null> => {
  return await Admin.findOne({ ...params });
};

/* create new registration */
const registration = async ({
  documents,
}: {
  documents: IAdminCreateOrUpdate;
}): Promise<IAdmin | null> => {
  const newAdmin = new Admin({
    name: documents.name,
    email: documents.email,
    phone: documents.phone,
    password: documents.password,
    role: documents.role,
  });
  return await newAdmin.save();
};

export const adminAuthService = {
  findOneByKey,
  registration,
};
