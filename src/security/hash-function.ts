require('dotenv').config();

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
const secretKey = process.env.SECRET_KEY;
const  bcrypt  =  require ( 'bcrypt' ) ;

// const  myPlaintextPassword  =  's0/\/\P4$$w0rD' ;
// const  someOtherPlaintextPassword  =  'not_bacon' ;

export async function hashPassword(password:string): Promise<string> {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('hash', hash)
    return hash;
}