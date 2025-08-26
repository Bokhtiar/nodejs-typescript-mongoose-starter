const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import { adminAuthService } from "../../services/admin/admin.services";
import {IAdmin, IAdminCreateOrUpdate} from '../../types/admin/admin.types'

/* login as a admin */
export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;

        /* check account is exists  */
        const account = await adminAuthService.findOneByKey({ email: email });
        if (!account) {
            return res.status(404).json({
                status: false,
                message: "Invalid email or password.",
            });
        }

        /* compare with password */
        const result = await bcrypt.compare(password, account?.password);
        if (!result) {
            return res.status(404).json({
                status: false,
                message: "Invalid email or password.",
            });
        }

        /* Generate JWT token */
        const token = await jwt.sign(
            {
                id: account?._id,
                name: account?.name,
                role: account?.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            status: true,
            token: token,
        });
    } catch (error: any) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
};

/* register as a admin */
export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, email, phone, password, role } = req.body;

        /* check exist email */
        const is_emailExist = await adminAuthService.findOneByKey({ email: email });
        if (is_emailExist) {
            return res.status(409).json({
                status: false,
                message: "Email already exist.",
            });
        }

        /* check exist phone */
        const is_phoneExist = await adminAuthService.findOneByKey({ phone: phone });
        if (is_phoneExist) {
            return res.status(409).json({
                status: true,
                message: "Phone already exist.",
            });
        }

        /* Has password  */
        const hashPassword = await bcrypt.hash(password, 10);

        const documents: IAdminCreateOrUpdate = {
            name,
            email,
            phone,
            password: hashPassword,
            role,
        };

        await adminAuthService.registration({ documents: { ...documents } });

        res.status(201).json({
            status: true,
            message: "Admin Created.",
        });
    } catch (error: any) {
        console.log(error);
        next(error);
    }
};
