const  bcrypt  =  require ( 'bcrypt' ) ;
const  saltRounds  =  10 ;
const  myPlaintextPassword  =  's0/\/\P4$$w0rD' ;
const  someOtherPlaintextPassword  =  'not_bacon' ;


// const hashingPass = bcrypt.hash ( myPlaintextPassword , saltRounds , function ( err , hash ) {
//
//
//     // Сохраните хэш в базе данных паролей. } ) ;
//     console.log(myPlaintextPassword);
//     console.log(myPlaintextPassword);
// }