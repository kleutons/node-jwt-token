import bcrypt from "bcrypt";

export default async function generatePassword(password: string): Promise<string | null> {
    const saltRounds = 10;

    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (err) {
        console.error('Erro ao gerar o hash:', err);
        return null;
    }
}
