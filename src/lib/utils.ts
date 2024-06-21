import { hash, compare } from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    try{
        const hashedPassword = await new Promise<string>((resolve, reject) => {
            hash(password, saltRounds, (err, potentialHashedPassword) => {
                if(err) {
                    reject(err);
                }else{
                    resolve(potentialHashedPassword);
                }
            });
        });

        return hashedPassword;
    }catch(err){
        console.log("Error hashing password: ", err);
        throw new Error("Error hashing password");
    }
};

export const verifyPassword = async (inputPassword: string, hashedPassword: string) => {
    try{
        const isPasswordMatch = await new Promise<boolean>((resolve, reject) => {
            compare(inputPassword, hashedPassword, (err, match) => {
                if(err){
                    reject(err);
                }else{
                    resolve(match);
                }
            });
        });


        return isPasswordMatch;
    }catch(err){
        console.log("Error comparing plaintext and hashed passwords: ", err);
        throw new Error("Error comparing plaintext and hashed passwords");
    }
};
