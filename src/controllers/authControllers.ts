import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRole, UsersData } from "../data/users";

const SECRET = process.env.SECRET || 'jwt-secret';

export default class AuthController {

    private repository: UsersData;

    constructor() {
        this.repository = new UsersData();
    }

    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            const user = this.repository.findByEmail(email);

            if (!user) {
                res.status(401).json({
                    message: "User Not Found!",
                    data: { email }
                });
                return;
            }

            const validatePassword = bcrypt.compareSync(password, user.password);

            if (!validatePassword) {
                res.status(401).json({
                    message: "Unauthorized!"
                });
                return;
            }

            const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, SECRET, { expiresIn: '1h' });

            res.json({
                message: "Login Successful!",
                data: { token }
            });

        } catch (err: any) {
            console.error(err);
            res.status(500).json({
                message: err.message
            });
        }
    }

    public verifyToken(req: Request, res: Response, next: NextFunction): void {
        const tokenHeader = req.headers['authorization'];
        const token = tokenHeader && tokenHeader.split(" ")[1];

        if (!token) {
            res.status(401).json({
                message: "Unauthorized!"
            });
            return;
        }

        jwt.verify(token, SECRET, (err: any, decoded: any) => {
            if (err) {
                res.status(401).json({
                    message: "Invalid Token!"
                });
                return;
            }

            // Armazenar dados decodificados no request para uso em rotas protegidas
            req.user = decoded as { id: string; name: string; role: UserRole;};
            next();
        });
    }
}
