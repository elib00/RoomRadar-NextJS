import { hash } from "bcrypt";

export const hashPassword = async (password: string) => {
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
